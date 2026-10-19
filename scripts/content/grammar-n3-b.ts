/**
 * GRAMMAR_N3_B — original N3 grammar curriculum, part two, for the
 * Nihongo Path learning app. This file fills the N3 gaps that come
 * after the regenerated N5/N4 set (orders 70–97), covering orders 98–125.
 *
 * Coverage (lessons 19–25):
 *  - Cause & Effect (lesson 19): あげく, あまり, おかげで/せいで
 *  - Formal Expressions (lesson 20): 以上, 上に, 一方, 次第, にかかわらず
 *  - Emphasis & Extent (lesson 21): ばかりか, どころか, どころではない,
 *    わけではない, ないことはない
 *  - Tendency & Degree (lesson 22): がち/気味, 向き/向け, わりに,
 *    得る/得ない, かねる
 *  - Emotional Emphasis (lesson 23): ものだ/ものがある, ことか, さえ〜ば,
 *    っぱなし, ついでに
 *  - Compound Particles (lesson 24): について/にとって/において,
 *    に対して/として/に関して, によって, につれて/にしたがって
 *  - Keigo & Register (lesson 25): 尊敬語・謙譲語・丁寧語
 *
 * Each entry has: structure, meaning, a long rule, a conjugation note
 * (with verb-group explanations for verb-form patterns), usage notes,
 * a common mistake warning, 3 example sentences (easy → medium → hard),
 * and 2–3 fill-in-the-blank / multiple-choice exercises.
 *
 * All explanations are 100% original writing in English; examples are in
 * Japanese (kanji + kana), following the style of grammar-content.ts.
 */

// ----------------------------- Type -----------------------------

export type ExpandedGrammarN3 = {
  title: string;
  level: "N3";
  lesson: number;
  chapter: string;
  structure: string;
  meaning: string;
  rule: string;
  conjugation: string;
  usage: string;
  commonMistake: string;
  examples: {
    jp: string;
    en: string;
    difficulty: "easy" | "medium" | "hard";
    note?: string;
  }[];
  exercises: {
    question: string;
    answer: string;
    hint?: string;
    type: "fill-blank" | "multiple-choice";
    options?: string[];
  }[];
  order: number;
};

// --------------------- N3 (Orders 98–125) ---------------------

export const GRAMMAR_N3_B: ExpandedGrammarN3[] = [
  // ===== Order 98 — Lesson 19: Cause & Effect =====
  {
    title: "〜あげく (ageku) — in the end, after much ~ (negative outcome)",
    level: "N3",
    lesson: 19,
    chapter: "Cause & Effect",
    structure: "Verb (ta-form) + あげく / Noun + の + あげく",
    meaning: "after much ~, in the end ~ (an undesired result)",
    rule:
      "あげく presents the final outcome of a long, taxing process. The clause before あげく describes something the subject struggled through — wavering, arguing, searching, agonizing — and the clause after あげく delivers the conclusion of all that effort. Crucially, the outcome is almost always unwelcome: giving up, a broken relationship, a failure. The pattern implies 'after everything was said and done', so it frequently appears with さんざん (thoroughly, to no avail) or 何時間も (for hours on end). A close cousin is 〜末（に）, which states the end result of a process in a neutral, formal tone; あげく carries more emotional exhaustion and is the storytelling choice.",
    conjugation:
      "Verb ta-form + あげく.\n• Ichidan (考える): 考えたあげく (after much deliberation).\n• Godan (迷う): 迷ったあげく (after wavering back and forth).\n• Irregular (する / 来る): したあげく, きたあげく.\nNoun + の + あげく: 口論のあげく (after a quarrel), 苦労のあげく (after much hardship). The masu-form and the dictionary form cannot attach: ✗迷いますあげく / ✗迷うあげく are impossible.",
    usage:
      "あげく sits between spoken narrative and written prose: you will hear it when someone recounts their troubles, and meet it in fiction and essays. It is deliberately emotional — a speaker choosing あげく signals disappointment or resignation about how things turned out. Reserve it for negative outcomes; for neutral or happy endings, 〜末（に） or a plain 〜て、〜 sequence fits better.",
    commonMistake:
      "Attaching anything except the ta-form of a verb or の + noun: ✗「迷うあげく」→ must be ✓「迷ったあげく」. Equally common is using it for a happy result: ✗「努力したあげく、優勝した」→ say ✓「努力の末に、優勝した」, because あげく implies the effort went to waste.",
    examples: [
      { jp: "さんざん迷ったあげく、何も買わずに店を出た。", en: "After wavering forever, I left the shop without buying anything.", difficulty: "easy" },
      {
        jp: "兄と弟は遺産をめぐって口論のあげく、絶交してしまった。",
        en: "After a quarrel over the inheritance, my older and younger brothers cut each other off completely.",
        difficulty: "medium",
        note: "Noun + の + あげく; 〜をめぐって = 'over / concerning (a dispute)'.",
      },
      {
        jp: "労使双方は何度も交渉を重ねたあげく、賃上げの話し合いは決裂に終わった。",
        en: "After repeated rounds of negotiation, the pay talks between labor and management ended in rupture.",
        difficulty: "hard",
        note: "決裂に終わった = 'ended in breakdown'; あげく emphasizes how much effort went to waste.",
      },
    ],
    exercises: [
      {
        question: "さんざん悩んだ______、進学をあきらめることにした。  ('After agonizing over it, I decided to give up on going to college.')",
        answer: "あげく",
        hint: "Ta-form + 'in the end, after much ~'.",
        type: "fill-blank",
      },
      {
        question: "さんざん迷______、結局何も買わなかった。  ('After wavering forever, in the end I bought nothing.')",
        type: "multiple-choice",
        options: ["ったあげく", "うあげく", "ってあげく", "いあげく"],
        answer: "ったあげく",
        hint: "Godan verb 迷う → ta-form before あげく.",
      },
      {
        question: "口論______、二人は絶交してしまった。  ('After the quarrel, the two stopped speaking to each other.')",
        answer: "のあげく",
        hint: "Noun + の + あげく.",
        type: "fill-blank",
      },
    ],
    order: 98,
  },
  // ===== Order 99 — Lesson 19: Cause & Effect =====
  {
    title: "〜あまり (amari) — due to excessive ~ (emotion or dedication)",
    level: "N3",
    lesson: 19,
    chapter: "Cause & Effect",
    structure: "Emotion noun + の + あまり / Verb plain form + あまり / Na-adjective + な + あまり",
    meaning: "out of excessive ~ / so overcome by ~ that (an extreme result)",
    rule:
      "あまり names an EXCESS — a feeling or an effort grown so large that it tips the person into an extreme result. 嬉しさのあまり泣き出した does not merely say someone was happy; it says joy overflowed until tears burst out. The word before あまり is typically an emotion noun (驚き, 悲しみ, 熱心さ), a verb of wholehearted engagement (心配する, 集中する), or a na-adjective such as 真面目 or 不器用. Because the logic is 'too much of X pushed me into Y', the result clause tends to be something regrettable or at least dramatic. Do not confuse this with the beginner-level あまり + negative meaning 'not very': here あまり is a noun meaning 'excess', so it needs の (with nouns) or a plain verb form before it.",
    conjugation:
      "Emotion noun + の + あまり: 驚きのあまり (out of sheer surprise), 悲しみのあまり (overcome with grief).\ni-adjectives convert to the さ-noun first: 嬉しい → 嬉しさのあまり, NOT ✗嬉しいのあまり.\nNa-adjective + な + あまり: 真面目なあまり (from being overly serious).\nVerb plain form + あまり: dictionary form for lasting states, ta-form for one burst — 集中するあまり (from concentrating too hard), 興奮したあまり (in the flush of excitement). Group examples: Ichidan (考える) → 考えるあまり; Godan (頑張る) → 頑張るあまり; Irregular (する) → 没頭するあまり.",
    usage:
      "This is a written-style pattern that still surfaces in elevated speech — formal addresses, memoirs, news commentary. It compresses a cause-and-effect into one breath: 'so overwhelmed by X that Y'. The result clause should match the intensity: 泣き出した, 眠れなかった, 圧倒された — not a mundane little event. If the result is mild, choose ので or てForm instead.",
    commonMistake:
      "Using the i-adjective directly: ✗「嬉しいのあまり」→ convert to the noun: ✓「嬉しさのあまり」. Also pairing it with a mild result: ✗「嬉しさのあまり、少し笑った」→ the result must be extreme: ✓「嬉しさのあまり、泣き出した」.",
    examples: [
      { jp: "嬉しさのあまり、涙が出てしまった。", en: "Out of sheer joy, I burst into tears.", difficulty: "easy" },
      {
        jp: "息子の受験を心配するあまり、母は眠れない日が続いた。",
        en: "So worried was my mother about my son's entrance exams that she went nights without sleep.",
        difficulty: "medium",
        note: "Verb dictionary form + あまり.",
      },
      {
        jp: "記録を更新しようと躍起になるあまり、彼は体を壊し、かえって選手生命を縮める結果となった。",
        en: "So bent on breaking the record was he that he wrecked his body — and ended up shortening his own career instead.",
        difficulty: "hard",
        note: "かえって = 'on the contrary, with the opposite effect'.",
      },
    ],
    exercises: [
      {
        question: "驚き______、しばらく声が出なかった。  ('Out of sheer surprise, I couldn't speak for a while.')",
        answer: "のあまり",
        hint: "Emotion noun + の + あまり.",
        type: "fill-blank",
      },
      {
        question: "嬉し______泣き出した。  ('Out of sheer joy, I burst into tears.')",
        type: "multiple-choice",
        options: ["さのあまり", "いのあまり", "かなあまり", "のであまり"],
        answer: "さのあまり",
        hint: "i-adjective → さ noun, then の + あまり.",
      },
      {
        question: "集中______、周りの声が聞こえなくなった。  ('From concentrating too hard, I stopped hearing the voices around me.')",
        answer: "するあまり",
        hint: "Verb dictionary form + あまり.",
        type: "fill-blank",
      },
    ],
    order: 99,
  },
  // ===== Order 100 — Lesson 19: Cause & Effect =====
  {
    title: "〜おかげで / 〜せいで (okage de / sei de) — thanks to ~ / because of ~ (blame)",
    level: "N3",
    lesson: 19,
    chapter: "Cause & Effect",
    structure: "Plain form + おかげで / せいで (Noun + の + おかげで / せいで)",
    meaning: "thanks to ~ (positive credit) / because of ~ (negative blame)",
    rule:
      "This pair attributes a RESULT to a cause, and the word you choose broadcasts your feelings. おかげで hands out credit: the result was good and you are grateful to the cause — 先生のおかげで合格しました. せいで points the finger: the result was bad and you blame the cause — 寝坊したせいで遅れた. The connecting clause is the plain form (dictionary, ta-form, or nai-form for verbs; plain adjectives; nouns take の). Two refinements: せいか replaces せいで when you only suspect the culprit ('maybe because of ~'), and おかげで can be deployed ironically — あなたのおかげでひどい目に遭ったよ drips sarcasm precisely because the pattern normally expresses gratitude. The sentence-final forms are 〜おかげです / 〜せいです, and 〜せいで blaming complaints are everywhere in daily talk.",
    conjugation:
      "Plain form + おかげで / せいで.\n• Verb: 手伝ってくれたおかげで (thanks to your helping me), 遅れたせいで (because it ran late), 雨が降らなかったおかげで (thanks to it not raining).\n• i-adjective: 天気がよかったおかげで (thanks to the good weather).\n• Noun + の: 先生のおかげで (thanks to my teacher), 渋滞のせいで (because of the traffic jam).\nGroup examples: Ichidan (遅れる) → 遅れたせいで; Godan (降る) → 降らなかったおかげで; Irregular (する) → してくれたおかげで. The masu-form cannot attach: ✗手伝ってくれますおかげで.",
    usage:
      "Both halves are everyday conversation patterns that also appear in writing. おかげで keeps politeness — it thanks someone — while せいで can sound childish if overused, so adults often soften it to せいか or 〜の影響で. The set greeting おかげさまで ('thanks to you, I'm well') is pure formula: use it as the stock reply to お元気ですか.",
    commonMistake:
      "Crossed polarity: ✗「あなたのせいで、合格できました」 blames someone for your success — say ✓「あなたのおかげで、合格できました」. And ✗「渋滞のおかげで遅刻した」 thanks a traffic jam — say ✓「渋滞のせいで遅刻した」 unless you are being sarcastic. Also ✗ masu-form attachment: ✗「手伝ってくれますおかげで」→ plain form ✓「手伝ってくれたおかげで」.",
    examples: [
      { jp: "あなたのおかげで、試験に合格できました。", en: "Thanks to you, I was able to pass the exam.", difficulty: "easy" },
      {
        jp: "電車が遅れたせいで、大事な面接に間に合わなかった。",
        en: "Because the train was delayed, I couldn't make it in time for the important interview.",
        difficulty: "medium",
        note: "Plain ta-form + せいで.",
      },
      {
        jp: "景気の低迷のせいか、以前に比べて夜の人通りがめっきり減ったと言われている。",
        en: "Perhaps because of the lingering economic slump, nighttime foot traffic is said to have dropped sharply compared with before.",
        difficulty: "hard",
        note: "せいか = 'perhaps because of (something bad)' — uncertain blame.",
      },
    ],
    exercises: [
      {
        question: "先生のご指導の______、無事に卒業できました。  ('Thanks to my teacher's guidance, I managed to graduate.')",
        answer: "おかげで",
        hint: "Positive credit — 'thanks to'.",
        type: "fill-blank",
      },
      {
        question: "Choose the particle for blame: 遅刻の______、大会に出られなかった。  ('Because of my being late, I couldn't compete in the tournament.')",
        type: "multiple-choice",
        options: ["せいで", "おかげで", "のに", "は"],
        answer: "せいで",
        hint: "A bad result + blaming tone.",
      },
      {
        question: "夜更かしの______、今朝は頭が痛い。  ('Because I stayed up late, I have a headache this morning.')",
        answer: "せいで",
        hint: "Negative cause — blame it.",
        type: "fill-blank",
      },
    ],
    order: 100,
  },
  // ===== Order 101 — Lesson 20: Formal Expressions =====
  {
    title: "〜以上（は）(ijou wa) — now that / since (commitment follows)",
    level: "N3",
    lesson: 20,
    chapter: "Formal Expressions",
    structure: "Plain form + 以上（は）(Noun / na-adjective + である + 以上)",
    meaning: "now that ~ / since ~ (and therefore one must ~)",
    rule:
      "以上 takes an already-accepted premise and declares that, given it, a strong commitment or conclusion necessarily follows. 引き受けた以上は最後までやる means 'now that I have taken this on, I will see it through' — the premise is fact, and the main clause is the duty that flows from it. Therefore the second half typically carries obligation, determination, or a firm judgment: べきだ, なければならない, つもりだ, ざるを得ない. The clause before 以上 must be something already established as true; it is not an open condition about the future. Two near-synonyms: 〜からには (same logic, slightly more spoken) and 〜上は (even stiffer, used in laws and formal resolutions).",
    conjugation:
      "Plain form + 以上.\n• Verb: 行く以上 (now that I will go), 行った以上 (now that I went), 行かない以上 (as long as I don't go).\n• i-adjective: 状況が厳しい以上 (since the situation is severe), 部屋が狭い以上 (given that the room is small).\n• Na-adjective / Noun: attach である — 静かである以上, 学生である以上; the plain だ cannot be used: ✗学生だ以上.\nPolite endings: 〜以上は〜します / 〜なければなりません.",
    usage:
      "This is 書き言葉 — speeches, editorials, contracts, rules — but it also gives weight to spoken declarations of resolve. It signals that the speaker accepts the premise as binding: no back-out possible. Use it when you want to sound principled rather than merely causal; for a neutral 'because' keep から / ので.",
    commonMistake:
      "Attaching だ to nouns or na-adjectives: ✗「学生だ以上」→ ✓「学生である以上」. Also treating the premise as an open future condition: ✗「雨が降る以上、中止しよう」 (it hasn't rained yet) → use a real conditional ✓「雨が降ったら、中止しよう」, keeping 以上 for accepted facts.",
    examples: [
      { jp: "日本で暮らす以上は、日本のルールを守るべきだ。", en: "Now that I live in Japan, I ought to follow Japan's rules.", difficulty: "easy" },
      {
        jp: "一度引き受けた以上は、最後まで責任を持ちます。",
        en: "Now that I have accepted the job, I will take responsibility to the very end.",
        difficulty: "medium",
        note: "Ta-form + 以上は; the main clause states resolve.",
      },
      {
        jp: "一流選手である以上、結果だけでなく日々の言動まで問われるのは避けられない。",
        en: "Now that one is a top athlete, it is unavoidable that not only results but daily conduct will be called into question.",
        difficulty: "hard",
        note: "Noun + である + 以上; 問われる is the passive of 問う.",
      },
    ],
    exercises: [
      {
        question: "一度約束した______は、どんなことがあっても守るべきだ。  ('Now that I have promised, I should keep it no matter what.')",
        answer: "以上",
        hint: "'Now that ~' — accepted premise.",
        type: "fill-blank",
      },
      {
        question: "学生______以上、校則を守らなければならない。  ('Now that you are a student, you must follow the school rules.')",
        type: "multiple-choice",
        options: ["である", "だ", "の", "な"],
        answer: "である",
        hint: "Nouns attach through である.",
      },
      {
        question: "この会社に入った______は、会社の信用を守るために全力を尽くすつもりです。  ('Now that I have joined this company, I intend to give my all to protect its reputation.')",
        answer: "以上",
        hint: "Ta-form + は.",
        type: "fill-blank",
      },
    ],
    order: 101,
  },
  // ===== Order 102 — Lesson 20: Formal Expressions =====
  {
    title: "〜上（に）(ue ni) — in addition to ~ (formal stacking)",
    level: "N3",
    lesson: 20,
    chapter: "Formal Expressions",
    structure: "Plain form + 上に (Noun + の + 上に / na-adjective + な + 上に)",
    meaning: "in addition to ~ / and on top of that ~",
    rule:
      "上に stacks one item on another of the SAME polarity — both good or both bad — the way English 'not only... but also' or さらに does. このアパートは駅に近い上に、家賃も安い piles one plus on another: near the station AND cheap. The same goes for double minuses: 遅れた上に、忘れ物までした (late AND forgetful). Mixing polarity is the one thing 上に refuses to do: for 'cheap BUT dirty' you need が or のに. The attached clause is the plain form; nouns take の and na-adjectives take な. Do not confuse this with 〜た上で (after doing ~ and then), which looks almost identical but sequences actions instead of stacking facts.",
    conjugation:
      "Plain form + 上に.\n• Verb: 話せる上に、書ける (can speak and, on top of that, write).\n• i-adjective: 安い上に (cheap and, on top of that, ~).\n• Na-adjective + な: 静かな上に (quiet and, on top of that, ~).\n• Noun + の: 金持ちの上に (rich and, on top of that, ~).\nGroup examples: Ichiden (食べられる) → 食べられる上に; Godan (飲む) → 飲めた上に; Irregular (する) → できる上に. Masu-forms are barred: ✗話せます上に.",
    usage:
      "上に is 書き言葉-leaning but entirely acceptable in polite speech; it makes the speaker sound composed and articulate. Casual talk would reach for それに or 〜し. Because it evaluatively piles things up, it is a favorite of reviews, pitches, and complaints — anywhere a list of same-direction facts is being built.",
    commonMistake:
      "Polarity mismatch: ✗「この店はおいしい上に、高い」 (one plus, one minus) → connect them with ✓「おいしいけど、高い」. Also confusing it with 〜た上で: ✗「相談した上に、決めます」→ ✓「相談した上で、決めます」 (after consulting, then decide).",
    examples: [
      { jp: "このアパートは駅に近い上に、家賃も安い。", en: "This apartment is near the station, and on top of that the rent is cheap.", difficulty: "easy" },
      {
        jp: "彼女は英語が上手な上に、中国語も堪能だ。",
        en: "Her English is excellent, and on top of that she is fluent in Chinese too.",
        difficulty: "medium",
        note: "Na-adjective + な + 上に.",
      },
      {
        jp: "新しい支店の候補地は、駅前にあって人通りが多い上に、競合店が近くにないという好条件が揃っていた。",
        en: "The candidate site for the new branch met a fortunate set of conditions: right by the station with heavy foot traffic, and on top of that no rival stores nearby.",
        difficulty: "hard",
        note: "Two stacked pluses; 好条件が揃っていた = 'the favorable conditions were all in place'.",
      },
    ],
    exercises: [
      {
        question: "この店は安い______、量も多い。  ('This shop is cheap and, on top of that, the portions are large.')",
        answer: "上に",
        hint: "Stacking another plus.",
        type: "fill-blank",
      },
      {
        question: "彼は成績がトップクラスである上に、______。  ('On top of top-class grades, he ~.')",
        type: "multiple-choice",
        options: ["スポーツも万能だ", "授業をよくサボる", "試験に落ちた", "遅刻が多い"],
        answer: "スポーツも万能だ",
        hint: "上に requires the same polarity — keep stacking pluses.",
      },
      {
        question: "彼は謝った上に、______。  ('He apologized and, on top of that, ~.')",
        answer: "弁償までしてくれた",
        hint: "Another act in the same (good) direction; まで emphasizes 'even'.",
        type: "fill-blank",
      },
    ],
    order: 102,
  },
  // ===== Order 103 — Lesson 20: Formal Expressions =====
  {
    title: "〜一方（だ）(ippou da) — continuously increasing / on the other hand",
    level: "N3",
    lesson: 20,
    chapter: "Formal Expressions",
    structure: "Verb (dictionary form) + 一方だ / Clause + 一方（で）",
    meaning: "keeps ~ing (change in one direction) / on the other hand (contrast)",
    rule:
      "一方 has two related jobs. (1) One-way change: dictionary verb + 一方だ describes change that keeps rolling in a single direction, usually for the worse — 物価は上がる一方だ (prices just keep climbing), 孤独な老人は増える一方だ. The verb must be a change-of-state verb; the situation is perceived as accelerating or unstoppable, and a following 一方だ makes the whole thing a predicate. (2) Contrast: full clause + 一方（で）juxtaposes two opposing aspects of one situation: 姉は社交的な一方で、妹は引っ込み思案だ (the older sister is outgoing, while the younger one is shy). With では the contrast can even sit inside one person or organization: 熱心に勧める一方で、自分では使わない. The two uses share the core image of 'one direction vs. another direction'.",
    conjugation:
      "Use (1): dictionary form ONLY — 上がる一方だ, 増える一方だ, 悪化する一方だ. Ta-form and nai-form are impossible: ✗上がった一方だ / ✗上がらない一方だ.\nGroup examples: Ichidan (増える) → 増える一方だ; Godan (上がる) → 上がる一方だ; Irregular (する) → 減少する一方だ.\nUse (2): plain clause + 一方（で）: 姉は社交的な一方で…, 輸出は伸びている一方で、内需は低迷している.",
    usage:
      "Both uses belong to the written-formal register: essays, news, business reports. 一方だ frequently teams up with ますます or 最近 to underline unstoppable drift. In conversation people tend to prefer simpler framings such as 〜続ける or ずっと〜ていく, so reach for 一方 when you want an analytic, report-like tone.",
    commonMistake:
      "Attaching anything except the dictionary form in the change use: ✗「忙しくなった一方だ」→ ✓「忙しくなる一方だ」. Also using a non-change verb: ✗「彼は来る一方だ」(coming is not a monotonic change) → say ✓「来る回数は増える一方だ」 if you mean his visits keep multiplying.",
    examples: [
      { jp: "都市の人口は増える一方だ。", en: "The urban population just keeps growing.", difficulty: "easy" },
      {
        jp: "祖父の病状は悪化する一方で、看病する家族は疲れ果てている。",
        en: "My grandfather's condition keeps deteriorating, while the family members nursing him are exhausted.",
        difficulty: "medium",
        note: "Change use in the first clause + contrastive 一方で in the second.",
      },
      {
        jp: "政府は財政健全化を掲げる一方で、景気対策として大型の補正予算を組まずにはいられないという矛盾を抱えている。",
        en: "The government advocates fiscal discipline, while at the same time it cannot help compiling a large supplementary budget as an economic stimulus — a contradiction it carries.",
        difficulty: "hard",
        note: "〜ずにはいられない = 'cannot resist doing ~'.",
      },
    ],
    exercises: [
      {
        question: "少子化は進む______だ。  ('The declining birthrate keeps advancing.')",
        answer: "一方",
        hint: "Dictionary form + one-way change.",
        type: "fill-blank",
      },
      {
        question: "仕事は忙しくなる______。  ('Work keeps getting busier and busier.')",
        type: "multiple-choice",
        options: ["一方だ", "一方だった", "一方でだった", "一方ない"],
        answer: "一方だ",
        hint: "Change-in-one-direction: dictionary form + 一方だ.",
      },
      {
        question: "輸出は伸びている______で、内需は低迷している。  ('Exports are expanding, while domestic demand stays sluggish.')",
        answer: "一方",
        hint: "Contrast use: clause + 一方で.",
        type: "fill-blank",
      },
    ],
    order: 103,
  },
  // ===== Order 104 — Lesson 20: Formal Expressions =====
  {
    title: "〜次第 (shidai) — as soon as / depending on (two uses)",
    level: "N3",
    lesson: 20,
    chapter: "Formal Expressions",
    structure: "Verb (masu-stem) + 次第 / Noun + 次第（で）",
    meaning: "as soon as ~ (prompt action) / depending on ~ (it hinges on N)",
    rule:
      "次第 wears two faces, and telling them apart is the whole game. (1) As soon as: attach 次第 to the masu-stem of a verb and follow with the action you will take the moment the trigger occurs — 詳細が分かり次第、お知らせします (the moment we know the details, we will inform you). This use lives almost exclusively in business mail and announcements; the verb after 次第 must be the speaker's own immediate action, and the sentence cannot be put into the past. (2) Depending on: attach 次第（で）directly to a noun to say the outcome hinges on it — 君次第だ (it's up to you), 天候次第で中止になるかもしれない (depending on the weather, it may be canceled). Here the speaker hands the contingency over to that noun, often with かどうか (行くかどうかは気分次第だ) or 結果次第では for 'depending on how it turns out, (possibly bad)'. Same kanji, two grammars — check what comes before it.",
    conjugation:
      "Use (1): masu-stem + 次第.\n• Ichidan (見る): 見次第 → in practice 見つかり次第 (as soon as it is found).\n• Godan (動く): 動き次第 (as soon as it moves).\n• Irregular (する / 来る): し次第 — 確認し次第 (as soon as I confirm); 来次第 (as soon as he comes; read き次第).\nThe masu-form itself, dictionary form, and te-form are all barred: ✗分かります次第 / ✗分かる次第 / ✗分かって次第.\nUse (2): Noun + 次第（で）: 結果次第, 天候次第, 努力次第. No particle in between, and verbs must be nominalized first.",
    usage:
      "Use (1) is 書き言葉 through and through — order confirmations, reception desks, apology mails: it promises light-speed responsiveness and sounds professional precisely because it is stiff. Use (2) ranges from essays (成功は準備次第だ) right down to casual speech (「行くかどうかは、君次第だよ」), so it is the everyday half of the pair. Note 次第です/次第です politeness at sentence end (このような次第です = 'that is how things stand').",
    commonMistake:
      "Use (1) slip-ups: ✗「分かりました次第」 and ✗「分かる次第、連絡します」→ the masu-stem is obligatory: ✓「分かり次第、連絡します」. Also letting a non-action follow: ✗「雨が降り次第、中止します」 (rain falling is not your trigger to control) → say ✓「雨が降ったら中止します」. And never confuse にかかわらず-style pairs with use (2)'s single-noun 次第.",
    examples: [
      { jp: "詳しい状況が分かり次第、こちらからご連絡いたします。", en: "As soon as we understand the detailed situation, we will contact you from our side.", difficulty: "easy" },
      {
        jp: "明日の遠足は、天候次第で中止になるかもしれません。",
        en: "Tomorrow's excursion might be canceled, depending on the weather.",
        difficulty: "medium",
        note: "Noun + 次第で = 'depending on N'.",
      },
      {
        jp: "面接の結果につきましては、選考が終わり次第、メールにてご本人に直接お伝えいたします。",
        en: "As for the interview results, we will inform the applicants directly by email as soon as the selection process is complete.",
        difficulty: "hard",
        note: "Typical business-mail phrasing: 終わり次第 (as soon as it ends) + にて (by means of).",
      },
    ],
    exercises: [
      {
        question: "荷物が届き______、こちらからご連絡差し上げます。  ('As soon as the parcel arrives, we will contact you.')",
        answer: "次第",
        hint: "Masu-stem + 'as soon as'.",
        type: "fill-blank",
      },
      {
        question: "この試合に勝てるかどうかは、君の努力______だ。  ('Whether you can win this match is up to your effort.')",
        type: "multiple-choice",
        options: ["次第", "以上", "一方", "上に"],
        answer: "次第",
        hint: "Noun + ___ = 'depending on / up to'.",
      },
      {
        question: "新人の育成は、本人のやる気______で大きく変わる。  ('Training new staff changes greatly depending on their motivation.')",
        answer: "次第",
        hint: "Noun + ___（で）= 'depending on N'.",
        type: "fill-blank",
      },
    ],
    order: 104,
  },
  // ===== Order 105 — Lesson 20: Formal Expressions =====
  {
    title: "〜にかかわらず / 〜にかかわりなく (ni kakawarazu) — regardless of",
    level: "N3",
    lesson: 20,
    chapter: "Formal Expressions",
    structure: "Noun (opposite pair / alternatives) + にかかわらず・にかかわりなく",
    meaning: "regardless of ~ / no matter whether ~",
    rule:
      "にかかわらず declares that the outcome is unaffected by the variable that precedes it. The catch is what may precede it: normally a PAIR of opposites or a set of alternatives that covers the whole space — 昼夜にかかわらず (day or night), 天候にかかわらず (whatever the weather), 行くか行かないかにかかわらず (whether you go or not). Because the pattern needs a covering set, you cannot hang it on one single condition: ✗雨にかかわらず must become 雨天かどうかにかかわらず or 天候にかかわらず. にかかわりなく is a stiffer written twin, and the casual cousin is 〜（が）関係なく. Keep this strictly apart from 〜にもかかわらず (despite / even though), which looks like a sibling but expresses concession about one concrete circumstance, not indifference to a range.",
    conjugation:
      "Noun (often opposite pairs) + にかかわらず / にかかわりなく: 昼夜・男女・有無・天候・結果 にかかわらず.\nVerb plain + か + にかかわらず: 行くか行かないかにかかわらず (whether or not one goes).\ni-adjective pairs: 多い少ないにかかわらず (whether there are many or few).\nQuestion-alternative pairs: 賛成か反対かにかかわらず (whether for or against).\nThere is no verb direct attachment and no masu-form: ✗行きますにかかわらず.",
    usage:
      "This is the register of notices, rules, terms, and formal declarations — 会社にかかわらず採用… is the tone of public announcements. In friendly conversation 関係なく does the same job with none of the starch. When you want the 'no matter what' promise to sound official (応募資格：国籍にかかわらず), this is the go-to pattern.",
    commonMistake:
      "Attaching it to a single condition noun: ✗「雨にかかわらず開催します」→ say ✓「天候にかかわらず開催します」 or ✓「雨が降っても降らなくても開催します」. And confusing it with the concessive sibling: 「悪天候にもかかわらず」 is correct for 'despite the bad weather', but ✗「悪天候にかかわらず」 for that meaning is wrong — にかかわらず is 'regardless of a range', にもかかわらず is 'despite this one obstacle'.",
    examples: [
      { jp: "天候にかかわらず、試合は予定通り行われます。", en: "The match will be held as scheduled regardless of the weather.", difficulty: "easy" },
      {
        jp: "経験の有無にかかわらず、意欲のある方ならどなたでも歓迎します。",
        en: "Regardless of whether you have experience, anyone with motivation is welcome.",
        difficulty: "medium",
        note: "有無 = 'presence or absence' — a classic opposite-pair noun.",
      },
      {
        jp: "この奨学金は、性別や国籍にかかわりなく、優れた研究計画を有する学生すべてに開かれている。",
        en: "This scholarship is open to all students with an outstanding research plan, regardless of gender or nationality.",
        difficulty: "hard",
        note: "にかかわりなく = the more formal written variant; を有する is stiff 'possessing'.",
      },
    ],
    exercises: [
      {
        question: "昼夜______、この店は営業している。  ('This shop stays open regardless of day or night.')",
        answer: "にかかわらず",
        hint: "Opposite-pair noun + 'regardless of'.",
        type: "fill-blank",
      },
      {
        question: "Which noun can directly precede にかかわらず to mean 'regardless of ~'?",
        type: "multiple-choice",
        options: ["天候", "雨", "晴れ", "曇り"],
        answer: "天候",
        hint: "The noun must cover a whole range, not name one single condition.",
      },
      {
        question: "賛成か反対か______、意見を述べる権利は平等だ。  ('Regardless of whether one is for or against, the right to state an opinion is equal.')",
        answer: "にかかわらず",
        hint: "Alternative pair + か + 'regardless of'.",
        type: "fill-blank",
      },
    ],
    order: 105,
  },
  // ===== Order 106 — Lesson 21: Emphasis & Extent =====
  {
    title: "〜ばかりか (bakari ka) — not only ~ but even ~",
    level: "N3",
    lesson: 21,
    chapter: "Emphasis & Extent",
    structure: "Plain form + ばかりか (Noun + ばかりか / na-adjective + な + ばかりか)",
    meaning: "not only ~ but also / and what is more, even ~",
    rule:
      "ばかりか presents the first item as merely the starting point and announces something even bigger — better, worse, or more surprising — on top of it. 彼は日本語ばかりか、ギリシャ語まで話す does not just list two languages; it escalates from an already impressive baseline to a jaw-dropper. The second clause therefore usually carries まで, も, or さえ to underline the escalation, and unlike 〜上に it is perfectly happy in emotive, dramatic contexts. The direction can be positive or negative: 遅れたばかりか、財布までなくした (not only late — even lost my wallet). A softer neutral sibling is 〜ばかりでなく ('not only... but also'), while 〜どころか is a different beast: it refutes the first item rather than stacking onto it.",
    conjugation:
      "Plain form + ばかりか.\n• Verb: 泣くばかりか / 泣いたばかりか (not only crying / not only did he cry).\n• i-adjective: 寒いばかりか (not only cold).\n• Na-adjective + な: 元気なばかりか (not only energetic).\n• Noun: 学生ばかりか (not only students), 日本語ばかりか (not only Japanese).\nGroup examples: Ichidan (食べる) → 食べるばかりか; Godan (飲む) → 飲むばかりか; Irregular (する) → するばかりか. Masu-form is barred: ✗食べますばかりか.",
    usage:
      "ばかりか has a formal, slightly literary flavor — speeches, essays, indignant reports — but it slips into emphatic conversation as well. It out-performs ばかりでなく whenever you want surprise rather than mere addition. Pair it with まで for the sharpest 'not just X — even Y!' edge; without まで/も/さえ in the second clause the pattern loses most of its force.",
    commonMistake:
      "Attaching masu-forms: ✗「行きますばかりか」→ plain form ✓「行くばかりか」. Also bleeding in the limit meaning of plain ばかり (only / nothing but): ✗「彼は忙しいばかりか」 intended as 'he is ONLY busy' makes no sense — ばかりか escalates beyond the first item, it never restricts to it.",
    examples: [
      { jp: "彼は日本語ばかりか、アラビア語まで話せる。", en: "Not only Japanese — he can even speak Arabic.", difficulty: "easy" },
      {
        jp: "その火事は地元ばかりか、全国のニュースでも大きく取り上げられた。",
        en: "That fire was covered heavily not only locally but on national news as well.",
        difficulty: "medium",
        note: "Noun + ばかりか + でも: 'not only ~ but even in ~'.",
      },
      {
        jp: "その新人は言葉遣いが乱暴なばかりか、客先との約束を平気で破る始末で、上司は毎日謝罪に追われている。",
        en: "Not only is that new hire's language rough — he breaks promises with clients without a second thought, to the point where his boss is chasing apologies every single day.",
        difficulty: "hard",
        note: "〜始末だ = '(it has reached the point) of doing ~' — an N3-level add-on that sharpens the complaint.",
      },
    ],
    exercises: [
      {
        question: "彼女は英語ばかりか、フランス語______話せる。  ('Not only English — she can even speak French.')",
        answer: "まで",
        hint: "The escalation particle that follows ばかりか.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct attachment for the Ichidan verb 食べる + ばかりか:",
        type: "multiple-choice",
        options: ["食べるばかりか", "食べますばかりか", "食べてばかりか", "食べったばかりか"],
        answer: "食べるばかりか",
        hint: "ばかりか takes the plain (dictionary) form.",
      },
      {
        question: "値段が高いばかりか、______。  ('Not only is the price high, but ~.')",
        answer: "量まで少ない",
        hint: "Keep escalating in the same (bad) direction; まで = 'even'.",
        type: "fill-blank",
      },
    ],
    order: 106,
  },
  // ===== Order 107 — Lesson 21: Emphasis & Extent =====
  {
    title: "〜どころか (dokoro ka) — far from ~ (contrary to expectation)",
    level: "N3",
    lesson: 21,
    chapter: "Emphasis & Extent",
    structure: "Noun / plain form + どころか",
    meaning: "far from ~ / not only is it not ~, but on the contrary ~",
    rule:
      "どころか takes the item everyone expected and knocks it flat, then replaces it with the truth — which is either the exact opposite or something astonishingly beyond. 彼は漢字どころか、ひらがなも書けない does not add hiragana to kanji; it cancels the assumed kanji and then digs lower than anyone imagined. The second clause typically carries も, さえ, or まで with a negative predicate (遅れるどころか、来さえしなかった), or it states the reversed direction (下がるどころか、上がった). The clause before どころか is always the listener's expectation being refuted, so the pattern bristles with a sense of 'you thought so? not even close'. Contrast this with ばかりか, which piles more onto a confirmed fact instead of denying it.",
    conjugation:
      "Plain form / noun + どころか.\n• Verb: 休むどころか (far from resting), 行ったどころか (far from having gone).\n• i-adjective: 安いどころか (far from cheap).\n• Na-adjective stem: 元気どころか (far from being well) — na-adjectives attach directly like nouns.\n• Noun: 漢字どころか (far from kanji), 学生どころか (far from a student).\nGroup examples: Ichidan (食べる) → 食べるどころか; Godan (読む) → 読むどころか; Irregular (する) → するどころか. Masu-forms are barred: ✗食べますどころか.",
    usage:
      "どころか works in both speech and writing whenever indignation or surprise needs arming: complaints, debate comebacks, wide-eyed reports. It is stronger and more adversarial than ばかりでなく, and its refuting punch depends on the second clause staying beyond or opposite the first — once the second clause merely confirms the first, you have chosen the wrong pattern.",
    commonMistake:
      "Using it to stack same-direction facts: ✗「日本語どころか、中国語も話せる」 (he really does speak Japanese, and Chinese as well) → that is escalation, so use ✓「日本語ばかりか、中国語も話せる」. Also ✗ masu-form attachment: ✗「休みますどころか」→ ✓「休むどころか」.",
    examples: [
      { jp: "忙しくて、休むどころか、食事をする時間もない。", en: "I'm so busy that far from resting, I don't even have time to eat.", difficulty: "easy" },
      {
        jp: "彼は謝るどころか、こちらに文句を言い返してきた。",
        en: "Far from apologizing, he actually came back at me with complaints.",
        difficulty: "medium",
        note: "The expected apology is refuted; 言い返す = to talk back.",
      },
      {
        jp: "物価は落ち着くどころか、エネルギー価格の高騰をきっかけに上昇に転じた。",
        en: "Far from settling down, prices switched to rising, triggered by the surge in energy costs.",
        difficulty: "hard",
        note: "Reversed-direction use: the expectation (falling/steady) flips into its opposite.",
      },
    ],
    exercises: [
      {
        question: "この夏は涼しい______か、猛暑日が記録的に続いた。  ('Far from cool, this summer saw a record run of scorching days.')",
        answer: "どころ",
        hint: "___か refutes the expectation.",
        type: "fill-blank",
      },
      {
        question: "漢字どころか、______。  ('Far from kanji, ~.')",
        type: "multiple-choice",
        options: ["ひらがなも書けない", "英語も話せる", "数学も得意だ", "字がとてもきれいだ"],
        answer: "ひらがなも書けない",
        hint: "The continuation must go below or against the refuted item.",
      },
      {
        question: "彼は寝る______か、徹夜でレポートを書き続けた。  ('Far from sleeping, he kept writing his report through the night.')",
        answer: "どころ",
        hint: "Verb dictionary form + ___か.",
        type: "fill-blank",
      },
    ],
    order: 107,
  },
  // ===== Order 108 — Lesson 21: Emphasis & Extent =====
  {
    title: "〜どころではない (dokoro dewa nai) — can't afford to / no time for ~",
    level: "N3",
    lesson: 21,
    chapter: "Emphasis & Extent",
    structure: "Noun + どころではない / Verb (dictionary form) + どころではない",
    meaning: "there's no question of ~ / can't afford the time or state of mind for ~",
    rule:
      "どころではない dismisses the named activity as completely out of the question because circumstances — a crunch, a crisis, a shattered budget — leave no room for it. この忙しさでは、旅行どころではない says that travel is not merely inconvenient but unthinkable right now. The reason is stated in the surrounding sentence or understood from context, and the pattern is inherently negative and immediate: it describes the present squeeze, not a general dislike. For past narration the copula tenses: もう花見どころではなかった. The casual form is どころじゃない. Compare 〜どころか, which refutes an expectation; here the whole idea is waved off as a luxury no one can afford.",
    conjugation:
      "Noun + どころではない: 勉強どころではない (studying? out of the question), 花見どころじゃない (blossom-viewing? forget it).\nVerb dictionary form + どころではない: 遊ぶどころではない (no question of playing).\nGroup examples: Ichidan (寝る) → 寝るどころではない; Godan (遊ぶ) → 遊ぶどころではない; Irregular (する) → するどころではない.\nTa-forms and masu-forms do not attach: ✗遊んだどころではない / ✗遊びますどころではない. Polite: どころではありません; past: どころではなかった; casual: どころじゃない.",
    usage:
      "Spoken and exclamatory by nature — the phrase of someone drowning in work or shock. You will hear it in commiseration (「今それどころじゃないよ」) and in reported speech about hard times; it also appears in essays describing an era's mood. The tone is blunt but not rude: it rejects the activity, not the person who suggested it.",
    commonMistake:
      "Attaching a ta-form: ✗「遊んだどころではない」→ dictionary form ✓「遊ぶどころではない」. Also mistaking it for a dislike statement: ✗「納豆は食べるどころではない」 to mean 'I hate natto' — the pattern means 'no bandwidth for it right now', so say ✓「納豆は大嫌いだ」 for hatred.",
    examples: [
      { jp: "今週は試験続きで、遊ぶどころではない。", en: "With one exam after another this week, there's no question of going out to play.", difficulty: "easy" },
      {
        jp: "引っ越しの片付けで大忙しで、花見どころではなかった。",
        en: "I was run off my feet settling into the new place — blossom-viewing was the last thing on earth I had time for.",
        difficulty: "medium",
        note: "Past narration tenses the copula: どころではなかった.",
      },
      {
        jp: "予算を削減された部署では、新規事業どころではなく、既存の事業を維持できるかどうかが問われている。",
        en: "In departments whose budgets were cut, launching new ventures is out of the question — the real question is whether the existing operations can even be maintained.",
        difficulty: "hard",
        note: "どころではなく links into a longer sentence; 問われている = 'is being called into question'.",
      },
    ],
    exercises: [
      {
        question: "こんなに忙しいのに、正月______ではない。  ('Busy as I am, New Year's festivities are out of the question.')",
        answer: "どころ",
        hint: "Noun + ___ではない = 'no question of ~'.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct attachment using the verb 寝る (to sleep):",
        type: "multiple-choice",
        options: ["寝るどころではない", "寝たどころではない", "寝ますどころではない", "寝てどころではない"],
        answer: "寝るどころではない",
        hint: "どころではない attaches to nouns or verb dictionary forms only.",
      },
      {
        question: "今月は出張が続いて、家族旅行______じゃなかった。  ('With business trips one after another this month, a family trip was simply not happening.')",
        answer: "どころ",
        hint: "Casual past form: ___じゃなかった.",
        type: "fill-blank",
      },
    ],
    order: 108,
  },
  // ===== Order 109 — Lesson 21: Emphasis & Extent =====
  {
    title: "〜わけではない (wake dewa nai) — it's not that ~ (partial denial)",
    level: "N3",
    lesson: 21,
    chapter: "Emphasis & Extent",
    structure: "Plain form + わけではない (Noun / na-adjective + な・という + わけではない)",
    meaning: "it's not that ~ / it doesn't necessarily mean that ~",
    rule:
      "わけではない performs partial denial. It does not reject the whole statement — it corrects an over-broad reading of it. お酒が嫌いなわけではない。ただ、今日は運転するのだ concedes the surface (declining a drink) while blocking the wrong conclusion (that you hate alcohol). It is the tool for nuance: だからといって、全部が嫌いなわけではない — 'that said, it's not that I dislike all of it'. Three look-alikes must be kept apart: 〜わけがない (there's no way that ~: total denial of likelihood), 〜わけだ (that's why / naturally: confirmation), and 〜わけにはいかない (can't afford to). わけではない also softens generalizations when paired with みんな・必ずしも・全部: 必ずしも高いものがおいしいわけではない.",
    conjugation:
      "Plain form + わけではない.\n• Verb: 行くわけではない / 行ったわけではない / 行かないわけではない (it's not that I won't go — a partial yes).\n• i-adjective: 高いわけではない (it's not that it's expensive).\n• Na-adjective + な / という: 便利なわけではない, 便利というわけではない.\n• Noun + な / という: 学生なわけではない, 学生というわけではない — the という version is safer and very common.\nPolite: わけではありません; casual: わけじゃない. Masu-forms are barred: ✗行きますわけではない.",
    usage:
      "This is the workhorse of interviews, essays, and careful conversation — anywhere a speaker needs to deny an inference without denying the facts. It frequently follows からといって or というものの to first concede, then trim. English equivalents: 'it's not that ~', 'that doesn't mean ~', 'not necessarily ~'.",
    commonMistake:
      "Confusing it with 〜わけがない: 「彼が嘘をつくわけではない」 means 'it's not that he never lies' (partial denial), but 'there's no way he'd lie' must be ✓「彼が嘘をつくわけがない」. Also ✗ masu-form: ✗「行きますわけではない」→ ✓「行くわけではない」.",
    examples: [
      { jp: "高いものが必ずしもおいしいわけではない。", en: "It's not necessarily the case that expensive things taste good.", difficulty: "easy" },
      {
        jp: "ビールが嫌いなわけではない。ただ、明日も早いから控えているだけだ。",
        en: "It's not that I dislike beer. I'm just holding back because tomorrow is an early day too.",
        difficulty: "medium",
        note: "ただ = 'it's just that ~' — the classic partner for partial denial.",
      },
      {
        jp: "私が転職をためらっているのは、今の仕事が嫌いなわけではない。むしろ、任された責任を簡単には手放せないと感じているからだ。",
        en: "The reason I hesitate to change jobs is not that I dislike my current work — if anything, it's that I feel I cannot simply let go of the responsibility I have been entrusted with.",
        difficulty: "hard",
        note: "むしろ = 'rather / if anything', pivoting from denial to the real reason.",
      },
    ],
    exercises: [
      {
        question: "お酒が飲めない______。今日は車を運転するのだ。  ('It's not that I can't drink. I'm driving today.')",
        answer: "わけではない",
        hint: "Partial denial of the inference.",
        type: "fill-blank",
      },
      {
        question: "甘いものが嫌いなわけではない。______。  ('It's not that I dislike sweets. ~.')",
        type: "multiple-choice",
        options: ["ただ、今ダイエット中なんだ", "絶対に食べない", "大嫌いなんだ", "毎日ケーキを食べる"],
        answer: "ただ、今ダイエット中なんだ",
        hint: "After a partial denial, give the true, narrower reason.",
      },
      {
        question: "努力すれば必ず成功する______。  ('It's not necessarily true that effort guarantees success.')",
        answer: "わけではない",
        hint: "必ず + partial denial.",
        type: "fill-blank",
      },
    ],
    order: 109,
  },
  // ===== Order 110 — Lesson 21: Emphasis & Extent =====
  {
    title: "〜ないことはない (nai koto wa nai) — it's not that I can't ~ (double-negative softening)",
    level: "N3",
    lesson: 21,
    chapter: "Emphasis & Extent",
    structure: "Verb (nai-form) + ことはない / ないことはない",
    meaning: "it's not that ~ is impossible — it could be done, if need be",
    rule:
      "This double negative stops one step short of a plain yes. 行かないことはない does not announce 'I'm going'; it quietly unlocks the door: 'it's not that I won't go — I would, if it mattered'. Japanese uses it to hedge willingness, capability, or quality without committing: おいしくないことはない (it's not that it isn't tasty — it's passable), 分からないことはない (I can more or less follow). The tone is often grudging or conditional, and a follow-up clause with が / ただ / ものの frequently pulls back toward reservation: 買わないことはないが、もう少し考えたい. Do not confuse it with its single-negation sibling 〜ことはない, which means 'there is no need to ~' — one ない changes everything.",
    conjugation:
      "Verb nai-form + ことはない.\n• Ichidan (食べる): 食べないことはない (it's not that I couldn't eat it).\n• Godan (飲む): 飲まないことはない (it's not that I won't drink it).\n• Irregular (する / 来る): しないことはない, 来ないことはない.\ni-adjective negative + ことはない: おいしくないことはない (not that it isn't good).\nThe softer variant 〜ないこともない is interchangeable and even more hedged. ✗ masu-form: ✗食べませんことはない.",
    usage:
      "Conversational and business-safe hedging: negotiation (この条件なら、受けられないこともないです), tactful opinions, half-hearted praise. It lets the speaker signal flexibility while saving face on both sides. In stiff writing you are more likely to meet 〜ないわけではない, which shares the softening job.",
    commonMistake:
      "Mixing it up with 〜ことはない (no need to): 心配することはない means 'there's no need to worry', while 心配しないことはない means 'it's not that I'm not worried — I am, a little'. Also ✗ attaching anything except the nai-form: ✗「行くことはない」 when you mean the double-negative 'could go if needed' must be ✓「行かないことはない」.",
    examples: [
      { jp: "手伝わないことはないよ。ただ、今日は別の約束があるんだ。", en: "It's not that I won't help you out. It's just that I have another commitment today.", difficulty: "easy" },
      {
        jp: "この値段なら、買わないこともないですね。",
        en: "At this price, well — it's not that I couldn't buy it.",
        difficulty: "medium",
        note: "The こともない variant softens the hedge even further.",
      },
      {
        jp: "賛成しないことはないが、この計画には再考すべき点が少なからずある。",
        en: "It's not that I'm opposed — but this plan has more than a few points that deserve reconsideration.",
        difficulty: "hard",
        note: "少なからず = 'not a few, quite a number of' — another double-negative idiom.",
      },
    ],
    exercises: [
      {
        question: "今からでも行け______ことはない。  ('It's not that I couldn't still go.')",
        answer: "ない",
        hint: "Potential nai-form of 行ける + ことはない.",
        type: "fill-blank",
      },
      {
        question: "心配______ことはない。  (= 'There is no need to worry.')",
        type: "multiple-choice",
        options: ["する", "しない", "した", "しなかった"],
        answer: "する",
        hint: "Single-negation 〜ことはない = 'no need to ~' (plain verb attaches).",
      },
      {
        question: "その提案に反対______ことはないが、予算の裏付けが欲しい。  ('It's not that I oppose the proposal, but I want the budget to back it up.')",
        answer: "しない",
        hint: "Double-negative softening: nai-form of する + ことはない.",
        type: "fill-blank",
      },
    ],
    order: 110,
  },
  // ===== Order 111 — Lesson 22: Tendency & Degree =====
  {
    title: "〜がち / 〜気味 (gachi / gimi) — prone to (bad habit) / slightly (a touch of a state)",
    level: "N3",
    lesson: 22,
    chapter: "Tendency & Degree",
    structure: "Verb (masu-stem) / Noun + がち・気味",
    meaning: "tends to (an unwanted habit) / has a touch of (a current sign or feeling)",
    rule:
      "Two look-alike suffixes, two different time-scales. がち marks a RECURRING tendency you would rather not have: 忘れがち (prone to forgetting), 休みがち (often absent), 病気がち (sickly). It evaluates a pattern of behavior over months — habitual, structural, and negative. 気味 marks a DEGREE of a present state, a hint of something brewing right now: 風邪気味 (feeling the onset of a cold), 太り気味 (a touch overweight), 遅れ気味 (running slightly behind). It reads a current sign, often on yourself or a schedule, and — like がち — defaults to the undesirable. Because they are nouns, both take だ / です / な and can modify nouns (忘れがちな人, 風邪気味の人). In short: がち = 'keeps happening', 気味 = 'a bit ~ at the moment'.",
    conjugation:
      "Verb masu-stem + がち / 気味.\n• Ichidan (忘れる): 忘れがち (prone to forgetting); 遅れる → 遅れ気味 (running a bit late).\n• Godan (抜く): 抜きがち (apt to skip), 休む → 休みがち.\n• Irregular (する): しがち (apt to do ~); 来る → 来がち is rare — nouns do the work.\nNoun + がち: 病気がち (sickly), 遠慮がち (overly reserved). Noun + 気味: 風邪気味, 太り気味, 遅れ気味, かたより気味 (a sign of bias).\n✗ Masu-forms and dictionary forms: ✗忘れますがち / ✗忘れるがち.",
    usage:
      "がち thrives in advice columns, health writing, and self-improvement talk — 冬は運動不足になりがちだ — because it names habits worth fixing. 気味 is everyday self-reporting: you tell a colleague 風邪気味だから早退します. Both attach almost exclusively to negative notions; praising someone's good habit with がち sounds ironic at best. 書き言葉-leaning, but fully at home in polite conversation.",
    commonMistake:
      "Swapping them: ✗「風邪がち」 for the oncoming cold — the set phrase is ✓「風邪気味」; and ✗「彼は忘れ気味だ」 for a chronic habit → ✓「彼は忘れがちだ」. Also using them for positives: ✗「彼は優れがちだ」— がち・気味 are for tendencies and states you would rather not have.",
    examples: [
      { jp: "忙しいと、食事が不規則になりがちだ。", en: "When you're busy, mealtimes tend to become irregular.", difficulty: "easy" },
      {
        jp: "最近少し太り気味なので、駅まで歩くことにした。",
        en: "I've been feeling a touch overweight lately, so I've decided to walk to the station.",
        difficulty: "medium",
        note: "気味 reads the current degree of a state — not a habit.",
      },
      {
        jp: "高齢者の単独世帯は、体調の変化を伝える相手がいないだけに、異変に気づかれるのが遅れがちだ。",
        en: "Elderly people living alone tend to have signs of health trouble noticed late — precisely because they have no one to tell about the changes they feel.",
        difficulty: "hard",
        note: "だけに = 'precisely because'; 遅れがち here means the noticing tends to lag.",
      },
    ],
    exercises: [
      {
        question: "冬は運動不足になり______だ。  ('In winter one tends to become short on exercise.')",
        answer: "がち",
        hint: "Recurring unwanted tendency.",
        type: "fill-blank",
      },
      {
        question: "今日はちょっと風邪______だから、早めに帰るね。  ('I'm feeling a bit like I'm catching a cold today, so I'll head home early.')",
        type: "multiple-choice",
        options: ["気味", "がち", "っぽい", "そう"],
        answer: "気味",
        hint: "A current mild sign of a state — not a recurring habit.",
      },
      {
        question: "締め切り前は、徹夜になり______だから気をつけなさい。  ('Before deadlines one tends to fall into all-nighters, so watch out.')",
        answer: "がち",
        hint: "Habitual negative tendency.",
        type: "fill-blank",
      },
    ],
    order: 111,
  },
  // ===== Order 112 — Lesson 22: Tendency & Degree =====
  {
    title: "〜向き / 〜向け (muki / muke) — suited for (nature) / aimed at (intended audience)",
    level: "N3",
    lesson: 22,
    chapter: "Tendency & Degree",
    structure: "Noun + 向き / Noun + 向け",
    meaning: "suited to ~ (fits by nature) / aimed at ~ (designed with an audience in mind)",
    rule:
      "Two kanji, two logics. 向き judges FIT: the thing happens to suit that kind of user — このコースは初心者向きだ (this course is well suited to beginners, judging by its gentle pace). Nobody designed the fit; the speaker evaluates it. 向け declares INTENT: someone built the thing for that audience on purpose — 初心者向けの教科書 (a textbook made for beginners), 女性向けの雑誌 (a magazine targeted at women). The producer's aim is baked into 向け, while 向き remains the reviewer's judgment. They behave as na-adjectives: 向きだ / 向きな人, 向けだ / 向けのアプリ. When you praise a natural match, 向き; when you describe targeting, 向け — and a product can be 向け-built yet not 向き-suit you at all.",
    conjugation:
      "Noun + 向き / 向け directly: 初心者向き, 初心者向け; 子供向き, 子供向け; 女性向け; 上級者向け.\nBoth form na-adjectives: 初心者向きだ (it suits beginners), 初心者向けだ (it is aimed at beginners), 子供向けのアプリ (an app for children).\nVerbs do not attach directly — turn the idea into a noun first: 読書向けのカフェ (a café intended for reading), 勉強向きの机 (a desk that suits studying).\n〜向きに / 〜向けに adverbial uses: 子供向けに書く (write it for children), 初心者向きに作る is less standard — prefer 向け for production intent.",
    usage:
      "Product reviews, marketing copy, syllabus descriptions — anywhere audiences get sorted. 向け dominates ads and packaging because sellers love declaring intent; 向き dominates advice and reviews because advisors judge fit. In casual speech you will hear both in the pattern 「これはどちら向き？」. Note 〜向きの家 (a house facing ~) is a different, directional 向き — house listings exploit it constantly.",
    commonMistake:
      "Choosing 向け for a fit-judgment: ✗「この険しい山道はハイカー向けではない」 (nobody designed the mountain for anyone) → say ✓「ハイカー向きではない」. And choosing 向き for deliberate targeting: ✗「この番組は子供向きに作られている」 → when you stress that it was MADE for children, say ✓「子供向けに作られている」.",
    examples: [
      { jp: "この絵本は、幼児向けに作られている。", en: "This picture book was made for young children.", difficulty: "easy" },
      {
        jp: "この山道は険しいから、日帰り登山の初心者向きではない。",
        en: "This mountain trail is steep, so it is not suited to first-time day hikers.",
        difficulty: "medium",
        note: "向き = the speaker's judgment about natural fit.",
      },
      {
        jp: "若者向けに開発された短編動画サービスが、今や中高年の利用を大きく伸ばしているという調査結果が話題になっている。",
        en: "A survey finding that a short-video service developed for young people is now expanding its use among the middle-aged and older is becoming a talking point.",
        difficulty: "hard",
        note: "向け targets the builders' original audience; 中高年 = the middle-aged and elderly.",
      },
    ],
    exercises: [
      {
        question: "この番組は大人______に作られている。  ('This program is made with adults in mind.')",
        answer: "向け",
        hint: "Deliberate targeting by the producer.",
        type: "fill-blank",
      },
      {
        question: "この平易な小説は英語学習者______だ。  ('This easy novel is well suited to English learners.')",
        type: "multiple-choice",
        options: ["向き", "向け", "向い", "向かい"],
        answer: "向き",
        hint: "A judgment of natural fit, not production intent.",
      },
      {
        question: "この広い駐車場は、車______の設計だ。  ('This spacious parking area is a car-oriented design.')",
        answer: "向け",
        hint: "The designers aimed it at a use.",
        type: "fill-blank",
      },
    ],
    order: 112,
  },
  // ===== Order 113 — Lesson 22: Tendency & Degree =====
  {
    title: "〜わりに (wari ni) — considering ~ (relative comparison)",
    level: "N3",
    lesson: 22,
    chapter: "Tendency & Degree",
    structure: "Noun + の + わりに / Na-adjective + な + わりに / i-adjective・plain verb + わりに",
    meaning: "considering ~ / for ~ (the result doesn't match the level of ~)",
    rule:
      "わりに lines up an input and an output and points at the gap between them. 値段のわりに、味がいい says the taste exceeds what the price would have you expect; 頑張ったわりに評価されなかった says the recognition fell short of the effort. The comparison cuts both ways — pleasant surprise and mild disappointment — but it always measures one thing against the standard implied by another. The two halves must therefore be genuinely comparable on some scale: price vs. quality, age vs. maturity, practice vs. result. わりに is evaluative, so it frequently carries a note of criticism or pleasant astonishment. The variant わりには is interchangeable, and それにしては is the casual cousin that takes a whole situation as its yardstick.",
    conjugation:
      "Plain form + わりに (nouns and na-adjectives take の / な).\n• Verb: 勉強したわりに (considering how much I studied), 運動しないわりに (considering he doesn't exercise).\n• i-adjective: 若いわりに (considering how young he is), 高いわりに (for the price being high).\n• Na-adjective + な: 静かなわりに (for somewhere so quiet).\n• Noun + の: 値段のわりに (considering the price), 年齢のわりに (for his age).\nGroup examples: Ichidan (食べる) → 食べるわりに (considering how much he eats); Godan (飲む) → 飲んだわりに; Irregular (する) → したわりに. ✗ masu-form: ✗勉強しましたわりに.",
    usage:
      "Conversational evaluation — reviews, complaints, small wonders (この店、高いわりにおいしくないね). It also enlivens essays when you want a judgment instead of a plain statement. The tone is a little blunt; in delicate business talk people soften with 〜にしては or restructure with 〜の割に. Use it when the mismatch itself is the message.",
    commonMistake:
      "Pairing non-comparable items: ✗「寿司のわりに、おいしい」 — sushi and tastiness are not two ends of one scale → say ✓「値段のわりに、おいしい」 or ✓「この値段なら、おいしい」. Also ✗ forgetting な / の: ✗「静かわりに」「年齢わりに」→ ✓「静かなわりに」「年齢のわりに」.",
    examples: [
      { jp: "値段のわりに、味のいい店だった。", en: "For the price, it was a place with really good food.", difficulty: "easy" },
      {
        jp: "彼は年齢のわりに、考え方がしっかりしている。",
        en: "Considering his age, his way of thinking is remarkably solid.",
        difficulty: "medium",
        note: "Noun + の + わりに; the judgment goes beyond expectation.",
      },
      {
        jp: "十分に準備したわりには、本番で思うような結果を出せず、悔しさが残った。",
        en: "For all the thorough preparation, I couldn't deliver the result I wanted when it counted, and the frustration lingers.",
        difficulty: "hard",
        note: "わりには + は adds a shade of 'in spite of all that'; 本番 = the actual performance, as opposed to practice.",
      },
    ],
    exercises: [
      {
        question: "このホテルは値段______、サービスがいい。  ('Considering the price, this hotel's service is good.')",
        answer: "のわりに",
        hint: "Noun + の + わりに.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct attachment for the na-adjective 静か + わりに:",
        type: "multiple-choice",
        options: ["静かなわりに", "静かわりに", "静かのわりに", "静かだわりに"],
        answer: "静かなわりに",
        hint: "Na-adjectives link with な.",
      },
      {
        question: "彼は飲む______、ちっとも太らない。  ('Considering how much he drinks, he doesn't gain weight at all.')",
        answer: "わりに",
        hint: "Plain verb + わりに.",
        type: "fill-blank",
      },
    ],
    order: 113,
  },
  // ===== Order 114 — Lesson 22: Tendency & Degree =====
  {
    title: "〜得る / 〜得ない (uru / enai) — it is possible that / cannot possibly",
    level: "N3",
    lesson: 22,
    chapter: "Tendency & Degree",
    structure: "Verb (masu-stem) + 得る・得ない",
    meaning: "it is possible that ~ / can happen (theoretical possibility) / cannot possibly happen",
    rule:
      "得る attaches to the masu-stem and builds a FORMAL potential about events, not skills: あり得る states that something can occur in principle — a sober, logical judgment — and あり得ない declares it impossible. そんなミスは起こり得る treats the mistake as a live risk; そんなことは起こり得ない rules it out. This is the crucial difference from the everyday potential form: 話せる means 'I am able to speak' (skill), while 話し得る means 'it is possible for (someone) to speak (in this situation)' — logic, not talent. Reading quirk: the affirmative may be read うる or える (ありうる / ありえる), but the negative is always えない (ありえない), never うれない. Newspapers, papers, and debate lean on 得る constantly because it sounds analytic.",
    conjugation:
      "Verb masu-stem + 得る / 得ない.\n• Ichidan (食べる): 食べ得る (it is possible to eat ~).\n• Godan (起こる): 起こり得る / 起こり得ない (can occur / cannot possibly occur) — the star collocation.\n• Irregular (する / 来る): し得る (it is possible to do), 成し得る (to accomplish); 来得る is rare.\nNegative: masu-stem + 得ない — 起こり得ない, あり得ない; read えない.\n✗ Dictionary form and masu-form: ✗起こる得る / ✗起こります得る. ✗ Negative うれない.",
    usage:
      "得る / 得ない is 書き言葉 with one foot in speech: ありえない！ has become a completely natural spoken exclamation of disbelief. In formal prose it expresses calculated possibility (予期し得ぬ事態 = a situation no one could have anticipated) and closes off impossibility (起こり得ない事故というのは存在しない). Choose it when you are reasoning about events; choose られる when talking about ability or permission.",
    commonMistake:
      "Using it for personal skill: ✗「私は日本語を話し得る」 to mean 'I can speak Japanese' → the skill potential is ✓「話せる」. Also botching the negative reading: ✗「起こりうれない」 → the negative is always ✓「起こり得ない」 (えない). And ✗ non-stem attachment: ✗「起こる得ない」→ ✓「起こり得ない」.",
    examples: [
      { jp: "そのミスは十分起こり得ることだ。", en: "That mistake is something that can entirely well happen.", difficulty: "easy" },
      {
        jp: "完璧に見える計画にも、思いがけない失敗はあり得る。",
        en: "Even in a plan that looks flawless, an unexpected failure is still possible.",
        difficulty: "medium",
        note: "思いがけない = 'unexpected'; あり得る = 'can exist / is possible'.",
      },
      {
        jp: "理論上は起こり得ないとされてきた事態も、条件が重なれば現実のものとなり得ることを、この事故は示している。",
        en: "This accident shows that even situations long deemed impossible in theory can become real when conditions pile up.",
        difficulty: "hard",
        note: "現実のものとなる = 'to become reality'; 条件が重なる = 'for conditions to stack up'.",
      },
    ],
    exercises: [
      {
        question: "それは絶対に起こり______ない。  ('That absolutely cannot happen.')",
        answer: "得",
        hint: "Masu-stem + ___ない (read えない) = 'cannot possibly'.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct negative form with 起こる:",
        type: "multiple-choice",
        options: ["起こり得ない", "起こりうれない", "起こる得ない", "起こえない得る"],
        answer: "起こり得ない",
        hint: "Masu-stem + 得ない, read えない.",
      },
      {
        question: "予期し______事態に備えて、訓練を重ねた。  ('We repeated drills to prepare for situations no one could have anticipated.')",
        answer: "得ない",
        hint: "Masu-stem 予期し + ___ = 'impossible to anticipate'.",
        type: "fill-blank",
      },
    ],
    order: 114,
  },
  // ===== Order 115 — Lesson 22: Tendency & Degree =====
  {
    title: "〜かねる (kaneru) — cannot bring oneself to ~ (formal refusal)",
    level: "N3",
    lesson: 22,
    chapter: "Tendency & Degree",
    structure: "Verb (masu-stem) + かねる (polite: 〜かねます)",
    meaning: "we regretfully cannot ~ / find it beyond our power to ~ (soft formal refusal)",
    rule:
      "かねる looks like the potential of 兼ねる but works as a NEGATIVE-capability pattern of the politest kind: 承知しかねます announces that the speaker cannot accept, 決めかねます that they cannot decide — each dressed in apology rather than anger. Only the affirmative かねる does this work, and it is almost always polite (〜かねます) because its home turf is customer service, official replies, and business mail: お答えしかねます (we cannot answer that), ご要望には応えかねます (we cannot meet your request). The pattern implies a genuine limit of power or propriety, not unwillingness — 'we would if we could, but we cannot'. Now the trap: 〜かねない is a completely different animal, meaning 'might well (lead to something bad)' — 誤解を招きかねない (could easily invite misunderstanding). One ない flips refusal into risk warning.",
    conjugation:
      "Verb masu-stem + かねる.\n• Ichidan (答える): 答えかねる (cannot answer) → お答えしかねます.\n• Godan (言う): 言いかねる (cannot say).\n• Irregular (する): しかねる — the workhorse いたしかねます (we cannot do [it]); 来る is rare in this pattern.\nPolite: 〜かねます. Negative 〜かねない is NOT the negation of refusal — it means 'might well ~' (a separate pattern). ✗ Dictionary form: ✗答えるかねる. ✗ masu-form: ✗答えますかねる.",
    usage:
      "Pure 書き言葉 / ビジネス register: letters from companies, reception counters, government windows. It refuses without a single harsh word, so overusing it in friendly chat would sound like parody. If you need the everyday equivalent, 「〜するのは難しいですね」 or 「〜できかねます」の casual counterpart「〜できないんだ」 will do; save かねる for when the relationship itself must stay smooth.",
    commonMistake:
      "Mixing up かねる and かねない: ✗「その件は承知しかねない」 — that actually means 'might well accept'! The refusal is ✓「承知しかねます」. Also ✗ stem errors: ✗「言うかねる」→ ✓「言いかねる」, and ✗「しますかねる」→ ✓「しかねます」.",
    examples: [
      { jp: "その質問には、お答えしかねます。", en: "We regretfully cannot answer that question.", difficulty: "easy" },
      {
        jp: "誠に申し訳ございませんが、その条件ではお値下げいたしかねます。",
        en: "We are truly sorry, but we cannot lower the price under those conditions.",
        difficulty: "medium",
        note: "いたしかねます = the humble する + かねる; the apology cushions the refusal.",
      },
      {
        jp: "安易な規制は表現の萎縮を招きかねない一方、何もしなければ混乱が広がりかねない。担当者は判断に苦しんでいる。",
        en: "Hasty regulation could well chill free expression, while doing nothing could let the chaos spread. The officials in charge are struggling to decide.",
        difficulty: "hard",
        note: "かねない = 'might well (cause harm)' — the risk-warning twin of かねる.",
      },
    ],
    exercises: [
      {
        question: "貴社の提示された条件には、当社としても同意______ます。  ('Our company, too, regrettably cannot agree to the conditions you have proposed.')",
        answer: "しかね",
        hint: "Masu-stem of する + かねる (polite refusal).",
        type: "fill-blank",
      },
      {
        question: "甘い言葉は、他人を惑わす結果を______。  ('Sweet talk might well end up misleading others.')",
        type: "multiple-choice",
        options: ["招きかねない", "招きかねる", "招きかねます", "招きかねなかった"],
        answer: "招きかねない",
        hint: "かねない = 'might well (do something bad)'.",
      },
      {
        question: "個人情報に関わるご質問には、お答え______ます。  ('We cannot answer questions involving personal information.')",
        answer: "しかね",
        hint: "Masu-stem 答え + お〜する humble frame + かねる.",
        type: "fill-blank",
      },
    ],
    order: 115,
  },
  // ===== Order 116 — Lesson 23: Emotional Emphasis =====
  {
    title: "〜ものだ / 〜ものがある (mono da / mono ga aru) — used to ~ (nostalgia) / truly, genuinely is",
    level: "N3",
    lesson: 23,
    chapter: "Emotional Emphasis",
    structure: "Plain form + ものだ / Verb・i-adjective + ものがある",
    meaning: "we used to ~ (reminiscence) / things generally are ~ (maxim) / there is truly something that ~ (deep emotion)",
    rule:
      "ものだ packs three N3-grade functions under one roof. (1) Reminiscence: past plain form + よく + ものだ recalls a habit of days gone by with a sigh — 子どもの頃は、よくこの川で泳いだものだ (when I was a boy, I used to swim in this river — and how I miss it). (2) General truth or gentle admonition: dictionary form + ものだ states how the world works or how one should behave — 人は年を取ると涙もろくなるものだ (people do grow tearful with age), 引っ越しのあいさつはするものだ (you really ought to greet your neighbors when you move); the negative ものではない scolds: 人の悪口を言うものではない. (3) Deep emotion: V / i-adjective + ものがある concedes that something genuinely possesses a moving quality — 彼の演奏には心を打つものがある (there is something in his playing that strikes the heart). もの here means 'a something', and the pattern stops short of naming it.",
    conjugation:
      "Reminiscence: ta-form (+ よく) + ものだ — 泳いだものだ, 通ったものだ.\nMaxim: dictionary form + ものだ — するものだ / なるものだ; negative: 〜ものではない.\nDeep emotion: dictionary or ta-form + ものがある — 感動させるものがある, 心を打つものがある; i-adjectives work directly: 悲しいものがある (there is something achingly sad about it).\nGroup examples: Ichidan (見る) → よく見たものだ / 見るものだ; Godan (遊ぶ) → よく遊んだものだ; Irregular (する) → するものだ. Polite: ものです. ✗ masu-form: ✗しましたものだ.",
    usage:
      "ものだ is reflective and slightly old-fashioned in the best way: elders' chat, essays, speeches, year-end letters. The reminiscence use warms autobiography; the maxim use moralizes softly; ものがある dignifies praise — it appears in reviews and award citations. In casual speech the whole thing contracts to もんだ (昔はよく遊んだもんだ). Keep it apart from the explanatory 〜もので(すから) ('the thing is, ~'), which justifies rather than feels.",
    commonMistake:
      "Using the dictionary form for nostalgia: ✗「子どもの頃はよく泳ぐものだ」→ the past is required: ✓「泳いだものだ」. And confusing the maxim with simple habit: ✗「私は毎朝コーヒーを飲むものだ」 sounds like a proverb about humanity → for personal routine say ✓「飲むことにしている」 or ✓「飲んでいる」.",
    examples: [
      { jp: "子どもの頃は、よくこの裏山で虫取りをしたものだ。", en: "When I was a child, I used to catch bugs on this back hill all the time.", difficulty: "easy" },
      {
        jp: "人の悪口を陰で言うものではない。",
        en: "One should not badmouth others behind their backs.",
        difficulty: "medium",
        note: "Negative maxim: ものではない = 'one ought not to ~'.",
      },
      {
        jp: "彼の歌声には、いくら言葉を尽くしても説明しきれないものがある。",
        en: "In his singing voice there is something that no amount of words can fully explain.",
        difficulty: "hard",
        note: "〜きれない = 'cannot finish ~ing'; 言葉を尽くす = 'to exhaust one's words'.",
      },
    ],
    exercises: [
      {
        question: "若い頃は、徹夜なんて平気だった。今思えば、無鉄砲な______だ。  ('When I was young, all-nighters were nothing. Looking back, we were reckless characters.')",
        answer: "もの",
        hint: "Nostalgic / reflective ものだ.",
        type: "fill-blank",
      },
      {
        question: "引っ越したら、隣の家に挨拶______ものだ。  ('When you move, you really ought to greet the neighbors.')",
        type: "multiple-choice",
        options: ["する", "した", "しない", "します"],
        answer: "する",
        hint: "Maxim use takes the dictionary form.",
      },
      {
        question: "彼の演奏には、聴く者の心を打つ______がある。  ('In his performance there is something that strikes the listener's heart.')",
        answer: "もの",
        hint: "___がある = deep-emotion use.",
        type: "fill-blank",
      },
    ],
    order: 116,
  },
  // ===== Order 117 — Lesson 23: Emotional Emphasis =====
  {
    title: "〜ことか (koto ka) — how ~! (exclamatory with a question word)",
    level: "N3",
    lesson: 23,
    chapter: "Emotional Emphasis",
    structure: "どんなに・どれほど・どれだけ・なんと + plain form + ことか",
    meaning: "how ~! (an exclamation of degree driven by a question word)",
    rule:
      "ことか turns a question word into an exclamation mark. どんなに心配したことか does not ask how much I worried — it declares it: 'how terribly I worried!'. The interrogative (どんなに, どれほど, どれだけ, なんと, 何度) keeps its question shape while the sentence switches to exclamatory mode, which is exactly the trick English pulls with 'How I worried!' or 'What a sight it was!'. Attachment is to plain forms: verbs, i-adjectives, and na-adjectives with な — in practice verb and adjective clauses dominate. The pattern almost always closes a first-person or narrator's heartfelt report, and it pairs beautifully with duration phrases (長い間, 何年も). Its plain sibling 〜ことだろう softens the same feeling into musing: どれだけ待ったことだろう.",
    conjugation:
      "Question word + plain form + ことか.\n• Verb: どんなに待ったことか (how I waited!), 何度悔やんだことか (how many times I regretted it!).\n• i-adjective: どんなに寂しかったことか (how lonely it was!).\n• Na-adjective + な: どれほど心細なことか (how uneasy it was!).\nGroup examples: Ichidan (疲れる): どれだけ疲れたことか; Godan (泣く): どんなに泣いたことか; Irregular (する): なんと心配したことか.\nPolite: ことでしょうか is rare; the plain ことか is standard. ✗ masu-form: ✗待ちましたことか.",
    usage:
      "Letters, memoirs, diary-like narration, heartfelt speeches — ことか is written-leaning emotive prose, less common in face-to-face small talk where 〜なんて〜だろう or plain emphasis would sound more natural. It converts private feeling into polished rhetoric: the speaker relives the intensity while standing back to comment on it. First-person or third-person retrospection is its natural home; commands and questions cannot host it.",
    commonMistake:
      "Dropping the question word: ✗「心配したことか」 → the exclamatory force requires it: ✓「どんなに心配したことか」. Also ✗ masu-form attachment: ✗「心配しましたことか」→ ✓「心配したことか」.",
    examples: [
      { jp: "家族と離れて暮らし始めた頃、どんなに寂しかったことか。", en: "How lonely it was when I first started living apart from my family.", difficulty: "easy" },
      {
        jp: "連絡が取れない夜が続いた間、母がどれほど不安を募らせていたことか、今になってはじめて分かる。",
        en: "Only now do I understand just how much anxiety my mother let build up during those nights when we could not reach each other.",
        difficulty: "medium",
        note: "〜てはじめて = 'only after ~ did I ~'; 不安が募る = 'for anxiety to mount'.",
      },
      {
        jp: "廃墟と化した町並みが蘇った今、住民たちがどれほどの困難を乗り越えてきたことか、想像を絶する。",
        en: "Now that the town reduced to ruins has come back to life, how great the hardships its residents overcame is beyond imagining.",
        difficulty: "hard",
        note: "想像を絶する = 'to defy imagination'; 蘇る = 'to be revived'.",
      },
    ],
    exercises: [
      {
        question: "彼の無事を知らせる電話が来るまで、どれだけ不安だった______。  ('How anxious I was until the call came saying he was safe.')",
        answer: "ことか",
        hint: "Question word + plain form + ___ = 'how ~!'.",
        type: "fill-blank",
      },
      {
        question: "合格できたとは、______嬉しかったことか。  ('How happy I was to learn I had passed!')",
        type: "multiple-choice",
        options: ["どんなに", "とても", "少しも", "たぶん"],
        answer: "どんなに",
        hint: "The exclamatory frame needs a degree question word.",
      },
      {
        question: "一人で子どもを育てるのは、どんなに大変だった______。  ('How hard it was to raise a child alone!')",
        answer: "ことか",
        hint: "Exclamation of degree.",
        type: "fill-blank",
      },
    ],
    order: 117,
  },
  // ===== Order 118 — Lesson 23: Emotional Emphasis =====
  {
    title: "〜さえ〜ば (sae ~ ba) — if only ~ (the one sufficient condition)",
    level: "N3",
    lesson: 23,
    chapter: "Emotional Emphasis",
    structure: "Noun + さえ + ば-form / Verb (masu-stem) + さえすれば・さえしなければ",
    meaning: "if only ~ / as long as ~ (that alone suffices)",
    rule:
      "さえ〜ば isolates ONE condition and sweeps everything else off the table: if that single thing holds, the result follows — お金さえあれば、世界中を旅行できる (if only I had the money, I could travel the whole world; nothing else is wanting). The ば-conditional must sit directly behind さえ: with nouns the predicate itself is ば-shaped (お金さえあれば, 暇さえあれば); with verbs the construction is masu-stem + さえする → やりさえすれば (just do it and...), and its negative やりさえしなければ (as long as you don't ~, we're fine). The tone is wistful, hopeful, or reproachful: 君さえそばにいてくれれば (if only you were beside me), 君さえいなければ (if only it weren't for you). Keep it apart from plain さえ = 'even', as in 水さえ飲めない (can't even drink water) — that さえ emphasizes an extreme, not a sufficient condition.",
    conjugation:
      "Noun + さえ + ば-form predicate: お金さえあれば (if only there were money), 暇さえあれば (if only there were time), 君さえいてくれれば.\nVerb masu-stem + さえすれば / さえしなければ:\n• Ichidan (食べる): 食べさえすれば (if only you eat it).\n• Godan (読む): 読みさえすれば (if only you read it).\n• Irregular (する / 来る): しさえすれば, 来(き)さえすれば.\n✗ Dictionary form: ✗読むさえすれば. ✗ masu-form: ✗読みますさえすれば. i-adjectives rarely host this pattern — rephrase with a noun (元気さえあれば).",
    usage:
      "Emphatic conditional in both speech and essays. It shines in wishes and laments (時間さえあればなあ) and in tight arguments that reduce a problem to its single key factor. Note the reversal of normal modesty: by claiming one condition suffices, the speaker sounds either inspired or a little naive — a nuance exploited on purpose in persuasion (選挙に行きさえすれば、声は届く).",
    commonMistake:
      "Attaching the dictionary form: ✗「読むさえすれば」→ masu-stem is required: ✓「読みさえすれば」. Also confusing this with emphatic さえ ('even'): ✗「水さえ飲めば」 intended as 'can't even drink water' → that meaning is ✓「水さえ飲めない」; 水さえ飲めば would mean 'if only you drink water'.",
    examples: [
      { jp: "時間さえあれば、いつでも手伝うよ。", en: "If only I had the time, I'd help you anytime.", difficulty: "easy" },
      {
        jp: "天気さえ良ければ、明日の運動会は中止にならないはずだ。",
        en: "If only the weather holds, tomorrow's sports day should not be canceled.",
        difficulty: "medium",
        note: "Noun + さえ + 良ければ (ば-form of いい).",
      },
      {
        jp: "この難局を打開する処方箋は単純で、現場の声に耳を傾けさえすればよいというものでもない。",
        en: "The prescription for breaking this deadlock is simple-sounding, yet it is not merely a matter of just lending an ear to those on the front line.",
        difficulty: "hard",
        note: "〜というものでもない = 'it's not simply the case that ~' — a hedge on the sufficiency claim.",
      },
    ],
    exercises: [
      {
        question: "お金______あれば、何でも買えるのに。  ('If only I had the money, I could buy anything.')",
        answer: "さえ",
        hint: "Noun + ___ + ば-form = 'if only'.",
        type: "fill-blank",
      },
      {
        question: "この漢字は、一度覚え____すれば、もう忘れないだろう。  ('If only you memorize this kanji once, you probably won't forget it.')",
        type: "multiple-choice",
        options: ["さえ", "ます", "て", "る"],
        answer: "さえ",
        hint: "Masu-stem + ___すれば.",
      },
      {
        question: "君______そばにいてくれれば、ほかには何もいらない。  ('If only you stay by my side, I need nothing else.')",
        answer: "さえ",
        hint: "Isolating the one sufficient condition.",
        type: "fill-blank",
      },
    ],
    order: 118,
  },
  // ===== Order 119 — Lesson 23: Emotional Emphasis =====
  {
    title: "〜っぱなし (ppanashi) — leaving something in a state (neglect)",
    level: "N3",
    lesson: 23,
    chapter: "Emotional Emphasis",
    structure: "Verb (masu-stem) + っぱなし (+ だ / にする / で)",
    meaning: "leaving ~ in the state after doing it (often with a hint of neglect)",
    rule:
      "っぱなし freezes an object in the state an action produced — usually a state somebody should have undone. 水を出しっぱなしにして出かけた paints the tap running, the owner gone, and an unspoken 'someone should fix that'. 電気をつけっぱなしで寝た (fell asleep with the lights left on) and ドアを開けっぱなしにしないで (don't leave the door hanging open) show the pattern's home ground: lights, doors, taps, screens — things that ought to be closed, off, or put away. The nuance is mostly neglect, occasionally neutral continuation (彼は一日中パソコンの前で座りっぱなしだった). Grammatically っぱなし is a noun: it takes だ, links with にする (leave it ~) and で (in that state, ~). Its well-mannered cousin 〜まま states a leftover state without the wagging finger, and formal writing prefers まま exactly for that neutrality.",
    conjugation:
      "Verb masu-stem + っぱなし.\n• Ichidan (つける): つけっぱなし (left on) — 電気をつけっぱなし.\n• Godan (出す): 出しっぱなし (left running); 開ける → 開けっぱなし (left open).\n• Irregular (する): しっぱなし — 言いっぱなし (saying it and never following through).\nThen add だ / です, にする (leave it so), で (in that state): 出しっぱなしにする, つけっぱなしで寝た.\n✗ Ta-form and masu-form: ✗つけたっぱなし / ✗つけますっぱなし.",
    usage:
      "Casual to neutral speech: household complaints, energy-saving slogans (つけっぱなし禁止!), friendly scolding. It is not a formal-writing word — reports and notices rephrase with 〜たまま (点灯したまま退室した). The built-in disapproval makes it affectionately reproachful among family and bluntly critical in public notices.",
    commonMistake:
      "Attaching anything except the masu-stem: ✗「つけたっぱなし」→ ✓「つけっぱなし」. Also reaching for っぱなし in formal prose where 〜たまま belongs: ✗「ドアが開けっぱなしとなっていた」 in a report → ✓「ドアが開いたままとなっていた」.",
    examples: [
      { jp: "妹はテレビをつけっぱなしで寝てしまった。", en: "My little sister fell asleep with the TV left on.", difficulty: "easy" },
      {
        jp: "水を出しっぱなしで歯を磨くのは、もったいないと思う。",
        en: "I think brushing your teeth with the water left running is wasteful.",
        difficulty: "medium",
        note: "っぱなしで = 'while in the left-on state'.",
      },
      {
        jp: "会議室のエアコンをつけっぱなしにして帰った人がいたせいで、部署の節電目標が達成できず、注意文が回ってきた。",
        en: "Because someone left the meeting room's air conditioning running when they went home, the department missed its power-saving target, and a notice of caution went around.",
        difficulty: "hard",
        note: "〜せいで = 'because of (someone's doing)' — blame; 注意文が回る = 'a caution notice circulates'.",
      },
    ],
    exercises: [
      {
        question: "ドアを開け______なしにしないでください。  ('Please don't leave the door open.')",
        answer: "っぱ",
        hint: "Masu-stem + ___なし.",
        type: "fill-blank",
      },
      {
        question: "電気を______っぱなしにして出かけた。  ('(I) went out with the lights left on.')",
        type: "multiple-choice",
        options: ["つけ", "つけた", "つけます", "つけて"],
        answer: "つけ",
        hint: "Masu-stem only.",
      },
      {
        question: "兄の部屋の電気は、つけ______なしだ。  ('The light in my brother's room has been left on.')",
        answer: "っぱ",
        hint: "State left as-is — with a hint of neglect.",
        type: "fill-blank",
      },
    ],
    order: 119,
  },
  // ===== Order 120 — Lesson 23: Emotional Emphasis =====
  {
    title: "〜ついでに (tsuide ni) — while at it / on the occasion of ~",
    level: "N3",
    lesson: 23,
    chapter: "Emotional Emphasis",
    structure: "Verb (plain form) + ついでに / Noun + の + ついでに",
    meaning: "while (you're) at it / on the occasion of ~ (a minor errand piggybacked on the main one)",
    rule:
      "ついでに marks a SECONDARY task riding on the back of a primary errand. 買い物のついでに、図書館に本を返してきた names shopping as the main outing and book-returning as the free rider — worth doing only because you were already going out. The ついでに clause is the MAIN errand; the rest of the sentence states the add-on (order is free). The logic is efficiency: the extra task costs almost nothing extra, so it is typically small — a postage stamp, a haircut, a quick greeting. Big, dedicated purposes cannot ride along: a wedding is not done ついでに. The formal cousin 〜がてら does the same job in literary style (散歩がてら本屋に寄る).",
    conjugation:
      "Verb plain form + ついでに — dictionary form for future or habitual plans, ta-form for past errands: 行くついでに (when you go, while you're at it), 買ったついでに (when I bought it, while I was at it).\nNoun + の + ついでに: 買い物のついでに (while shopping), 散歩のついでに (on my walk).\nGroup examples: Ichidan (寄る): 寄るついでに (while stopping by); Godan (買う): 買ったついでに; Irregular (する): するついでに.\n✗ Masu-form: ✗行きますついでに. ✗ てForm: ✗行ってついでに.",
    usage:
      "Everyday planning talk — notes to family (駅のついでに切符を取ってきて), favors between friends (ついでにこれもお願い). Warmly practical in tone: it shows thrift without miserliness. がてら is the polished version for essays and invitations; use it when the trip itself is stately (お見舞いがてら、庭の花を楽しんだ).",
    commonMistake:
      "Inverting the weight: making the minor task the ついでに clause — ✗「昼食のついでに、社運をかけた契約の交渉をする」 (a contract negotiation is no free rider) → say ✓「契約の交渉のついでに、昼食を取る」 or drop ついでに. Also ✗ masu-form: ✗「買い物しますのついでに」→ ✓「買い物のついでに」.",
    examples: [
      { jp: "散歩のついでに、パンを買ってきた。", en: "On my walk, I picked up some bread while I was at it.", difficulty: "easy" },
      {
        jp: "郵便局へ荷物を出しに行ったついでに、切手も新調してきた。",
        en: "When I went to the post office to send a package, I treated myself to new stamps while I was there.",
        difficulty: "medium",
        note: "Ta-form + ついでに; 新調する = 'to renew (one's equipment)'.",
      },
      {
        jp: "大阪出張のついでに、十年ぶりに恩師の勤める大学を訪ね、進路について相談を持ちかけた。",
        en: "While in Osaka on business, I visited the university where my old mentor teaches for the first time in ten years, and brought up the question of my career path.",
        difficulty: "hard",
        note: "恩師 = 'one's former teacher'; 相談を持ちかける = 'to bring up for consultation'.",
      },
    ],
    exercises: [
      {
        question: "買い物______、図書館に寄って本を返してきた。  ('While out shopping, I stopped by the library and returned a book.')",
        answer: "のついでに",
        hint: "Noun + の + ついでに.",
        type: "fill-blank",
      },
      {
        question: "銀行に行く______、この手紙も出してきてくれる？  ('Since you're going to the bank, could you mail this letter too, while you're at it?')",
        type: "multiple-choice",
        options: ["ついでに", "ために", "ように", "ばかりに"],
        answer: "ついでに",
        hint: "A small add-on errand, not a purpose.",
      },
      {
        question: "駅前の銭湯へ行った______、夜食用におでんも買ってきた。  ('When I went to the bathhouse by the station, I also picked up some oden for a late-night snack.')",
        answer: "ついでに",
        hint: "Past errand + ta-form + ___.",
        type: "fill-blank",
      },
    ],
    order: 120,
  },
  // ===== Order 121 — Lesson 24: Compound Particles =====
  {
    title: "〜について / 〜にとって / 〜において (ni tsuite / ni totte / ni oite) — about / for / in",
    level: "N3",
    lesson: 24,
    chapter: "Compound Particles",
    structure: "Noun + について / にとって / において",
    meaning: "about (topic) / for (from a standpoint) / in (formal setting or occasion)",
    rule:
      "Three compound particles that Japanese uses to sort three different framing jobs. について introduces the TOPIC of speech, thought, writing, or research: 日本の教育について話す (talk about Japanese education) — what follows is a verb of saying, studying, or thinking. にとって sets a STANDPOINT for evaluation: 私にとって家族は一番大切だ (for me, family comes first) — what follows is a judgment (important, difficult, a blessing), because the phrase answers 'from whose scales is this weighed?'. において marks the formal SETTING — place, occasion, field — where something happens: 国際会議において発表された (announced at an international conference); it is the stiffened cousin of the plain particle で. Each takes a noun directly, and each has a の/な-form for modifying nouns: についての本 (a book about ~), にとっての故郷 (the hometown for ~), における規制 (regulations in ~).",
    conjugation:
      "Noun + particle, directly: この問題について (about this problem), 学生にとって (for students), 記者会見において (at the press conference).\nNoun-modifying forms: 〜についての + N (平和についての講演), 〜にとっての + N (私にとっての仕事), 〜における + N (現代における家族) — における takes no の.\nThemes / fields / topics must be nouns — verbs nominalize first (留学する → 留学について).\nVariants: 〜については (as for ~, about), 〜についても、〜においても (also in ~).",
    usage:
      "について spans registers: NHK anchors and schoolkids both use it. にとって is the natural spine of opinion sentences (誰にとっても大切だ) and appears constantly in interviews. において is the starchiest of the three — ceremonies, news reports, academic prose — and sounds puffed-up in chat (say で instead: 「パーティーで会った」 not 「パーティーにおいて会った」).",
    commonMistake:
      "Cross-wiring the frames: ✗「私について、家族が大切だ」 — the evaluation is weighed from your standpoint, so ✓「私にとって、家族が大切だ」. ✗「会議について発表する」 — the setting takes において: ✓「会議において発表する」 (about WHAT was said, について is fine: 会議の内容について話す).",
    examples: [
      { jp: "この本は、日本の歴史について書かれた入門書だ。", en: "This book is an introduction written about Japanese history.", difficulty: "easy" },
      {
        jp: "帰国子女にとって、漢字の習得が最も大きな壁になることが多い。",
        en: "For children returning from abroad, mastering kanji often becomes the biggest hurdle.",
        difficulty: "medium",
        note: "にとって sets the standpoint; 壁 = 'wall, hurdle'.",
      },
      {
        jp: "昨日の株主総会において、社長は来期の投資計画について、株主からの質問に直接答える姿勢を示した。",
        en: "At yesterday's shareholders' meeting, the president showed a willingness to answer shareholders' questions directly about next term's investment plan.",
        difficulty: "hard",
        note: "において marks the occasion; について marks the topic — both in one sentence.",
      },
    ],
    exercises: [
      {
        question: "環境問題______、学生たちが活発に議論を交わした。  ('The students exchanged lively discussion about environmental problems.')",
        answer: "について",
        hint: "Topic of discussion.",
        type: "fill-blank",
      },
      {
        question: "高齢者______、デジタル化は便利であると同時に不安でもある。  ('For the elderly, digitalization is convenient and at the same time unsettling.')",
        type: "multiple-choice",
        options: ["にとって", "について", "において", "に対して"],
        answer: "にとって",
        hint: "An evaluation weighed from a standpoint.",
      },
      {
        question: "開会式______、来賓による祝辞が述べられた。  ('At the opening ceremony, congratulatory speeches were given by the guests of honor.')",
        answer: "において",
        hint: "Formal setting / occasion.",
        type: "fill-blank",
      },
    ],
    order: 121,
  },
  // ===== Order 122 — Lesson 24: Compound Particles =====
  {
    title: "〜に対して / 〜として / 〜に関して (ni taishite / to shite / ni kanshite) — toward / as / concerning",
    level: "N3",
    lesson: 24,
    chapter: "Compound Particles",
    structure: "Noun + に対して / として / に関して",
    meaning: "toward (target) & whereas (contrast) / as (capacity or role) / concerning (formal 'about')",
    rule:
      "に対して has two jobs. (1) Target: it marks the person or group an attitude or action is AIMED at — お客様に対して丁寧に話す (speak politely toward customers), 学生に対して厳しすぎる (too strict toward students); love, questions, donations, and hostility all take it. A mere direction of movement or source of teaching does not: you learn FROM someone (先生から習う), not 先生に対して. (2) Contrast: に対して alone can also set up a contrast, 姉は背が高い。それに対して、妹は低い (the older sister is tall; whereas the younger is short) — essay-style comparison. として means 'as / in the capacity of': 医者として忠告する (I advise you as a doctor), この薬は風邪の薬として売られている — it stamps a role or qualification onto the noun. に関して is the stiff sibling of について: この件に関してご意見は？ (concerning this matter, your views?) — business, legal, and academic writing.",
    conjugation:
      "Noun + particle, directly: お客様に対して (toward customers), 医者として (as a doctor), この件に関して (concerning this matter).\nNoun-modifying forms: 〜に対する + N (学生に対する態度 = attitude toward students), 〜としての + N (医者としての義務 = duty as a doctor), 〜に関する + N (契約に関する書類 = documents concerning the contract).\nVerbs do not attach — nominalize first (参加する → 参加することに対して / 参加することに関して).\nContrast use: plain clause + に対して / それに対して (兄は積極的だ。それに対して弟は内気だ).",
    usage:
      "に対して (target) spans speech and writing; the contrast use is essay-like and often rides on それに対して as a sentence connector. として is universal — every register from contracts to manga (俺は友達として言ってるんだ). に関して is deliberately stuffy: choose it in letters and reports, and choose について the moment the air should loosen.",
    commonMistake:
      "Using に対して where から belongs: ✗「先生に対して日本語を習った」→ ✓「先生から日本語を習った」 (you learn FROM, you are not aiming an attitude at them). Using it where として belongs: ✗「彼は医者に対して勤めている」→ ✓「彼は医者として勤めている」 (he works AS a doctor). And ✗ verb attachment: ✗「参加するに対して」→ ✓「参加することに対して」.",
    examples: [
      { jp: "お年寄りに対して、親切にするのは当然のことだ。", en: "Being kind toward the elderly is simply a matter of course.", difficulty: "easy" },
      {
        jp: "彼は医師として、災害派遣医療チームに参加した。",
        en: "As a physician, he joined the disaster relief medical team.",
        difficulty: "medium",
        note: "として stamps his professional capacity; 派遣 = 'dispatch'.",
      },
      {
        jp: "会社はこの事故に関して、被害者に対して十分な補償を行うことを改めて約束した。",
        en: "Concerning this accident, the company promised anew to carry out full compensation toward the victims.",
        difficulty: "hard",
        note: "に関して (formal topic) + に対して (target of the compensation) in one sentence.",
      },
    ],
    exercises: [
      {
        question: "彼は医者______、医療ボランティアに参加した。  ('He joined a medical volunteer corps as a doctor.')",
        answer: "として",
        hint: "Role / capacity.",
        type: "fill-blank",
      },
      {
        question: "北の都市では雪が多い。______、南の海岸ではほとんど降らない。  ('In northern cities there is much snow. ~, on the southern coast it hardly falls at all.')",
        type: "multiple-choice",
        options: ["それに対して", "それについて", "それとして", "それにおいて"],
        answer: "それに対して",
        hint: "Sentence connector marking contrast: 'whereas'.",
      },
      {
        question: "この件______、ご意見のある方は挙手をお願いします。  ('Those with views concerning this matter, please raise your hands.')",
        answer: "に関して",
        hint: "Formal 'concerning ~'.",
        type: "fill-blank",
      },
    ],
    order: 122,
  },
  // ===== Order 123 — Lesson 24: Compound Particles =====
  {
    title: "〜によって (ni yotte) — by means of / due to / depending on (three uses)",
    level: "N3",
    lesson: 24,
    chapter: "Compound Particles",
    structure: "Noun + によって / 〜による + Noun / 〜によっては",
    meaning: "by (agent or means) / due to (cause) / depending on (variation with N)",
    rule:
      "によって is one shape carrying three distinct engines, and the sentence around it tells you which one is running. (1) Agent or means: in formal passives and descriptions it names the doer or instrument — この小説は夏目漱石によって書かれた (this novel was written BY Natsume Sōseki), 音声認識によって操作できる (can be operated by means of voice recognition). (2) Cause: with incidents and disasters it works like a formal 'due to' — 台風によって家屋が倒壊した (houses collapsed due to the typhoon); reserve it for events, not for persons you could blame with せいで. (3) Variation: it marks a variable across which outcomes differ — 人によって考え方が違う (ways of thinking differ from person to person), 季節によって値段が変わる (prices change with the season). The offshoot によっては narrows this to 'in some cases': 国によっては禁止されている (in some countries it is banned). The noun-modifying form 〜による + N is a formal-writing fixture: 台風による被害 (typhoon-caused damage).",
    conjugation:
      "Noun + によって, directly: 消防士によって救助された (rescued by firefighters — agent), 地震によって (due to the earthquake — cause), 人・季節・国によって (depending on people / seasons / countries — variation).\n〜による + Noun: による被害, による研究成果.\n〜によっては = 'in some cases (possibly)': 場合によっては (depending on the situation), 人によっては.\nVerbs do not attach — nominalize first (努力によって成功した keeps 努力 as the noun). Plain に can replace the agent use in everyday passives (母に作られた); によって makes it explicit and formal.",
    usage:
      "Newspapers, reports, and academic prose cannot live without it — headlines compress with による (台風による停電), articles generalize with によって (地域によって異なる). In conversation the plain alternatives (から, ので, に, 〜次第) usually sound more natural. Learners should read it as three tools in one scabbard: check whether the noun is a doer, a cause, or a variable.",
    commonMistake:
      "Using the cause-sense with a person: ✗「彼によって遅れた」→ blame with ✓「彼のせいで遅れた」. Using agent-によって for the everyday give-and-receive に: ✗「母によってご飯を作ってもらった」→ ✓「母にご飯を作ってもらった」 (the favor-receiving に cannot be によって). Also ✗ verb attachment: ✗「食べるによって健康になる」→ ✓「食事によって健康になる」.",
    examples: [
      { jp: "この城は、有名な武将によって築かれた。", en: "This castle was built by a famous warlord.", difficulty: "easy" },
      {
        jp: "好みは人によって違うから、食べ放題の店を選んだ。",
        en: "Tastes differ from person to person, so I chose an all-you-can-eat restaurant.",
        difficulty: "medium",
        note: "Variation use; 食べ放題 = 'all-you-can-eat'.",
      },
      {
        jp: "記録的な大雨によって寸断された道路は復旧の見通しが立たず、孤立した集落では支援物資の空輸が始まった。",
        en: "The roads severed by record rainfall show no prospect of repair, and in the isolated settlements the airlifting of relief supplies has begun.",
        difficulty: "hard",
        note: "Cause use; 寸断 = 'cut to pieces'; 見通しが立たない = 'no prospect in sight'.",
      },
    ],
    exercises: [
      {
        question: "環境の変化______、生態系が壊されることがある。  ('Due to changes in the environment, ecosystems are sometimes destroyed.')",
        answer: "によって",
        hint: "Cause use: 'due to ~'.",
        type: "fill-blank",
      },
      {
        question: "国______は、飲酒が18歳から認められているところもある。  ('In some countries, drinking is legal from age 18.')",
        type: "multiple-choice",
        options: ["によって", "に対して", "として", "にとって"],
        answer: "によって",
        hint: "___（は） = 'in some cases depending on ~'.",
      },
      {
        question: "この絵は、誰______描かれたものか分からない。  ('It is unknown by whom this painting was drawn.')",
        answer: "によって",
        hint: "Agent use in a passive sentence.",
        type: "fill-blank",
      },
    ],
    order: 123,
  },
  // ===== Order 124 — Lesson 24: Compound Particles =====
  {
    title: "〜につれて / 〜にしたがって (ni tsurete / ni shitagatte) — as X progresses, Y changes",
    level: "N3",
    lesson: 24,
    chapter: "Compound Particles",
    structure: "Verb (dictionary form) + につれて・にしたがって / Noun + につれて・にしたがって",
    meaning: "as ~ progresses, ~ changes along with it (linked change)",
    rule:
      "Both patterns bind two CHANGES into one motion: the degree of X advances, and Y shifts in step with it. 年を取るにつれて、記憶力が落ちる does not narrate two events but one linked slide — aging deepens while memory ebbs. The attached clause must therefore be gradable and continuing: 上達する, 慣れる, 広まる, 時間が経つ. A one-shot happening cannot drive it: ✗彼が来るにつれて、会場が静かになった treats a single arrival as a slope — use 〜たとたん there. The main clause, too, should describe a state or non-volitional change, not a command. につれて and にしたがって are interchangeable in this linked-change sense; にしたがって is stiffer and carries extra meanings of its own — 'in accordance with a rule or instruction' (薬の指示にしたがって服用する) and 'following a guide' (案内人にしたがって進む) — which につれて never shares.",
    conjugation:
      "Verb dictionary form + につれて / にしたがって: 上達するにつれて (as one improves), 慣れるにしたがって (as one gets used to it).\nNoun + につれて / にしたがって: 成長につれて (with growth), 経済の発展につれて (with economic development), 時間の経過につれて (with the passage of time).\nGroup examples: Ichidan (慣れる): 慣れるにつれて; Godan (広まる): 広まるにつれて; Irregular (する): 発展するにしたがって.\n✗ Ta-form: ✗年を取ったにつれて. ✗ nai-form: ✗分からないにつれて. ✗ masu-form: ✗進みますにつれて.",
    usage:
      "Essay-grade description of trends, used in speeches, editorials, and textbooks — 経済のグローバル化が進むにつれて is practically a set phrase. につれて is the more common of the pair in both speech and prose; にしたがって leans written and prefers large social or formal processes. If the two changes are merely simultaneous without a causal slope, 〜と同時に does the honest job instead.",
    commonMistake:
      "Attaching the ta-form: ✗「年を取ったにつれて」→ dictionary form only: ✓「年を取るにつれて」. Driving it with a one-time event: ✗「彼が来るにつれて、会場が静かになった」→ for instantaneous change say ✓「彼が来たとたん、会場が静かになった」.",
    examples: [
      { jp: "時間が経つにつれて、痛みは薄れていった。", en: "As time passed, the pain gradually faded.", difficulty: "easy" },
      {
        jp: "日本語を学ぶにつれて、日本の文化への理解も深まっていく。",
        en: "As I study Japanese, my understanding of Japanese culture deepens as well.",
        difficulty: "medium",
        note: "Two linked changes; 深まる = 'to deepen' (intransitive).",
      },
      {
        jp: "経済のグローバル化が進むにしたがって、国内産業の保護と自由競争のあり方をめぐる議論は一層先鋭化している。",
        en: "As economic globalization advances, the debate over protecting domestic industry versus free competition is sharpening still further.",
        difficulty: "hard",
        note: "にしたがって in formal register; 〜をめぐる = 'over / surrounding (an issue)'.",
      },
    ],
    exercises: [
      {
        question: "春が近づく______、だんだん暖かくなってきた。  ('As spring drew near, it gradually grew warmer.')",
        answer: "につれて",
        hint: "Linked change: as X advances, Y changes.",
        type: "fill-blank",
      },
      {
        question: "練習を重ねる______、上達するものだ。  ('As you pile up practice, you improve — that's how it works.')",
        type: "multiple-choice",
        options: ["につれて", "につれた", "につれては", "につれまして"],
        answer: "につれて",
        hint: "Dictionary form + ___ only.",
      },
      {
        question: "子どもの成長______、親の心配の内容も変わっていく。  ('As children grow up, the content of parents' worries changes too.')",
        answer: "につれて",
        hint: "Noun + ___.",
        type: "fill-blank",
      },
    ],
    order: 124,
  },
  // ===== Order 125 — Lesson 25: Keigo & Register =====
  {
    title: "敬語 — 尊敬語・謙譲語・丁寧語 (keigo) — honorific / humble / polite speech",
    level: "N3",
    lesson: 25,
    chapter: "Keigo & Register",
    structure: "尊敬語: お + masu-stem + になる・なさる / 謙譲語: お + masu-stem + する・いたす・申す・拝見する / 丁寧語: です・ます",
    meaning: "three-layer politeness: exalt the other person's actions, humble your own, add です・ます throughout",
    rule:
      "Japanese politeness is a three-story building. 尊敬語 (respectful language) RAISES the actions of the person you honor: 先生がいらっしゃる (the professor comes/goes/is — for 先生), お読みになる (reads), 召し上がる (eats), ご覧になる (looks), おっしゃる (says), なさる (does). The honored person is the SUBJECT of these verbs. 謙譲語 (humble language) LOWERS your own actions when they concern that person: 伺う (humbly visit / ask), 申し上げる (humbly say), 拝見する (humbly look at [your material]), 参る (humbly go / come), いたす (humbly do), お送りする (humbly send [to you]). The humble speaker is the SUBJECT, and the honored person usually appears with に / から. 丁寧語 (polite language) is the です・ます coat painted over everything, regardless of who acts. The two cardinal rules: never honor your own actions (✗私がいらっしゃいます — you must humble: 私が参ります), and never humble the honored person's actions (✗どうぞ拝見してください — inviting them to view something is ご覧ください). Beyond whole-verb replacements, two productive formulas cover the rest: 尊敬語 お + masu-stem + になる / お + masu-stem + ください (お待ちください), and 謙譲語 お + masu-stem + する / いたす (お待ちいたします), with ご + sino-noun + する for compound verbs (ご案内します). The receiving side has its own respectful bridge: 〜ていただく (humbly receive a favor — 教えていただく), and its smoothest business form 〜ていただければ幸いです ('we would be grateful if you would ~'). A special trap is 二重敬語 — stacking two honorific markers on one verb: ✗お読みになられる, ✗拝見させていただく are classic over-politenes errors that even native speakers commit.",
    conjugation:
      "Respectful formula: お + masu-stem + になる / + ください.\n• Ichidan (食べる): お食べになる is grammatical but the set verb wins: 召し上がる.\n• Godan (待つ): お待ちになる (waits), お待ちください (please wait).\n• Irregular (する): なさる; (来る・行く・いる): いらっしゃる; (見る): ご覧になる; (言う): おっしゃる.\nHumble formula: お + masu-stem + する / いたす.\n• Ichidan (送る): お送りします (I will send [it to you]).\n• Godan (待つ): お待ちいたします (I will humbly wait / await you).\n• Irregular (する): いたす; (行く・来る): 参る / 伺う; (言う): 申す・申し上げる; (見る): 拝見する; (食べる・飲む・もらう): いただく.\n丁寧語: plain predicate + です / ます (美しいです, 書きます). 〜ていただく attaches to te-forms: 教えていただく, お話しいただく.",
    usage:
      "Keigo is the operating system of customer contact, business mail, interviews, and service industry speech — flights announce 安全にお着きになりますよう as a matter of course. Choosing the right layer signals social awareness: 尊敬語 for clients, teachers, seniors; 謙譲語 for your own actions and those of your in-group (your company's actions are humbled even when you are not the actor — 弊社がお送りします). 〜ていただく in requests (ご確認いただきますようお願いいたします) is the polite-bridge workhorse. Even native adults take refresher courses in this, so treat errors as normal stages, not embarrassments.",
    commonMistake:
      "Double keigo (二重敬語): ✗「お読みになられる」→ ✓「お読みになる」 (one honorific per verb). Honoring yourself: ✗「私がいらっしゃいます」→ humble it: ✓「私が参ります」. Humbling the honored guest: ✗「どうぞ拝見してください」→ ✓「どうぞご覧ください」. And ✗ treating 〜ていただく like a command: 説明していただく means 'I receive the favor of your explaining' — the favor framing is the whole point.",
    examples: [
      { jp: "社長はもうお帰りになりました。", en: "The company president has already gone home.", difficulty: "easy" },
      {
        jp: "田中先生がいらっしゃったら、このお茶をお出ししてください。",
        en: "When Professor Tanaka arrives, please serve this tea.",
        difficulty: "medium",
        note: "いらっしゃる = respectful come/be; お出しする = humble serve (your action toward the guest).",
      },
      {
        jp: "拝見した資料の内容について、今週中に私からご連絡差し上げますので、少々お待ちいただければ幸いです。",
        en: "Concerning the contents of the documents I have had the honor of reviewing, I will contact you myself within the week, so I would be grateful if you could kindly wait a little.",
        difficulty: "hard",
        note: "拝見する (humble viewing), 差し上げる (humble sending/giving), お待ちいただければ幸いです (grateful-if-you-could-wait) — three humble layers stacked correctly.",
      },
    ],
    exercises: [
      {
        question: "先生はもうこの資料を______でしょうか。（見る）  ('I wonder if the professor has already looked at these materials.')",
        answer: "ご覧になりました",
        hint: "Respectful form of 見る for the professor's action.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct polite invitation for a guest to VIEW something:",
        type: "multiple-choice",
        options: ["どうぞご覧ください", "どうぞ拝見してください", "どうぞお見えください", "どうぞ見られるになります"],
        answer: "どうぞご覧ください",
        hint: "Honor the guest's action — never humble it.",
      },
      {
        question: "私から資料をお送り______ます。  ('I will humbly send the documents from my side.')",
        answer: "し",
        hint: "Humble frame: お + masu-stem + ___する → お送りします.",
        type: "fill-blank",
      },
    ],
    order: 125,
  },
];

// ===== end of GRAMMAR_N3_B =====
