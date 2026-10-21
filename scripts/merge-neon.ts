/**
 * merge-neon.ts — Unify the deployed Neon content (Vietnamese-localized,
 * includes N2/N1 + comprehension passages) with the repo's full corpus
 * (2,360 vocab / 125 grammar / 548 kanji).
 *
 * Strategy:
 *  - KEEP Neon rows wherever they exist (preserves vi_meaning, han_viet, ids)
 *  - ENRICH Neon rows by filling NULL fields from matching local entries
 *  - INSERT local-only entries (order continues per level)
 *  - REPLACE kana / counters / conjugations from the repo corpus
 *  - NEVER touch: users, comprehension_passage, progress tables, stats values
 *    (except adding missing xp / dailyGoal keys)
 *
 * Match keys: vocabulary = word|reading|level, grammar = title, kanji = character,
 * resource = url.
 */
import { db, schema } from "@/db";
import { v4 as uuid } from "uuid";
import {
  ALL_KANA,
  ALL_VOCAB,
  ALL_KANJI,
  ALL_GRAMMAR,
  YOUTUBE_RESOURCES,
  COUNTERS,
  CONJUGATIONS,
} from "./seed";

const LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const;

async function chunkInsert<T extends Record<string, unknown>>(
  table: any,
  rows: T[],
  size = 100,
) {
  for (let i = 0; i < rows.length; i += size) {
    await db.insert(table).values(rows.slice(i, i + size) as any);
  }
}

async function main() {
  console.log("🔗 Merging repo corpus into Neon database...\n");

  // ============ KANA (replace with local 138) ============
  {
    await db.delete(schema.kana);
    await chunkInsert(
      schema.kana,
      ALL_KANA.map((k) => ({
        id: uuid(),
        char: k.char,
        romaji: k.romaji,
        type: k.type,
        row: k.row,
        order: k.order,
        pair: k.pair ?? null,
        audio: null,
      })),
    );
    console.log(`✓ kana: ${ALL_KANA.length} rows (replaced)`);
  }

  // ============ VOCABULARY ============
  {
    const neonRows = await db.select().from(schema.vocabulary);
    const byLexeme = new Map<string, typeof neonRows[number]>();
    const byFullKey = new Map<string, typeof neonRows[number]>();
    for (const r of neonRows) {
      byLexeme.set(`${r.word}|${r.reading}`, r);
      byFullKey.set(`${r.word}|${r.reading}|${r.level}`, r);
    }

    // 1) Enrich matching Neon rows (fill NULL fields only)
    let enriched = 0;
    const updates: Promise<void>[] = [];
    for (const v of ALL_VOCAB) {
      const target = byFullKey.get(`${v.word}|${v.reading}|${v.level}`);
      if (!target) continue;
      const patch: Record<string, unknown> = {};
      if (target.romaji === null && v.romaji) patch.romaji = v.romaji;
      if (target.pos === null && v.pos) patch.pos = v.pos;
      if (target.verbGroup === null && v.verbGroup) patch.verbGroup = v.verbGroup;
      if (target.pitchAccent === null && v.pitchAccent) patch.pitchAccent = v.pitchAccent;
      if (target.lesson === null && v.lesson != null) patch.lesson = v.lesson;
      if (target.exampleJp === null && v.exampleJp) patch.exampleJp = v.exampleJp;
      if (target.exampleEn === null && v.exampleEn) patch.exampleEn = v.exampleEn;
      if (target.exampleJp2 === null && v.exampleJp2) patch.exampleJp2 = v.exampleJp2;
      if (target.exampleEn2 === null && v.exampleEn2) patch.exampleEn2 = v.exampleEn2;
      if (Object.keys(patch).length) {
        enriched++;
        updates.push(
          db
            .update(schema.vocabulary)
            .set(patch as any)
            .where(eqId(schema.vocabulary, target.id))
            .then(() => {}),
        );
      }
    }
    await Promise.all(updates);

    // 2) Insert local-only entries
    const maxOrderByLevel: Record<string, number> = {};
    for (const r of neonRows) {
      maxOrderByLevel[r.level] = Math.max(maxOrderByLevel[r.level] ?? 0, r.order);
    }
    const seenLocal = new Set<string>();
    const inserts: (typeof schema.vocabulary.$inferInsert)[] = [];
    for (const v of ALL_VOCAB) {
      const fullKey = `${v.word}|${v.reading}|${v.level}`;
      if (seenLocal.has(fullKey)) continue;
      seenLocal.add(fullKey);
      if (byFullKey.has(fullKey)) continue; // exists in Neon
      maxOrderByLevel[v.level] = (maxOrderByLevel[v.level] ?? 0) + 1;
      inserts.push({
        id: uuid(),
        word: v.word,
        reading: v.reading,
        meaning: v.meaning,
        viMeaning: null,
        romaji: v.romaji ?? null,
        level: v.level,
        category: v.category,
        pos: v.pos ?? null,
        verbGroup: v.verbGroup ?? null,
        pitchAccent: v.pitchAccent ?? null,
        lesson: v.lesson ?? null,
        exampleJp: v.exampleJp ?? null,
        exampleEn: v.exampleEn ?? null,
        exampleVi: null,
        exampleJp2: v.exampleJp2 ?? null,
        exampleEn2: v.exampleEn2 ?? null,
        order: maxOrderByLevel[v.level],
      });
    }
    await chunkInsert(schema.vocabulary, inserts as any);

    const counts: Record<string, number> = {};
    const merged = await db.select().from(schema.vocabulary);
    for (const r of merged) counts[r.level] = (counts[r.level] ?? 0) + 1;
    console.log(
      `✓ vocabulary: ${neonRows.length} Neon (kept, ${enriched} enriched) + ${inserts.length} new = ${merged.length} → ${LEVELS.map((l) => `${l}:${counts[l] ?? 0}`).join(" ")}`,
    );
  }

  // ============ GRAMMAR ============
  {
    const neonRows = await db.select().from(schema.grammar);
    const byTitle = new Map(neonRows.map((r) => [r.title, r]));

    let enriched = 0;
    for (const g of ALL_GRAMMAR) {
      const t = byTitle.get(g.title);
      if (!t) continue;
      const patch: Record<string, unknown> = {};
      if (t.rule === null && (g as any).rule) patch.rule = (g as any).rule;
      if (t.conjugation === null && (g as any).conjugation) patch.conjugation = (g as any).conjugation;
      if (t.usage === null && (g as any).usage) patch.usage = (g as any).usage;
      if (t.chapter === null && (g as any).chapter) patch.chapter = (g as any).chapter;
      if (t.commonMistake === null && (g as any).commonMistake) patch.commonMistake = (g as any).commonMistake;
      if (t.examples === null && (g as any).examples) patch.examples = JSON.stringify((g as any).examples);
      if (t.exercises === null && (g as any).exercises) patch.exercises = JSON.stringify((g as any).exercises);
      if (Object.keys(patch).length) {
        enriched++;
        await db.update(schema.grammar).set(patch as any).where(eqId(schema.grammar, t.id));
      }
    }

    const inserts: (typeof schema.grammar.$inferInsert)[] = [];
    for (const g of ALL_GRAMMAR) {
      if (byTitle.has(g.title)) continue;
      inserts.push({
        id: uuid(),
        title: g.title,
        level: g.level,
        lesson: g.lesson ?? null,
        chapter: (g as any).chapter ?? null,
        structure: g.structure,
        meaning: g.meaning,
        rule: (g as any).rule ?? null,
        conjugation: (g as any).conjugation ?? null,
        usage: (g as any).usage ?? null,
        commonMistake: (g as any).commonMistake ?? null,
        examples: (g as any).examples ? JSON.stringify((g as any).examples) : null,
        exercises: (g as any).exercises ? JSON.stringify((g as any).exercises) : null,
        explanation: (g as any).rule ?? null,
        exampleJp: (g as any).exampleJp ?? null,
        exampleEn: (g as any).exampleEn ?? null,
        exampleJp2: (g as any).exampleJp2 ?? null,
        exampleEn2: (g as any).exampleEn2 ?? null,
        note: null,
        order: g.order ?? 0,
      });
    }
    await chunkInsert(schema.grammar, inserts as any);

    // Renumber order per level (N5 → N1), sorted by existing order then lesson
    const all = await db.select().from(schema.grammar);
    for (const lvl of LEVELS) {
      const rows = all
        .filter((r) => r.level === lvl)
        .sort((a, b) => a.order - b.order || (a.lesson ?? 0) - (b.lesson ?? 0));
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].order !== i + 1) {
          await db.update(schema.grammar).set({ order: i + 1 }).where(eqId(schema.grammar, rows[i].id));
        }
      }
    }
    const counts: Record<string, number> = {};
    for (const r of all) counts[r.level] = (counts[r.level] ?? 0) + 1;
    console.log(
      `✓ grammar: ${neonRows.length} Neon (${enriched} enriched) + ${inserts.length} new = ${all.length} → ${LEVELS.map((l) => `${l}:${counts[l] ?? 0}`).join(" ")}`,
    );
  }

  // ============ KANJI ============
  {
    const neonRows = await db.select().from(schema.kanji);
    const byChar = new Map(neonRows.map((r) => [r.character, r]));

    let enriched = 0;
    for (const k of ALL_KANJI) {
      const t = byChar.get(k.character);
      if (!t) continue;
      const patch: Record<string, unknown> = {};
      if (t.mnemonic === null && k.mnemonic) patch.mnemonic = k.mnemonic;
      if (t.radical === null && k.radical) patch.radical = k.radical;
      if (t.exampleWord === null && k.exampleWord) patch.exampleWord = k.exampleWord;
      if (t.exampleRead === null && k.exampleRead) patch.exampleRead = k.exampleRead;
      if (t.exampleMean === null && k.exampleMean) patch.exampleMean = k.exampleMean;
      if (t.strokeCount === 0 && k.strokeCount) patch.strokeCount = k.strokeCount;
      if (Object.keys(patch).length) {
        enriched++;
        await db.update(schema.kanji).set(patch as any).where(eqId(schema.kanji, t.id));
      }
    }

    const inserts: (typeof schema.kanji.$inferInsert)[] = [];
    const seen = new Set<string>();
    for (const k of ALL_KANJI) {
      if (seen.has(k.character) || byChar.has(k.character)) continue;
      seen.add(k.character);
      inserts.push({
        id: uuid(),
        character: k.character,
        onyomi: k.onyomi,
        kunyomi: k.kunyomi,
        hanViet: null,
        viMeaning: null,
        meaning: k.meaning,
        level: k.level,
        strokeCount: k.strokeCount ?? 0,
        jlpt: k.level,
        radical: k.radical ?? null,
        mnemonic: k.mnemonic ?? null,
        lesson: null,
        set: null,
        exampleWord: k.exampleWord ?? null,
        exampleRead: k.exampleRead ?? null,
        exampleMean: k.exampleMean ?? null,
        order: k.order ?? 0,
      });
    }
    await chunkInsert(schema.kanji, inserts as any);

    // Recompute per-level order + set (10 per set)
    const all = await db.select().from(schema.kanji);
    for (const lvl of LEVELS) {
      const rows = all
        .filter((r) => r.level === lvl)
        .sort((a, b) => a.order - b.order);
      for (let i = 0; i < rows.length; i++) {
        const newSet = Math.floor(i / 10) + 1;
        if (rows[i].order !== i + 1 || rows[i].set !== newSet) {
          await db
            .update(schema.kanji)
            .set({ order: i + 1, set: newSet })
            .where(eqId(schema.kanji, rows[i].id));
        }
      }
    }
    const counts: Record<string, number> = {};
    for (const r of all) counts[r.level] = (counts[r.level] ?? 0) + 1;
    console.log(
      `✓ kanji: ${neonRows.length} Neon (${enriched} enriched) + ${inserts.length} new = ${all.length} → ${LEVELS.map((l) => `${l}:${counts[l] ?? 0}`).join(" ")}`,
    );
  }

  // ============ COUNTERS + CONJUGATIONS (replace from repo) ============
  {
    await db.delete(schema.counter);
    await chunkInsert(
      schema.counter,
      COUNTERS.map((c) => ({
        id: uuid(),
        kanji: c.kanji,
        reading: c.reading,
        meaning: c.meaning,
        level: c.level,
        one: c.one,
        two: c.two,
        three: c.three,
        four: c.four,
        five: c.five,
        six: c.six,
        seven: c.seven,
        eight: c.eight,
        nine: c.nine,
        ten: c.ten,
        exampleJp: c.exampleJp ?? null,
        exampleEn: c.exampleEn ?? null,
        note: c.note ?? null,
        order: c.order,
      })) as any,
    );
    console.log(`✓ counters: ${COUNTERS.length} rows (replaced)`);

    await db.delete(schema.conjugation);
    await chunkInsert(
      schema.conjugation,
      CONJUGATIONS.map((c) => ({
        id: uuid(),
        verb: c.verb,
        reading: c.reading,
        group: c.group,
        level: c.level,
        meaning: c.meaning,
        dict: c.dict,
        masu: c.masu,
        nai: c.nai,
        ta: c.ta,
        te: c.te,
        potential: c.potential ?? null,
        passive: c.passive ?? null,
        causative: c.causative ?? null,
        volitional: c.volitional ?? null,
        conditional: c.conditional ?? null,
        imperative: c.imperative ?? null,
        order: c.order,
      })) as any,
    );
    console.log(`✓ conjugations: ${CONJUGATIONS.length} rows (replaced)`);
  }

  // ============ RESOURCES (merge by url) ============
  {
    const neonRows = await db.select().from(schema.resource);
    const byUrl = new Set(neonRows.map((r) => r.url));
    let maxOrder = Math.max(0, ...neonRows.map((r) => r.order));
    const inserts: (typeof schema.resource.$inferInsert)[] = [];
    for (const r of YOUTUBE_RESOURCES) {
      if (byUrl.has(r.url)) continue;
      byUrl.add(r.url);
      maxOrder++;
      inserts.push({
        id: uuid(),
        title: r.title,
        url: r.url,
        type: r.type,
        level: r.level,
        topic: r.topic,
        description: r.description,
        order: maxOrder,
      });
    }
    await chunkInsert(schema.resource, inserts as any);
    console.log(`✓ resources: ${neonRows.length} Neon + ${inserts.length} new = ${neonRows.length + inserts.length}`);
  }

  // ============ STATS (add missing keys; never overwrite) ============
  {
    const existing = await db.select().from(schema.stats);
    const keys = new Set(existing.map((s) => s.key));
    if (!keys.has("xp")) {
      await db.insert(schema.stats).values({ id: uuid(), key: "xp", value: 0 });
    }
    if (!keys.has("dailyGoal")) {
      await db.insert(schema.stats).values({ id: uuid(), key: "dailyGoal", value: 20 });
    }
    console.log(`✓ stats keys: ${[...keys, "xp", "dailyGoal"].join(", ")}`);
  }

  console.log("\n✅ Merge complete. Progress tables and users untouched.");
}

// helper: drizzle eq where by id (avoid importing eq everywhere)
import { eq } from "drizzle-orm";
function eqId(table: any, id: string) {
  return eq(table.id, id);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
