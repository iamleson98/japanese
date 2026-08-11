/**
 * EXPANDED_GRAMMAR — a pedagogically rich Japanese grammar curriculum
 * for the Nihongo Path learning app.
 *
 * Coverage:
 *  - N5 (lessons 1–12):  29 grammar points (covers all required particles, copula, polite/plain verb forms, comparisons, etc.)
 *  - N4 (lessons 13–18): 22 grammar points (conditionals, permission/obligation, giving/receiving, conjecture, sequencing, etc.)
 *  - N3 (lessons 19–25): 18 grammar points (possibility, seems-like patterns, auxiliary verb constructions, decisions/changes, casual speech, etc.)
 *
 * Each entry has: structure, meaning, a long rule, a conjugation note
 * (with verb-group explanations for verb-form patterns), usage notes,
 * a common mistake warning, 3 example sentences (easy → medium → hard),
 * and 2–3 fill-in-the-blank / multiple-choice exercises.
 *
 * Written original explanations inspired by Minna no Nihongo-style
 * progression. Explanations in English; examples in Japanese (kanji + kana).
 */

// ----------------------------- Type -----------------------------

export type ExpandedGrammar = {
  title: string;
  level: "N5" | "N4" | "N3";
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

// ----------------------------- N5 (Lessons 1–12) -----------------------------

export const EXPANDED_GRAMMAR: ExpandedGrammar[] = [
  // ===== Lesson 1: Greetings & Identification =====
  {
    title: "です (desu) — copula / identification",
    level: "N5",
    lesson: 1,
    chapter: "Greetings & Identification",
    structure: "Noun / Na-adjective stem + です",
    meaning: "is / am / are (polite copula)",
    rule:
      "です is the polite copula — it links a topic to a noun or na-adjective, equivalent to English 'is/am/are'. It carries no meaning on its own; it simply makes the sentence polite. In plain speech you can drop です entirely (学生だ / 学生). です does NOT conjugate like a verb — instead you attach でした (past), じゃない / ではありません (negative), or じゃなかった (past negative). Because です makes any noun/na-adjective sentence polite, it is the single most-used polite marker in beginner Japanese.",
    conjugation:
      "Not a verb — it conjugates as follows: present affirmative です (is), present negative じゃないです / ではありません (is not), past affirmative でした (was), past negative じゃなかったです / ではありませんでした (was not). Example: 学生です → 学生でした → 学生じゃなかったです. For i-adjectives, です is added at the end purely for politeness, but the adjective itself carries the tense (寒いです → 寒かったです, NOT ✗寒いでした).",
    usage:
      "Use です to identify things or describe them politely: 私は田中です (I'm Tanaka), これは本です (This is a book), この町は静かです (This town is quiet). It is the default register for talking to strangers, teachers, or anyone you are not close with. Without です the sentence is plain (casual) — fine with friends but blunt in formal contexts.",
    commonMistake:
      "Learners often say ✗「学生でした」for an i-adjective past like ✗「寒いでした」— wrong. For i-adjectives you change the adjective, not です: 寒かったです. です itself only changes tense when attached to NOUNS or na-adjectives.",
    examples: [
      { jp: "私は学生です。", en: "I am a student.", difficulty: "easy" },
      {
        jp: "ここは学校です。",
        en: "This is a school.",
        difficulty: "medium",
        note: "ここ (here) is the topic — what we are identifying.",
      },
      {
        jp: "田中先生は日本語の先生でした。",
        en: "Tanaka-sensei was a Japanese teacher.",
        difficulty: "hard",
        note: "Past tense of です is でした. Note the topic は marks Tanaka-sensei.",
      },
    ],
    exercises: [
      {
        question: "私は学生___。  (polite: 'I am a student.')",
        answer: "です",
        hint: "Polite copula for 'is/am/are'.",
        type: "fill-blank",
      },
      {
        question: "昨日は日曜日___。  (polite past: 'Yesterday was Sunday.')",
        answer: "でした",
        hint: "Past form of です.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct polite past form: 'It was a book.'",
        type: "multiple-choice",
        options: ["本でした", "本だでした", "本ですだった", "本のだった"],
        answer: "本でした",
      },
    ],
    order: 1,
  },
  {
    title: "は (wa) — topic marker",
    level: "N5",
    lesson: 1,
    chapter: "Greetings & Identification",
    structure: "Noun + は (+ Noun/Adjective + です/Verb)",
    meaning: "marks what the sentence is ABOUT ('as for ~')",
    rule:
      "は (written with the hiragana は but pronounced 'wa') marks the TOPIC of the sentence — what you are talking about. In '私は学生です' (As for me, I am a student), は makes 私 the topic. The comment that follows describes the topic. Topic ≠ subject grammatically: the topic is what the speaker wants to talk about, and the rest of the sentence gives information about it. は often replaces が or を, and stacks with other particles like には, では, とは.",
    conjugation:
      "No conjugation — は is a particle. It replaces the subject marker が (学生が → 学生は) or the object marker を (本を → 本は). You can also combine: には (to/at the topic), では (by/with the topic), とは (with/about the topic). Example: 学校に行く → 学校には行かない (As for school, I'm not going).",
    usage:
      "Use は to introduce a known or previously-mentioned topic, contrast (私の部屋はきれいですが、弟の部屋は汚い), or set the stage for the comment. In answers, replace the question's が with は: Q 誰が来ますか → A 山田さんは来ます (As for Yamada, he's coming). For NEW information (this just happened, look at THAT!) use が instead.",
    commonMistake:
      "Pronouncing it 'ha' instead of 'wa'. Also, overusing は with new information — for 'Wow, a bird is flying!' say 鳥が飛んでいる, NOT ✗鳥は飛んでいる. は implies the listener already knows the topic.",
    examples: [
      { jp: "私は田中です。", en: "I am Tanaka.", difficulty: "easy" },
      {
        jp: "この本は面白いです。",
        en: "This book is interesting.",
        difficulty: "medium",
        note: "この本 is the topic; 面白いです is the comment.",
      },
      {
        jp: "日本では、お正月に年賀状を送ります。",
        en: "In Japan, people send New Year's cards on New Year's.",
        difficulty: "hard",
        note: "では = で (place of action) + は (topic/contrast).",
      },
    ],
    exercises: [
      {
        question: "私___田中です。  ('As for me, I am Tanaka.')",
        answer: "は",
        hint: "Topic particle — written は, pronounced 'wa'.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct particle: 'As for Tokyo, it is big.' (東京___大きい。)",
        type: "multiple-choice",
        options: ["は", "が", "を", "に"],
        answer: "は",
      },
      {
        question: "Replace the wrong particle with は: ✗私がは田中です → ___",
        answer: "私は田中です",
        hint: "は replaces が, not stacks with it.",
        type: "fill-blank",
      },
    ],
    order: 2,
  },

  // ===== Lesson 2: Possession & Inclusion =====
  {
    title: "の (no) — possessive / noun modifier",
    level: "N5",
    lesson: 2,
    chapter: "Possession & Inclusion",
    structure: "Noun1 の Noun2",
    meaning: "'s / of / (noun that modifies another noun)",
    rule:
      "の connects two nouns, where Noun1 modifies Noun2 — showing possession, origin, category, location, or description. 私の本 (my book), 日本語の先生 (Japanese-language teacher), 東京の駅 (Tokyo's station / a station in Tokyo). It is the most versatile particle in Japanese because any noun phrase can modify any other noun via の. You can chain them: 私の友達の車 (my friend's car).",
    conjugation:
      "No conjugation — particle. Can be chained: A の B の C (A's B's C). Pronouns with の often drop the second noun when understood: これは私の（本）です (This is mine). Question word 誰の (whose) and どの (which ~) also use this pattern.",
    usage:
      "Use の for possession (私の車 = my car), material/category (木の家 = wooden house), location (学校の前 = in front of the school), and to nominalize a modifier. With question words: 誰の? (whose?), どの? (which ~?). When the modified noun is obvious, drop it: これは田中さんのです (This is Tanaka's).",
    commonMistake:
      "Trying to translate 'of' literally as の for English 'a friend of mine' → ✗私の友達の is wrong (just say 私の友達). Also, do not use の to connect adjectives to nouns (not ✗きれいの人) — i-adjectives connect directly (きれいな人 for na-adjectives).",
    examples: [
      { jp: "私の車です。", en: "It is my car.", difficulty: "easy" },
      {
        jp: "日本語の本を読みます。",
        en: "I read a Japanese(-language) book.",
        difficulty: "medium",
        note: "日本語の = 'Japanese-language' (a category modifier, not possession).",
      },
      {
        jp: "これは田中さんの傘ですか。",
        en: "Is this Tanaka-san's umbrella?",
        difficulty: "hard",
        note: "〜さんの傘 = Mr. Tanaka's umbrella. Note か makes it a question.",
      },
    ],
    exercises: [
      {
        question: "私___本を読みます。 ('I read my book.')",
        answer: "の",
        hint: "Possessive particle linking 私 and 本.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct option: 'This is Yamada's pen.' (これは山田さん___のペンです。)",
        type: "multiple-choice",
        options: ["の", "が", "を", "と"],
        answer: "の",
      },
      {
        question: "Combine: 私 + 友達 + 車 → ___ (my friend's car)",
        answer: "私の友達の車",
        hint: "Chain の between each noun.",
        type: "fill-blank",
      },
    ],
    order: 3,
  },
  {
    title: "も (mo) — also / too",
    level: "N5",
    lesson: 2,
    chapter: "Possession & Inclusion",
    structure: "Noun + も (+ です / Verb)",
    meaning: "also / too / as well",
    rule:
      "も REPLACES は, が, or を to say 'also/too'. 私も学生です = I am also a student (replaces 私は). When stacking with other particles like に, で, と, も follows them: 学校にも行く (go to school too), バスでも行く (go by bus too). With quantities も emphasizes 'as many as / as few as': 三つもある (as many as three!).",
    conjugation:
      "No conjugation — particle. Replaces は/が/を but stacks AFTER に/で/と/へ/から/まで: 日本へも行く (go to Japan too), 友達とも遊ぶ (play with a friend too). For numbers/quantities: 三つもある = as many as three! (exclamatory).",
    usage:
      "Use も to add someone/something to a previously-mentioned set: 田中さんは学生です。山田さんも学生です (Tanaka is a student. Yamada is a student too). Negative form with も means 'not ~ either': 私も行かない (I won't go either).",
    commonMistake:
      "Saying ✗私はも学生です — も REPLACES は, not stacks. Correct: 私も学生です. Also, accidentally saying ✗私がも行く instead of 私も行く.",
    examples: [
      { jp: "私も行きます。", en: "I will go too.", difficulty: "easy" },
      {
        jp: "田中さんは英語を話します。山田さんも話します。",
        en: "Tanaka speaks English. Yamada does too.",
        difficulty: "medium",
        note: "も replaces を in the second sentence (山田さんは英語も話します would mean 'Yamada also speaks English' (among other languages)).",
      },
      {
        jp: "日本へも行きたいし、韓国へも行きたい。",
        en: "I want to go to Japan, and I also want to go to Korea.",
        difficulty: "hard",
        note: "へも = direction particle へ + も (also).",
      },
    ],
    exercises: [
      {
        question: "私___学生です。  ('I am ALSO a student.')",
        answer: "も",
        hint: "Replaces は.",
        type: "fill-blank",
      },
      {
        question: "Fill the blank: 田中さんはコーヒーを飲みます。山田さん___飲みます。",
        answer: "も",
        hint: "'Yamada also drinks (coffee).'",
        type: "fill-blank",
      },
      {
        question: "Choose the correct sentence for 'I will go to school too.'",
        type: "multiple-choice",
        options: ["学校にも行きます。", "学校はも行きます。", "学校がも行きます。", "学校もに行きます。"],
        answer: "学校にも行きます。",
      },
    ],
    order: 4,
  },

  // ===== Lesson 3: Subject Marker & Questions =====
  {
    title: "が (ga) — subject marker (and は vs が)",
    level: "N5",
    lesson: 3,
    chapter: "Subject Marker & Questions",
    structure: "Noun が (+ Verb / です)",
    meaning: "marks the grammatical subject / new information",
    rule:
      "が marks the SUBJECT of an action or state — the doer of the verb or what is being described. It is most often used for: NEW information the listener doesn't yet know (look at THAT!), answers to question words like 誰/何/どこ (誰が来ますか？山田さんが来ます), subjects of subordinate clauses (私が買った本 = the book I bought), and with stative verbs like わかる/ある/できる (日本語がわかる = I understand Japanese). Crucially が marks the NEW info, while は marks the GIVEN/KNOWN topic.",
    conjugation:
      "No conjugation — particle. Often pairs with question words: 誰が? 何が? どれが? In answers, replace the question word with the specific noun + が: 誰が来ますか？→ 田中さんが来ます. が is replaced by は when the subject becomes the topic of further discussion.",
    usage:
      "Use が for: (1) NEW information presented for the first time (あ、雨が降っている！— Oh, it's raining!), (2) answers to 誰/何/どこ questions, (3) the subject of relative clauses (私が書いた手紙 = the letter I wrote), (4) with verbs of liking/ability/understanding (犬が好き, 日本語がわかる). Use は when the topic is already known or to contrast.",
    commonMistake:
      "Confusing は and が: 'What is that?' is あれは何ですか (topic known, asking for comment), but the ANSWER is あれは本です OR あれが... in some contexts. A safe rule: 新しい情報 = が, 既知の話題 = は. Saying ✗誰は来ますか is wrong — question words cannot be marked by は.",
    examples: [
      { jp: "誰が来ますか。", en: "Who is coming?", difficulty: "easy" },
      {
        jp: "私が書いた本はベストセラーになりました。",
        en: "The book I wrote became a bestseller.",
        difficulty: "medium",
        note: "私が = subject of the relative clause 'that I wrote'; the book (本) is the topic with は.",
      },
      {
        jp: "あ、バスが来た！",
        en: "Ah, the bus has come!",
        difficulty: "hard",
        note: "NEW information presented for the first time — が, not は.",
      },
    ],
    exercises: [
      {
        question: "___が来ますか。 山田さん___来ます。 ('Who is coming? Yamada is.')",
        answer: "誰, が",
        hint: "Question word takes が; the answer also takes が.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct particle: 'Wow, it's raining!' (あ、雨___降っている！)",
        type: "multiple-choice",
        options: ["が", "は", "を", "で"],
        answer: "が",
      },
      {
        question: "Fill the blank: 私___買った車は赤いです。 ('The car I bought is red.')",
        answer: "が",
        hint: "Subject of the relative clause 'that I bought'.",
        type: "fill-blank",
      },
    ],
    order: 5,
  },
  {
    title: "か (ka) — question particle",
    level: "N5",
    lesson: 3,
    chapter: "Subject Marker & Questions",
    structure: "Sentence + か",
    meaning: "turns a statement into a yes/no question",
    rule:
      "Adding か to the end of a sentence makes it a question. In polite speech (〜ます/〜です), か is the standard way to form a question and often replaces the question mark. For Wh-questions (誰, 何, どこ, いつ, なぜ, どう), the question word goes inside the sentence and か still marks the end. In casual speech か can sound rough or masculine, so rising intonation alone is more common (これ本？).",
    conjugation:
      "No conjugation — sentence-final particle. Polite: これ本ですか (Is this a book?). Casual: これ本？(rising intonation, no か). For Wh-questions: これは何ですか (What is this?). Negative question: 行きませんか (Won't you go?).",
    usage:
      "Use か in polite speech at the end of any statement to make it a question. In casual speech you can omit か and rely on rising intonation, but か is still needed in formal writing or for rhetorical questions. Combined with どう (how) it forms どうですか (How about ~? / Would you like ~?).",
    commonMistake:
      "In casual speech, ending every question with か sounds blunt or like a masculine detective (これ本か？). For natural casual questions, just use rising intonation (これ本？). Also, do NOT add a question mark AND か in formal writing — choose one.",
    examples: [
      { jp: "これは本ですか。", en: "Is this a book?", difficulty: "easy" },
      {
        jp: "田中さんは学生ですか。",
        en: "Is Tanaka-san a student?",
        difficulty: "medium",
        note: "Polite yes/no question formed by adding か.",
      },
      {
        jp: "週末に何をしましたか。",
        en: "What did you do over the weekend?",
        difficulty: "hard",
        note: "Wh-question word 何 inside the sentence + か at the end.",
      },
    ],
    exercises: [
      {
        question: "これは本です___。  ('Is this a book?')",
        answer: "か",
        hint: "Question particle at the end of the sentence.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct polite question form: 'Is Tanaka-san a student?'",
        type: "multiple-choice",
        options: ["田中さんは学生ですか。", "田中さんは学生かです。", "か田中さんは学生です。", "田中さんは学生ですかか。"],
        answer: "田中さんは学生ですか。",
      },
      {
        question: "Fill the blank: 週末に何をしました___？ ('What did you do over the weekend?')",
        answer: "か",
        hint: "Ends the Wh-question.",
        type: "fill-blank",
      },
    ],
    order: 6,
  },

  // ===== Lesson 4: Sentence-ending particles =====
  {
    title: "ね (ne) — sentence-ending particle (seeking agreement)",
    level: "N5",
    lesson: 4,
    chapter: "Sentence-ending Particles",
    structure: "Sentence + ね",
    meaning: "isn't it? / right? (seeks agreement)",
    rule:
      "ね at the end of a sentence invites the listener to agree or share the speaker's feeling — 'nice weather, isn't it?'. It softens the sentence and signals shared experience. ね can also be used as a conversational filler (like 'right?' or 'let's see...'). When combined with よ you get よね = '..., right?' — confirming something the listener probably knows.",
    conjugation:
      "No conjugation — sentence-final particle. Can stack with か (かね — used by older speakers, means 'isn't it?') or with よ (よね = '..., right?'). Example: いい天気ですね (Nice weather, isn't it?) / 行きますよね (You're going, right?).",
    usage:
      "Use ね to: (1) confirm shared understanding or seek agreement (いい天気ですね), (2) soften requests (これ、お願いしますね), (3) react to the listener's news (そうですね = 'I see / let me think'). With a rising intonation ね genuinely asks for confirmation.",
    commonMistake:
      "Saying only ✗「いい天気ですね。」as a real question expecting an answer — ね is rhetorical. To really ASK if it's nice weather, drop ね: いい天気ですか？ Also, do NOT overuse ね with superiors in business — too many ね can sound too familiar.",
    examples: [
      { jp: "いい天気ですね。", en: "Nice weather, isn't it?", difficulty: "easy" },
      {
        jp: "明日、来ますね。",
        en: "You're coming tomorrow, right?",
        difficulty: "medium",
        note: "Confirms expectation; rising intonation can make it a real check.",
      },
      {
        jp: "この本、なかなか面白いですね。",
        en: "This book is quite interesting, isn't it?",
        difficulty: "hard",
        note: "なかなか + positive adj = 'quite/fairly'; ね seeks the listener's agreement.",
      },
    ],
    exercises: [
      {
        question: "いい天気です___。  ('Nice weather, isn't it?')",
        answer: "ね",
        hint: "Seeks agreement.",
        type: "fill-blank",
      },
      {
        question: "Choose the particle: 'You're coming tomorrow, right?' (明日、来ます___。)",
        type: "multiple-choice",
        options: ["ね", "が", "を", "で"],
        answer: "ね",
      },
      {
        question: "Combine よ + ね into the form that means '..., right?': 明日来る___。",
        answer: "よね",
        hint: "Stack よ and ね.",
        type: "fill-blank",
      },
    ],
    order: 7,
  },
  {
    title: "よ (yo) — sentence-ending particle (new info / assertion)",
    level: "N5",
    lesson: 4,
    chapter: "Sentence-ending Particles",
    structure: "Sentence + よ",
    meaning: "I'm telling you (info new to the listener)",
    rule:
      "よ asserts information that the speaker believes the listener does NOT know — 'I'm telling you ~'. It gives the sentence an instructive or assertive nuance. Combined with ね you get よね ('..., right?' — confirming shared knowledge). よ can soften warnings (気をつけてよ) or add emphasis to factual statements.",
    conjugation:
      "No conjugation — sentence-final particle. Can stack with ね (よね) to mean '..., right?' Example: これ、美味しいですよ (This is delicious, you know) / 行きますよね (You're going, right?).",
    usage:
      "Use よ to provide new information (明日は休みですよ = Tomorrow is a day off, you know), warn or remind (遅刻するよ = You'll be late!), and emphasize a fact. Be careful with superiors: too much よ can sound preachy.",
    commonMistake:
      "Using よ when reporting obvious shared facts. For known information, ね is more appropriate. Also, ✗これ美味しいよです — よ comes at the very END, after です/ます.",
    examples: [
      { jp: "これ、美味しいですよ。", en: "This is delicious, you know.", difficulty: "easy" },
      {
        jp: "明日は休みですよ。",
        en: "Tomorrow is a day off, you know.",
        difficulty: "medium",
        note: "Asserting info the listener may not know.",
      },
      {
        jp: "その電車、もう行っちゃったよ。",
        en: "That train has already left, you know.",
        difficulty: "hard",
        note: "行っちゃった = casual contraction of 行ってしまった (regret/completion).",
      },
    ],
    exercises: [
      {
        question: "これ、美味しいです___。  ('This is delicious, you know.')",
        answer: "よ",
        hint: "Asserts new info to the listener.",
        type: "fill-blank",
      },
      {
        question: "Choose the particle: 'Tomorrow is a day off, you know.' (明日は休みです___。)",
        type: "multiple-choice",
        options: ["よ", "ね", "が", "で"],
        answer: "よ",
      },
      {
        question: "Choose the combined form for 'You're coming tomorrow, right?': 明日来ます___。",
        type: "multiple-choice",
        options: ["よね", "よの", "ねよ", "よが"],
        answer: "よね",
      },
    ],
    order: 8,
  },

  // ===== Lesson 5: Objects & Time/Place =====
  {
    title: "を (o) — object marker",
    level: "N5",
    lesson: 5,
    chapter: "Objects & Time/Place",
    structure: "Noun (direct object) を + Transitive Verb",
    meaning: "marks the direct object (the thing acted upon)",
    rule:
      "を (written with hiragana を, pronounced 'o') marks the direct object of a transitive verb — the thing receiving the action. ご飯を食べる (eat rice), 本を読む (read a book), 音楽を聴く (listen to music). を is NEVER used for the subject (use が for that). It is also used with verbs of motion through a place (道を歩く = walk along the street; 空を飛ぶ = fly through the sky) and with verbs of departure (電車を降りる = get off the train).",
    conjugation:
      "No conjugation — particle. Replaced by は for topicalization (ご飯は食べる = 'as for the rice, I'll eat it') or by も for inclusion (ご飯も食べる = 'I also eat rice'). With motion-through verbs: 道を渡る (cross the street), 公園を散歩する (stroll through the park).",
    usage:
      "Use を whenever a verb acts on a direct object: 水を飲む, メールを書く, テレビを見る. With verbs of motion through/along a place: 橋を渡る (cross the bridge), 階段を下りる (go down the stairs). With verbs of leaving: 家を出る (leave the house).",
    commonMistake:
      "Confusing subject and object: ✗「私を学生です」 is wrong — 私 is the SUBJECT here, use は (私は学生です). Also, learners forget that を can mark a place of motion: ✗「道で歩く」 should be 道を歩く (walking ALONG the road, not AT the road).",
    examples: [
      { jp: "ご飯を食べます。", en: "I eat a meal.", difficulty: "easy" },
      {
        jp: "毎日、日本語を勉強しています。",
        en: "I study Japanese every day.",
        difficulty: "medium",
        note: "日本語 is the object being studied.",
      },
      {
        jp: "この橋を渡ると、駅があります。",
        en: "If you cross this bridge, there's a station.",
        difficulty: "hard",
        note: "を marks the path of motion — 橋を渡る = cross the bridge.",
      },
    ],
    exercises: [
      {
        question: "ご飯___食べます。  ('I eat a meal.')",
        answer: "を",
        hint: "Object particle — pronounced 'o'.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct particle: 'I read a book.' (本___読む。)",
        type: "multiple-choice",
        options: ["を", "が", "は", "で"],
        answer: "を",
      },
      {
        question: "Fill the blank: 道___歩く。  ('walk ALONG the street')",
        answer: "を",
        hint: "を marks the path of motion-through.",
        type: "fill-blank",
      },
    ],
    order: 9,
  },
  {
    title: "に (ni) — time / destination / target / indirect object",
    level: "N5",
    lesson: 5,
    chapter: "Objects & Time/Place",
    structure: "Noun (time/place/person) に + Verb",
    meaning: "at / on / to / for (time, destination, indirect object, location of existence)",
    rule:
      "に has MANY uses, the four most common being: (1) a specific point in time (7時に起きる = wake up at 7, 3月に = in March), (2) the destination of a movement verb (学校に行く = go to school, 家に帰る = go home), (3) the indirect object / recipient (先生に会う = meet the teacher, 友達に本をあげる = give a friend a book), (4) the location of existence with ある/いる (家にいる = be at home, 机の上に本がある = there is a book on the desk). に is also used for the purpose of an action (買い物に行く = go shopping) and for the agent in a passive sentence (私に褒められた = was praised by me).",
    conjugation:
      "No conjugation — particle. Stacks with は (には = 'as for at ~'), も (にも = 'at ~ too'), は replacing the focus. Example: 学校に行く → 学校には行かない (As for school, I'm not going). Note: NOT used with relative time words like 今日, 明日, 毎日, 昨日 — these take no particle.",
    usage:
      "Use に for: clock times (3時に), specific dates (3日に), months (3月に), destinations of movement (日本に行く), recipients (母に花をあげる), and existence (ここにいる). Do NOT use に with relative time words (今日, 明日, 毎日, 来週, 今) — these stand alone.",
    commonMistake:
      "Adding に to relative time words: ✗「明日に行く」 is wrong — just 明日行く. Also confusing destination に with location-of-action で: 学校に行く (go TO school) vs 学校で勉強する (study AT school). For existence (いる/ある) always use に, not で.",
    examples: [
      { jp: "7時に起きます。", en: "I wake up at 7.", difficulty: "easy" },
      {
        jp: "学校に行きます。",
        en: "I go to school.",
        difficulty: "medium",
        note: "Destination of movement — 学校に (to school).",
      },
      {
        jp: "母に誕生日のプレゼントをあげました。",
        en: "I gave my mother a birthday present.",
        difficulty: "hard",
        note: "母に = recipient (indirect object); プレゼントを = direct object.",
      },
    ],
    exercises: [
      {
        question: "7時___起きます。 ('I wake up at 7.')",
        answer: "に",
        hint: "Marks specific clock time.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct particle: 'I go to school.' (学校___行く。)",
        type: "multiple-choice",
        options: ["に", "で", "を", "が"],
        answer: "に",
      },
      {
        question: "Choose the correct particle: 'I study Japanese every day.' (毎日___日本語を勉強します。)",
        type: "multiple-choice",
        options: ["(no particle)", "に", "で", "を"],
        answer: "(no particle)",
        hint: "Relative time words (毎日, 今日, 明日) take NO particle.",
      },
    ],
    order: 10,
  },

  // ===== Lesson 6: Means & With =====
  {
    title: "で (de) — means / location of action / scope",
    level: "N5",
    lesson: 6,
    chapter: "Means & With",
    structure: "Noun で + Verb",
    meaning: "by means of / at (location of action) / using",
    rule:
      "で has three core uses: (1) the means or tool of an action (バスで行く = go by bus; ペンで書く = write with a pen; 日本語で話す = speak in Japanese), (2) the location where an action occurs (図書館で勉強する = study AT the library; キッチンで料理する = cook in the kitchen), and (3) the scope of a superlative (クラスで一番 = the best in the class). For existence (いる/ある) you do NOT use で — use に instead.",
    conjugation:
      "No conjugation — particle. Stacks with は (では = 'at/by ~' as topic): 図書館では話さない (As for at the library, I don't talk). For 'by means of': バスで, 電車で, 車で, 自転車で, 徒歩で (on foot). For 'language/tool': 日本語で, 英語で, ペンで, パソコンで.",
    usage:
      "Use で to express: HOW you do something (means/transport/tool), WHERE an action takes place (location-of-action — not existence!), and the SCOPE of a superlative (一番). For locations of existence (something/someone IS there) use に instead.",
    commonMistake:
      "Saying ✗「家でいる」 for 'I'm at home' — existence uses に: 家にいる. で is for ACTIONS at a place: 家で勉強する (study AT home). Also, confusing に (destination) and で (location of action): 学校に行く (go TO) vs 学校で勉強する (study AT).",
    examples: [
      { jp: "電車で行きます。", en: "I go by train.", difficulty: "easy" },
      {
        jp: "カフェでコーヒーを飲みます。",
        en: "I drink coffee at a cafe.",
        difficulty: "medium",
        note: "で marks the place where the drinking happens.",
      },
      {
        jp: "日本語で「ありがとう」と言ってみてください。",
        en: "Please try saying 'thank you' in Japanese.",
        difficulty: "hard",
        note: "日本語で = 'in/using Japanese' (means/language).",
      },
    ],
    exercises: [
      {
        question: "電車___行きます。 ('I go by train.')",
        answer: "で",
        hint: "Marks means/transport.",
        type: "fill-blank",
      },
      {
        question: "Choose the particle: 'I study at the library.' (図書館___勉強する。)",
        type: "multiple-choice",
        options: ["で", "に", "を", "が"],
        answer: "で",
      },
      {
        question: "Fill the blank: 日本語___話してください。 ('Please speak in Japanese.')",
        answer: "で",
        hint: "Means/language.",
        type: "fill-blank",
      },
    ],
    order: 11,
  },
  {
    title: "と (to) — and / with",
    level: "N5",
    lesson: 6,
    chapter: "Means & With",
    structure: "Noun と Noun / Noun と + Verb",
    meaning: "and (connecting nouns) / together with",
    rule:
      "と has two main uses: (1) 'and' between nouns to make an EXHAUSTIVE list — 本とペン (a book and a pen, implying nothing else), (2) 'together with' marking a companion — 友達と行く (go with a friend). For an open-ended list use や instead. と also introduces quoted speech/thought (〜と言う = say that ~, 〜と思う = think that ~) and the conditional 'if/when' (different grammar point).",
    conjugation:
      "No conjugation — particle. For exhaustive listing: A と B と C (and that's all). For companionship: 友達と (with a friend), 家族と (with family). For quotation: 「はい」と言う (say 'yes'), 日本語は難しいと思う (think that Japanese is difficult).",
    usage:
      "Use と for exhaustive lists (りんごとみかんを買った = I bought apples and mandarins — and only those), to mark a companion (彼と映画を見た = I watched a movie with him), and to introduce quoted speech (彼は「行く」と言った = He said 'I'm going'). For non-exhaustive lists, use や〜など.",
    commonMistake:
      "Using と where you mean a non-exhaustive list: ✗「机の上に本とペンがある」 (sounds like ONLY books and pens are there) — for 'books and pens (among other things)' use や: 机の上に本やペンがある. Also, do NOT use と to connect adjectives or verbs — only nouns.",
    examples: [
      { jp: "りんごとみかんを買いました。", en: "I bought apples and mandarins.", difficulty: "easy" },
      {
        jp: "友達と映画を見に行きます。",
        en: "I'm going to see a movie with a friend.",
        difficulty: "medium",
        note: "と = 'with' (companion); exhaustive list use would mean '(only) with a friend'.",
      },
      {
        jp: "彼は明日来ると言っていました。",
        en: "He was saying that he would come tomorrow.",
        difficulty: "hard",
        note: "と introduces the quoted content '明日来る' before 言う.",
      },
    ],
    exercises: [
      {
        question: "りんご___みかんを買いました。 ('I bought apples and mandarins.')",
        answer: "と",
        hint: "Exhaustive 'and' between nouns.",
        type: "fill-blank",
      },
      {
        question: "Choose the particle: 'I went with a friend.' (友達___行った。)",
        type: "multiple-choice",
        options: ["と", "に", "で", "を"],
        answer: "と",
      },
      {
        question: "Fill the blank: 彼は「こんにちは」___言いました。 ('He said \"hello\".')",
        answer: "と",
        hint: "Quotation marker.",
        type: "fill-blank",
      },
    ],
    order: 12,
  },

  // ===== Lesson 7: From/Until, Direction, Open Lists =====
  {
    title: "から (kara) — from / because",
    level: "N5",
    lesson: 7,
    chapter: "From/Until & Direction",
    structure: "[Noun/Time] から (+ まで) / [Plain clause] から",
    meaning: "from (place/time) / because",
    rule:
      "から has two major meanings: (1) 'from' — marks the starting point of time or space (9時から始まる = starts from 9, 駅から歩く = walk from the station, 日本から来ました = I came from Japan); (2) 'because' — gives the reason for the following clause (寒いから、窓を閉める = it's cold, so I'll close the window). から is more casual than the formal ので. With まで (until) it forms the from-to pattern: 9時から5時まで (from 9 to 5).",
    conjugation:
      "No conjugation — particle/conjunction. For 'from': 駅から (from the station), 9時から (from 9 o'clock), 日本から (from Japan). For 'because': attach to the PLAIN form of verbs/adjectives/nouns (寒いから, 雨が降っているから, 学生だから — note だ needed for nouns/na-adj).",
    usage:
      "Use から for time/place starting points (朝から夜まで働く = work from morning to night), origin (私は東京から来ました = I come from Tokyo), and to give reasons (忙しいから行けない = I'm busy, so I can't go). In casual speech から is the most common way to say 'because'.",
    commonMistake:
      "For nouns/na-adjectives, you must add だ before から: ✗「学生から行く」(nonsense) — for 'because I'm a student' say 学生だから. For 'because the room is quiet' (na-adj): 部屋が静だから, NOT ✗静から.",
    examples: [
      { jp: "9時から始まります。", en: "It starts from 9 o'clock.", difficulty: "easy" },
      {
        jp: "寒いから、ドアを閉めてください。",
        en: "It's cold, so please close the door.",
        difficulty: "medium",
        note: "Reason から = 'because'.",
      },
      {
        jp: "駅から会社まで歩いて行きます。",
        en: "I walk from the station to the office.",
        difficulty: "hard",
        note: "から〜まで = from ... to ....",
      },
    ],
    exercises: [
      {
        question: "9時___始まります。  ('It starts from 9.')",
        answer: "から",
        hint: "Marks a starting point in time.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct option: 'It's cold, so I'll close the window.' (寒い___、窓を閉める。)",
        type: "multiple-choice",
        options: ["から", "まで", "に", "で"],
        answer: "から",
      },
      {
        question: "Fill the blank: 駅___会社___歩く。 ('walk from the station to the office.') — fill both blanks.",
        answer: "から, まで",
        hint: "From ... to ... pattern.",
        type: "fill-blank",
      },
    ],
    order: 13,
  },
  {
    title: "まで (made) — until / up to",
    level: "N5",
    lesson: 7,
    chapter: "From/Until & Direction",
    structure: "Time/Place + まで",
    meaning: "until / up to / as far as",
    rule:
      "まで marks the END point in time or space. 9時まで働く = work UNTIL 9. 駅まで走る = run as far as the station. Often paired with から: 9時から5時まで (from 9 to 5). まで can also mean 'even' in emphatic contexts (子供までわかる = even a child understands).",
    conjugation:
      "No conjugation — particle. Common patterns: 時間まで (until [time]), 場所まで (as far as [place]), A から B まで (from A to B). For emphasis 'even': 子供まで (even a child), あなたまで (even you).",
    usage:
      "Use まで to mark an end point in time (5時まで = until 5), an end point in space (駅まで = as far as the station), or to add emphasis meaning 'even' (君まで裏切るのか = even YOU betray me?). Combined with から for from-to ranges: 月曜日から金曜日まで (Monday through Friday).",
    commonMistake:
      "Confusing まで (endpoint) with に (specific time): 5時まで働く = work UNTIL 5 (continuous), 5時に終わる = finish AT 5 (specific). Also, do not use まで with relative time words like 今日まで — instead say 今日までずっと (up through today).",
    examples: [
      { jp: "5時まで働きます。", en: "I work until 5.", difficulty: "easy" },
      {
        jp: "駅まで走っていきましょう。",
        en: "Let's run to the station.",
        difficulty: "medium",
        note: "まで marks the spatial endpoint.",
      },
      {
        jp: "月曜日から金曜日まで学校があります。",
        en: "There is school from Monday to Friday.",
        difficulty: "hard",
        note: "から〜まで brackets the time range.",
      },
    ],
    exercises: [
      {
        question: "5時___働きます。  ('I work until 5.')",
        answer: "まで",
        hint: "Marks endpoint in time.",
        type: "fill-blank",
      },
      {
        question: "Choose the particle: 'run as far as the station' (駅___走る。)",
        type: "multiple-choice",
        options: ["まで", "から", "に", "で"],
        answer: "まで",
      },
      {
        question: "Combine: 月曜日___金曜日___学校がある。 ('There is school from Monday to Friday.')",
        answer: "から, まで",
        hint: "from ... to ... pattern.",
        type: "fill-blank",
      },
    ],
    order: 14,
  },
  {
    title: "へ (e) — direction particle",
    level: "N5",
    lesson: 7,
    chapter: "From/Until & Direction",
    structure: "Place + へ + Verb of motion",
    meaning: "indicates destination / direction of movement",
    rule:
      "へ (written with the hiragana へ, pronounced 'e') marks the destination or direction of a movement verb like 行く, 来る, 帰る, 戻る. With movement verbs, へ and に are interchangeable (日本へ行く = 日本に行く). へ emphasizes the DIRECTION of motion ('toward'), while に emphasizes the DESTINATION ('to arrive at'). へ is slightly more literary/formal than に.",
    conjugation:
      "No conjugation — particle. With motion verbs: 日本へ行く (go to Japan), 家へ帰る (go home), 上へ下へ (up and down). Stacks with は (へは) or も (へも): 日本へも行く (go to Japan too).",
    usage:
      "Use へ (or に) with movement verbs to mark destination: 右へ曲がる (turn right), 北へ進む (proceed north), 学校へ行く (go to school). For more abstract 'to' (giving something to someone), に is preferred: 先生に本をあげる (give the teacher a book) — NOT へ.",
    commonMistake:
      "Pronouncing it 'he' instead of 'e'. Also, using へ with non-movement verbs: ✗「私へ本をください」 — use に: 私に本をください. へ is reserved for movement/direction.",
    examples: [
      { jp: "日本へ行きます。", en: "I'm going to Japan.", difficulty: "easy" },
      {
        jp: "家へ帰りましょう。",
        en: "Let's go home.",
        difficulty: "medium",
        note: "帰る is a movement verb; へ marks the destination.",
      },
      {
        jp: "次の角を右へ曲がってください。",
        en: "Please turn right at the next corner.",
        difficulty: "hard",
        note: "右へ曲がる = turn (towards the) right.",
      },
    ],
    exercises: [
      {
        question: "日本___行きます。  ('I'm going to Japan.')",
        answer: "へ",
        hint: "Direction particle — pronounced 'e'.",
        type: "fill-blank",
      },
      {
        question: "Choose the particle: 'go home' (家___帰る。)",
        type: "multiple-choice",
        options: ["へ", "が", "を", "で"],
        answer: "へ",
      },
      {
        question: "Choose the correct pronunciation of the particle in 日本へ行く.",
        type: "multiple-choice",
        options: ["e", "he", "wa", "wo"],
        answer: "e",
      },
    ],
    order: 15,
  },
  {
    title: "や / など (ya / nado) — non-exhaustive list",
    level: "N5",
    lesson: 7,
    chapter: "From/Until & Direction",
    structure: "Noun や Noun (+ など)",
    meaning: "things such as A and B (open-ended list)",
    rule:
      "や links nouns in a NON-exhaustive list — 'A and B (among others)'. と lists are exhaustive (ONLY A and B); や lists leave open the possibility of more. など (nado) often follows a や list to emphasize 'etc.' / 'and so on'. 机の上に本やペンがある = there are books, pens, and (other things) on the desk.",
    conjugation:
      "No conjugation — particles. Pattern: A や B や C (A, B, C, etc.). Add など after the last noun for emphasis: A や B など (things like A and B). Can also use など alone: 本など (books and such).",
    usage:
      "Use や for non-exhaustive lists: 肉や魚を食べる (eat things like meat and fish), 日本語や英語を勉強する (study languages like Japanese and English). Add など to make the 'etc.' explicit: 机の上に本やペンなどがある.",
    commonMistake:
      "Confusing と and や: と = exhaustive (ONLY these), や = non-exhaustive (these among others). Saying ✗「肉と魚を食べる」 for 'I eat things like meat and fish' is too restrictive — use や. Conversely, ✗「田中と山田は来た」 (should mean Tanaka and Yamada came, exhaustive) — if others might also have come, use や.",
    examples: [
      { jp: "机の上に本やペンがあります。", en: "There are books, pens, etc. on the desk.", difficulty: "easy" },
      {
        jp: "肉や魚を食べます。",
        en: "I eat things like meat and fish.",
        difficulty: "medium",
        note: "や implies the list is not exhaustive.",
      },
      {
        jp: "東京や大阪などの大都市に住みたいです。",
        en: "I'd like to live in a big city like Tokyo or Osaka.",
        difficulty: "hard",
        note: "や + など = emphatic 'things like A and B'.",
      },
    ],
    exercises: [
      {
        question: "机の上に本___ペンがあります。  ('There are books, pens, etc. on the desk.')",
        answer: "や",
        hint: "Non-exhaustive 'and'.",
        type: "fill-blank",
      },
      {
        question: "Choose the particle for a non-exhaustive list: 肉___魚___食べる",
        type: "multiple-choice",
        options: ["や / や", "と / と", "で / で", "に / に"],
        answer: "や / や",
      },
      {
        question: "Add など to make 'etc.' explicit: 東京___大阪___住みたい。  (just add など after 大阪)",
        answer: "東京や大阪などに住みたい",
        hint: "や for non-exhaustive, など to emphasize 'etc.'.",
        type: "fill-blank",
      },
    ],
    order: 16,
  },

  // ===== Lesson 8: Polite Verbs (masu form) =====
  {
    title: "〜ます (masu) — polite verb (+ negative ません, past ました)",
    level: "N5",
    lesson: 8,
    chapter: "Polite Verbs",
    structure: "Verb (masu-stem) + ます / ません / ました / ませんでした",
    meaning: "polite non-past form of verbs",
    rule:
      "ます attaches to the masu-stem of a verb to make a polite PRESENT/FUTURE form. It has 4 forms: 〜ます (affirmative non-past), 〜ません (negative non-past), 〜ました (affirmative past), 〜ませんでした (negative past). ます is the standard polite register for talking to teachers, strangers, superiors, or in formal settings. The plain counterparts are: dictionary form (e.g. 食べる), 〜ない (e.g. 食べない), 〜た (e.g. 食べた), 〜なかった (e.g. 食べなかった).",
    conjugation:
      "Verb groups (memorize these — they govern ALL conjugation):\n• Ichidan (ru-verbs): end in -eru or -iru; drop る to get the stem. 食べる → 食べます, 見る → 見ます, 起きる → 起きます.\n• Godan (u-verbs): end in a consonant + う (く, す, つ, ぬ, ぶ, む, る, ぐ, う). Change the final う-vowel to the い-vowel (i-row), then add ます. 行く → 行きます, 読む → 読みます, 買う → 買います, 話す → 話します.\n• Irregular: する → します, 来る → 来ます (kimasu).\nMasu-form conjugations: 食べます → 食べません (neg) → 食べました (past) → 食べませんでした (neg past).",
    usage:
      "Use 〜ます as your default polite verb form with strangers, teachers, and superiors. It is also the form used in textbooks, news broadcasts, and most written prose aimed at a general audience. For casual speech with friends, drop ます and use the plain form.",
    commonMistake:
      "Misclassifying verbs: '見る' looks like a godan verb ending in る but is Ichidan (drop る → 見ます), while '走る' (hashiru) is Godan (走ります, NOT ✗走ます). When in doubt, check a dictionary. Also, ✗「食べませんでした」 sometimes mis-conjugated as ✗「食べませんでした」 — that one is correct, but ✗「食べませんだった」is WRONG.",
    examples: [
      { jp: "毎日、日本語を勉強します。", en: "I study Japanese every day.", difficulty: "easy" },
      {
        jp: "昨日、映画を見ました。",
        en: "Yesterday I watched a movie.",
        difficulty: "medium",
        note: "見ました = past affirmative of 見る (ichidan: drop る, add ました).",
      },
      {
        jp: "田中さんは肉を食べませんが、魚は食べます。",
        en: "Tanaka doesn't eat meat, but he eats fish.",
        difficulty: "hard",
        note: "食べません = negative non-past; 食べます = affirmative.",
      },
    ],
    exercises: [
      {
        question: "毎日、日本語を勉強___。  ('I study Japanese every day.')",
        answer: "します",
        hint: "Polite non-past of する (irregular).",
        type: "fill-blank",
      },
      {
        question: "Choose the correct masu-form of 書く (to write):",
        type: "multiple-choice",
        options: ["書きます", "書ます", "書きします", "書くます"],
        answer: "書きます",
      },
      {
        question: "Fill the blank with the past affirmative: 昨日、映画を見___。 ('Yesterday I watched a movie.')",
        answer: "ました",
        hint: "Past form of ます.",
        type: "fill-blank",
      },
    ],
    order: 17,
  },

  // ===== Lesson 9: Desires & Invitations =====
  {
    title: "〜たい (tai) — want to do",
    level: "N5",
    lesson: 9,
    chapter: "Desires & Invitations",
    structure: "Verb (masu-stem) + たい",
    meaning: "want to (do something)",
    rule:
      "たい attaches to the masu-stem of a verb to express the speaker's own desire: 行きたい (want to go), 食べたい (want to eat), 見たい (want to see). たい conjugates like an i-adjective: 食べたくない (don't want to eat), 食べたかった (wanted to eat), 食べたくなかった (didn't want to eat). For 3rd-person desires (he/she wants to), do NOT use たい directly — use 〜たがる instead, because you cannot directly know another person's desire.",
    conjugation:
      "Attach to the masu-stem (same stem used for 〜ます):\n• Ichidan: drop る, add たい. 食べる → 食べたい.\n• Godan: change final う-vowel to い-vowel (i-row), add たい. 行く → 行きたい, 読む → 読みたい, 買う → 買いたい.\n• Irregular: する → したい, 来る → 来たい (kitai).\nConjugates as i-adjective: 食べたい → 食べたくない (neg) → 食べたかった (past) → 食べたくなかった (neg past). Polite: 食べたいです.",
    usage:
      "Use たい for your own desires or to ask the listener directly (何を食べたいですか = what do you want to eat?). For 3rd person use たがる: 彼は行きたがっている (he wants to go). たい can also be nominalized: 行きたい所 (the place I want to go to).",
    commonMistake:
      "Using たい for 3rd-person desires: ✗「彼は行きたい」 is unnatural — say 彼は行きたがっている. Also, the object can take が or を: りんごが食べたい OR りんごを食べたい — both are correct, but が is slightly more emotional.",
    examples: [
      { jp: "日本へ行きたいです。", en: "I want to go to Japan.", difficulty: "easy" },
      {
        jp: "今夜は何も食べたくない。",
        en: "I don't want to eat anything tonight.",
        difficulty: "medium",
        note: "食べたくない = negative form of 食べたい.",
      },
      {
        jp: "子供の頃、ピアノを習いたかったですが、習えませんでした。",
        en: "When I was a child I wanted to learn piano, but I couldn't.",
        difficulty: "hard",
        note: "習いたかった = past of 習いたい (want to learn).",
      },
    ],
    exercises: [
      {
        question: "日本へ行き___です。  ('I want to go to Japan.')",
        answer: "たい",
        hint: "Want-to-do suffix on masu-stem.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct たい-form of 読む (to read):",
        type: "multiple-choice",
        options: ["読みたい", "読たい", "読むたい", "読みだい"],
        answer: "読みたい",
      },
      {
        question: "Fill the blank with the negative: 何も食べ___。 ('I don't want to eat anything.')",
        answer: "たくない",
        hint: "Negative of たい (i-adjective conjugation).",
        type: "fill-blank",
      },
    ],
    order: 18,
  },
  {
    title: "〜ませんか (masen ka) — invitation",
    level: "N5",
    lesson: 9,
    chapter: "Desires & Invitations",
    structure: "Verb (masu-stem) + ません か",
    meaning: "won't you ~? (friendly invitation)",
    rule:
      "〜ませんか is a polite way to INVITE someone to do something with you. Literally 'won't you ~?', but used as 'Would you like to ~?' or 'Let's ~'. 一緒に昼ご飯を食べませんか？ (Won't you have lunch with me? / Shall we have lunch together?). It is more polite and softer than ましょうか (which sounds like an offer to do something FOR someone).",
    conjugation:
      "Polite negative + か. Masu-stem + ません + か.\n• Ichidan: 食べる → 食べませんか.\n• Godan: 行く → 行きませんか, 読む → 読みませんか, 買う → 買いませんか.\n• Irregular: する → しませんか, 来る → 来ませんか (kimasen ka).\nThe form is fixed — there is no past version of this invitation pattern.",
    usage:
      "Use 〜ませんか to invite someone to do something together — it implies 'with me/us'. Common in social situations: 一緒に〜しませんか？. To accept: はい、しましょう (Yes, let's). To decline politely: すみません、ちょっと… (Sorry, I'm a bit...).",
    commonMistake:
      "Confusing with 〜ましょうか: 〜ませんか = invite the listener to join (一緒に食べませんか), 〜ましょうか = offer to do something FOR the listener (窓を開けましょうか = Shall I open the window for you?). Mixing these up changes who's doing the action.",
    examples: [
      { jp: "一緒に昼ご飯を食べませんか。", en: "Won't you have lunch together?", difficulty: "easy" },
      {
        jp: "今度の週末、映画を見に行きませんか。",
        en: "Would you like to go see a movie this weekend?",
        difficulty: "medium",
        note: "見に行く = 'go to see' (verb stem + に行く = go to do ~).",
      },
      {
        jp: "少し休みませんか。疲れているようですよ。",
        en: "Won't you rest a bit? You look tired.",
        difficulty: "hard",
        note: "休みませんか from 休む (godan: 休み- stem).",
      },
    ],
    exercises: [
      {
        question: "一緒に昼ご飯を食べ___か。 ('Won't you have lunch together?')",
        answer: "ません",
        hint: "Polite negative masu-form + か.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct invitation form: 'Won't you go to a movie?' (映画を見に行き___か。)",
        type: "multiple-choice",
        options: ["ません", "ましょう", "たい", "ました"],
        answer: "ません",
      },
      {
        question: "Convert 飲む (to drink) to the invitation form.",
        answer: "飲みませんか",
        hint: "Godan: stem 飲み- + ません か.",
        type: "fill-blank",
      },
    ],
    order: 19,
  },
  {
    title: "〜ましょう (mashō) — let's / shall we",
    level: "N5",
    lesson: 9,
    chapter: "Desires & Invitations",
    structure: "Verb (masu-stem) + ましょう",
    meaning: "let's ~ / shall we ~ (polite volitional)",
    rule:
      "〜ましょう is the polite VOLITIONAL form — used to suggest or propose an action done together: 行きましょう (let's go), 食べましょう (let's eat). It is more decisive than 〜ませんか (which is a softer invitation). 〜ましょう is also used alone to mean 'I will (do it) for you' in service situations (店員: ラッピングしましょうか = Shall I wrap it?).",
    conjugation:
      "Masu-stem + ましょう.\n• Ichidan: 食べる → 食べましょう.\n• Godan: 行く → 行きましょう, 読む → 読みましょう, 買う → 買いましょう.\n• Irregular: する → しましょう, 来る → 来ましょう (kimashō).\nPlain volitional (for casual speech): Ichidan 食べよう, Godan 行こう/読もう/買おう, Irregular しよう/来よう (koyō).",
    usage:
      "Use 〜ましょう to suggest action: 一緒に食べましょう (Let's eat together), そろそろ始めましょう (Let's start soon). In customer service: お持ちしましょうか (Shall I carry it for you?). For casual 'let's', use the plain volitional (〜よう / 〜おう): 行こう！",
    commonMistake:
      "Using 〜ましょう when offering to do something FOR someone without か: 窓を開けましょう (lit. 'let's open the window') — for an OFFER say 窓を開けましょうか (Shall I open it?). Also, ✗「食べましょうか」 as an invitation should be 一緒に食べましょう (no か).",
    examples: [
      { jp: "一緒に食べましょう。", en: "Let's eat together.", difficulty: "easy" },
      {
        jp: "もう遅いので、帰りましょう。",
        en: "It's already late, so let's go home.",
        difficulty: "medium",
        note: "帰りましょう from 帰る (godan: 帰り- stem).",
      },
      {
        jp: "荷物が重そうですね。お持ちしましょうか。",
        en: "Your bag looks heavy. Shall I carry it for you?",
        difficulty: "hard",
        note: "お持ちする is humble form; + しましょうか = offer to do it.",
      },
    ],
    exercises: [
      {
        question: "一緒に食べ___。 ('Let's eat together.')",
        answer: "ましょう",
        hint: "Polite volitional suffix.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct volitional form of 行く (to go):",
        type: "multiple-choice",
        options: ["行きましょう", "行ましょう", "行くましょう", "行きしょう"],
        answer: "行きましょう",
      },
      {
        question: "Convert 読む (to read) to the polite volitional.",
        answer: "読みましょう",
        hint: "Godan: stem 読み- + ましょう.",
        type: "fill-blank",
      },
    ],
    order: 20,
  },

  // ===== Lesson 10: Te-form basics =====
  {
    title: "〜て (te-form) — connective / link actions",
    level: "N5",
    lesson: 10,
    chapter: "Te-form Basics",
    structure: "Verb (te-form) (+ Verb)",
    meaning: "do A and (then) do B / link clauses",
    rule:
      "The te-form has many uses: (1) to link sequential actions — 朝起きて、顔を洗う (wake up in the morning and wash your face); (2) to link parallel causes — 雨が降って、風も吹いている (it's raining and the wind is blowing); (3) as the base for many grammatical patterns — 〜ている, 〜てください, 〜てもいい, 〜てしまう, 〜てから, 〜てあげる. The te-form is the foundation for almost every auxiliary verb construction, so mastering it is essential.",
    conjugation:
      "Verb groups (this is the most important conjugation in beginner Japanese):\n• Godan (u-verbs) — by final kana:\n   - う, つ, る → って: 買う → 買って, 待つ → 待って, 帰る → 帰って\n   - ぬ, ぶ, む → んで: 死ぬ → 死んで, 飛ぶ → 飛んで, 読む → 読んで\n   - く → いて: 書く → 書いて (EXCEPTION: 行く → 行って, NOT ✗行いて)\n   - ぐ → いで: 泳ぐ → 泳いで\n   - す → して: 話す → 話して\n• Ichidan (ru-verbs): drop る, add て. 食べる → 食べて, 見る → 見て, 寝る → 寝て.\n• Irregular: する → して, 来る → 来て (kite).\nFor i-adjectives: drop い, add くて (寒い → 寒くて). For na-adjectives/nouns: add で (静かだ → 静かで, 学生だ → 学生で).",
    usage:
      "Use the te-form to: (1) sequence actions (食べて寝る = eat then sleep); (2) chain reasons (忙しくて行けない = busy, so can't go); (3) as the base for 〜ている (ongoing), 〜てください (request), 〜てもいい (permission), 〜てしまう (completion), and many more.",
    commonMistake:
      "The most-missed exception: 行く → 行って (NOT ✗行いて). Also, confusing い-adj te-form (寒くて, drop い add くて) with noun/na-adj te-form (静かで, just add で). And learners often forget the consonant shift for godan: ✗「書いて」 is right, but ✗「書んで」(wrong group) is wrong.",
    examples: [
      { jp: "朝起きて、顔を洗います。", en: "I wake up in the morning and wash my face.", difficulty: "easy" },
      {
        jp: "これを見てください。",
        en: "Please look at this.",
        difficulty: "medium",
        note: "見て + ください = polite request.",
      },
      {
        jp: "電車が遅れて、会議に間に合わなかった。",
        en: "The train was delayed, so I couldn't make it to the meeting.",
        difficulty: "hard",
        note: "遅れて (te-form of 遅れる) gives the reason for the result.",
      },
    ],
    exercises: [
      {
        question: "Fill the blank with the te-form of 読む: 本を___、寝た。 ('I read a book and went to sleep.')",
        answer: "読んで",
        hint: "Godan verb ending in む → んで.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct te-form of 書く (to write):",
        type: "multiple-choice",
        options: ["書いて", "書んで", "書って", "書いで"],
        answer: "書いて",
      },
      {
        question: "Choose the correct te-form of 行く (to go):",
        type: "multiple-choice",
        options: ["行って", "行いて", "行んで", "行いで"],
        answer: "行って",
      },
    ],
    order: 21,
  },
  {
    title: "〜てください (te kudasai) — polite request",
    level: "N5",
    lesson: 10,
    chapter: "Te-form Basics",
    structure: "Verb (te-form) + ください",
    meaning: "please do ~ (polite request)",
    rule:
      "〜てください makes a polite request or instruction: 書いてください (please write), 待ってください (please wait), 見てください (please look). It is polite but not overly formal — appropriate for instructions, requests to strangers, or service settings. For a SOFTER request use 〜てくれませんか or 〜てもらえませんか. For a STRONGER command (urgent) you can use 〜て (without ください) in casual speech, or the imperative form.",
    conjugation:
      "Verb te-form + ください. (See 〜て entry for te-form rules.)\n• Ichidan: 食べる → 食べてください.\n• Godan: 書く → 書いてください, 読む → 読んでください, 買う → 買ってください.\n• Irregular: する → してください, 来る → 来てください (kite kudasai).\nNegative request: 〜ないでください (please don't ~): 食べないでください.",
    usage:
      "Use 〜てください to ask someone to do something politely — works for instructions, favors, and gentle commands. For negative requests use 〜ないでください (撮らないでください = please don't take photos). In business/customer service: 〜てくださいませ (even softer).",
    commonMistake:
      "Using 〜てください with superiors can sound bossy — for bosses/clients use 〜ていただけませんか (could you possibly ~?) or 〜お願いします. Also, ✗「食べるてください」 — must use the te-form 食べて, NOT the dictionary form.",
    examples: [
      { jp: "ここに名前を書いてください。", en: "Please write your name here.", difficulty: "easy" },
      {
        jp: "もう一度言ってください。",
        en: "Please say it once more.",
        difficulty: "medium",
        note: "言う → 言って (godan う → って).",
      },
      {
        jp: "ここでは写真を撮らないでください。",
        en: "Please do not take photos here.",
        difficulty: "hard",
        note: "〜ないでください = negative request.",
      },
    ],
    exercises: [
      {
        question: "ここに名前を書い___ください。  ('Please write your name here.')",
        answer: "て",
        hint: "te-form of 書く is 書いて.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct request form for 見る (to see):",
        type: "multiple-choice",
        options: ["見てください", "見るてください", "見んでください", "見ってください"],
        answer: "見てください",
      },
      {
        question: "Convert to a negative request: 撮る → 撮___でください。 ('Please don't take (photos).')",
        answer: "らない",
        hint: "Negative request uses nai-form + でください. 撮る → 撮らない → 撮らないでください.",
        type: "fill-blank",
      },
    ],
    order: 22,
  },

  // ===== Lesson 11: Plain & Ongoing =====
  {
    title: "〜ている (te iru) — ongoing / state",
    level: "N5",
    lesson: 11,
    chapter: "Plain & Ongoing",
    structure: "Verb (te-form) + いる",
    meaning: "is ~ing (ongoing) / state resulting from past action",
    rule:
      "〜ている has two main meanings: (1) ONGOING action — 今、本を読んでいる (I am reading a book right now), 雨が降っている (it's raining); (2) RESULTING STATE — an action that happened in the past leaves a state: 彼はもう結婚している (he is already married, lit. 'has married and is in that state'), 窓が割れている (the window is broken). With instantaneous verbs (死ぬ, 結婚する, 知る) 〜ている always means the resulting state. With continuous verbs (読む, 食べる) it means the ongoing action.",
    conjugation:
      "Verb te-form + いる.\n• Ichidan: 食べる → 食べている.\n• Godan: 読む → 読んでいる, 書く → 書いている, 買う → 買っている.\n• Irregular: する → している, 来る → 来ている (kite iru).\nConjugates like an i-adjective: 食べている → 食べていない (neg) → 食べていた (past) → 食べていなかった (neg past). Polite: 食べています.",
    usage:
      "Use 〜ている for actions in progress now (今何をしている？— what are you doing?), habitual actions (毎日走っている — I run every day), and resulting states (もう着いている — already arrived [and is there]). Note that English 'I live in Tokyo' = 東京に住んでいる (state, NOT just ongoing).",
    commonMistake:
      "Translating 'I know' as ✗「知っている」 is correct but in Japanese 知る is a 'change-of-state' verb, so 'I know' = 知っている (state, NEVER 知る alone). For 'I'm wearing a shirt' use シャツを着ている (resulting state), not ✗「シャツを着る」. Also, with motion verbs like 行く, 〜ている can mean either 'is going (right now)' or 'has gone and is still there' — context decides.",
    examples: [
      { jp: "今、雨が降っています。", en: "It is raining now.", difficulty: "easy" },
      {
        jp: "彼は結婚しています。",
        en: "He is married (and remains so).",
        difficulty: "medium",
        note: "Resulting state — 結婚する is instantaneous; 〜いる shows the ongoing married state.",
      },
      {
        jp: "この言葉の意味を知っていますか。",
        en: "Do you know the meaning of this word?",
        difficulty: "hard",
        note: "知る is a state verb — always 知っている, never just 知る.",
      },
    ],
    exercises: [
      {
        question: "今、雨が降___。  ('It's raining now.') — fill with 〜ている (polite).",
        answer: "っています",
        hint: "te-form 降って + います.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form: 'He is married.' (彼は結婚___。)",
        type: "multiple-choice",
        options: ["しています", "します", "する", "しない"],
        answer: "しています",
      },
      {
        question: "Convert 食べる to the polite ongoing form (〜ています).",
        answer: "食べています",
        hint: "Ichidan: drop る → 食べ + て + います.",
        type: "fill-blank",
      },
    ],
    order: 23,
  },
  {
    title: "〜ない (nai) — plain negative",
    level: "N5",
    lesson: 11,
    chapter: "Plain & Ongoing",
    structure: "Verb (nai-stem) + ない",
    meaning: "not ~ (plain negative form)",
    rule:
      "〜ない is the PLAIN (casual) negative form of verbs. The polite equivalent is 〜ません. 〜ない conjugates like an i-adjective: ない → なかった (past) → なくない (lol rare) → なくて (te-form) → なければ (conditional). For the polite version, use 〜ません. For 3rd-person lack of volition in casual speech you can use 〜ない. Important: ある has NO 〜ない form — the negative of ある is ない (so 机の上に本がない = there is no book on the desk).",
    conjugation:
      "Verb groups:\n• Ichidan (ru-verbs): drop る, add ない. 食べる → 食べない, 見る → 見ない.\n• Godan (u-verbs): change final う-vowel to the あ-vowel (a-row), add ない. 行く → 行かない, 読む → 読まない, 買う → 買わない (special: う → わない, NOT ✗あない), 話す → 話さない.\n• Irregular: する → しない, 来る → 来ない (konai).\nEXCEPTIONS: ある → ない (no あらない); いる (to need) → いらない.\nConjugates as i-adjective: 食べない → 食べなかった (past) → 食べなくて (te) → 食べなければ (conditional).",
    usage:
      "Use 〜ない for the plain negative in casual speech with friends/family: 行かない (I'm not going), 食べない (I don't eat). In polite speech use 〜ません. In written Japanese, 〜ない is the default register for the negative. 〜ない is also the base for many grammatical patterns: 〜なければならない (must), 〜なくてもいい (don't have to), 〜ないで (without doing).",
    commonMistake:
      "Godan verbs ending in う (like 買う, 会う): the negative is 買わない (NOT ✗買あない) — the う becomes わ, not あ. Also, ✗「あらない」 — the negative of ある is just ない. For suru-verbs ending in 〜する, the negative is 〜しない, NOT ✗〜すない.",
    examples: [
      { jp: "肉を食べない。", en: "I don't eat meat.", difficulty: "easy" },
      {
        jp: "今日はどこへも行かない。",
        en: "I'm not going anywhere today.",
        difficulty: "medium",
        note: "行かない from 行く (godan: く → か).",
      },
      {
        jp: "彼は約束を守らない人だ。",
        en: "He's the kind of person who doesn't keep promises.",
        difficulty: "hard",
        note: "守らない from 守る (godan: る → ら).",
      },
    ],
    exercises: [
      {
        question: "肉を食べ___。  ('I don't eat meat.')",
        answer: "ない",
        hint: "Ichidan: drop る, add ない.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct nai-form of 買う (to buy):",
        type: "multiple-choice",
        options: ["買わない", "買あない", "買ない", "買らない"],
        answer: "買わない",
      },
      {
        question: "Convert する to the nai-form.",
        answer: "しない",
        hint: "Irregular: する → し- + ない.",
        type: "fill-blank",
      },
    ],
    order: 24,
  },
  {
    title: "〜た (ta) — plain past",
    level: "N5",
    lesson: 11,
    chapter: "Plain & Ongoing",
    structure: "Verb (ta-form)",
    meaning: "did ~ (plain past affirmative)",
    rule:
      "〜た is the PLAIN (casual) past form of verbs. The polite equivalent is 〜ました. 〜た conjugates irregularly — actually it's the te-form with て→た (or んで→んだ, etc.): 食べる → 食べた, 書く → 書いた, 買う → 買った, 読む → 読んだ, する → した, 来る → 来た (kita). 〜た can attach to verbs or i-adjectives (寒い → 寒かった). For nouns/na-adjectives the past is だった (学生だった, 静かだった).",
    conjugation:
      "Same vowel/consonant shifts as the te-form, just with て→た:\n• Godan (u-verbs):\n   - う, つ, る → った: 買う → 買った, 待つ → 待った, 帰る → 帰った\n   - ぬ, ぶ, む → んだ: 死ぬ → 死んだ, 飛ぶ → 飛んだ, 読む → 読んだ\n   - く → いた: 書く → 書いた (EXCEPTION: 行く → 行った)\n   - ぐ → いだ: 泳ぐ → 泳いだ\n   - す → した: 話す → 話した\n• Ichidan (ru-verbs): drop る, add た. 食べる → 食べた, 見る → 見た.\n• Irregular: する → した, 来る → 来た (kita).\ni-adjective past: 寒い → 寒かった. Noun/na-adj past: 学生だ → 学生だった.",
    usage:
      "Use 〜た for completed past actions in casual speech: 昨日、映画を見た (yesterday I watched a movie). In polite speech use 〜ました. 〜た is also the base for 〜たら (conditional 'if/when'), 〜たばかり (just did), 〜たほうがいい (had better), and 〜たことがある (have done ~).",
    commonMistake:
      "Mis-conjugating 行く: past is 行った, NOT ✗行いた (despite く→いた being the rule — 行く is the famous exception). Also confusing plain past 〜た (食べた) with polite past 〜ました (食べました) — register mismatch with the listener.",
    examples: [
      { jp: "昨日、映画を見た。", en: "Yesterday I watched a movie.", difficulty: "easy" },
      {
        jp: "朝ご飯はパンを食べた。",
        en: "For breakfast I ate bread.",
        difficulty: "medium",
        note: "食べた from 食べる (ichidan: drop る, add た).",
      },
      {
        jp: "子供の時、よく川で泳いだものだ。",
        en: "When I was a child, I used to swim in the river.",
        difficulty: "hard",
        note: "泳いだ from 泳ぐ (godan: ぐ → いだ). ものだ = 'it's the way things are / I used to ~'.",
      },
    ],
    exercises: [
      {
        question: "昨日、映画を見___。  ('Yesterday I watched a movie.')",
        answer: "た",
        hint: "Plain past of 見る (ichidan: 見 + た).",
        type: "fill-blank",
      },
      {
        question: "Choose the correct ta-form of 書く (to write):",
        type: "multiple-choice",
        options: ["書いた", "書んだ", "書った", "書いだ"],
        answer: "書いた",
      },
      {
        question: "Choose the correct ta-form of 行く (to go):",
        type: "multiple-choice",
        options: ["行った", "行いた", "行んだ", "行いだ"],
        answer: "行った",
      },
    ],
    order: 25,
  },

  // ===== Lesson 12: Wanting Objects, Opinions, Comparisons =====
  {
    title: "〜が欲しい (ga hoshii) — want (a thing)",
    level: "N5",
    lesson: 12,
    chapter: "Wanting Objects & Opinions",
    structure: "Noun が + 欲しい",
    meaning: "I want (a thing)",
    rule:
      "〜が欲しい expresses desire for a THING (a noun). 新しい車が欲しい (I want a new car), 何が欲しいですか (what do you want?). 欲しい conjugates as an i-adjective: 欲しくない (don't want), 欲しかった (wanted), 欲しくなかった (didn't want). For 3rd-person desires, do NOT use 欲しい directly — use 〜欲しがっている instead (弟は新しいゲームを欲しがっている — my little brother wants the new game).",
    conjugation:
      "Fixed: Noun + が + 欲しい. 欲しい conjugates as an i-adjective:\n• Affirmative: 欲しい (want)\n• Negative: 欲しくない (don't want)\n• Past: 欲しかった (wanted)\n• Past neg: 欲しくなかった (didn't want)\n• Polite: 欲しいです, 欲しくないです / 欲しくありません.\nFor 3rd person: replace 欲しい with 欲しがる (conjugates as godan verb): 彼は車を欲しがっている.",
    usage:
      "Use 〜が欲しい to express YOUR desire for a thing, or to ASK the listener directly: コーヒーが欲しい？ (want coffee?). For verbs (want to DO something), use 〜たい instead. For 3rd-person desire, use 〜欲しがる/〜欲しがっている.",
    commonMistake:
      "Using 欲しい for 3rd person: ✗「彼は車が欲しい」 — sounds like the speaker is reading his mind. Use 彼は車を欲しがっている. Also, ✗「コーヒーを欲しい」 — for 欲しい the object takes が (not を), though を is increasingly common in casual speech.",
    examples: [
      { jp: "新しい車が欲しいです。", en: "I want a new car.", difficulty: "easy" },
      {
        jp: "誕生日に何が欲しいですか。",
        en: "What do you want for your birthday?",
        difficulty: "medium",
        note: "が欲しい takes が on the desired object.",
      },
      {
        jp: "暑いので、冷たい飲み物が欲しくてたまらない。",
        en: "It's hot, so I want a cold drink unbearably.",
        difficulty: "hard",
        note: "欲しくてたまらない = 'want ~ so badly I can't stand it' (N3 pattern).",
      },
    ],
    exercises: [
      {
        question: "新しい車___欲しいです。  ('I want a new car.')",
        answer: "が",
        hint: "欲しい takes が on the desired object.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct negative of 欲しい (don't want):",
        type: "multiple-choice",
        options: ["欲しくない", "欲しいじゃない", "欲しくないだ", "欲ない"],
        answer: "欲しくない",
      },
      {
        question: "Convert to the 3rd-person form: 弟は新しいゲーム___欲しがっている。  (fill the particle)",
        answer: "を",
        hint: "欲しがる (verb) takes を on the object.",
        type: "fill-blank",
      },
    ],
    order: 26,
  },
  {
    title: "〜と思う (to omou) — I think that",
    level: "N5",
    lesson: 12,
    chapter: "Wanting Objects & Opinions",
    structure: "Plain form + と 思う",
    meaning: "I think that ~",
    rule:
      "〜と思う expresses the speaker's opinion or thought. The plain form of a verb/adjective/noun goes BEFORE と, and 思う follows: 明日は晴れると思う (I think it'll be sunny tomorrow), この本は面白いと思う (I think this book is interesting), 彼は学生だと思う (I think he's a student). For polite speech use 〜と思います. For past: 〜と思った (I thought ~). For 3rd person: 〜と思っている (he is thinking ~) — you cannot directly state another's instantaneous thought.",
    conjugation:
      "Fixed: [Plain form] + と + 思う.\n• Verb: 行くと思う (I think [he] will go), 食べたと思う (I think [he] ate).\n• i-adj: 寒いと思う (I think it's cold) → 寒かったと思う (I think it was cold).\n• na-adj / Noun: 静かだと思う (I think it's quiet), 学生だと思う (I think [he] is a student). Note the だ is required before と for nouns/na-adjs.\nPolite: 思います. Past: 思った / 思いました. Negative: 思わない / 思いません.",
    usage:
      "Use 〜と思う to express your opinion: 日本語は面白いと思います (I think Japanese is interesting). To soften assertions: そう思います (I think so). For the listener's or 3rd-person thoughts: 彼はどう思っている？ (what does he think?). In casual speech, you can drop the と and just say 面白いと思う？ (rising intonation).",
    commonMistake:
      "Putting と in the wrong place: ✗「思います明日晴れると」 is wrong word order — the と must come RIGHT BEFORE 思う: 明日は晴れると思う. Also, ✗「学生と思う」 — for nouns/na-adjs you need だ before と: 学生だと思う.",
    examples: [
      { jp: "明日は晴れると思います。", en: "I think it will be sunny tomorrow.", difficulty: "easy" },
      {
        jp: "この本は面白いと思う。",
        en: "I think this book is interesting.",
        difficulty: "medium",
        note: "i-adjective directly precedes と思う (no だ needed for i-adjs).",
      },
      {
        jp: "彼の言うことは正しいと思いますが、賛成はできません。",
        en: "I think what he's saying is right, but I can't agree.",
        difficulty: "hard",
        note: "〜と思います softens the disagreement.",
      },
    ],
    exercises: [
      {
        question: "明日は晴れる___思います。  ('I think it will be sunny tomorrow.')",
        answer: "と",
        hint: "Quotation particle before 思う.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for 'I think he is a student.' (彼は学生___と思う。)",
        type: "multiple-choice",
        options: ["だ", "が", "を", "で"],
        answer: "だ",
      },
      {
        question: "Fill the blank: このケーキ、美味しい___思う。 ('I think this cake is delicious.')",
        answer: "と",
        hint: "i-adjective + と + 思う.",
        type: "fill-blank",
      },
    ],
    order: 27,
  },
  {
    title: "〜より〜のほうが (yori ~ no hō ga) — comparison",
    level: "N5",
    lesson: 12,
    chapter: "Comparisons",
    structure: "A より B のほうが + Adjective",
    meaning: "B is more ~ than A",
    rule:
      "〜より〜のほうが compares two things: A より B のほうが高い = B is more expensive than A (lit. 'compared to A, the B-side is expensive'). より marks the standard of comparison ('than'), and のほうが marks the winner (the one being praised). You can omit either half if context is clear: バスより電車のほうが速い (trains are faster than buses), or just バスより電車のほうが速い, or even 電車のほうが速い (the train side is faster). For 'A is more ~ than B', the order is [Bより] [Aのほうが].",
    conjugation:
      "No conjugation — fixed pattern. Variants: A より B のほうが + Adj; A のほうが B より + Adj (same meaning, reversed word order). より alone (without のほうが) is also used in modern Japanese: バスより電車が速い (trains are faster than buses). For equality: A と B は同じくらい〜 (A and B are about the same ~).",
    usage:
      "Use 〜より〜のほうが to compare two things: 肉より魚のほうが好き (I like fish more than meat). より can stand alone in modern Japanese too (この町は昔より静かになった — this town became quieter than before). For superlatives use 一番 (一番好きな = the one I like most).",
    commonMistake:
      "Reversing the order by mistake: ✗「電車よりバスのほうが速い」 would mean 'buses are faster than trains' — be careful which side is which! Also, ✗「バスがより電車のほうが速い」 — より always comes AFTER the standard, and のほうが after the winner.",
    examples: [
      { jp: "バスより電車のほうが速いです。", en: "The train is faster than the bus.", difficulty: "easy" },
      {
        jp: "夏より秋のほうが好きです。",
        en: "I like autumn more than summer.",
        difficulty: "medium",
        note: "〜のほうが好き = 'prefer ~ over'.",
      },
      {
        jp: "思っていたよりずっと難しかった。",
        en: "It was far more difficult than I had expected.",
        difficulty: "hard",
        note: "〜より with the standard being a clause (思っていた = 'I had thought').",
      },
    ],
    exercises: [
      {
        question: "バス___電車のほうが速いです。  ('The train is faster than the bus.')",
        answer: "より",
        hint: "Marks the standard of comparison ('than').",
        type: "fill-blank",
      },
      {
        question: "Choose the correct option: 'I like autumn more than summer.' (夏___秋のほうが好き。)",
        type: "multiple-choice",
        options: ["より", "から", "に", "で"],
        answer: "より",
      },
      {
        question: "Rearrange to form a comparison: のほうが / 肉 / 魚 / より / 好きだ → ___",
        answer: "肉より魚のほうが好きだ",
        hint: "[standard] より [winner] のほうが + Adj.",
        type: "fill-blank",
      },
    ],
    order: 28,
  },
  {
    title: "〜一番 (ichiban) — superlative",
    level: "N5",
    lesson: 12,
    chapter: "Comparisons",
    structure: "[category で] 一番 + Adjective",
    meaning: "the most ~ in/among",
    rule:
      "一番 (ichiban, lit. 'number one') marks the SUPERLATIVE — the most/extreme in a category. クラスで一番高い (the tallest in the class), 世界で一番有名な (the most famous in the world). The category is marked by で (scope of comparison). To ask which is the most: [category] で一番 + Adj + のは + 何/誰 ですか (What/who is the most ~ in [category]?). For 'most ~' as a noun modifier: 一番 + Adj + の (一番高い山 = the tallest mountain).",
    conjugation:
      "Fixed: [category で] 一番 + Adj (+ の + Noun). Variants: 一番 + 好きな (favorite), 一番 + 好き (favorite as a noun: 一番の好き), 世界で一番 (the world's most). 一番 alone can be an adverb: 一番行きたい (most want to go).",
    usage:
      "Use 一番 to express 'the most/best/worst' in a category: クラスで一番背が高い (the tallest in class), 日本で一番高い山 (the tallest mountain in Japan = Mt. Fuji), 果物の中で一番好きなのは何ですか (what's your favorite fruit?). For 'more' (not most), use 〜より〜のほうが instead.",
    commonMistake:
      "Forgetting the scope particle で: ✗「クラス一番」 → クラスで一番. Also confusing superlative (一番, the MOST) with comparative (〜より〜のほうが, MORE than): 一番高い = the tallest, 高いより = ✗ wrong — use より for comparison.",
    examples: [
      { jp: "果物の中で一番好きなのは何ですか。", en: "What do you like most among fruits?", difficulty: "easy" },
      {
        jp: "富士山は日本で一番高い山です。",
        en: "Mt. Fuji is the tallest mountain in Japan.",
        difficulty: "medium",
        note: "日本で = scope; 一番高い = the tallest.",
      },
      {
        jp: "今まで一番感動した映画は何ですか。",
        en: "What is the movie that moved you the most so far?",
        difficulty: "hard",
        note: "一番 + 感動した (past verb) = 'most moved'.",
      },
    ],
    exercises: [
      {
        question: "果物の中___一番好きなのは何ですか。  ('What do you like most among fruits?')",
        answer: "で",
        hint: "Marks the scope of comparison.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct word: 'Mt. Fuji is the ___ tallest mountain in Japan.' (富士山は日本で___高い山です。)",
        type: "multiple-choice",
        options: ["一番", "より", "もう", "とても"],
        answer: "一番",
      },
      {
        question: "Combine into a superlative sentence: クラス / 一番 / 背が高い / で → ___",
        answer: "クラスで一番背が高い",
        hint: "[scope で] 一番 + Adj.",
        type: "fill-blank",
      },
    ],
    order: 29,
  },

  // ===== ---------------- N4 (Lessons 13–18) ---------------- =====

  // ===== Lesson 13: In-progress & Sequencing =====
  {
    title: "〜ているところ (te iru tokoro) — in the middle of doing",
    level: "N4",
    lesson: 13,
    chapter: "In-progress & Sequencing",
    structure: "Verb (te-form) + いる ところ です",
    meaning: "in the middle of doing ~ (action in progress right now)",
    rule:
      "〜ているところ emphasizes that you are CURRENTLY in the middle of an action — stronger than 〜ている alone. ご飯を食べているところです = I'm right in the middle of eating (so please wait). There are three 'tokoro' patterns: 〜るところです (about to do ~), 〜ているところです (in the middle of doing ~), 〜たところです (just finished doing ~). They focus on the TIMING of an action relative to now.",
    conjugation:
      "Verb te-form + いる ところ です.\n• Ichidan: 食べる → 食べているところです.\n• Godan: 書く → 書いているところです, 読む → 読んでいるところです, 買う → 買っているところです.\n• Irregular: する → しているところです, 来る → 来ているところです (kite iru tokoro desu).\nRelated patterns (different timing): 〜るところです (about to do — dictionary form), 〜たところです (just did — ta-form).",
    usage:
      "Use 〜ているところです when you want to emphasize you are IN THE MIDDLE of something (and can't be interrupted, or to explain a current state): 今、レポートを書いているところです (I'm right in the middle of writing the report). More natural in spoken Japanese than 〜ている alone when you want to convey 'right now, in this moment'.",
    commonMistake:
      "Confusing with 〜たところ (just finished): 〜ているところ = in the middle, 〜たところ = just finished. Also, ✗「食べるところです」 alone can mean 'about to eat' OR 'in the middle of eating' depending on context — be clear: 食べているところです for in-progress.",
    examples: [
      { jp: "今、レポートを書いているところです。", en: "I'm in the middle of writing the report right now.", difficulty: "easy" },
      {
        jp: "ただいま電話に出ているところです。",
        en: "I'm just on the phone right now (in the middle of the call).",
        difficulty: "medium",
        note: "電話に出る = 'answer the phone'; 出ているところ = in the middle of answering.",
      },
      {
        jp: "すみません、今お風呂に入っているところなので、後でかけ直します。",
        en: "Sorry, I'm in the middle of taking a bath right now, so I'll call you back later.",
        difficulty: "hard",
        note: "Polite refusal explaining why you can't take the call.",
      },
    ],
    exercises: [
      {
        question: "今、レポートを書い___ところです。  ('I'm in the middle of writing the report.')",
        answer: "ている",
        hint: "te-form 書いて + いる + ところです.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct pattern: 'I'm in the middle of eating.' (ご飯を___ところです。)",
        type: "multiple-choice",
        options: ["食べている", "食べた", "食べる", "食べない"],
        answer: "食べている",
      },
      {
        question: "Convert 読む to the 'in the middle of reading' pattern (polite).",
        answer: "読んでいるところです",
        hint: "Godan む → んで + いる + ところです.",
        type: "fill-blank",
      },
    ],
    order: 30,
  },
  {
    title: "〜たばかり (ta bakari) — just did",
    level: "N4",
    lesson: 13,
    chapter: "In-progress & Sequencing",
    structure: "Verb (ta-form) + ばかり",
    meaning: "just finished doing ~ (a short time ago)",
    rule:
      "〜たばかり indicates that an action was completed a SHORT TIME AGO — 日本に来たばかりです = I just arrived in Japan (recently). It emphasizes recency: the action is fresh. Different from 〜たところ (also 'just did'), which is even more immediate (within seconds/minutes). 〜たばかり can cover a slightly wider recent window (hours, days, even weeks for big life events like 'just got married').",
    conjugation:
      "Verb ta-form + ばかり.\n• Ichidan: 食べる → 食べたばかり.\n• Godan: 行く → 行ったばかり, 読む → 読んだばかり, 買う → 買ったばかり.\n• Irregular: する → したばかり, 来る → 来たばかり (kita bakari).\nPolite: 〜ばかりです. Plain: 〜ばかりだ. There is also a NOUN + ばかり pattern with a different meaning (N3: 'nothing but ~').",
    usage:
      "Use 〜たばかり to say you JUST did something: 昼ご飯を食べたばかりです (I just ate lunch — so I'm not hungry). This pattern explains current state by pointing to a recent past action. Slightly broader time window than 〜たところ.",
    commonMistake:
      "Confusing with N3 〜ばかり (only/nothing but). With verbs in the ta-form, ばかり means 'just did'; with nouns or te-form, ばかり means 'nothing but': 食べたばかり (just ate) vs 甘いものばかり食べている (eats nothing but sweets). Also, ✗「食べるばかり」 — for 'just did' you must use the ta-form: 食べたばかり.",
    examples: [
      { jp: "昼ご飯を食べたばかりです。", en: "I just ate lunch.", difficulty: "easy" },
      {
        jp: "日本に来たばかりなので、まだ日本語が上手ではありません。",
        en: "I just arrived in Japan, so my Japanese isn't good yet.",
        difficulty: "medium",
        note: "来たばかり from 来る (irregular: 来た + ばかり).",
      },
      {
        jp: "この店はオープンしたばかりで、まだお客さんが少ない。",
        en: "This shop just opened, so it still has few customers.",
        difficulty: "hard",
        note: "オープンする → オープンしたばかり.",
      },
    ],
    exercises: [
      {
        question: "昼ご飯を食べ___ばかりです。  ('I just ate lunch.')",
        answer: "た",
        hint: "ta-form 食べた + ばかり.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct pattern for 'just arrived in Japan.' (日本に___ばかりです。)",
        type: "multiple-choice",
        options: ["来た", "来る", "来て", "来ない"],
        answer: "来た",
      },
      {
        question: "Convert 読む to the 'just read' pattern (polite).",
        answer: "読んだばかりです",
        hint: "Godan む → んだ + ばかりです.",
        type: "fill-blank",
      },
    ],
    order: 31,
  },
  {
    title: "〜ながら (nagara) — while doing",
    level: "N4",
    lesson: 13,
    chapter: "In-progress & Sequencing",
    structure: "Verb (masu-stem) + ながら + Main Verb",
    meaning: "while doing ~ / doing two things simultaneously",
    rule:
      "〜ながら expresses two simultaneous actions done by the same subject: 音楽を聴きながら勉強する (study while listening to music), テレビを見ながら食べる (eat while watching TV). The MAIN action (the more important one) comes LAST, and the secondary action takes 〜ながら. The two actions must be doable at the same time — so you cannot say ✗「寝ながら走る」 (sleep while running — impossible).",
    conjugation:
      "Masu-stem (the part before ます) + ながら.\n• Ichidan: 食べる → 食べながら (drop る, add ながら is NOT correct — just use the stem 食べ- + ながら).\n• Godan: 行く → 行きながら, 読む → 読みながら, 買う → 買いながら, 話す → 話しながら.\n• Irregular: する → しながら, 来る → 来ながら (kinagara).\nNote: the stem is the SAME as the ます stem (行き-, 読み-, 食べ-, etc.).",
    usage:
      "Use 〜ながら when ONE subject does two actions at the same time. The MAIN action (focus of the sentence) is the verb that comes AFTER ながら. Music-while-studying = 音楽を聴きながら勉強する (focus on studying); studying-while-listening-to-music = 勉強しながら音楽を聴く (focus on listening).",
    commonMistake:
      "Two subjects can't share 〜ながら — must be the same subject doing both. ✗「彼が料理しながら、私はテレビを見る」 is wrong. Also, ✗「食べるながら」 — must be the masu-stem: 食べながら. And don't try to use impossible action combos like ✗「寝ながら料理する」.",
    examples: [
      { jp: "歩きながら電話する。", en: "I talk on the phone while walking.", difficulty: "easy" },
      {
        jp: "音楽を聴きながら勉強しています。",
        en: "I'm studying while listening to music.",
        difficulty: "medium",
        note: "Studying is the main action; listening is the simultaneous secondary action.",
      },
      {
        jp: "昔を思い出しながら、古いアルバムを見ていました。",
        en: "I was looking through the old photo album while reminiscing about the past.",
        difficulty: "hard",
        note: "思い出す (godan す → し) → 思い出しながら.",
      },
    ],
    exercises: [
      {
        question: "音楽を聴き___勉強します。  ('study while listening to music')",
        answer: "ながら",
        hint: "Attaches to the masu-stem 聴き-.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct stem + ながら form for 食べる (to eat):",
        type: "multiple-choice",
        options: ["食べながら", "食べるながら", "食べりながら", "食べあながら"],
        answer: "食べながら",
      },
      {
        question: "Convert 読む (to read) to the ながら form.",
        answer: "読みながら",
        hint: "Godan: stem 読み- + ながら.",
        type: "fill-blank",
      },
    ],
    order: 32,
  },
  {
    title: "〜てから (te kara) — after doing",
    level: "N4",
    lesson: 13,
    chapter: "In-progress & Sequencing",
    structure: "Verb (te-form) + から + Main Verb",
    meaning: "after doing ~ (then do ~)",
    rule:
      "〜てから expresses strict sequence: action A (te-form + から) MUST happen before action B. ご飯を食べてから、出かける = after eating, I go out (eating first is required). Stronger than just 〜て (which can be looser): 〜て from also implies sequence but 〜てから emphasizes the order is non-negotiable. Often used for habitual or required sequences (手を洗ってから食べる = always wash hands before eating).",
    conjugation:
      "Verb te-form + から.\n• Ichidan: 食べる → 食べてから.\n• Godan: 書く → 書いてから, 読む → 読んでから, 買う → 買ってから, 話す → 話してから.\n• Irregular: する → してから, 来る → 来てから (kite kara).\nNote: this is the te-form + から (different from the conjunction から 'because' which follows a plain clause).",
    usage:
      "Use 〜てから for sequential actions where A must happen first: 手を洗ってから、ご飯を食べましょう (let's eat after washing our hands). Common in daily routines, cooking instructions, and procedural descriptions. For 'after a noun' use Noun + の + 後で (食事の後で = after a meal).",
    commonMistake:
      "Confusing with 〜て (loose sequence). 〜て from also means 'do A and then B' but doesn't emphasize the order; 〜てから emphasizes 'A MUST happen first'. Also, ✗「食べるてから」 — must be the te-form: 食べてから. And don't confuse with 〜から (because) which follows a plain clause: 暑いから (because it's hot) — different structure entirely.",
    examples: [
      { jp: "手を洗ってから、ご飯を食べましょう。", en: "Let's eat after washing our hands.", difficulty: "easy" },
      {
        jp: "仕事が終わってから、飲みに行きます。",
        en: "After work is done, I'll go out for drinks.",
        difficulty: "medium",
        note: "終わる → 終わって (godan る → って).",
      },
      {
        jp: "日本に来てから、日本語の勉強を本格的に始めました。",
        en: "I started studying Japanese seriously after coming to Japan.",
        difficulty: "hard",
        note: "来る → 来て (irregular: 来てから).",
      },
    ],
    exercises: [
      {
        question: "手を洗っ___から、ご飯を食べましょう。  ('Let's eat after washing hands.')",
        answer: "て",
        hint: "te-form 洗って (godan う → って) + から.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct te-form for 〜てから: 食べる → ___から",
        type: "multiple-choice",
        options: ["食べて", "食べって", "食べんで", "食べいで"],
        answer: "食べて",
      },
      {
        question: "Convert する to the 〜てから form.",
        answer: "してから",
        hint: "Irregular: する → して + から.",
        type: "fill-blank",
      },
    ],
    order: 33,
  },

  // ===== Lesson 14: Permission & Obligation =====
  {
    title: "〜てもいい (te mo ii) — permission",
    level: "N4",
    lesson: 14,
    chapter: "Permission & Obligation",
    structure: "Verb (te-form) + も いい",
    meaning: "may / it's okay to ~ (permission granted or requested)",
    rule:
      "〜てもいい expresses PERMISSION — either asking for it or granting it. 入ってもいいですか = May I come in? はい、入ってもいいですよ = Yes, you may come in. The literal meaning is 'even if you do ~, it's good'. To REFUSE permission use 〜てはいけない (you must not ~). The plain form is 〜てもいい; the polite is 〜てもいいです.",
    conjugation:
      "Verb te-form + も + いい.\n• Ichidan: 食べる → 食べてもいい.\n• Godan: 行く → 行ってもいい, 読む → 読んでもいい, 買う → 買ってもいい.\n• Irregular: する → してもいい, 来る → 来てもいい (kite mo ii).\nNegative permission (don't have to): 〜なくてもいい (different pattern). いい conjugates as i-adj: 〜てもよかった (it was okay to), 〜てもよくない (not okay).",
    usage:
      "Use 〜てもいいですか to ASK for permission: ここに座ってもいいですか (May I sit here?). To GRANT permission: はい、〜てもいいですよ (Yes, you may ~). To SOFTEN: 〜てもよろしいですか (more formal). To indicate lack of obligation: 〜なくてもいい (you don't have to ~).",
    commonMistake:
      "Confusing 〜てもいい (you MAY — permission) with 〜なくてもいい (you don't HAVE to). They look similar but mean opposite things. Also, ✗「食べてもいいですか」 asking if YOU may eat is fine, but answering someone else's request with 食べてもいいです can sound weird — better to say どうぞ (please go ahead).",
    examples: [
      { jp: "ここに座ってもいいですか。", en: "May I sit here?", difficulty: "easy" },
      {
        jp: "写真を撮ってもいいですよ。",
        en: "You may take photos.",
        difficulty: "medium",
        note: "撮る → 撮って (godan る → って) + も + いい.",
      },
      {
        jp: "今日はもう帰ってもよろしいでしょうか。",
        en: "May I go home for today? (formal/business)",
        difficulty: "hard",
        note: "〜てもよろしいですか is the polite/business version.",
      },
    ],
    exercises: [
      {
        question: "ここに座っ___いいですか。  ('May I sit here?')",
        answer: "ても",
        hint: "te-form 座って + も + いい.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct permission form for 撮る (to take [a photo]): 撮___いい",
        type: "multiple-choice",
        options: ["っても", "ても", "にても", "ても"],
        answer: "っても",
      },
      {
        question: "Convert 食べる to the 'may I eat?' polite form.",
        answer: "食べてもいいですか",
        hint: "Ichidan: 食べて + も + いい + ですか.",
        type: "fill-blank",
      },
    ],
    order: 34,
  },
  {
    title: "〜てはいけない (te wa ikenai) — prohibition",
    level: "N4",
    lesson: 14,
    chapter: "Permission & Obligation",
    structure: "Verb (te-form) + は いけない",
    meaning: "must not / forbidden to ~",
    rule:
      "〜てはいけない expresses PROHIBITION — you must NOT do this. 食べてはいけない = you must not eat it. ここで写真を撮ってはいけません = you must not take photos here. The literal meaning is 'doing ~ is no good'. Polite: 〜てはいけません. Casual: 〜ちゃいけない / 〜じゃいけない. The opposite (you MAY) is 〜てもいい.",
    conjugation:
      "Verb te-form + は + いけない.\n• Ichidan: 食べる → 食べてはいけない.\n• Godan: 書く → 書いてはいけない, 読む → 読んではいけない, 買う → 買ってはいけない.\n• Irregular: する → してはいけない, 来る → 来てはいけない (kite wa ikenai).\nPolite: 〜てはいけません. Casual contractions: 〜ちゃいけない (godan/ichidan), 〜じゃいけない (noun/na-adj: 学生じゃいけない).",
    usage:
      "Use 〜てはいけない for things that are forbidden (rules, laws, strong prohibitions): ここでタバコを吸ってはいけません (you must not smoke here). Often seen on signs in short form: 立入禁止 (No entry). For softer 'please don't': 〜ないでください. For 'you don't have to' (lack of obligation): 〜なくてもいい.",
    commonMistake:
      "Confusing with 〜なくてもいい (you don't have to) — these are OPPOSITE in meaning. 〜てはいけない = must not, 〜なくてもいい = don't have to. Also, ✗「食べるてはいけない」 — must be the te-form: 食べてはいけない.",
    examples: [
      { jp: "ここで写真を撮ってはいけません。", en: "You must not take photos here.", difficulty: "easy" },
      {
        jp: "教室でスマホを使ってはいけない。",
        en: "You must not use your smartphone in the classroom.",
        difficulty: "medium",
        note: "使う → 使って (godan う → って) + は + いけない.",
      },
      {
        jp: "この薬は飲みすぎてはいけません。副作用が出ることがあります。",
        en: "You must not overdose on this medicine. Side effects can occur.",
        difficulty: "hard",
        note: "飲みすぎる = 'drink too much' (verb + すぎる = to overdo).",
      },
    ],
    exercises: [
      {
        question: "ここで写真を撮っ___いけません。  ('You must not take photos here.')",
        answer: "ては",
        hint: "te-form 撮って + は + いけない.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct prohibition form for 使う (to use): 使___いけない",
        type: "multiple-choice",
        options: ["っては", "ては", "にでは", "でては"],
        answer: "っては",
      },
      {
        question: "Convert 食べる to the prohibition form (polite).",
        answer: "食べてはいけません",
        hint: "Ichidan: 食べて + は + いけません.",
        type: "fill-blank",
      },
    ],
    order: 35,
  },
  {
    title: "〜なければならない (nakereba naranai) — must",
    level: "N4",
    lesson: 14,
    chapter: "Permission & Obligation",
    structure: "Verb (nai-stem) + なければ ならない",
    meaning: "must / have to ~",
    rule:
      "〜なければならない expresses OBLIGATION — you MUST do this. 行かなければならない = I must go. Literally 'if (you) don't ~, it won't do'. Polite: 〜なければなりません. Casual contractions: 〜なきゃ (most common in speech), 〜ないと. The opposite (you don't have to) is 〜なくてもいい.",
    conjugation:
      "Verb nai-stem (the part before ない) + なければ + ならない.\n• Ichidan: 食べる → 食べ + なければならない (drop る, the stem is the same as for 〜ない).\n• Godan: 行く → 行か + なければならない, 読む → 読ま + なければならない, 買う → 買わ + なければならない, 話す → 話さ + なければならない.\n• Irregular: する → し + なければならない, 来る → 来 + なければならない (ko + nakereba naranai).\nPolite: 〜なければなりません. Casual: 〜なきゃ / 〜ないと. Variants: 〜なければだめだ (must, casual).",
    usage:
      "Use 〜なければならない for things you MUST do — obligations, rules, requirements: 薬を飲まなければなりません (I have to take medicine). In casual speech, 〜なきゃ or 〜ないと is far more common than the full form. In writing, 〜なければならない is standard.",
    commonMistake:
      "Forgetting the ない-stem vowel shift for godan verbs: ✗「行くなければ」 → must be 行かなければ (a-vowel). Also, confusing with 〜なくてもいい (don't have to — opposite meaning!). And ✗「行かなければならない」 vs the shorter casual ✗「行かなきゃ」 — both are correct but in different registers.",
    examples: [
      { jp: "薬を飲まなければなりません。", en: "I have to take my medicine.", difficulty: "easy" },
      {
        jp: "明日は早く起きなきゃ。",
        en: "I've gotta wake up early tomorrow.",
        difficulty: "medium",
        note: "〜なきゃ = casual contraction of 〜なければならない.",
      },
      {
        jp: "レポートの締め切りが明日までなので、今夜仕上げなければならない。",
        en: "The report deadline is tomorrow, so I have to finish it tonight.",
        difficulty: "hard",
        note: "仕上げる (ichidan: drop る) → 仕上げ + なければならない.",
      },
    ],
    exercises: [
      {
        question: "薬を飲___なければなりません。  ('I have to take medicine.')",
        answer: "ま",
        hint: "Godan む → ま (a-vowel) + なければ.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct stem + なければ form for 行く (to go): 行___なければ",
        type: "multiple-choice",
        options: ["か", "き", "く", "け"],
        answer: "か",
      },
      {
        question: "Convert 食べる to the 'must eat' polite form.",
        answer: "食べなければなりません",
        hint: "Ichidan: 食べ- + なければ + なりません.",
        type: "fill-blank",
      },
    ],
    order: 36,
  },
  {
    title: "〜なくてもいい (nakutemo ii) — don't have to",
    level: "N4",
    lesson: 14,
    chapter: "Permission & Obligation",
    structure: "Verb (nai-stem) + なくても いい",
    meaning: "don't have to / need not ~",
    rule:
      "〜なくてもいい expresses LACK of obligation — you DON'T have to do this. 行かなくてもいい = you don't have to go. Literally 'even if (you) don't ~, it's good'. The opposite (you MUST) is 〜なければならない. Polite: 〜なくてもいいです. Casual contraction: 〜なくていい / 〜なくてもいい.",
    conjugation:
      "Verb nai-stem + なくても + いい.\n• Ichidan: 食べる → 食べなくてもいい.\n• Godan: 行く → 行かなくてもいい, 読む → 読まなくてもいい, 買う → 買わなくてもいい, 話す → 話さなくてもいい.\n• Irregular: する → しなくてもいい, 来る → 来なくてもいい (konakutemo ii).\nPolite: 〜なくてもいいです. Past: 〜なくてもよかった (it was okay not to).",
    usage:
      "Use 〜なくてもいい to say something is OPTIONAL: 明日来なくてもいいです (you don't have to come tomorrow). For 'don't have to' with adjectives: 寒くなくてもいい (it doesn't need to be cold — used when conditions are optional).",
    commonMistake:
      "Confusing with 〜てはいけない (must not — PROHIBITION). 〜なくてもいい = no obligation, 〜てはいけない = prohibition. Also, ✗「行かなくていい」 — closer to correct but the standard form is 〜なくてもいい.",
    examples: [
      { jp: "明日来なくてもいいです。", en: "You don't have to come tomorrow.", difficulty: "easy" },
      {
        jp: "今日は無理をしなくてもいいよ。",
        en: "You don't have to push yourself today.",
        difficulty: "medium",
        note: "無理をする = to overdo/push oneself.",
      },
      {
        jp: "この書類は今すぐ提出しなくてもよろしいですか。",
        en: "Is it alright if I don't submit this document right now? (formal)",
        difficulty: "hard",
        note: "〜なくてもよろしいですか is the polite/formal version.",
      },
    ],
    exercises: [
      {
        question: "明日来___なくてもいいです。  ('You don't have to come tomorrow.')",
        answer: "か",
        hint: "Godan く → か (a-vowel) + なくてもいい.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct stem + なくても form for 飲む (to drink): 飲___なくてもいい",
        type: "multiple-choice",
        options: ["ま", "み", "む", "め"],
        answer: "ま",
      },
      {
        question: "Convert する to the 'don't have to do' polite form.",
        answer: "しなくてもいいです",
        hint: "Irregular: し- + なくてもいいです.",
        type: "fill-blank",
      },
    ],
    order: 37,
  },

  // ===== Lesson 15: Conditionals =====
  {
    title: "〜たら (tara) — conditional (if/when)",
    level: "N4",
    lesson: 15,
    chapter: "Conditionals",
    structure: "Verb (ta-form) + ら / Noun・i-adj + だったら / Na-adj + だったら",
    meaning: "if / when ~ happens",
    rule:
      "〜たら is the most versatile conditional in Japanese — it covers both 'if' (hypothetical) and 'when' (when X happens, Y follows). Formed by adding ら to the plain past (ta-form): 雨が降ったら、行かない (if it rains, I won't go). 〜たら can be used for one-time events, requests (もし時間があったら、来てください), and discoveries (窓を開けたら、雪が降っていた — when I opened the window, I found it was snowing). It's the safest choice when unsure which conditional to use.",
    conjugation:
      "Plain past form + ら. Verb groups:\n• Ichidan: 食べる → 食べたら (drop る, add たら).\n• Godan: 行く → 行ったら, 読む → 読んだら, 買う → 買ったら, 話す → 話したら.\n• Irregular: する → したら, 来る → 来たら (kitara).\nFor nouns/i-adj: 寒い → 寒かったら (past + ら). For nouns/na-adj: 学生だ → 学生だったら, 静かだ → 静かだったら.\nNegative conditional: 食べない → 食べなかったら (didn't eat → if I hadn't eaten).",
    usage:
      "Use 〜たら for one-time conditions (雨が降ったら、出かけません = if it rains, I won't go out) and for 'when I did X, I discovered Y' (窓を開けたら、綺麗な景色が見えた). For requests: 時間があったら、来てください. Note: 〜たら cannot be followed by a volitional (〜よう) main clause if the condition is in the past (e.g. ✗「雨が降ったら、行こう」 is awkward — use 〜ば: 雨が降れば、行こう).",
    commonMistake:
      "Using 〜たら for general/habitual truths (use 〜と instead): ✗「春になったら、花が咲く」 sounds off for a natural law — better 春になると花が咲く. Also, register mismatch: 〜たら is fairly neutral (works in both polite and casual); don't add ✗「ます」 before 〜たら (✗「行きますたら」 — wrong, use 行ったら or 行きましたら for very formal).",
    examples: [
      { jp: "時間があったら、遊びに行きます。", en: "If I have time, I'll go hang out.", difficulty: "easy" },
      {
        jp: "雨が降ったら、試合は中止になります。",
        en: "If it rains, the game will be cancelled.",
        difficulty: "medium",
        note: "降る → 降ったら (godan る → った + ら).",
      },
      {
        jp: "駅に着いたら、電話してください。",
        en: "When you arrive at the station, please call me.",
        difficulty: "hard",
        note: "着く → 着いたら (godan く → いた + ら).",
      },
    ],
    exercises: [
      {
        question: "時間があ___、遊びに行きます。  ('If I have time, I'll go hang out.')",
        answer: "ったら",
        hint: "ta-form of ある (あった) + ら.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct たら form of 食べる (to eat):",
        type: "multiple-choice",
        options: ["食べたら", "食べるたら", "食べりたら", "食べったら"],
        answer: "食べたら",
      },
      {
        question: "Convert 雨が降る (it rains) to the 〜たら conditional.",
        answer: "雨が降ったら",
        hint: "Godan る → った + ら.",
        type: "fill-blank",
      },
    ],
    order: 38,
  },
  {
    title: "〜ば (ba) — conditional (hypothetical)",
    level: "N4",
    lesson: 15,
    chapter: "Conditionals",
    structure: "Verb (ba-form) + ば / Adj + ければ",
    meaning: "if (hypothetical / general condition)",
    rule:
      "〜ば is a conditional focused on HYPOTHETICAL or GENERAL conditions. Formed by adding れば to the conditional stem of verbs: 行けば (if [I] go), 食べれば (if [I] eat). For i-adjectives drop い, add ければ: 寒ければ (if it's cold). For nouns/na-adjs: 学生なら / 静かなら (use なら instead). 〜ば is used for general truths (天気がよければ出かける — if the weather is good, I go out), hypotheticals, and to express necessary conditions (〜ば〜ほど: the more ~ the more).",
    conjugation:
      "Verb groups:\n• Ichidan: drop る, add れば. 食べる → 食べれば, 見る → 見れば.\n• Godan: change final う-vowel to the え-vowel (e-row), add ば. 行く → 行けば, 読む → 読めば, 買う → 買えば, 話す → 話せば.\n• Irregular: する → すれば, 来る → 来れば (kureba).\nFor i-adj: drop い, add ければ (寒い → 寒ければ). For na-adj/noun: use なら (静かなら, 学生なら). Negative: 〜なければ (if not ~).",
    usage:
      "Use 〜ば for hypothetical/general conditions: お金があれば、旅行に行く (if I had money, I'd travel). For the pattern 'the more ~ the more ~': 〜ば〜ほど (読めば読むほど面白い — the more you read, the more interesting it is). For 'if A and B': AであればB (formal). With request forms, 〜ば doesn't work well — use 〜たら for that.",
    commonMistake:
      "Using 〜ば with the main clause being a request or intention: ✗「時間があれば、来てください」 — actually this is OK, but ✗「時間があれば、行こう」 (volitional main clause) is awkward; use 〜たら: 時間があったら行こう. Also, ✗「行くえば」 — godan takes the え-vowel: 行けば.",
    examples: [
      { jp: "天気がよければ、出かけます。", en: "If the weather is good, I'll go out.", difficulty: "easy" },
      {
        jp: "お金があれば、旅行に行きたい。",
        en: "If I had money, I'd want to travel.",
        difficulty: "medium",
        note: "ある → あれば (godan る → れば).",
      },
      {
        jp: "読めば読むほど、この本の面白さがわかってくる。",
        en: "The more you read, the more you understand how interesting this book is.",
        difficulty: "hard",
        note: "〜ば〜ほど = 'the more ~ the more ~'.",
      },
    ],
    exercises: [
      {
        question: "天気が良___、出かけます。  ('If the weather is good, I'll go out.')",
        answer: "ければ",
        hint: "i-adj: drop い, add ければ.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct ば form of 行く (to go):",
        type: "multiple-choice",
        options: ["行けば", "行えば", "行ば", "行きば"],
        answer: "行けば",
      },
      {
        question: "Convert 食べる to the 〜ば conditional.",
        answer: "食べれば",
        hint: "Ichidan: drop る, add れば.",
        type: "fill-blank",
      },
    ],
    order: 39,
  },
  {
    title: "〜と (to) — conditional (natural result)",
    level: "N4",
    lesson: 15,
    chapter: "Conditionals",
    structure: "Verb (dictionary form) + と / i-adj + いと",
    meaning: "whenever / when ~ (always, inevitably)",
    rule:
      "〜と expresses a NATURAL or HABITUAL result — when A happens, B ALWAYS follows (it's an inevitable or habitual consequence). 春になると花が咲く = when spring comes, flowers bloom (always). このボタンを押すとドアが開く = when you press this button, the door opens. 〜と is NOT used for the speaker's volitional actions or requests — only for objective phenomena, habits, or natural consequences. Note: this is the SAME particle と as 'and', but used differently — after a verb's dictionary form, it becomes the conditional.",
    conjugation:
      "Verb dictionary form + と (or nai-form for negative: 行かないと).\n• Ichidan: 食べる → 食べると.\n• Godan: 行く → 行くと, 読む → 読むと, 買う → 買うと, 話す → 話すと.\n• Irregular: する → すると, 来る → 来ると (kuru to).\nFor i-adj: 寒い → 寒いと. For nouns: 学生だと (use だ + と). For past: 食べた → 食べたと (rare, used in storytelling: 'when I did ~, I discovered ~').",
    usage:
      "Use 〜と for: (1) natural/habitual consequences (春になると暖かくなる — when spring comes, it gets warm); (2) mechanical/automatic results (ボタンを押すとドアが開く); (3) discoveries when you do X (窓を開けると、雪が降っていた — when I opened the window, I found it was snowing). NEVER use 〜と with the speaker's intention or request: ✗「春になると、旅行しよう」 — use 〜たら: 春になったら旅行しよう.",
    commonMistake:
      "Using 〜と for personal intentions: ✗「時間があると、行きます」 sounds like 'whenever I have time, I go' (habitual). To express 'if I have time, I will go' (one-time intention) use 〜たら: 時間があったら行きます. Also confusing with the conjunction と ('and/with') — context and verb form disambiguate.",
    examples: [
      { jp: "このボタンを押すと、ドアが開きます。", en: "When you press this button, the door opens.", difficulty: "easy" },
      {
        jp: "春になると、桜が咲きます。",
        en: "When spring comes, cherry blossoms bloom.",
        difficulty: "medium",
        note: "General/habitual natural consequence.",
      },
      {
        jp: "夜になると、急に寒くなった。",
        en: "When night came, it suddenly got cold.",
        difficulty: "hard",
        note: "Past + と = 'when ~ happened, I discovered ~'.",
      },
    ],
    exercises: [
      {
        question: "このボタンを押す___、ドアが開きます。  ('When you press this button, the door opens.')",
        answer: "と",
        hint: "Natural consequence conditional.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct conditional for a natural/habitual result:",
        type: "multiple-choice",
        options: ["と", "たら", "ば", "なら"],
        answer: "と",
      },
      {
        question: "Convert 春になる (spring comes) to the 〜と conditional.",
        answer: "春になると",
        hint: "Dictionary form + と.",
        type: "fill-blank",
      },
    ],
    order: 40,
  },

  // ===== Lesson 16: Favors, Offers & Conjecture =====
  {
    title: "〜ましょうか (mashō ka) — shall I? (offer)",
    level: "N4",
    lesson: 16,
    chapter: "Favors & Offers",
    structure: "Verb (masu-stem) + ましょう か",
    meaning: "shall I ~? (offer to do something for the listener)",
    rule:
      "〜ましょうか is an OFFER to do something FOR the listener — 'Shall I ~?' 窓を開けましょうか = Shall I open the window (for you)? 荷物を持ちましょうか = Shall I carry your luggage? Different from 〜ましょう (let's ~, suggesting joint action), 〜ましょうか implies the speaker will do it for someone else. Accept with: はい、お願いします (Yes, please). Refuse politely with: いいえ、大丈夫です (No, I'm fine).",
    conjugation:
      "Masu-stem + ましょう + か.\n• Ichidan: 食べる → 食べましょうか.\n• Godan: 行く → 行きましょうか, 読む → 読みましょうか, 買う → 買いましょうか, 話す → 話しましょうか.\n• Irregular: する → しましょうか, 来る → 来ましょうか (kimashō ka).\nPolite volitional + か. Plain volitional + か (casual): 〜ようか (食べようか, 行こうか, しようか).",
    usage:
      "Use 〜ましょうか to offer help: 荷物を持ちましょうか (Shall I carry your bag?), お茶を入れましょうか (Shall I make tea?). It is polite and considerate. In customer service it can be elevated: 〜いたしましょうか (humble). For 'let's do ~ together' use 〜ましょう (without か).",
    commonMistake:
      "Confusing with 〜ましょう (let's — joint action) vs 〜ましょうか (offer to do FOR someone). ✗「一緒に食べましょうか」 sounds like you're offering to eat for them — just say 一緒に食べましょう. Also, ✗「行くましょうか」 — must be the masu-stem: 行きましょうか.",
    examples: [
      { jp: "窓を開けましょうか。", en: "Shall I open the window?", difficulty: "easy" },
      {
        jp: "荷物、お持ちしましょうか。",
        en: "Shall I carry your luggage?",
        difficulty: "medium",
        note: "お持ちする = humble form of 持つ.",
      },
      {
        jp: "お茶でもお入れしましょうか。",
        en: "Shall I prepare some tea for you? (very polite/humble)",
        difficulty: "hard",
        note: "お〜する is humble; でも = 'or something'.",
      },
    ],
    exercises: [
      {
        question: "窓を開け___か。  ('Shall I open the window?')",
        answer: "ましょう",
        hint: "Polite volitional + か.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct offer form of 持つ (to carry): 持___か",
        type: "multiple-choice",
        options: ["ちましょう", "つましょう", "ちあましょう", "ちました"],
        answer: "ちましょう",
      },
      {
        question: "Convert する (to do) to the 'shall I do' offer form.",
        answer: "しましょうか",
        hint: "Irregular: し- + ましょう + か.",
        type: "fill-blank",
      },
    ],
    order: 41,
  },
  {
    title: "〜てあげる / 〜てもらう / 〜てくれる — giving/receiving favors",
    level: "N4",
    lesson: 16,
    chapter: "Favors & Offers",
    structure: "Verb (te-form) + あげる / もらう / くれる",
    meaning: "do a favor for / receive a favor from / have someone do for me",
    rule:
      "These three patterns express the DIRECTION of a favor:\n• 〜てあげる: I (or someone on my side) do a favor FOR someone else. 友達に本を貸してあげた (I lent a book to my friend).\n• 〜てくれる: someone else does a favor FOR ME (or someone on my side). 先生が私に日本語を教えてくれた (the teacher taught me Japanese).\n• 〜てもらう: I receive the favor of someone doing something (the doer is marked by に). 友達に本を貸してもらった (I had my friend lend me a book — actually 'I received the favor of my friend lending me a book').\nThe て-form of the action verb precedes the giving/receiving verb. あげる can sound condescending to superiors — use 〜てさしあげる (humble) instead.",
    conjugation:
      "Verb te-form + あげる / もらう / くれる.\n• Ichidan: 食べる → 食べてあげる / 食べてもらう / 食べてくれる.\n• Godan: 行く → 行ってあげる / 行ってもらう / 行ってくれる; 読む → 読んであげる / 読んでもらう / 読んでくれる.\n• Irregular: する → してあげる / してもらう / してくれる; 来る → 来てあげる / 来てもらう / 来てくれる (kite ...).\nThe giving/receiving verbs themselves conjugate: あげる → あげた (past) → あげない (neg); くれる → くれた / くれない; もらう → もらった / もらわない.\nHumble: 〜てさしあげる (for superiors). Polite: 〜てあげます / 〜てもらいます / 〜てくれます.",
    usage:
      "Use these patterns to clarify the DIRECTION of a favor:\n• When YOU do something for someone: 〜てあげる (or humble 〜てさしあげる).\n• When someone does something FOR YOU: 〜てくれる.\n• When YOU receive someone's action: 〜てもらう (the doer is marked by に).\nThese are extremely common in daily Japanese — without them you can't express 'he did X for me'.",
    commonMistake:
      "Using 〜てあげる toward superiors is condescending — for bosses/clients use 〜てさしあげる (humble) or rephrase. Also, mixing up the subject of 〜てもらう: 友達に本を貸してもらった means 'my friend did ME the favor of lending (to me)', NOT 'I did my friend the favor'. The doer takes に, and 'I' is the receiver.",
    examples: [
      { jp: "友達に本を貸してあげました。", en: "I lent a book to my friend.", difficulty: "easy" },
      {
        jp: "先生は私に日本語を教えてくれました。",
        en: "The teacher taught me Japanese.",
        difficulty: "medium",
        note: "先生が + 教えてくれる = teacher did me the favor of teaching.",
      },
      {
        jp: "電車が遅れて困っていたら、親切な人が駅まで送ってくれました。",
        en: "When I was in trouble because the train was delayed, a kind person took me to the station.",
        difficulty: "hard",
        note: "〜てくれた = 'did me the favor of ~'.",
      },
    ],
    exercises: [
      {
        question: "友達に本を貸し___あげました。  ('I did my friend the favor of lending a book.')",
        answer: "て",
        hint: "te-form 貸して + あげる.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct pattern for 'Someone did a favor for me.' (誰かが___。)",
        type: "multiple-choice",
        options: ["〜てくれる", "〜てあげる", "〜てもらう", "〜てしまう"],
        answer: "〜てくれる",
      },
      {
        question: "Convert: 友達 is the doer, I am the receiver, action is 教える. Use 〜てもらう form.",
        answer: "友達に教えてもらった",
        hint: "Doer + に + te-form + もらう.",
        type: "fill-blank",
      },
    ],
    order: 42,
  },
  {
    title: "〜そうです (hearsay) — I heard that",
    level: "N4",
    lesson: 16,
    chapter: "Favors & Offers",
    structure: "Plain form + そうです",
    meaning: "I heard that ~ / they say ~",
    rule:
      "〜そうです (hearsay) reports information from someone else — 'I heard that ~'. 明日雨が降るそうです = I heard it will rain tomorrow. The plain form of a verb/adjective/noun goes BEFORE そうです. For nouns/na-adjectives use だ → そうです: 田中さんは学生だそうです (I heard Tanaka is a student). CRUCIAL: this hearsay 〜そうです is DIFFERENT from the conjecture 〜そう (looks like ~) — hearsay attaches to the PLAIN FORM, conjecture attaches to the STEM.",
    conjugation:
      "Plain form + そうです.\n• Verb: 雨が降るそうです (I heard it'll rain), 食べたそうです (I heard he ate).\n• i-adj: 寒いそうです (I heard it's cold), 寒かったそうです (I heard it was cold).\n• Noun / na-adj: 学生だそうです (I heard he's a student), 静かだそうです (I heard it's quiet). Note: requires だ before そうです for nouns/na-adjs.\nNegative hearsay: 降らないそうです (I heard it won't rain).\nPolite: 〜そうですね / 〜そうですよ.",
    usage:
      "Use 〜そうです (hearsay) to relay information you got from someone else — often news, rumors, or what someone told you: 天気予報によると、明日は雨だそうです (According to the forecast, it'll rain tomorrow). Often introduced with 〜によると (according to ~).",
    commonMistake:
      "Confusing with conjecture 〜そう (looks like). Hearsay: 雨が降るそうです (I HEARD it'll rain — full plain form before そう). Conjecture: 雨が降りそう (it LOOKS like rain — verb STEM 雨が降り- + そう). Also, ✗「降りそうです」 as hearsay is wrong — for hearsay use full form: 降るそうです.",
    examples: [
      { jp: "田中さんは来月結婚するそうです。", en: "I heard Tanaka-san is getting married next month.", difficulty: "easy" },
      {
        jp: "天気予報によると、明日は雨だそうです。",
        en: "According to the forecast, it'll rain tomorrow.",
        difficulty: "medium",
        note: "Noun (雨だ) + そうです = hearsay.",
      },
      {
        jp: "あのレストランは美味しいそうですが、ちょっと高いらしいです。",
        en: "I hear that restaurant is good, but apparently it's a bit expensive.",
        difficulty: "hard",
        note: "Hearsay 美味しいそうです vs conjecture らしい (also hearsay, more objective).",
      },
    ],
    exercises: [
      {
        question: "田中さんは来月結婚する___です。  ('I heard Tanaka is getting married next month.')",
        answer: "そう",
        hint: "Plain form + そう + です (hearsay).",
        type: "fill-blank",
      },
      {
        question: "Choose the correct hearsay form for: 'I heard it's cold.' (寒い___。)",
        type: "multiple-choice",
        options: ["そうです", "そうだ", "そうな", "そう"],
        answer: "そうです",
      },
      {
        question: "Convert to hearsay: 明日は雨だ → 明日は雨___そうです。",
        answer: "だ",
        hint: "Noun/na-adj needs だ before そうです (hearsay).",
        type: "fill-blank",
      },
    ],
    order: 43,
  },
  {
    title: "〜そうです (conjecture) — looks like",
    level: "N4",
    lesson: 16,
    chapter: "Favors & Offers",
    structure: "Verb stem / Adj stem + そうです",
    meaning: "looks like / seems (based on appearance)",
    rule:
      "〜そうです (conjecture) expresses APPEARANCE-based judgment — 'looks like ~'. 美味しそう = looks delicious, 雨が降りそう = looks like it'll rain. It attaches to the STEM (the part before ます for verbs, before い for i-adjs, before だ for na-adjs). CRUCIAL: this conjecture 〜そう is DIFFERENT from the hearsay 〜そう — conjecture attaches to the STEM, hearsay attaches to the PLAIN FORM. The conjecture form conjugates like a na-adjective: 〜そうな + Noun (美味しそうなケーキ), 〜そうに + Adj/Verb (美味しそうに食べる = eat looking like it's delicious).",
    conjugation:
      "STEM + そうです.\n• Verb: drop the final る (ichidan) or change to い-vowel (godan) — the STEM is the ます stem. 食べる → 食べ (stem) + そうです = 食べそうです. 行く → 行きそう, 降る → 降りそう.\n• i-adj: drop い. 寒い → 寒そうです, 美味しい → 美味しそうです. (EXCEPTION: いい → よさそう, NOT ✗いそう.)\n• na-adj: drop だ. 静かだ → 静かそうです, 有名だ → 有名そうです.\nNegative conjecture: 〜なさそう (美味しくなさそう = doesn't look tasty) — irregular.\nPolite: 〜そうです. Conjugates as na-adj: 〜そうな (modifying noun), 〜そうに (modifying verb).",
    usage:
      "Use 〜そうです (conjecture) to make an appearance-based judgment: このケーキ、美味しそうですね (this cake looks delicious). 空が暗くなってきました。雨が降りそうです (the sky's getting dark — it looks like it'll rain). Often used with verbs of becoming (なりそう, しそう) or adjectives describing perceived qualities.",
    commonMistake:
      "Confusing with hearsay 〜そう. Conjecture uses the STEM (美味しそう — looks tasty); hearsay uses the PLAIN FORM (美味しいそう — I heard it's tasty, awkward but grammatical). Also, ✗「いそうです」 — the conjecture of いい is よさそう (irregular). And don't use 〜そう for things you have direct evidence of having happened — for those use 〜ようだ or 〜らしい.",
    examples: [
      { jp: "このケーキ、美味しそうですね。", en: "This cake looks delicious, doesn't it?", difficulty: "easy" },
      {
        jp: "空が暗いです。雨が降りそうです。",
        en: "The sky is dark. It looks like it'll rain.",
        difficulty: "medium",
        note: "降る → stem 降り- + そう.",
      },
      {
        jp: "彼はとても嬉しそうに報告書を読んでいた。",
        en: "He was reading the report looking very happy.",
        difficulty: "hard",
        note: "嬉しい → 嬉しそう (stem) + に (adverbial) + 読んでいた.",
      },
    ],
    exercises: [
      {
        question: "このケーキ、美味し___ですね。  ('This cake looks delicious.')",
        answer: "そう",
        hint: "i-adj stem (drop い) + そう.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct conjecture form of 降る (to rain): 降___そうだ",
        type: "multiple-choice",
        options: ["り", "る", "っ", "いた"],
        answer: "り",
      },
      {
        question: "Convert いい (good) to the conjecture form ('looks good').",
        answer: "よさそう",
        hint: "Exception: いい → よさそう.",
        type: "fill-blank",
      },
    ],
    order: 44,
  },
  {
    title: "〜たがる (tagaru) — wants to (3rd person)",
    level: "N4",
    lesson: 16,
    chapter: "Favors & Offers",
    structure: "Verb (masu-stem) + たがる",
    meaning: "(3rd person) wants to do ~",
    rule:
      "〜たがる expresses a 3rd person's desire — because you cannot directly know another person's desire, you describe how they ACT (they show signs of wanting to). 彼は行きたがっている (he wants to go — lit. 'he's showing signs of wanting to go'). For your OWN desire use 〜たい. The pattern is the masu-stem + たがる, and たがる conjugates as a godan verb: たがる → たがっている (ongoing state) → たがった (past) → たがらない (negative).",
    conjugation:
      "Masu-stem + たがる (conjugates as a godan verb).\n• Ichidan: 食べる → 食べたがる.\n• Godan: 行く → 行きたがる, 読む → 読みたがる, 買う → 買いたがる, 話す → 話したがる.\n• Irregular: する → したがる, 来る → 来たがる (kitagaru).\nConjugation of たがる: たがる (present), たがっている (ongoing state — most common), たがった (past), たがらない (negative). Polite: 〜たがります.",
    usage:
      "Use 〜たがる (or 〜たがっている) for 3rd-person desire: 弟は新しいゲームを欲しがっている (my little brother wants the new game — for NOUNS use 欲しがる). 彼女は一人で行きたがらない (she doesn't want to go alone). For your own desire, use 〜たい (NOT 〜たがる). In casual speech, asking the listener directly with 〜たい is fine: 何を食べたい？",
    commonMistake:
      "Using 〜たい for 3rd person: ✗「彼は行きたい」 sounds like you're reading his mind. Use 彼は行きたがっている. Also, for objects (wanting a THING), use 〜欲しがる (NOT 〜たがる): 弟は車を欲しがっている, NOT ✗車をたがる.",
    examples: [
      { jp: "弟は新しいゲームを欲しがっています。", en: "My little brother wants the new game.", difficulty: "easy" },
      {
        jp: "彼は一人で行きたがらない。",
        en: "He doesn't want to go alone.",
        difficulty: "medium",
        note: "行きたがる (negative): 行きたがらない.",
      },
      {
        jp: "猫はドアの前でずっと外に出たがっていた。",
        en: "The cat kept wanting to go outside in front of the door.",
        difficulty: "hard",
        note: "出る (ichidan: 出 + たがっていた — ongoing past state).",
      },
    ],
    exercises: [
      {
        question: "弟は新しいゲームを欲___がっています。  ('My brother wants the new game.')",
        answer: "し",
        hint: "For OBJECTS use 欲しがる (i-stem + がる).",
        type: "fill-blank",
      },
      {
        question: "Choose the correct たがる form of 行く (to go): 行___がる",
        type: "multiple-choice",
        options: ["き", "く", "か", "け"],
        answer: "き",
      },
      {
        question: "Convert 食べる (to eat) to the 3rd-person want form (ongoing, polite).",
        answer: "食べたがっています",
        hint: "Ichidan stem 食べ- + たがっています.",
        type: "fill-blank",
      },
    ],
    order: 45,
  },

  // ===== Lesson 17: Intention, Reason & Advice =====
  {
    title: "〜つもり (tsumori) — intention",
    level: "N4",
    lesson: 17,
    chapter: "Intention, Reason & Advice",
    structure: "Verb (dictionary / nai form) + つもり です",
    meaning: "intend to ~ / plan to ~",
    rule:
      "〜つもり expresses a plan or intention — 来年日本へ行くつもりです (I intend to go to Japan next year). Use the DICTIONARY form for affirmative intention, and the 〜ない form for negative intention (行かないつもり = I don't intend to go). つもりです is polite; つもりだ is plain. Note: 〜つもり expresses a CURRENT decision about a FUTURE action — different from 〜予定 (a more concrete schedule).",
    conjugation:
      "Verb plain form + つもり です.\n• Affirmative: dictionary form. 行くつもりです, 食べるつもりです, するつもりです.\n• Negative: 〜ない form. 行かないつもりです, 食べないつもりです.\n• Past intention: 〜た つもりです ('I intended to ~' — implies didn't actually do it).\nPolite: つもりです. Plain: つもりだ. Negative: つもりはない.\nFor nouns: Noun + の + つもり (旅行のつもり = planning a trip).",
    usage:
      "Use 〜つもり for your own plans/intentions (来年、日本へ行くつもりです). For asking about someone else's intentions: 来週の週末はどうするつもりですか (What do you plan to do this weekend?). For 'I have no intention of ~': 〜つもりはない (行くつもりはない = I have no intention of going).",
    commonMistake:
      "Using 〜つもりです for past actions (it's about FUTURE intention). For 'I intended to ~ but didn't': 〜た つもりです (often with implied 'but couldn't'). Also, ✗「行きまするつもり」 — must be plain form 行く + つもりです, NOT masu-form.",
    examples: [
      { jp: "来年、日本へ行くつもりです。", en: "I intend to go to Japan next year.", difficulty: "easy" },
      {
        jp: "今日は何もしないつもりでしたが、結局忙しくなりました。",
        en: "I had intended to do nothing today, but ended up getting busy.",
        difficulty: "medium",
        note: "〜ない + つもりでした (past intention).",
      },
      {
        jp: "彼は仕事を辞めるつもりはないらしい。",
        en: "Apparently he has no intention of quitting his job.",
        difficulty: "hard",
        note: "〜つもりはない = no intention of ~.",
      },
    ],
    exercises: [
      {
        question: "来年、日本へ行く___です。  ('I intend to go to Japan next year.')",
        answer: "つもり",
        hint: "Plain form + つもり + です.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for 'I don't intend to go.' (行かない___です。)",
        type: "multiple-choice",
        options: ["つもり", "たい", "ましょう", "そう"],
        answer: "つもり",
      },
      {
        question: "Convert 食べる to the affirmative intention form (polite).",
        answer: "食べるつもりです",
        hint: "Dictionary form 食べる + つもりです.",
        type: "fill-blank",
      },
    ],
    order: 46,
  },
  {
    title: "〜し (shi) — and what's more / besides",
    level: "N4",
    lesson: 17,
    chapter: "Intention, Reason & Advice",
    structure: "Clause1 し、Clause2 し (+ conclusion)",
    meaning: "besides / and what's more (lists reasons/characteristics)",
    rule:
      "〜し lists multiple reasons or characteristics, often implying 'therefore ~' at the end. 安いし、美味しいし、よく行く = it's cheap, it's good, so I go often. Each clause ends with し (after plain form). You can list as many as you want, and the final conclusion is often implied. 〜し can also be used without an explicit conclusion: just listing reasons as a soft suggestion (暑いし、疲れたし… = it's hot and I'm tired… [implying 'let's rest']).",
    conjugation:
      "Plain form + し.\n• Verb: 行くし, 食べたし, しないし.\n• i-adj: 寒いし, 美味しかったし.\n• na-adj / Noun: 静かだし, 学生だし. Note: だ needed for nouns/na-adjs.\nCan stack as many as needed: A し、B し、C し. Often the final conclusion is implied (often ends with 〜から / 〜ので if explicit reason needed).",
    usage:
      "Use 〜し to list multiple reasons supporting a conclusion: 天気もいいし、時間もあるし、散歩しましょう (the weather's nice and we have time, so let's go for a walk). Useful for softening refusals: 忙しいし、お金もないし… (I'm busy, and I don't have money… [implying 'so I can't go']).",
    commonMistake:
      "Using masu-form before し: ✗「行きますし」 — must be plain form: 行くし. Also, omitting the だ for nouns/na-adjs: ✗「学生し」 — must be 学生だし. And forgetting that 〜し implies 'and therefore ~' (or 'among other things').",
    examples: [
      { jp: "天気もいいし、時間もあるし、散歩しましょう。", en: "The weather is nice, we have time, so let's go for a walk.", difficulty: "easy" },
      {
        jp: "この店は安いし、美味しいし、よく行きます。",
        en: "This shop is cheap and good, so I go often.",
        difficulty: "medium",
        note: "Lists positive reasons; implied conclusion 'I go often'.",
      },
      {
        jp: "忙しいし、お金もないし、今月は旅行を諦めようと思います。",
        en: "I'm busy and I don't have money, so I think I'll give up on traveling this month.",
        difficulty: "hard",
        note: "Two reasons (忙しいし, お金もないし) → conclusion.",
      },
    ],
    exercises: [
      {
        question: "天気もいい___、時間もある___、散歩しましょう。  ('It's nice and we have time, so let's walk.')",
        answer: "し, し",
        hint: "Plain form + し for each reason.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for a noun: 'He is a student ___' (彼は学生___。)",
        type: "multiple-choice",
        options: ["だし", "し", "がし", "をし"],
        answer: "だし",
      },
      {
        question: "Convert 寒い (cold) to the 〜し form.",
        answer: "寒いし",
        hint: "i-adj directly + し (no だ needed).",
        type: "fill-blank",
      },
    ],
    order: 47,
  },
  {
    title: "〜ので (node) — because (formal)",
    level: "N4",
    lesson: 17,
    chapter: "Intention, Reason & Advice",
    structure: "Plain form + ので",
    meaning: "because ~ (more formal/polite than から)",
    rule:
      "〜ので is the formal/polite equivalent of 〜から — both mean 'because'. 寒いので、窓を閉めます (because it's cold, I'll close the window). ので is softer and more objective than から; preferred in business, polite refusals, and writing. For nouns/na-adjectives you must add な before ので: 学生なので (because [he] is a student), 静かなので (because it's quiet). The polite 〜ます form can also precede ので in very formal speech: 行きますので.",
    conjugation:
      "Plain form + ので (or ます + ので in very formal speech).\n• Verb: 行くので, 食べたので, しないので. (Very formal: 行きますので.)\n• i-adj: 寒いので, 美味しかったので.\n• na-adj / Noun: 静かなので (note: な, not だ!), 学生なので (also な). This is a key difference from 〜から (which takes だ).\nPolite: 〜ので + ます-form verb in main clause.",
    usage:
      "Use 〜ので for polite reasons — especially in business emails, customer service, and apologies: 病気なので、お休みをいただきます (I'm sick, so I'll take the day off). For very formal: 〜ますので (頂戴いたしますので、何卒よろしくお願い申し上げます). Softens refusals: 予定がございますので… (I have plans, so…).",
    commonMistake:
      "Using だ before ので for nouns/na-adjs: ✗「学生だので」 — must be 学生なので (use な instead of だ). Also, ✗「行きますので」 is overly formal in casual contexts — just 行くから is more natural. And don't use ので to make BLUNT demands — its softness is its purpose.",
    examples: [
      { jp: "寒いので、窓を閉めます。", en: "Because it's cold, I'll close the window.", difficulty: "easy" },
      {
        jp: "病気なので、今日は休みます。",
        en: "I'm sick, so I'll take the day off today.",
        difficulty: "medium",
        note: "Noun + な + ので (病気なので).",
      },
      {
        jp: "電車が遅延しておりますので、少し遅れて到着する予定です。",
        en: "The train is delayed, so I expect to arrive a bit late. (business polite)",
        difficulty: "hard",
        note: "〜しております (humble) + ので — formal business style.",
      },
    ],
    exercises: [
      {
        question: "寒い___、窓を閉めます。  ('Because it's cold, I'll close the window.')",
        answer: "ので",
        hint: "Formal/polite 'because'.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for a noun: 'I'm sick, so ~' (病気___、休みます。)",
        type: "multiple-choice",
        options: ["なので", "だので", "での", "がので"],
        answer: "なので",
      },
      {
        question: "Convert 静かだ (quiet, na-adj) to the 〜ので form.",
        answer: "静かなので",
        hint: "na-adj: replace だ with な before ので.",
        type: "fill-blank",
      },
    ],
    order: 48,
  },
  {
    title: "〜ほうがいい (hō ga ii) — had better",
    level: "N4",
    lesson: 17,
    chapter: "Intention, Reason & Advice",
    structure: "Verb (ta-form) + ほうがいい / Verb (nai-form) + ない ほうがいい",
    meaning: "you'd better ~ / you should ~",
    rule:
      "〜ほうがいい gives advice or a recommendation. The PAST form is used for affirmative advice: 薬を飲んだほうがいい (you'd better take medicine). The NEGATIVE form (〜ない + ほうがいい) is used for advice against doing: 無理しないほうがいい (you shouldn't push yourself). For nouns/na-adjs use 〜の + ほうがいい: 静かなほうがいい (it's better to be quiet). Polite: 〜ほうがいいです. Plain: 〜ほうがいい.",
    conjugation:
      "Verb ta-form + ほうがいい (affirmative advice).\n• Ichidan: 食べる → 食べたほうがいい.\n• Godan: 行く → 行ったほうがいい, 読む → 読んだほうがいい, 買う → 買ったほうがいい, 話す → 話したほうがいい.\n• Irregular: する → したほうがいい, 来る → 来たほうがいい (kita hō ga ii).\nNegative advice: 〜ない + ほうがいい. 行かないほうがいい, 食べないほうがいい.\nPolite: 〜ほうがいいです. Past: 〜ほうがよかった (should have ~).",
    usage:
      "Use 〜ほうがいい to give advice: 薬を飲んだほうがいいですよ (you'd better take medicine). 無理しないほうがいい (you shouldn't push yourself). For 'should have ~' (past regret): 〜ほうがよかった (もっと勉強しておくべきだった / 勉強しておけばよかった — both common).",
    commonMistake:
      "Using the dictionary form instead of past: ✗「食べるほうがいい」 — must be 食べたほうがいい (past form). Also, ✗「食べないたほうがいい」 — for negative advice just use 〜ない + ほうがいい: 食べないほうがいい. And don't use 〜ほうがいい for giving ORDERS — it's advice, not a command.",
    examples: [
      { jp: "薬を飲んだほうがいいですよ。", en: "You'd better take medicine.", difficulty: "easy" },
      {
        jp: "無理しないほうがいい。",
        en: "You shouldn't push yourself.",
        difficulty: "medium",
        note: "Negative advice: 〜ない + ほうがいい.",
      },
      {
        jp: "風邪を引いた時は、早く寝たほうがいいですよ。",
        en: "When you catch a cold, you'd better go to bed early.",
        difficulty: "hard",
        note: "寝る → 寝た + ほうがいい (ichidan: drop る, add た).",
      },
    ],
    exercises: [
      {
        question: "薬を飲___ほうがいいですよ。  ('You'd better take medicine.')",
        answer: "んだ",
        hint: "ta-form 飲んだ (godan む → んだ) + ほうがいい.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for affirmative advice: 食べる (to eat) → 食べ___ほうがいい",
        type: "multiple-choice",
        options: ["た", "る", "て", "ない"],
        answer: "た",
      },
      {
        question: "Convert 行く (to go) to the NEGATIVE advice form ('shouldn't go').",
        answer: "行かないほうがいい",
        hint: "nai-form + ほうがいい.",
        type: "fill-blank",
      },
    ],
    order: 49,
  },

  // ===== Lesson 18: Time Clauses =====
  {
    title: "〜時 (toki) — when / at the time of",
    level: "N4",
    lesson: 18,
    chapter: "Time Clauses",
    structure: "Plain form + 時",
    meaning: "when ~ / at the time of ~",
    rule:
      "〜時 means 'when ~' or 'at the time of ~'. The TENSE of the verb before 時 determines the timing relationship:\n• V (dictionary form) + 時 = BEFORE doing the action. 日本へ行く時、薬を買う = Before going to Japan, I'll buy medicine (I haven't gone yet).\n• V (ta-form) + 時 = AFTER doing the action. 日本へ行った時、薬を買った = When I went to Japan, I bought medicine (already went).\n• i-adj + 時: 寒い時 (when it's cold), 寒かった時 (when it was cold).\n• Noun + の + 時: 学生の時 (when I was a student).",
    conjugation:
      "Plain form + 時.\n• Verb dictionary (BEFORE): 食べる時 (when/before I eat — about to eat).\n• Verb ta-form (AFTER): 食べた時 (when/after I ate).\n• i-adj: 寒い時 (when it's cold).\n• na-adj: 静かな時 (when it's quiet — use な).\n• Noun: 学生の時 (when [I was] a student — use の).\nFor polite speech: 〜時です (when ~ it is), 〜時でした (when ~ it was).",
    usage:
      "Use 〜時 to talk about situations at a specific time: 暇な時、本を読みます (when I have free time, I read books). 日本へ行った時、富士山を見ました (when I went to Japan, I saw Mt. Fuji). The timing of the action relative to 時 is encoded in the verb form before 時.",
    commonMistake:
      "Wrong verb tense before 時: ✗「日本へ行った時、薬を買う」 sounds contradictory — going (already past) but buying (future). For 'before going to Japan, I'll buy medicine' use 日本へ行く時. For 'when I went to Japan, I bought medicine' use 日本へ行った時、薬を買った. Tense matters!",
    examples: [
      { jp: "暇な時、本を読みます。", en: "When I'm free, I read books.", difficulty: "easy" },
      {
        jp: "日本へ行った時、富士山を見ました。",
        en: "When I went to Japan, I saw Mt. Fuji.",
        difficulty: "medium",
        note: "ta-form 行った + 時 = 'when I went (already past)'.",
      },
      {
        jp: "夜、寝る時は必ず部屋の電気を消してください。",
        en: "Please make sure to turn off the room light when you go to bed at night.",
        difficulty: "hard",
        note: "寝る時 = 'when you go to sleep' (BEFORE sleeping — dictionary form).",
      },
    ],
    exercises: [
      {
        question: "暇___時、本を読みます。  ('When I have free time, I read books.') — na-adj pattern.",
        answer: "な",
        hint: "na-adj + な + 時.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct verb form for 'when I went to Japan, I saw Mt. Fuji' (日本へ___時、富士山を見た):",
        type: "multiple-choice",
        options: ["行った", "行く", "行き", "行って"],
        answer: "行った",
      },
      {
        question: "Convert 学生 (student, noun) to the 'when I was a student' form: 学生___時",
        answer: "の",
        hint: "Noun + の + 時.",
        type: "fill-blank",
      },
    ],
    order: 50,
  },
  {
    title: "〜前に / 〜後で (mae ni / ato de) — before / after",
    level: "N4",
    lesson: 18,
    chapter: "Time Clauses",
    structure: "V (dictionary) + 前に / V (ta-form) + 後で",
    meaning: "before doing ~ / after doing ~",
    rule:
      "These patterns sequence two actions:\n• 〜前に (BEFORE doing): always takes the DICTIONARY form of the verb — 食べる前に手を洗う (wash hands before eating). The action after 前に happens LATER.\n• 〜後で (AFTER doing): always takes the TA-FORM of the verb — 食べた後で歯を磨く (brush teeth after eating). The action after 後で happens LATER.\nFor NOUNS use Noun + の + 前/後: 食事の前に (before the meal), 食事の後で (after the meal).",
    conjugation:
      "Verb (dictionary) + 前に — for 'before doing ~'.\n• Ichidan: 食べる前に.\n• Godan: 行く前に, 読む前に, 買う前に, 話す前に.\n• Irregular: する前に, 来る前に (kuru mae ni).\nVerb (ta-form) + 後で — for 'after doing ~'.\n• Ichidan: 食べた後で.\n• Godan: 行った後で, 読んだ後で, 買った後で, 話した後で.\n• Irregular: した後で, 来た後で (kita ato de).\nFor nouns: Noun + の + 前/後 (食事の前に, 会議の後で).",
    usage:
      "Use 〜前に for actions done BEFORE another action (食べる前に手を洗う = wash hands before eating). Use 〜後で for actions done AFTER another action (食べた後で歯を磨く = brush teeth after eating). Note: 後で is usually followed by で, but 後 can also be used alone: 食べた後、散歩する.",
    commonMistake:
      "Using past form before 前: ✗「食べた前に」 — 前 ALWAYS takes dictionary form. Using dictionary form before 後: ✗「食べる後で」 — 後 ALWAYS takes ta-form. Mixing these up reverses the meaning entirely!",
    examples: [
      { jp: "食べる前に手を洗います。", en: "I wash my hands before eating.", difficulty: "easy" },
      {
        jp: "食べた後で、歯を磨きます。",
        en: "After eating, I brush my teeth.",
        difficulty: "medium",
        note: "ta-form 食べた + 後で = 'after eating'.",
      },
      {
        jp: "会議の前に、資料をもう一度確認しておきましょう。",
        en: "Before the meeting, let's check the materials one more time.",
        difficulty: "hard",
        note: "Noun + の + 前 (会議の前に); 確認しておく = 'check in advance' (N3 〜ておく).",
      },
    ],
    exercises: [
      {
        question: "食べ___前に手を洗います。  ('I wash my hands before eating.')",
        answer: "る",
        hint: "前 always takes dictionary form.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for 'after eating' (食べ___後で):",
        type: "multiple-choice",
        options: ["た", "る", "て", "ない"],
        answer: "た",
      },
      {
        question: "Convert 会議 (meeting, noun) to the 'before the meeting' form: 会議___前___",
        answer: "の, に",
        hint: "Noun + の + 前 + に.",
        type: "fill-blank",
      },
    ],
    order: 51,
  },

  // ===== ---------------- N3 (Lessons 19–25) ---------------- =====

  // ===== Lesson 19: Possibility & Expectation =====
  {
    title: "〜かもしれません (kamo shirenai) — might / perhaps",
    level: "N3",
    lesson: 19,
    chapter: "Possibility & Expectation",
    structure: "Plain form + かもしれません",
    meaning: "might / perhaps ~ (about 50% possibility)",
    rule:
      "〜かもしれません expresses possibility — roughly 50% certainty. 明日雨が降るかもしれません = it might rain tomorrow. It attaches to the PLAIN form (dictionary form for verbs, plain form for adjs/nouns). For nouns/na-adjs use the plain form directly: 学生かもしれません (he might be a student), 静かかもしれません (it might be quiet). Slightly more formal/literary alternative: 〜かもしれぬ. Shortened casual: 〜かも.",
    conjugation:
      "Plain form + かもしれません.\n• Verb: 行くかもしれません, 食べたかもしれません (might have eaten), しないかもしれません.\n• i-adj: 寒いかもしれません, 寒かったかもしれません.\n• na-adj / Noun: 静かかもしれません (NO だ needed), 学生かもしれません (NO だ needed). Note: かもしれない drops the だ from nouns/na-adjs, unlike 〜そうです (hearsay).\nCasual contraction: 〜かも (行くかも = might go). Negative possibility: 行かないかもしれない (might not go).",
    usage:
      "Use 〜かもしれません for uncertain future events or speculation: 彼は来ないかもしれません (he might not come). それは本当かもしれません (that might be true). Often used in weather forecasts and predictions. For HIGHER certainty use 〜はず (should be, by expectation) or 〜に違いない (no doubt). For LOWER certainty use 〜かな / 〜かもしれないけど…",
    commonMistake:
      "Using masu-form before かもしれません: ✗「行きますかもしれません」 — must be plain form 行く. Also, ✗「学生だかもしれません」 — for nouns/na-adjs かもしれません directly attaches WITHOUT だ: 学生かもしれません.",
    examples: [
      { jp: "彼は来ないかもしれません。", en: "He might not come.", difficulty: "easy" },
      {
        jp: "明日は雪が降るかもしれないから、傘を持っていこう。",
        en: "It might snow tomorrow, so let's bring an umbrella.",
        difficulty: "medium",
        note: "Plain form 降る + かもしれない (casual form of かもしれません).",
      },
      {
        jp: "この計画が成功するかどうかは、まだ分からない。失敗するかもしれないし、大成功するかもしれない。",
        en: "Whether this plan will succeed is still unknown. It might fail, or it might be a huge success.",
        difficulty: "hard",
        note: "〜かもしれないし、〜かもしれない = 'might ~, or might ~'.",
      },
    ],
    exercises: [
      {
        question: "彼は来___かもしれません。  ('He might come.')",
        answer: "る",
        hint: "Dictionary form before かもしれません.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for 'might have eaten' (食べ___かもしれない):",
        type: "multiple-choice",
        options: ["た", "る", "て", "ない"],
        answer: "た",
      },
      {
        question: "Convert 学生 (student, noun) to the 'might be a student' form.",
        answer: "学生かもしれません",
        hint: "Noun directly + かもしれません (no だ).",
        type: "fill-blank",
      },
    ],
    order: 52,
  },
  {
    title: "〜はず (hazu) — expectation",
    level: "N3",
    lesson: 20,
    chapter: "Possibility & Expectation",
    structure: "Plain form + はず です",
    meaning: "should be / supposed to be (by expectation)",
    rule:
      "〜はず expresses a logical EXPECTATION based on reasoning — 'should be ~', 'supposed to be ~'. もう着いているはずです = he should have arrived already (by my reasoning). Unlike 〜かもしれません (uncertain), 〜はず implies you have a reason to expect it. For nouns/na-adjs use 〜のはず or just な + はず: 学生のはずです (he should be a student), 静かなはずです (it should be quiet). Negative: 〜ないはずです (shouldn't be).",
    conjugation:
      "Plain form + はず です.\n• Verb: 行くはずです (should go), 食べたはずです (should have eaten), しないはずです (shouldn't do).\n• i-adj: 寒いはずです (should be cold), 寒かったはずです (should have been cold).\n• na-adj: 静かなはずです (should be quiet — use な).\n• Noun: 学生のはずです (should be a student — use の).\nNegative expectation: 〜ないはずです (shouldn't be). Past: 〜たはずです (should have ~).",
    usage:
      "Use 〜はず for things you have logical reason to expect: 彼はもう着いているはずです (he should have arrived already — he left an hour ago). この時計は高いから、正確なはずです (this watch is expensive, so it should be accurate). Negative: 彼は来ないはずです (he shouldn't be coming — I told him not to).",
    commonMistake:
      "Forgetting な for na-adjs: ✗「静かはずです」 — must be 静かなはずです. Forgetting の for nouns: ✗「学生はずです」 — must be 学生のはずです. Also, 〜はず implies the speaker's belief — if reality contradicts it, that's the surprise: 着いているはずなのに、まだ来ない (he should be here, but he hasn't come).",
    examples: [
      { jp: "この時計は高いから、正確なはずです。", en: "This watch is expensive, so it should be accurate.", difficulty: "easy" },
      {
        jp: "もう着いているはずなのに、まだ連絡がありません。",
        en: "He should have arrived already, but there's still no contact.",
        difficulty: "medium",
        note: "〜はずなのに = 'should be ~ but (surprisingly) not'.",
      },
      {
        jp: "彼がそんなことを言うはずがない。きっと誤解だろう。",
        en: "There's no way he would say such a thing. It must be a misunderstanding.",
        difficulty: "hard",
        note: "〜はずがない = strong 'there's no way ~' (negative expectation).",
      },
    ],
    exercises: [
      {
        question: "この時計は高いから、正確___はずです。  ('This watch is expensive, so it should be accurate.')",
        answer: "な",
        hint: "na-adj + な + はずです.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for 'should have arrived': もう着い___はずです",
        type: "multiple-choice",
        options: ["ている", "て", "た", "る"],
        answer: "ている",
      },
      {
        question: "Convert 学生 (student, noun) to the 'should be a student' form.",
        answer: "学生のはずです",
        hint: "Noun + の + はずです.",
        type: "fill-blank",
      },
    ],
    order: 53,
  },
  {
    title: "〜に違いない (ni chigainai) — no doubt",
    level: "N3",
    lesson: 20,
    chapter: "Possibility & Expectation",
    structure: "Plain form + に違いない",
    meaning: "there is no doubt that ~ / surely",
    rule:
      "〜に違いない expresses STRONG CONJECTURE — 'there's no doubt that ~', 'I'm sure ~'. Stronger than 〜はず (expectation) or 〜かもしれません (possibility). 彼が犯人に違いない = he must be the culprit (I'm certain). For nouns/na-adjs use the plain form: 学生に違いない (must be a student), 静かに違いない (must be quiet). Polite: 〜に違いないです / 〜に違いありません. Shortened casual: 〜に違いないね / 〜に決まってる (similar meaning).",
    conjugation:
      "Plain form + に違いない.\n• Verb: 行くに違いない (surely goes), 行ったに違いない (surely went), しないに違いない (surely won't).\n• i-adj: 寒いに違いない (must be cold), 寒かったに違いない (must have been cold).\n• na-adj / Noun: 静かに違いない (must be quiet — NO だ!), 学生に違いない (must be a student — NO だ!).\nPolite: 〜に違いないです / 〜に違いありません. Casual contraction: 〜に違いないね.",
    usage:
      "Use 〜に違いない for strong, confident conjecture based on evidence/reasoning: 彼は絶対成功するに違いない (he will surely succeed). この痕跡から見て、彼が犯人に違いない (judging from this evidence, he must be the culprit). For less certain conjecture, use 〜はず (expectation) or 〜かもしれません (possibility).",
    commonMistake:
      "Adding だ for nouns/na-adjs: ✗「学生だに違いない」 — must be 学生に違いない (no だ). Also, ✗「行きますに違いない」 — must be plain form 行く. And 〜に違いない is more literary/formal; in casual speech, 〜に決まってる (surely ~) or just 〜だろう (probably ~) is more common.",
    examples: [
      { jp: "彼は絶対成功するに違いない。", en: "He will surely succeed.", difficulty: "easy" },
      {
        jp: "彼女の嬉しそうな顔を見ると、試験に合格したに違いない。",
        en: "Looking at her happy face, she must have passed the exam.",
        difficulty: "medium",
        note: "合格した (ta-form) + に違いない = 'must have passed'.",
      },
      {
        jp: "この遺跡から発掘された土器は、古代王朝のものに違いありません。",
        en: "The pottery excavated from these ruins is undoubtedly from the ancient dynasty.",
        difficulty: "hard",
        note: "Polite form 〜に違いありません.",
      },
    ],
    exercises: [
      {
        question: "彼は絶対成功する___違いない。  ('He will surely succeed.')",
        answer: "に",
        hint: "Plain form + に + 違いない.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct option for 'must be a student':",
        type: "multiple-choice",
        options: ["学生に違いない", "学生だに違いない", "学生のに違いない", "学生なに違いない"],
        answer: "学生に違いない",
        hint: "Noun attaches directly to に違いない (no だ needed).",
      },
      {
        question: "Convert 合格する (pass an exam) to the 'must have passed' form.",
        answer: "合格したに違いない",
        hint: "ta-form + に違いない.",
        type: "fill-blank",
      },
    ],
    order: 54,
  },

  // ===== Lesson 21: Seems-like Patterns =====
  {
    title: "〜ようだ (yō da) — seems (appearance / sensory evidence)",
    level: "N3",
    lesson: 21,
    chapter: "Seems-like Patterns",
    structure: "Plain form + よう だ",
    meaning: "it seems that / it looks like (based on evidence)",
    rule:
      "〜ようだ expresses a CONJECTURE based on sensory evidence or situational judgment — 'it seems ~', 'it looks like ~'. 雨が降っているようだ = it seems to be raining (I see wet streets, hear the sound, etc.). For nouns use Noun + の + ようだ (学生のようだ = seems to be a student). For na-adjs use な: 静かなようだ (seems quiet). 〜ようだ conjugates like a na-adjective: 〜ような + Noun (雨が降っているような日 = a day when it seems to rain), 〜ように + Verb (雨が降っているように見える = looks like it's raining).",
    conjugation:
      "Plain form + よう だ.\n• Verb: 降っているようだ (seems to be raining), 降ったようだ (seems to have rained).\n• i-adj: 寒いようだ (seems cold), 寒かったようだ (seems to have been cold).\n• na-adj: 静かなようだ (seems quiet — use な).\n• Noun: 学生のようだ (seems to be a student — use の).\nPolite: 〜ようです. Past: 〜ようだった. Negative: 〜ではないようだ. Modifying noun: 〜ような. Adverbial: 〜ように (静かなように話す = speak quietly).",
    usage:
      "Use 〜ようだ for evidence-based conjecture: 彼は疲れているようだ (he seems tired — based on his appearance). 隣の部屋から音がする。誰かいるようだ (I hear a sound from the next room — someone seems to be there). Also used for SIMILES and EXAMPLES (今日のように = like today; 日本のように = like Japan).",
    commonMistake:
      "Forgetting の for nouns: ✗「学生ようだ」 — must be 学生のようだ. Forgetting な for na-adjs: ✗「静かようだ」 — must be 静かなようだ. Also, confusing 〜ようだ (conjecture) with 〜ようにする (try to ~) or 〜ようになる (come to ~) — different grammar points despite similar shape.",
    examples: [
      { jp: "彼は疲れているようだ。", en: "He seems tired.", difficulty: "easy" },
      {
        jp: "隣の部屋から音がする。誰かいるようですね。",
        en: "There's a sound from the next room. It seems someone is there.",
        difficulty: "medium",
        note: "Plain form いる + ようだ (sensory-evidence conjecture).",
      },
      {
        jp: "あの雲の形から見て、午後には雨が降るようです。",
        en: "Judging from the shape of those clouds, it seems it will rain in the afternoon.",
        difficulty: "hard",
        note: "〜から見て = 'judging from ~'.",
      },
    ],
    exercises: [
      {
        question: "彼は疲れて___ようだ。  ('He seems tired.')",
        answer: "いる",
        hint: "Plain ongoing form + ようだ.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for 'seems to be a student' (学生___ようだ):",
        type: "multiple-choice",
        options: ["の", "が", "を", "で"],
        answer: "の",
      },
      {
        question: "Convert 静かだ (quiet, na-adj) to the 'seems quiet' form.",
        answer: "静かなようだ",
        hint: "na-adj: replace だ with な + ようだ.",
        type: "fill-blank",
      },
    ],
    order: 55,
  },
  {
    title: "〜らしい (rashii) — typical of / seems (hearsay)",
    level: "N3",
    lesson: 21,
    chapter: "Seems-like Patterns",
    structure: "Noun + らしい / Plain form + らしい",
    meaning: "seems to be / typical of / I hear that",
    rule:
      "〜らしい has TWO main uses: (1) HEARSAY/conjecture based on what you've heard — 彼は来ないらしい = I hear he isn't coming. (2) 'typical of ~', describing something as fitting a quality — 春らしい天気 = weather typical of spring; 男らしい = manly; 女らしい = feminine. When attaching to nouns for the 'typical' meaning, らしい directly follows the noun: 春らしい (typical of spring). For hearsay, らしい follows the plain form (verbs/i-adjs directly; nouns/na-adjs take plain form, often with だ omitted).",
    conjugation:
      "Plain form + らしい (hearsay/conjecture).\n• Verb: 行くらしい (I hear he's going), 行ったらしい (apparently he went), 行かないらしい (I hear he won't go).\n• i-adj: 寒いらしい (I hear it's cold), 寒かったらしい (apparently it was cold).\n• na-adj: 静からしい is WRONG — for na-adj hearsay, use plain form 静かだらしい (rare) or 静からしい as 'typical of' (N5-level quirk).\n• Noun + らしい (typical of): 春らしい (typical of spring), 男らしい (manly), 学生らしい (like a student).\nPolite: 〜らしいです. Past: 〜らしかった. Negative: 〜じゃないらしい (I hear it's not ~).",
    usage:
      "Use 〜らしい for hearsay ('I hear that ~'): 彼は来月結婚するらしい (I hear he's getting married next month). For 'typical of ~': 春らしい天気 (weather typical of spring), 男らしい人 (a manly person), 子供らしい (childlike). Also used for 'seems' based on indirect evidence: 彼女は今日、病気らしい (it seems she's sick today — I heard from someone).",
    commonMistake:
      "For the 'typical of' meaning, attaching らしい to non-nouns: ✗「静からしい」 only works if you treat 静か as a noun stem; usually we say 静からしい人 (a quiet-typical person) but more naturally 静かな人. Also confusing 〜らしい (hearsay) with 〜そう (conjecture/looks like) and 〜ようだ (evidence-based seems) — they're all 'seems ~' but with different sources of info.",
    examples: [
      { jp: "彼女は今日、病気らしい。", en: "It seems she is sick today.", difficulty: "easy" },
      {
        jp: "春らしい陽気になってきました。",
        en: "The weather has become typical of spring.",
        difficulty: "medium",
        note: "春 + らしい = 'typical of spring' (uses noun directly).",
      },
      {
        jp: "彼は来月、日本へ出張するらしいですが、詳しいことはまだ分かりません。",
        en: "I hear he's going on a business trip to Japan next month, but I don't know the details.",
        difficulty: "hard",
        note: "Plain form 出張する + らしい = hearsay.",
      },
    ],
    exercises: [
      {
        question: "彼女は今日、病気___。  ('It seems she is sick today.')",
        answer: "らしい",
        hint: "Noun + らしい (conjecture).",
        type: "fill-blank",
      },
      {
        question: "Choose the correct 'typical of spring' form: 春___天気",
        type: "multiple-choice",
        options: ["らしい", "らしく", "らしくて", "らしいな"],
        answer: "らしい",
      },
      {
        question: "Convert 行く (to go) to the hearsay form ('I hear he's going').",
        answer: "行くらしい",
        hint: "Plain form + らしい.",
        type: "fill-blank",
      },
    ],
    order: 56,
  },
  {
    title: "〜みたいだ (mitai da) — seems (casual)",
    level: "N3",
    lesson: 21,
    chapter: "Seems-like Patterns",
    structure: "Plain form + みたい だ",
    meaning: "looks like / seems (casual, conversational)",
    rule:
      "〜みたいだ is the CASUAL, conversational equivalent of 〜ようだ — both express 'seems ~', 'looks like ~'. 雨みたいだ = looks like rain. 彼、忙しいみたいだね = he seems busy. 〜みたいだ is preferred in spoken Japanese, while 〜ようだ is preferred in writing. For nouns you can attach directly: 学生みたいだ (looks like a student — no の needed, unlike ようだ). Conjugates like a na-adj: 〜みたいな + Noun (雨みたいな天気 = rain-like weather), 〜みたいに + Verb (雨みたいに降る = rain like rain does).",
    conjugation:
      "Plain form + みたい だ.\n• Verb: 降っているみたいだ (looks like it's raining), 降ったみたいだ (looks like it rained).\n• i-adj: 寒いみたいだ (seems cold), 寒かったみたいだ (seems to have been cold).\n• na-adj: 静かみたいだ (seems quiet — drop だ, attach みたいだ).\n• Noun: 学生みたいだ (looks like a student — directly attach, no の needed unlike ようだ).\nPolite: 〜みたいです. Past: 〜みたいだった. Negative: 〜じゃないみたいだ (seems not ~). Modifying: 〜みたいな (noun), 〜みたいに (adverb).",
    usage:
      "Use 〜みたいだ in casual conversation for 'seems ~': 彼、忙しいみたいだね (looks like he's busy). 雨みたいだよ (looks like rain). For FORMAL or WRITTEN Japanese, use 〜ようだ instead. Very common in everyday speech and anime/drama dialogue.",
    commonMistake:
      "Using 〜みたいだ in formal writing — use 〜ようだ instead. Also, ✗「学生のみたいだ」 — for nouns attach みたいだ directly WITHOUT の (unlike ようだ which needs の). And ✗「静かなみたいだ」 — for na-adjs, drop the だ: 静かみたいだ.",
    examples: [
      { jp: "彼、忙しいみたいだね。", en: "Looks like he's busy.", difficulty: "easy" },
      {
        jp: "隣の部屋、誰もいないみたいだ。",
        en: "Looks like there's no one in the next room.",
        difficulty: "medium",
        note: "Plain negative form いない + みたいだ.",
      },
      {
        jp: "彼はまるで子供みたいに喜んでいる。",
        en: "He's delighted like a child.",
        difficulty: "hard",
        note: "〜みたいに (adverbial) + 喜んでいる = 'delighted in a childlike way'.",
      },
    ],
    exercises: [
      {
        question: "彼、忙しい___ね。  ('Looks like he's busy.')",
        answer: "みたいだ",
        hint: "Casual 'seems like' form.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for 'looks like a student' (学生___):",
        type: "multiple-choice",
        options: ["みたいだ", "のようだ", "らしい", "そうだ"],
        answer: "みたいだ",
      },
      {
        question: "Convert 雨が降る (it rains) to the casual 'looks like it'll rain' form.",
        answer: "雨が降るみたいだ",
        hint: "Plain form + みたいだ.",
        type: "fill-blank",
      },
    ],
    order: 57,
  },

  // ===== Lesson 22: Auxiliary Verb Constructions =====
  {
    title: "〜てしまう (te shimau) — completion / regret",
    level: "N3",
    lesson: 22,
    chapter: "Auxiliary Verb Constructions",
    structure: "Verb (te-form) + しまう",
    meaning: "do completely / end up ~ing (often with regret or accident)",
    rule:
      "〜てしまう has TWO nuances: (1) COMPLETION — finishing an action fully (本を読んでしまった = I read the whole book / finished reading); (2) REGRET/ACCIDENT — doing something you wish you hadn't, or doing it carelessly (うっかり財布を忘れてしまった = I accidentally left my wallet behind). The casual contracted form is 〜ちゃう (godan/ichidan) or 〜じゃう (for で → じゃ). Polite: 〜てしまいます. 〜てしまった (past) emphasizes the regret or completion.",
    conjugation:
      "Verb te-form + しまう.\n• Ichidan: 食べる → 食べてしまう.\n• Godan: 書く → 書いてしまう, 読む → 読んでしまう, 買う → 買ってしまう, 話す → 話してしまう.\n• Irregular: する → してしまう, 来る → 来てしまう (kite shimau).\nCasual contractions: 〜てしまう → 〜ちゃう (食べてしまう → 食べちゃう, 書いてしまう → 書いちゃう); 〜でしまう → 〜じゃう (読んでしまう → 読んじゃう, 話してしまう → 話しちゃう).\nPolite: 〜てしまいます. Past: 〜てしまった / 〜ちゃった. Negative: 〜てしまわない (rarely used).",
    usage:
      "Use 〜てしまう for: (1) completing an action (全部食べてしまった = ate it all up); (2) regret/accident (うっかり宿題を忘れてしまった = I accidentally forgot my homework). The contracted 〜ちゃう/〜じゃう is extremely common in casual speech. In a positive sense, 〜てしまう can show determination: 今日中に終わらせてしまおう (let's get it done today!).",
    commonMistake:
      "Using 〜てしまう only for regret — it also expresses completion (no negative nuance). Also, ✗「食べるてしまう」 — must be the te-form 食べてしまう. And in polite speech, ✗「食べてしまったです」 — past is 食べてしまいました (no です after た).",
    examples: [
      { jp: "うっかり財布を忘れてしまった。", en: "I accidentally left my wallet behind.", difficulty: "easy" },
      {
        jp: "ごめん、彼女の秘密をもう言っちゃった。",
        en: "Sorry, I already blurted out her secret.",
        difficulty: "medium",
        note: "言う → 言ってしまう → 言っちゃった (casual contraction).",
      },
      {
        jp: "今日中にこの仕事を全部終わらせてしまいたい。",
        en: "I want to finish all of this work today.",
        difficulty: "hard",
        note: "終わらせる (causative of 終わる) + てしまいたい = 'want to get it all done'.",
      },
    ],
    exercises: [
      {
        question: "うっかり財布を忘れ___しまった。  ('I accidentally left my wallet behind.')",
        answer: "て",
        hint: "te-form 忘れて + しまった.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct casual contraction of 食べてしまう:",
        type: "multiple-choice",
        options: ["食べちゃう", "食べじゃう", "食べるちゃう", "食べっちゃう"],
        answer: "食べちゃう",
      },
      {
        question: "Convert 読む (to read) to the 'accidentally read it all' past form.",
        answer: "読んでしまった",
        hint: "te-form 読んで + しまった.",
        type: "fill-blank",
      },
    ],
    order: 58,
  },
  {
    title: "〜ておく (te oku) — do in advance / leave as is",
    level: "N3",
    lesson: 23,
    chapter: "Auxiliary Verb Constructions",
    structure: "Verb (te-form) + おく",
    meaning: "do (something) in advance / leave (a state) for later",
    rule:
      "〜ておく has two main meanings: (1) DO IN ADVANCE — prepare for a future need: 明日の準備をしておく (prepare for tomorrow in advance); (2) LEAVE AS IS — perform an action and leave the result for later: 窓を開けておく (leave the window open [for now]). The casual contraction is 〜とく (godan/ichidan) or 〜どく (for で → ど). Polite: 〜ておきます. Past: 〜ておいた (did in advance).",
    conjugation:
      "Verb te-form + おく.\n• Ichidan: 食べる → 食べておく.\n• Godan: 書く → 書いておく, 読む → 読んでおく, 買う → 買っておく, 話す → 話しておく.\n• Irregular: する → しておく, 来る → 来ておく (kite oku).\nCasual contractions: 〜ておく → 〜とく (食べておく → 食べとく, 書いておく → 書いとく); 〜でおく → 〜どく (読んでおく → 読んどく).\nPolite: 〜ておきます. Past: 〜ておいた / 〜といた (casual). Negative: 〜ておかない (rare).",
    usage:
      "Use 〜ておく when: (1) you do something NOW to prepare for later (会議の前に資料をコピーしておく = copy the materials before the meeting [in advance]); (2) you leave something in a state for the future (窓を開けておいてください = please leave the window open [for ventilation]). The action is done with foresight.",
    commonMistake:
      "Confusing with 〜てしまう (completion/regret) — 〜ておく is about preparation/leaving a state, not finishing. Also, ✗「食べるておく」 — must be te-form 食べておく. And don't forget the casual contraction 〜とく/〜どく — very common in speech: 電気をつけとく (leave the light on).",
    examples: [
      { jp: "窓を開けておいてください。", en: "Please leave the window open.", difficulty: "easy" },
      {
        jp: "明日の朝、早く出発するから、荷物は今夜まとめておこう。",
        en: "We're leaving early tomorrow morning, so let's pack our bags tonight in advance.",
        difficulty: "medium",
        note: "まとめておく = pack up in advance (まとめる = to gather/pack).",
      },
      {
        jp: "お客さんが来る前に、部屋を掃除しておいた。",
        en: "I cleaned the room before the guests arrived (in preparation).",
        difficulty: "hard",
        note: "掃除して + おいた (past = did in advance).",
      },
    ],
    exercises: [
      {
        question: "窓を開け___おいてください。  ('Please leave the window open.')",
        answer: "て",
        hint: "te-form 開けて + おく.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct casual contraction of 読んでおく:",
        type: "multiple-choice",
        options: ["読んどく", "読んとく", "読んでとく", "読んできく"],
        answer: "読んどく",
      },
      {
        question: "Convert する (to do) to the 'do in advance' polite form.",
        answer: "しておきます",
        hint: "Irregular: して + おきます.",
        type: "fill-blank",
      },
    ],
    order: 59,
  },
  {
    title: "〜てみる (te miru) — try doing",
    level: "N3",
    lesson: 23,
    chapter: "Auxiliary Verb Constructions",
    structure: "Verb (te-form) + みる",
    meaning: "try doing ~ (to see what happens / to experience)",
    rule:
      "〜てみる expresses attempting an action to experience the result or see what happens — 'try ~ing'. この料理を食べてみる = I'll try eating this dish (to see if it's good). Once you do something just to see, 〜てみる conveys the exploratory nature. Polite: 〜てみます. Past: 〜てみた (tried doing ~). For 'try to ~' in the sense of 'attempt with effort' (and possibly fail), use 〜ようとする instead.",
    conjugation:
      "Verb te-form + みる.\n• Ichidan: 食べる → 食べてみる.\n• Godan: 行く → 行ってみる, 読む → 読んでみる, 買う → 買ってみる, 話す → 話してみる.\n• Irregular: する → してみる, 来る → 来てみる (kite miru).\nPolite: 〜てみます. Past: 〜てみた / 〜てみました (tried ~). Negative: 〜てみない (don't try). Volitional: 〜てみよう (let's try ~).",
    usage:
      "Use 〜てみる for trying something to see what it's like: 一度、日本語で話してみてください (please try speaking in Japanese once). この服、着てみてもいい？ (can I try this shirt on?). For 'try hard to do ~' (and possibly fail), use 〜ようとする (e.g., 立とうとしたが、転んだ — I tried to stand but fell).",
    commonMistake:
      "Confusing with 〜ようとする (attempt with effort, may fail). 〜てみる = try to experience; 〜ようとする = try with effort. Also, ✗「食べるてみる」 — must be the te-form 食べてみる. And don't use 〜てみる for trying hard physical actions — for 'I tried to lift the heavy box' use 持ち上げようとした, NOT 持ち上げてみた (which sounds like 'tried lifting to see how it feels').",
    examples: [
      { jp: "一度、日本語で話してみてください。", en: "Please try speaking in Japanese once.", difficulty: "easy" },
      {
        jp: "このケーキ、美味しそうだから食べてみよう。",
        en: "This cake looks delicious, so let me try eating it.",
        difficulty: "medium",
        note: "〜てみよう (volitional of 〜てみる) = 'let's try ~ing'.",
      },
      {
        jp: "思い切って彼女に告白してみたが、振られてしまった。",
        en: "I took the plunge and tried confessing to her, but I got turned down.",
        difficulty: "hard",
        note: "〜てみた (tried) + 〜てしまった (regretful completion).",
      },
    ],
    exercises: [
      {
        question: "一度、日本語で話し___ください。  ('Please try speaking in Japanese once.')",
        answer: "てみて",
        hint: "te-form 話して + みて.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for 'let's try eating' (食べ___):",
        type: "multiple-choice",
        options: ["てみよう", "てみた", "てみない", "てみます"],
        answer: "てみよう",
      },
      {
        question: "Convert する (to do) to the polite 'try doing' form.",
        answer: "してみます",
        hint: "Irregular: して + みます.",
        type: "fill-blank",
      },
    ],
    order: 60,
  },
  {
    title: "〜ことがある (koto ga aru) — sometimes / there are times",
    level: "N3",
    lesson: 23,
    chapter: "Auxiliary Verb Constructions",
    structure: "Verb (dictionary / ta-form) + ことが ある",
    meaning: "there are times when ~ / sometimes / have ever done ~",
    rule:
      "〜ことがある has TWO uses: (1) with the DICTIONARY form — 'sometimes I ~': 朝ご飯を食べないことがある = there are times I don't eat breakfast. (2) with the TA-FORM — 'have you ever done ~?': 日本へ行ったことがありますか = have you ever been to Japan? The dictionary form expresses occasional occurrence; the ta-form expresses past experience. Polite: 〜ことがあります. Negative: 〜たことがない (have never ~).",
    conjugation:
      "Verb (dictionary form) + ことが ある — 'sometimes ~'.\n• Ichidan: 食べることがある (sometimes I eat).\n• Godan: 行くことがある (sometimes I go), 読むことがある, 買うことがある, 話すことがある.\n• Irregular: することがある, 来ることがある (kuru koto ga aru).\nVerb (ta-form) + ことが ある — 'have ever done ~'.\n• 食べたことがある (have eaten), 行ったことがある (have gone), したことがある (have done).\nNegative of ta-form version: 〜たことがない (have never ~).\nPolite: 〜ことがあります. Past: 〜ことがあった (there were times).",
    usage:
      "Use 〜ことがある (dict form) for things you SOMETIMES do: 電車で寝過ごすことがある = there are times I oversleep on the train. Use 〜たことがある (ta-form) for past EXPERIENCE: 富士山に登ったことがありますか = have you ever climbed Mt. Fuji? Negative: 富士山に登ったことがない = I've never climbed it.",
    commonMistake:
      "Mixing up dictionary vs ta-form meaning: ✗「食べることがありますか」 for 'have you ever eaten?' — must be 食べたことがありますか (ta-form for experience). Also, ✗「食べたことがあることがある」 (don't double up). And for asking about EXPERIENCE, never use 〜ましたか (✗「食べましたか」 sounds like 'did you eat [at a specific time]').",
    examples: [
      { jp: "彼に会うことがあります。", en: "There are times I see him.", difficulty: "easy" },
      {
        jp: "日本へ行ったことがありますか。",
        en: "Have you ever been to Japan?",
        difficulty: "medium",
        note: "ta-form 行った + ことがある = experience.",
      },
      {
        jp: "朝ご飯を食べないことがあるけれど、健康に良くないと分かっている。",
        en: "There are times I skip breakfast, though I know it's not good for my health.",
        difficulty: "hard",
        note: "Dictionary form 食べない + ことがある = 'sometimes don't eat'.",
      },
    ],
    exercises: [
      {
        question: "彼に会___ことがあります。  ('There are times I see him.')",
        answer: "う",
        hint: "Dictionary form before ことがある for 'sometimes'.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for 'have you ever been to Japan?' (日本へ行___ことがありますか。)",
        type: "multiple-choice",
        options: ["った", "く", "き", "って"],
        answer: "った",
      },
      {
        question: "Convert 食べる to the 'have you ever eaten?' form.",
        answer: "食べたことがありますか",
        hint: "ta-form 食べた + ことがありますか.",
        type: "fill-blank",
      },
    ],
    order: 61,
  },

  // ===== Lesson 24: Decisions & Changes =====
  {
    title: "〜ことにする (koto ni suru) — decide to",
    level: "N3",
    lesson: 24,
    chapter: "Decisions & Changes",
    structure: "Verb (dictionary / nai form) + ことに する",
    meaning: "decide to ~ (one's own decision)",
    rule:
      "〜ことにする expresses a PERSONAL decision — 'I have decided to ~'. 来月から日本語を勉強することにした = I decided to study Japanese from next month. Use the DICTIONARY form for affirmative decisions, 〜ない for negative (行かないことにした = I decided not to go). The decision is active (subjective). Polite: 〜ことにします. Past: 〜ことにした (decided to ~).",
    conjugation:
      "Verb (dictionary / nai form) + ことに する.\n• Affirmative: 行くことにする (decide to go), 食べることにする, することにする.\n• Negative: 行かないことにする (decide not to go), 食べないことにする.\n• Past: 〜ことにした (decided to ~), 〜ないことにした (decided not to).\n• Polite: 〜ことにします, past polite 〜ことにしました.\nFor nouns: Noun + にする (私はコーヒーにします = I'll have coffee — different but related pattern).",
    usage:
      "Use 〜ことにする for YOUR OWN decision: 今度の週末は家で休むことにした (I decided to rest at home this weekend). 来年日本へ行くことにしました (I've decided to go to Japan next year). For a decision made BY OTHERS or externally imposed (e.g. by a company), use 〜ことになる instead.",
    commonMistake:
      "Confusing with 〜ことになる (passive/external decision). 〜ことにする = I decide; 〜ことになる = it has been decided (often by others). Also, ✗「行きますことにする」 — must be plain form 行くことにする. And don't forget the に before する: ✗「行くことする」.",
    examples: [
      { jp: "今度の週末は家で休むことにした。", en: "I decided to rest at home this weekend.", difficulty: "easy" },
      {
        jp: "健康のために、毎日30分歩くことにしました。",
        en: "I decided to walk 30 minutes every day for my health.",
        difficulty: "medium",
        note: "Dictionary form 歩く + ことにしました.",
      },
      {
        jp: "今月から甘いものを食べないことにしたが、なかなか続かない。",
        en: "I decided not to eat sweets starting this month, but I can't keep it up.",
        difficulty: "hard",
        note: "Negative form 食べない + ことにした.",
      },
    ],
    exercises: [
      {
        question: "今度の週末は家で休む___にした。  ('I decided to rest at home this weekend.')",
        answer: "こと",
        hint: "Dictionary form + ことにする.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for 'I decided not to go' (行かない___にした):",
        type: "multiple-choice",
        options: ["こと", "もの", "とき", "はず"],
        answer: "こと",
      },
      {
        question: "Convert 食べる to the polite 'decided to eat' form.",
        answer: "食べることにしました",
        hint: "Dictionary form + ことにしました.",
        type: "fill-blank",
      },
    ],
    order: 62,
  },
  {
    title: "〜ことになる (koto ni naru) — be decided that",
    level: "N3",
    lesson: 24,
    chapter: "Decisions & Changes",
    structure: "Verb (dictionary / nai form) + ことに なる",
    meaning: "it has been decided that ~ (external decision)",
    rule:
      "〜ことになる expresses a decision made EXTERNALLY — by others, by a group, or as a plan: 来年東京へ転勤することになった = it's been decided I'll be transferred to Tokyo next year. The decision is passive from the speaker's perspective (subjective decision uses 〜ことにする instead). Polite: 〜ことになります. Past: 〜ことになった (it was decided).",
    conjugation:
      "Verb (dictionary / nai form) + ことに なる.\n• Affirmative: 行くことになる (it's been decided to go), 食べることになる, することになる.\n• Negative: 行かないことになる (it's been decided not to go), 食べないことになる.\n• Past: 〜ことになった (was decided), 〜ないことになった (was decided not to).\n• Polite: 〜ことになります, past polite 〜ことになりました.\nFor nouns: Noun + になる (医者になる = become a doctor — different pattern).",
    usage:
      "Use 〜ことになる for externally-made decisions: 来月、日本へ出張することになりました (It's been decided I'll go on a business trip to Japan next month). This often conveys decisions made by a company, family, or group, not just by the speaker. For YOUR OWN decision use 〜ことにする.",
    commonMistake:
      "Confusing with 〜ことにする (own decision). 〜ことになる = external decision; 〜ことにする = own decision. Also, ✗「行きますことになる」 — must be plain form 行くことになる. And ✗「行くことなる」 — must have に: 行くことになる.",
    examples: [
      { jp: "来月、日本へ出張することになりました。", en: "It's been decided I'll go on a business trip to Japan next month.", difficulty: "easy" },
      {
        jp: "来年、大阪支社に転勤することになりました。",
        en: "It's been decided I'll be transferred to the Osaka branch next year.",
        difficulty: "medium",
        note: "External (company) decision — 転勤する → 転勤することに + なりました.",
      },
      {
        jp: "会議は来週の金曜日に延期することになったそうです。",
        en: "I heard the meeting has been rescheduled to next Friday.",
        difficulty: "hard",
        note: "延期する (postpone) + ことになった + そうです (hearsay).",
      },
    ],
    exercises: [
      {
        question: "来月、日本へ出張する___になりました。  ('It's been decided I'll go to Japan next month.')",
        answer: "こと",
        hint: "Dictionary form + ことになる.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for an EXTERNAL decision ('was decided to go'): 行く___になった",
        type: "multiple-choice",
        options: ["こと", "もの", "とき", "はず"],
        answer: "こと",
      },
      {
        question: "Convert 転勤する (to be transferred) to the polite 'it was decided' form.",
        answer: "転勤することになりました",
        hint: "Dictionary form + ことになりました.",
        type: "fill-blank",
      },
    ],
    order: 63,
  },

  // ===== Lesson 25: Changes & Casual Patterns =====
  {
    title: "〜ようになる (yō ni naru) — come to (change)",
    level: "N3",
    lesson: 25,
    chapter: "Changes & Casual Patterns",
    structure: "Verb (dictionary / nai form) + ように なる",
    meaning: "come to ~ / reach the point where ~ (gradual change)",
    rule:
      "〜ようになる describes a GRADUAL CHANGE in ability or state — 'come to ~', 'reach the point where ~'. 日本語が話せるようになった = I've become able to speak Japanese (over time, I can now). Use the dictionary form (or potential form) for a positive change: 食べるようになった (came to eat / started eating). Use 〜ない for a negative change: 食べないようになった (came to not eat). Often paired with 〜ようになる for ability: 見えるようになる (become able to see), 漢字が読めるようになった (became able to read kanji).",
    conjugation:
      "Verb (dictionary / nai / potential form) + ように なる.\n• Dictionary form: 食べるようになる (come to eat / start eating).\n• Nai form: 食べないようになる (come to not eat).\n• Potential form: 食べられるようになる (become able to eat).\n• Past: 〜ようになった (came to ~).\n• Polite: 〜ようになります / 〜ようになりました.\nFor nouns/adjectives: 静かになる (become quiet) is a different pattern (no よう).",
    usage:
      "Use 〜ようになる to describe gradual changes in ability or habit: 最近、早く起きられるようになりました (recently I've become able to wake up early). 日本の生活に慣れて、お味噌汁を飲むようになった (I got used to life in Japan and came to drink miso soup). Often used with the potential form: 話せるようになる = become able to speak.",
    commonMistake:
      "Using the masu-form: ✗「話ますようになる」 — must be plain form 話すようになる. Also, ✗「話すことになる」 (different — external decision) vs 話すようになる (gradual change). And don't forget the に: ✗「話するようになる」.",
    examples: [
      { jp: "最近、早く起きられるようになりました。", en: "Recently I've become able to wake up early.", difficulty: "easy" },
      {
        jp: "一年間練習して、ようやく漢字が読めるようになった。",
        en: "After a year of practice, I can finally read kanji.",
        difficulty: "medium",
        note: "Potential form 読める + ようになった = 'became able to read'.",
      },
      {
        jp: "日本に住むようになってから、和食が好きになった。",
        en: "Since I started living in Japan, I've come to like Japanese food.",
        difficulty: "hard",
        note: "住むようになる = 'come to live' (habit change); 好きになる = 'came to like' (different pattern).",
      },
    ],
    exercises: [
      {
        question: "最近、早く起きられる___になりました。  ('Recently I've become able to wake up early.')",
        answer: "よう",
        hint: "Potential form + ようになる.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for 'came to read' (読める___になった):",
        type: "multiple-choice",
        options: ["よう", "こと", "もの", "とき"],
        answer: "よう",
      },
      {
        question: "Convert 食べる to the 'started eating / came to eat' form.",
        answer: "食べるようになった",
        hint: "Dictionary form + ようになる (past).",
        type: "fill-blank",
      },
    ],
    order: 64,
  },
  {
    title: "〜ようにする (yō ni suru) — make sure to / try to",
    level: "N3",
    lesson: 25,
    chapter: "Changes & Casual Patterns",
    structure: "Verb (dictionary / nai form) + ように する",
    meaning: "make sure to ~ / try to ~ (deliberate effort)",
    rule:
      "〜ようにする expresses DELIBERATE EFFORT — 'I make sure to ~', 'I try to ~'. 毎日運動するようにしている = I try to exercise every day. Use the dictionary form for things you make sure to DO, and 〜ない for things you make sure NOT to do: 遅刻しないようにしている (I make sure not to be late). Often in the 〜ている form (〜ようにしている) for an ongoing habit. Polite: 〜ようにします.",
    conjugation:
      "Verb (dictionary / nai form) + ように する.\n• Dictionary form: 食べるようにする (try to eat / make sure to eat).\n• Nai form: 食べないようにする (make sure not to eat).\n• Ongoing habit: 〜ようにしている (am making sure to ~).\n• Past: 〜ようにした (made sure to ~).\n• Polite: 〜ようにします / 〜ようにしています / 〜ようにしました.\nVolitional: 〜ようにしよう (let's make sure to ~).",
    usage:
      "Use 〜ようにする for things you make a HABIT of or deliberately try to do: 毎日8時間寝るようにしている (I try to sleep 8 hours every day). 遅刻しないようにしています (I make sure not to be late). For 'come to be able to' use 〜ようになる (different).",
    commonMistake:
      "Confusing with 〜ようになる (gradual change/ability). 〜ようにする = deliberate effort; 〜ようになる = gradual change. Also, ✗「食べますようにする」 — must be plain form 食べるようにする. And ✗「食べるようにする」 vs ongoing habit 食べるようにしている — the 〜ている form is more natural for habitual actions.",
    examples: [
      { jp: "遅刻しないようにしています。", en: "I make sure not to be late.", difficulty: "easy" },
      {
        jp: "毎日、30分以上歩くようにしている。",
        en: "I try to walk for at least 30 minutes every day.",
        difficulty: "medium",
        note: "Dictionary form 歩く + ようにしている = habitual effort.",
      },
      {
        jp: "健康のために、夜9時以降は何も食べないようにしようと思う。",
        en: "For my health, I think I'll make sure not to eat anything after 9 p.m.",
        difficulty: "hard",
        note: "〜ないように + しようと思う = 'I think I'll make sure not to ~'.",
      },
    ],
    exercises: [
      {
        question: "遅刻しない___にしています。  ('I make sure not to be late.')",
        answer: "よう",
        hint: "Negative form + ようにする.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for 'try to walk every day' (毎日歩く___にしている):",
        type: "multiple-choice",
        options: ["よう", "こと", "もの", "はず"],
        answer: "よう",
      },
      {
        question: "Convert 食べる to the polite 'make sure to eat' habitual form.",
        answer: "食べるようにしています",
        hint: "Dictionary form + ように + しています.",
        type: "fill-blank",
      },
    ],
    order: 65,
  },
  {
    title: "〜ばかり (bakari) — only / nothing but",
    level: "N3",
    lesson: 25,
    chapter: "Changes & Casual Patterns",
    structure: "Noun + ばかり / Verb (te-form) + ばかり / Verb (ta-form) + ばかり",
    meaning: "only / nothing but ~ (often with negative nuance of excess)",
    rule:
      "〜ばかり (the N3 noun-particle version) means 'ONLY ~' or 'nothing but ~', often with a slightly negative nuance of excess. 甘いものばかり食べている = I eat nothing but sweets. 損ばかりしている = I keep losing. There are three forms: (1) Noun + ばかり (本ばかり読む = read only books); (2) Verb te-form + ばかり (食べてばかりいる = do nothing but eat); (3) Verb ta-form + ばかり (食べたばかり — this is the N4 'just did' pattern, different meaning). Context determines which.",
    conjugation:
      "Three patterns:\n• Noun + ばかり: 本ばかり (only books), 甘いものばかり (nothing but sweets).\n• Verb (te-form) + ばかり + いる/する: 食べてばかりいる (do nothing but eat), 寝てばかりいる (do nothing but sleep).\n• Verb (ta-form) + ばかり (different — N4 'just did'): 食べたばかり (just ate).\nFor numbers/quantities: 三つばかり (about three) — different, archaic.\nParticle ばかり doesn't conjugate; the verb it attaches to does.",
    usage:
      "Use Noun + ばかり for 'only ~ / nothing but ~': 損ばかりしている (I keep losing). 用意が悪い、文句ばかり言う (he does nothing but complain). Verb te-form + ばかり + いる for habitual 'always ~ing (and nothing else)': テレビを見てばかりいる (does nothing but watch TV). Often implies dissatisfaction with the one-sided pattern.",
    commonMistake:
      "Confusing with 〜たばかり (just did — N4 pattern). 〜ばかり with NOUNS or TE-form means 'nothing but'; with TA-form means 'just did'. Also, ✗「食べてばかりする」 — for habitual use 〜てばかりいる, NOT 〜てばかりする. And don't confuse with 〜だけ (only, more neutral) — 〜ばかり has a stronger 'and nothing else, annoyingly' nuance.",
    examples: [
      { jp: "甘いものばかり食べている。", en: "I eat nothing but sweets.", difficulty: "easy" },
      {
        jp: "彼は文句ばかり言って、ちっとも働かない。",
        en: "He does nothing but complain and never works.",
        difficulty: "medium",
        note: "Noun 文句 + ばかり — 'nothing but complaints'.",
      },
      {
        jp: "最近、残業ばかりで、なかなか家に帰れない。",
        en: "Lately it's been nothing but overtime — I can hardly get home.",
        difficulty: "hard",
        note: "Noun 残業 + ばかり — emphasizing the exhausting pattern.",
      },
    ],
    exercises: [
      {
        question: "甘いもの___食べている。  ('I eat nothing but sweets.')",
        answer: "ばかり",
        hint: "Noun + ばかり.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct pattern for 'does nothing but sleep' (寝___ばかりいる):",
        type: "multiple-choice",
        options: ["て", "た", "る", "ない"],
        answer: "て",
      },
      {
        question: "Convert テレビを見る to the 'does nothing but watch TV' form.",
        answer: "テレビを見てばかりいる",
        hint: "te-form 見て + ばかり + いる.",
        type: "fill-blank",
      },
    ],
    order: 66,
  },
  {
    title: "〜てたまらない (te tamaranai) — unbearably",
    level: "N3",
    lesson: 25,
    chapter: "Changes & Casual Patterns",
    structure: "Verb/Adj (te-form) + たまらない",
    meaning: "unbearably ~ / can't stand how ~",
    rule:
      "〜てたまらない expresses an emotion or sensation so strong you can't bear it — 'unbearably ~'. 暑くてたまらない = it's so hot I can't stand it. 嬉しくてたまらない = I'm so happy I can't stand it. Used with adjectives or verbs that express emotion/sensation. Polite: 〜てたまりません. Casual variations: 〜てしようがない (similar), 〜てかなわない. Note: たまらない alone means 'unbearable' or 'irresistible'.",
    conjugation:
      "Te-form of verb/adjective + たまらない.\n• i-adj (drop い, add くて): 暑い → 暑くてたまらない, 寒い → 寒くてたまらない.\n• na-adj (stem + で): 静かでたまらない (rare — usually with emotional adjs like 嬉しい which is i-adj).\n• Verb te-form: 食べたくてたまらない (unbearably want to eat), 泣きたくてたまらない (so sad I want to cry).\n• Noun (で + たまらない): 話題でたまらない.\nPolite: 〜てたまりません. Past: 〜てたまらなかった. Casual alt: 〜てしようがない.",
    usage:
      "Use 〜てたまらない for intense emotions or sensations: 喉が渇いてたまらない (I'm unbearably thirsty). 暑くてたまらない (it's so hot I can't stand it). 悔しくてたまらない (I'm so frustrated I can't stand it). Often used with physical sensations (暑い, 寒い, 痛い, 渇く) and strong emotions (嬉しい, 悔しい, 悲しい).",
    commonMistake:
      "Using with neutral states like 静かでたまらない — sounds odd. The pattern needs an emotion/sensation that can be 'unbearable'. Also, ✗「暑いてたまらない」 — for i-adjectives drop い, add くて: 暑くてたまらない. And ✗「暑くてたまらないだ」 — no だ after たまらない (it conjugates like an i-adj).",
    examples: [
      { jp: "喉が渇いてたまらない。", en: "I'm unbearably thirsty.", difficulty: "easy" },
      {
        jp: "今日は暑くてたまらない。早く帰りたい。",
        en: "It's unbearably hot today. I want to go home early.",
        difficulty: "medium",
        note: "i-adj 暑い → 暑くて + たまらない.",
      },
      {
        jp: "彼に負けて悔しくてたまらなかったが、来年こそは勝つつもりだ。",
        en: "I was unbearably frustrated at losing to him, but I'm determined to win next year.",
        difficulty: "hard",
        note: "悔しい → 悔しくて + たまらなかった (past).",
      },
    ],
    exercises: [
      {
        question: "喉が渇い___たまらない。  ('I'm unbearably thirsty.')",
        answer: "て",
        hint: "te-form 渇いて + たまらない.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form for 'unbearably hot' (暑___たまらない):",
        type: "multiple-choice",
        options: ["くて", "て", "で", "がって"],
        answer: "くて",
      },
      {
        question: "Convert 嬉しい (happy) to the 'so happy I can't stand it' form.",
        answer: "嬉しくてたまらない",
        hint: "i-adj: drop い, add くて + たまらない.",
        type: "fill-blank",
      },
    ],
    order: 67,
  },
  {
    title: "〜ないで (naide) — without doing",
    level: "N3",
    lesson: 25,
    chapter: "Changes & Casual Patterns",
    structure: "Verb (nai-stem) + ないで + Main Verb",
    meaning: "without doing ~ (action A is NOT done)",
    rule:
      "〜ないで expresses that an action is NOT done before/while doing the main action: 朝ご飯を食べないで学校へ行った = I went to school without eating breakfast. The negative form (nai-stem + ないで) precedes the main verb. Different from 〜なくて (which gives a reason): 〜ないで means 'without doing'; 〜なくて means 'because [I] didn't'. Also different from 〜ないでください (please don't ~).",
    conjugation:
      "Verb nai-stem + ないで + main verb.\n• Ichidan: 食べる → 食べないで (without eating).\n• Godan: 行く → 行かないで (without going), 読む → 読まないで, 買う → 買わないで, 話す → 話さないで.\n• Irregular: する → しないで, 来る → 来ないで (konaide).\nNote: 〜ないで is the te-form of the negative (replacing なくて for the 'without doing' meaning). For 'without doing' use 〜ないで; for 'because [I] didn't' use 〜なくて (rare and ambiguous).",
    usage:
      "Use 〜ないで for actions NOT done: 辞書を使わないで、読んでみました (I tried reading without using a dictionary). 朝ご飯を食べないで学校へ行った (I went to school without eating breakfast). The main verb describes what WAS done. For 'please don't ~' use 〜ないでください.",
    commonMistake:
      "Confusing 〜ないで (without doing) with 〜なくて (because [I] didn't). They look similar but mean different things: 食べないで行った (went without eating) vs 食べなくて行った (went because I didn't eat — unusual). Also, ✗「食べるないで」 — must be the nai-form stem: 食べないで.",
    examples: [
      { jp: "辞書を使わないで、読んでみました。", en: "I tried reading without using a dictionary.", difficulty: "easy" },
      {
        jp: "朝ご飯を食べないで学校へ行った。",
        en: "I went to school without eating breakfast.",
        difficulty: "medium",
        note: "食べる (ichidan) → 食べないで + 行った.",
      },
      {
        jp: "彼は一言も挨拶しないで、部屋を出て行った。",
        en: "He left the room without saying a single word of greeting.",
        difficulty: "hard",
        note: "挨拶する → 挨拶しないで + 出て行った.",
      },
    ],
    exercises: [
      {
        question: "辞書を使___ないで、読んでみました。  ('I tried reading without a dictionary.')",
        answer: "わ",
        hint: "Godan う → わ (special!) + ないで.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct option for 'without eating':",
        type: "multiple-choice",
        options: ["食べないで", "食べるないで", "食べきないで", "食べみないで"],
        answer: "食べないで",
        hint: "Ichidan: drop る, add ないで → 食べないで.",
      },
      {
        question: "Convert する (to do) to the 'without doing' form.",
        answer: "しないで",
        hint: "Irregular: し- + ないで.",
        type: "fill-blank",
      },
    ],
    order: 68,
  },
  {
    title: "〜ないと / 〜なきゃ (naito / nakya) — must (casual)",
    level: "N3",
    lesson: 25,
    chapter: "Changes & Casual Patterns",
    structure: "Verb (nai-stem) + ないと / なきゃ",
    meaning: "have to / must (casual truncation of 〜なければならない)",
    rule:
      "〜ないと and 〜なきゃ are CASUAL contractions of 〜なければならない (must). Both mean 'I have to ~'. もう行かないと (I've gotta go now) and もう行かなきゃ (I've gotta go now) are interchangeable in casual speech. Often the main verb (ならない / いけない) is dropped entirely: 行かなきゃ = I've gotta go. 〜なきゃ is more casual/intimate than 〜ないと.",
    conjugation:
      "Verb nai-stem + ないと OR + なきゃ.\n• Ichidan: 食べる → 食べないと / 食べなきゃ.\n• Godan: 行く → 行かないと / 行かなきゃ; 読む → 読まないと / 読まなきゃ; 買う → 買わないと / 買わなきゃ.\n• Irregular: する → しないと / しなきゃ; 来る → 来ないと / 来なきゃ (konakya).\nThe ending (ならない/いけない) is usually dropped. Full form: 〜ないといけない / 〜なきゃいけない.",
    usage:
      "Use 〜ないと / 〜なきゃ for casual 'must' in everyday speech: もう行かないと (I've gotta go). 宿題、しなきゃ (I've gotta do my homework). For polite 'must', use 〜なければなりません. 〜なきゃ is more intimate/casual than 〜ないと.",
    commonMistake:
      "Using 〜なきゃ in formal settings — use 〜なければなりません instead. Also, ✗「行くなきゃ」 — must be the nai-stem 行か + なきゃ. And don't confuse with 〜なくちゃ (another contraction, also casual, slightly different etymology).",
    examples: [
      { jp: "もう行かないと。", en: "I've gotta go now.", difficulty: "easy" },
      {
        jp: "明日、早く起きなきゃいけないから、今日は早く寝る。",
        en: "I've gotta wake up early tomorrow, so I'll go to bed early today.",
        difficulty: "medium",
        note: "〜なきゃ + いけない = full casual form.",
      },
      {
        jp: "そろそろ帰らないと、終電に間に合わなくなる。",
        en: "I've gotta head home soon or I'll miss the last train.",
        difficulty: "hard",
        note: "〜ないと + (implied いけない).",
      },
    ],
    exercises: [
      {
        question: "もう行___ないと。  ('I've gotta go now.')",
        answer: "か",
        hint: "Godan く → か (a-vowel) + ないと.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct casual contraction of 〜なければならない for 食べる:",
        type: "multiple-choice",
        options: ["食べなきゃ", "食べなきゃならない", "食べなきゃだ", "食べなきゃする"],
        answer: "食べなきゃ",
      },
      {
        question: "Convert する (to do) to the casual 'gotta do' form.",
        answer: "しなきゃ",
        hint: "Irregular: し- + なきゃ.",
        type: "fill-blank",
      },
    ],
    order: 69,
  },
];

// ----------------------------- Convenience -----------------------------
//
// Total: 69 grammar points (29 N5 + 22 N4 + 18 N3).
// Each entry includes: title, level, lesson, chapter, structure, meaning,
// rule (2-4 sentences), conjugation (with verb-group rules for verb-form
// patterns), usage (2-3 sentences), commonMistake, 3 examples (easy/medium/hard),
// 2-3 exercises (fill-blank and multiple-choice), and order.

export default EXPANDED_GRAMMAR;
