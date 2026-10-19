/**
 * GRAMMAR_N5_N4_B — original follow-up grammar curriculum for the
 * Nihongo Path learning app. This file fills the N5/N4 gaps that come
 * after the 69 points in grammar-content.ts, covering orders 70–97.
 *
 * Coverage:
 *  - N5 (orders 70–79): 10 points (existence verbs, explanatory の, contrast
 *    conjunctions, representative listing, requests, nominalized likes,
 *    concessive ても, change-of-state する, ability, conjecture でしょう)
 *  - N4 (orders 80–97): 18 points (resultant states, experience, auxiliaries
 *    すぎる/やすい/方, time clauses あいだ/うち/たび/ごと/おき/ずつ/中,
 *    passive, causative, potential, compound verbs, のに, ば〜ほど, ような,
 *    negative conjecture そうにない)
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

export type ExpandedGrammar = {
  title: string;
  level: "N5" | "N4";
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

// ----------------------------- N5 (Orders 70–79) -----------------------------

export const GRAMMAR_N5_N4_B: ExpandedGrammar[] = [
  // ===== Order 70 — Lesson 2: Greetings & Identification =====
  {
    title: "〜あります / 〜います (arimasu / imasu) — existence of things vs. living things",
    level: "N5",
    lesson: 2,
    chapter: "Greetings & Identification",
    structure: "Place に Thing/Person が あります / います",
    meaning: "there is / there are (arimasu = things; imasu = living beings)",
    rule:
      "Japanese splits 'to exist' into two verbs depending on WHAT exists. あります describes inanimate things — books, buildings, money, machines, events — while います is reserved for living beings: people, animals, insects, fish. The basic pattern is PLACE に THING が あります/います, as in 机の上に本があります (There is a book on the desk) and 公園に子供がいます (There are children in the park). When the place is already the topic of conversation it takes は instead (この町には駅がありません — In this town there is no station). Robots and photographs normally take あります, but as soon as you personify them — a robot that walks and talks — います suddenly becomes the natural choice.",
    conjugation:
      "Both are ordinary verbs that conjugate on their own. ある (Godan): あります → ありません → ありました → ありませんでした. いる (Ichidan): います → いません → いました → いませんでした. Attachment rules: the existing thing takes が (replaced by は for contrast or by も for 'also'), and its location takes に. Question form: 〜がありますか / 〜がいますか.",
    usage:
      "Use this pattern to describe what is where — in questions (部屋にテレビがありますか) and negatives (冷蔵庫に何もありません). います is also the standard way to ask whether someone is present: 田中さんはいますか (Is Tanaka in?). With time words, あります also covers events: 明日は試験があります (I have an exam tomorrow).",
    commonMistake:
      "Using あります for people or animals: ✗「公園に子供があります」 — anything alive takes います, so ✓「公園に子供がいます」. The reverse is equally wrong: ✗「机の上に本がいます」 for a lifeless book must be ✓「机の上に本があります」.",
    examples: [
      { jp: "かばんの中に財布があります。", en: "There is a wallet in the bag.", difficulty: "easy" },
      {
        jp: "教室に学生が三人います。",
        en: "There are three students in the classroom.",
        difficulty: "medium",
        note: "The counter 三人 follows が; living beings take います.",
      },
      {
        jp: "東京には高いビルがたくさんありますが、私の町にはあまりありません。",
        en: "There are many tall buildings in Tokyo, but there aren't many in my town.",
        difficulty: "hard",
        note: "〜には = に + は (topicalized location); あまり + negative = 'not many'.",
      },
    ],
    exercises: [
      {
        question: "机の上に本______。  ('There is a book on the desk.')",
        answer: "があります",
        hint: "A book is inanimate → あります family.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct verb: 'There is a cat in the garden.' (庭に猫が______。)",
        type: "multiple-choice",
        options: ["います", "あります", "です", "しません"],
        answer: "います",
      },
      {
        question: "教室に学生が______。  (polite negative: 'There are no students in the classroom.')",
        answer: "いません",
        hint: "Students are alive → いる, polite negative form.",
        type: "fill-blank",
      },
    ],
    order: 70,
  },
  // ===== Order 71 — Lesson 11: Sentence-ending Particles =====
  {
    title: "〜んです / 〜のです (n desu / no desu) — explanatory mode",
    level: "N5",
    lesson: 11,
    chapter: "Sentence-ending Particles",
    structure: "Plain form + んです (Noun / na-adjective + なんです)",
    meaning: "the fact is ~ / it's that ~ (explaining or asking why)",
    rule:
      "んです is the spoken contraction of のです, and it adds an EXPLANATORY flavor to a sentence — it answers an invisible question like 'why?' or 'what's going on?'. 電車が止まったんです does not just report a fact; it explains the situation behind something (that is why I'm late). It also works in questions, where it shows you are digging for the reason behind something you have noticed: どうしたんですか means 'what's the matter?' rather than a neutral 'what did you do?'. Attach it to plain forms: 疲れたんです (verb), 寒いんです (i-adjective), 静かなんです (na-adjective), 学生なんです (noun — だ turns into な). In formal speech and writing the full のです replaces it: 明日出発するのです (We depart tomorrow — that is the situation).",
    conjugation:
      "Attach to the PLAIN form of any word. Verb: 行くんです / 行かないんです / 行ったんです / 行かなかったんです. i-adjective: 寒いんです / 寒くなかったんです. na-adjective: 静かなんです / 静かじゃないんです. Noun: 学生なんです / 学生じゃないんです (the copula だ becomes な). Question: 〜んですか. Polite/formal variant: 〜のです; casual variant: 〜の (どうしたの?).",
    usage:
      "Use んです when sharing reasons, feelings, or background — especially when the listener has noticed something odd (どうしたんですか。顔色が悪いですよ). It softens refusals (今日はちょっと都合が悪いんです — sorry, I'm not free today) and makes requests warmer by explaining them (実はお願いがあるんです). In stiff reports or academic writing prefer のです, and in very casual chat the bare 〜の (どうしたの？).",
    commonMistake:
      "Dropping the な after nouns and na-adjectives: ✗「学生んです」 must be ✓「学生なんです」. Doubling the copula: ✗「寒いですんです」 — attach to the plain form, ✓「寒いんです」. Also ✗「行きますんです」 must be ✓「行くんです」.",
    examples: [
      { jp: "おなかが空いたんです。", en: "I'm hungry (that's why — explaining).", difficulty: "easy" },
      {
        jp: "どうしたんですか。顔色が悪いですよ。",
        en: "What's wrong? You look pale.",
        difficulty: "medium",
        note: "んです in a question probes for the reason behind what the speaker noticed.",
      },
      {
        jp: "電車が遅れたんです。それで、会議に間に合わなかったんです。",
        en: "The train was delayed. That's why I couldn't make it in time for the meeting.",
        difficulty: "hard",
        note: "Two explanatory んです: the first states the cause, the second the result it explains.",
      },
    ],
    exercises: [
      {
        question: "明日は試験______。  ('The thing is, I have an exam tomorrow.')",
        answer: "なんです",
        hint: "Noun + な + んです.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form: 'It's cold — that's why I stayed home.' (寒い______から、家にいました。)",
        type: "multiple-choice",
        options: ["んです", "なんです", "んですです", "ですん"],
        answer: "んです",
      },
      {
        question: "どうした______か。  ('What's wrong?')",
        answer: "んです",
        hint: "Explanatory question form of のです.",
        type: "fill-blank",
      },
    ],
    order: 71,
  },
  // ===== Order 72 — Lesson 11: Sentence-ending Particles =====
  {
    title: "〜が / 〜けど (ga / kedo) — but / however",
    level: "N5",
    lesson: 11,
    chapter: "Sentence-ending Particles",
    structure: "Clause 1 + が / けど + Clause 2",
    meaning: "but / however / though (contrasting clauses)",
    rule:
      "These conjunctions join two clauses that contrast with each other: 日本語が好きですが、発音は難しいです (I like Japanese, but the pronunciation is hard). The clause BEFORE が/けど may keep its polite ending — a polite verb mid-sentence is completely natural in Japanese, so 好きですが is correct even though the clause does not finish the sentence. が sounds neutral, formal, and written-style; けど (the conversational clipping of けれども) is softer and chattier; けれど sits in between. A sentence may also END with が or けど to trail off politely — すみませんが… (Excuse me, but…) — which gently prepares a request or bad news. Be careful: this conjunctive が is written identically to the subject particle が, but it is an entirely different word.",
    conjugation:
      "No conjugation — conjunction. Attachment rules: が may follow either a polite or a plain clause (行きますが / 行くが); formal writing prefers 〜ますが or plain + が. けど likewise follows polite or plain clauses in speech (行きますけど / 行くけど). Politeness ranking of the same word: けれども > けれど > けど. Never combine が/けど with から or ので within the same clause.",
    usage:
      "Use が in speeches, letters, announcements, and polite service Japanese (恐れ入りますが、少々お待ちください). Use けど when talking with friends and family. Ending on が/けど leaves the contrast politely unfinished: この製品は安いですが… (It's cheap, but…) invites the listener to imagine the downside themselves.",
    commonMistake:
      "Stacking two contrast markers: ✗「高いですが、でも買いました」 — が and でも do the same job, so keep only one: ✓「高いですが、買いました」. Also using でも as a mid-sentence conjunction: ✗「高いでも買いました」 → ✓「高いですが、買いました」.",
    examples: [
      { jp: "高いですが、買いました。", en: "It was expensive, but I bought it.", difficulty: "easy" },
      {
        jp: "すみませんが、この切符はまだ使えますか。",
        en: "Excuse me, but is this ticket still usable?",
        difficulty: "medium",
        note: "Trailing が after すみません softens the question that follows.",
      },
      {
        jp: "彼は日本語がペラペラだけど、漢字はあまり書けない。",
        en: "He's fluent in Japanese, but he can't write many kanji.",
        difficulty: "hard",
        note: "Plain けど in casual speech; は contrasts 漢字 with 日本語.",
      },
    ],
    exercises: [
      {
        question: "日本語は難しい______、面白いです。  ('Japanese is hard, but interesting.')",
        answer: "が",
        hint: "Formal contrast linker for a polite compound sentence.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct linker: 'Excuse me, but…' (すみません______、もう一度お願いします。)",
        type: "multiple-choice",
        options: ["が", "でも", "から", "のに"],
        answer: "が",
      },
      {
        question: "明日行きたい______、時間がない。  (casual: 'I want to go tomorrow, but I have no time.')",
        answer: "けど",
        hint: "Conversational contrast linker.",
        type: "fill-blank",
      },
    ],
    order: 72,
  },
  // ===== Order 73 — Lesson 8: Te-form Basics =====
  {
    title: "〜たり〜たりする (tari ~ tari suru) — listing representative actions",
    level: "N5",
    lesson: 8,
    chapter: "Te-form Basics",
    structure: "Verb-たり Verb-たり する",
    meaning: "do things like ~ and ~ (non-exhaustive list of actions)",
    rule:
      "〜たり〜たりする lists actions in a representative, non-exhaustive way — 'do things like A and B'. 日曜日は本を読んだり音楽を聴いたりします means 'On Sundays I do things like reading and listening to music', quietly leaving room for other activities as well. It is the action-version of や, which lists nouns without exhausting them. The final する carries all the tense and politeness: 〜たり〜たりしました (past), 〜たり〜たりしません (negative). Used with just ONE verb, 〜たりする means 'sometimes do, sometimes not': 休みの日には掃除したりします (On days off I do things like cleaning — among other things). Two たり clauses are standard, and their order is free.",
    conjugation:
      "Take the plain PAST (ta-form) and add り.\n• Ichidan: drop る, add たり. 食べる → 食べたり, 見る → 見たり, 寝る → 寝たり.\n• Godan: same vowel shifts as the te-form, but with た: 待つ → 待ったり, 飛ぶ → 飛んだり, 読む → 読んだり, 書く → 書いたり (EXCEPTION: 行く → 行ったり), 泳ぐ → 泳いだり, 話す → 話したり, 買う → 買ったり, 帰る → 帰ったり.\n• Irregular: する → したり, 来る → 来たり (kitari).\nThe closing する conjugates as a normal verb: します / しました / しません / しませんでした.",
    usage:
      "Use this pattern to sketch how you spend a day or a weekend without committing to an exact schedule: 週末は映画を見たり、友達と話したりして過ごします (I spend weekends doing things like watching movies and chatting with friends). The built-in vagueness is a feature — for a complete, ordered list of actions use 〜て、〜て、〜ます instead.",
    commonMistake:
      "Using the te-form for a representative list: ✗「日曜日は掃除して洗濯してします」 → ✓「掃除したり洗濯したりします」. Also dropping the closing する: ✗「本を読んだり音楽を聴いたりです」 — です cannot follow 〜たり directly, so ✓「本を読んだり音楽を聴いたりします」.",
    examples: [
      { jp: "日曜日は掃除したり洗濯したりします。", en: "On Sundays I do things like cleaning and laundry.", difficulty: "easy" },
      {
        jp: "休みの日には本を読んだり、音楽を聴いたりして、ゆっくり過ごします。",
        en: "On my days off I take it easy, doing things like reading books and listening to music.",
        difficulty: "medium",
        note: "〜たり〜たりして + 過ごす: the closing する takes the te-form to connect to the next verb.",
      },
      {
        jp: "昨夜は子供が泣いたり騒いだりして、全然眠れませんでした。",
        en: "Last night the kids were crying and carrying on, so I couldn't sleep at all.",
        difficulty: "hard",
        note: "泣く → 泣いたり (く → いた), 騒ぐ → 騒いだり (ぐ → いだ); 眠れませんでした is the past negative of the potential.",
      },
    ],
    exercises: [
      {
        question: "日曜日は映画を見______、買い物______します。  ('On Sundays I do things like watching movies and shopping.')",
        answer: "たり / したり",
        hint: "見る → 見たり; the closing する becomes したり before します.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct たり-form of 読む: 'I do things like reading.' (本を______します。)",
        type: "multiple-choice",
        options: ["読んだり", "読みたり", "読んでり", "読むたり"],
        answer: "読んだり",
      },
      {
        question: "休みの日には掃除______します。  ('On days off I do things like cleaning.')",
        answer: "したり",
        hint: "Single-verb 〜たりする: する in the te-linking form + します.",
        type: "fill-blank",
      },
    ],
    order: 73,
  },
  // ===== Order 74 — Lesson 8: Te-form Basics =====
  {
    title: "〜をください (o kudasai) — please give me",
    level: "N5",
    lesson: 8,
    chapter: "Te-form Basics",
    structure: "Noun (+ counter) + を + ください",
    meaning: "please give me ~ (ordering / requesting a thing)",
    rule:
      "〜をください is the simplest way to ask for a THING: すみません、水をください (Excuse me, water, please). ください is the honorific imperative of くれる (to give), so the pattern literally means 'please give [me] ~'. It takes a noun or a noun + counter as its object, which makes it perfect for shopping and ordering food: りんごを三つください (Three apples, please), これをください (I'll take this one). It is polite enough for stores and restaurants yet compact enough for quick transactions. Do not confuse it with 〜てください, which requests an ACTION (please do ~) rather than an object.",
    conjugation:
      "No verb conjugation needed — attachment rules only. Noun + を + ください: 水をください. Noun + counter + を + ください: コーヒーを二つください. Demonstratives work too: それをください / あれをください. Softer variants: 〜をくださいませんか (could I possibly have ~?), 〜をお願いします (a store-neutral alternative). For requesting an action instead of a thing, use te-form + ください (見てください), NOT noun + を + ください.",
    usage:
      "Use it at counters, kiosks, and restaurants whenever you point at or name what you want: これをください、お願いします sounds natural when buying. Adding すみません before it softens the interaction. In very casual contexts friends say 〜ちょうだい instead, while 〜をいただけますか is the hyper-polite upgrade for hotels and fine shops.",
    commonMistake:
      "Using が instead of を for the requested object: ✗「水がください」 → ✓「水をください」. Confusing the two ください patterns: ✗「待つをください」 for 'please wait' must be ✓「待ってください」 (te-form for actions), while for a thing it stays ✓「水をください」.",
    examples: [
      { jp: "すみません、水をください。", en: "Excuse me, water, please.", difficulty: "easy" },
      {
        jp: "りんごを三つください。",
        en: "Three apples, please.",
        difficulty: "medium",
        note: "Counter 三つ follows the noun; を marks the whole thing requested.",
      },
      {
        jp: "あの青いセーターをください。サイズはMです。",
        en: "That blue sweater, please. Size M.",
        difficulty: "hard",
        note: "A modified noun (あの青いセーター) still works as the object of ください.",
      },
    ],
    exercises: [
      {
        question: "すみません、コーヒー______。  ('Excuse me, coffee, please.')",
        answer: "をください",
        hint: "Noun + を + ください.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct sentence for 'Please wait here.' (ここで______。)",
        type: "multiple-choice",
        options: ["待ってください", "待つをください", "待ちをください", "待ってをください"],
        answer: "待ってください",
      },
      {
        question: "パンを二つ______。  ('Two pieces of bread, please.')",
        answer: "ください",
        hint: "The honorific 'give' that follows the を-marked object.",
        type: "fill-blank",
      },
    ],
    order: 74,
  },
  // ===== Order 75 — Lesson 9: Wanting Objects & Opinions =====
  {
    title: "〜のが好き / 上手 (no ga suki / jōzu) — の nominalizer for verbs",
    level: "N5",
    lesson: 9,
    chapter: "Wanting Objects & Opinions",
    structure: "Verb (dictionary form) + の + が + 好き / 上手 / 下手 / 嫌い",
    meaning: "like / be good at / be bad at DOING something",
    rule:
      "Japanese verbs cannot directly modify 好き, 上手, 下手 or 嫌い — those words are all adjectives/nouns about evaluation, so the action must first be turned into a noun. That is the job of の: 料理を作るのが好きです (I like cooking — literally 'I like the making of food'). The nominalized verb then behaves exactly like a noun, taking が before the evaluation word. の is the everyday, concrete choice; こと does the same job in a more abstract, written style (料理を作ることが好きです — both are correct). Contrast this with the English habit of saying 'I like to cook', where nothing is nominalized.",
    conjugation:
      "の attaches to the DICTIONARY form of the verb — no verb-group changes are needed. Ichidan: 食べる → 食べるのが好き. Godan: 泳ぐ → 泳ぐのが好き, 話す → 話すのが上手, 買う → 買うのが好き. Irregular: する → するのが好き, 来る → 来るのが好き. The evaluation word itself conjugates: 好きです / 好きでした / 好きじゃないです; 上手です / 上手じゃありませんでした. こと can replace の in formal writing (〜ことが好き / 〜ことが上手) except with 見る/聞く, where の is strongly preferred.",
    usage:
      "Use this pattern to talk about hobbies and skills: 音楽を聴くのが好きです (I like listening to music), 彼は絵を描くのが上手です (He is good at drawing pictures). 好き/嫌い statements about yourself are fine with 〜が, but when guessing about others add 〜と思う or similar since you cannot read minds (彼はカレーを食べるのが好きだと思う).",
    commonMistake:
      "Putting が directly on the verb: ✗「泳ぐが好きです」 → ✓「泳ぐのが好きです」 — the の must nominalize the verb first. Also using the masu-stem: ✗「泳ぎが好きです」 for 'I like swimming' would be read as 'I like the (act of) swimming' only in set compounds like 水泳; the safe, correct pattern is ✓「泳ぐのが好きです」.",
    examples: [
      { jp: "料理を作るのが好きです。", en: "I like cooking.", difficulty: "easy" },
      {
        jp: "彼はピアノを弾くのが上手です。",
        en: "He is good at playing the piano.",
        difficulty: "medium",
        note: "Dictionary form 弾く + のが + 上手; ピアノを stays inside the nominalized clause.",
      },
      {
        jp: "私は朝早く起きるのが苦手で、夜勉強するのが好きです。",
        en: "I'm bad at getting up early in the morning, and I like studying at night.",
        difficulty: "hard",
        note: "苦手 is the softer opposite of 上手; the adverb 早く sits inside the nominalized clause.",
      },
    ],
    exercises: [
      {
        question: "私は音楽を聴く______好きです。  ('I like listening to music.')",
        answer: "のが",
        hint: "Dictionary form + の + が + 好き.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form: 'I like swimming.' (私は泳ぐ______好きです。)",
        type: "multiple-choice",
        options: ["のが", "が", "をが", "にが"],
        answer: "のが",
      },
      {
        question: "彼は歌______上手です。  ('He is good at singing.')",
        answer: "うのが",
        hint: "Dictionary form of 歌う + のが.",
        type: "fill-blank",
      },
    ],
    order: 75,
  },
  // ===== Order 76 — Lesson 9: Comparisons =====
  {
    title: "〜ても (te mo) — even if / even though",
    level: "N5",
    lesson: 9,
    chapter: "Comparisons",
    structure: "Te-form + も",
    meaning: "even if ~ / even though ~ (concession)",
    rule:
      "〜ても attaches to the te-form and concedes the clause before moving on: 雨が降っても行きます means 'even if it rains, I will go'. The first clause paints a hypothetical (or real) situation, and も underlines that the outcome in the main clause survives it. It works for real conditions too: 高くても買います (Even though it's expensive, I'll buy it). The negative version 〜なくても has two jobs: 'even without doing ~' (休まなくても大丈夫です — you're fine even without resting) and, with いい, the 'don't have to' pattern 〜なくてもいい. For adjectives and nouns, でも plays the role of 〜ても: 静かでも / 子供でも.",
    conjugation:
      "Te-form + も.\n• Ichidan: 食べる → 食べても, 見る → 見ても.\n• Godan: 行く → 行っても, 読む → 読んでも, 買う → 買っても, 話す → 話しても, 待つ → 待っても.\n• Irregular: する → しても, 来る → 来ても (kite mo).\nAdjectives and nouns: i-adj stem + くても (高い → 高くても, 安い → 安くても); na-adj / Noun + でも (静か → 静かでも, 学生 → 学生でも). Negative: 〜なくても (行かなくても, 寒くなくても). Polite main clause: 〜ても行きます / 〜てもいいです.",
    usage:
      "Use 〜ても when you want to say a result holds no matter what: 薬を飲んでも治らない (doesn't heal even with medicine). In requests and permission it shows politeness through persistence: 雨が降っても手伝ってくれますか (Will you help even if it rains?). In casual speech 〜ても often slurs to 〜っても — fine among friends, but write and say 〜ても in careful Japanese.",
    commonMistake:
      "Attaching も to the dictionary form: ✗「雨が降るても行きます」 → ✓「雨が降っても行きます」. Wrong adjective endings: i-adjectives take くても (✓高くても, ✗高いても / ✗高いでも), while na-adjectives and nouns take でも (✓静かでも, ✗静かても / ✗静かくても). Also mixing up 〜ても (even if) with 〜てもいい (permission) — permission is its own pattern.",
    examples: [
      { jp: "雨が降っても行きます。", en: "I'll go even if it rains.", difficulty: "easy" },
      {
        jp: "この靴は高くても買います。長持ちしますから。",
        en: "I'll buy these shoes even though they're expensive, because they last long.",
        difficulty: "medium",
        note: "高い → 高くても; から gives the reason supporting the concession.",
      },
      {
        jp: "何度読んでも、この小説は飽きません。",
        en: "No matter how many times I read it, I never get tired of this novel.",
        difficulty: "hard",
        note: "何度〜ても = 'no matter how many times'; 読む → 読んでも.",
      },
    ],
    exercises: [
      {
        question: "雨が______、試合は続きます。  ('Even if it rains, the game continues.')",
        answer: "降っても",
        hint: "Godan く: te-form 降って + も.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form: 'Even if it's expensive, I'll buy it.' (______買います。)",
        type: "multiple-choice",
        options: ["高くても", "高いても", "高くでも", "高いでも"],
        answer: "高くても",
      },
      {
        question: "いくら______、この仕事をやめません。  ('No matter how hard it is, I won't quit this job.')",
        answer: "大変でも",
        hint: "Na-adjective 大変 → でも.",
        type: "fill-blank",
      },
    ],
    order: 76,
  },
  // ===== Order 77 — Lesson 6: Comparisons =====
  {
    title: "〜くする / 〜にする (ku suru / ni suru) — make something become",
    level: "N5",
    lesson: 6,
    chapter: "Comparisons",
    structure: "i-adj stem + くする / na-adj stem + にする / Noun + にする",
    meaning: "make ~ become X / change something into X / decide on X",
    rule:
      "する here means 'to make/bring about a change', and the particle before it depends on the word class. With i-adjectives you use く: 部屋を暖かくする (make the room warm). With na-adjectives and nouns you use に: 部屋をきれいにする (make the room clean), 息子を医者にしたい (I want to make my son a doctor). The partner pattern 〜くなる / 〜になる expresses the change happening by itself ('become'), while 〜くする / 〜にする means someone CAUSES the change. A second, unrelated meaning appears with nouns: deciding or choosing — コーヒーにします (I'll go with coffee) is what you say when a waiter takes your order.",
    conjugation:
      "No verb-group machinery — attachment rules by word class. i-adjective: drop い, add くする (寒い → 寒くする, 明るい → 明るくする). na-adjective: stem + にする (静か → 静かにする, 便利 → 便利にする). Noun: + にする (息子を医者にする, この部屋を勉強部屋にする). する conjugates normally: します / しました / しません / したい / してください. Parallel 'become' pattern: 〜くなる / 〜になる (暖かくなる, きれいになる).",
    usage:
      "Use it when you actively change a state: テレビの音を大きくしてください (Please turn the TV volume up), 部屋を片付けてきれいにした (I tidied up and made the room clean). The 'decide' flavor (〜にする) covers choices from menus to plans: 来週京都に行くことにした is the fuller 'decide to do' pattern, while 定食にします works for instant choices.",
    commonMistake:
      "Using く with na-adjectives or に with i-adjectives: ✗「部屋をきれくする」 → ✓「きれいにする」; ✗「部屋を暖かいにする」 → ✓「暖かくする」. Also confusing cause and effect: ✗「部屋が暖かくした」 for a deliberate change is wrong because the changed object takes を: ✓「部屋を暖かくした」.",
    examples: [
      { jp: "テレビの音を大きくしてください。", en: "Please make the TV louder.", difficulty: "easy" },
      {
        jp: "掃除して、部屋をきれいにしました。",
        en: "I cleaned and made the room tidy.",
        difficulty: "medium",
        note: "Na-adjective きれい → きれいにする; the room is the object of the change.",
      },
      {
        jp: "エアコンをつけて、部屋を涼しくしよう。",
        en: "Let's turn on the air conditioner and cool the room down.",
        difficulty: "hard",
        note: "Volitional 〜しよう of する; 涼しい → 涼しくする.",
      },
    ],
    exercises: [
      {
        question: "部屋を暖か______ください。  ('Please warm up the room.')",
        answer: "くして",
        hint: "i-adjective: 暖かい → 暖かく + する (te-form) + ください.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form: 'I made the room quiet.' (部屋を静か______した。)",
        type: "multiple-choice",
        options: ["に", "く", "な", "の"],
        answer: "に",
      },
      {
        question: "レストランで：私はうどん______します。  ('At the restaurant: I'll go with udon.')",
        answer: "に",
        hint: "The 'decide/choose' meaning of 〜にする with a noun.",
        type: "fill-blank",
      },
    ],
    order: 77,
  },
  // ===== Order 78 — Lesson 7: Polite Verbs =====
  {
    title: "〜ことができる (koto ga dekiru) — can do (ability)",
    level: "N5",
    lesson: 7,
    chapter: "Polite Verbs",
    structure: "Verb (dictionary form) + ことが できる",
    meaning: "can do / be able to do ~ (neutral ability pattern)",
    rule:
      "〜ことができる turns a verb into an ability statement: 私は日本語を話すことができます (I can speak Japanese). こと nominalizes the verb — literally 'the thing of speaking Japanese is possible for me'. It is longer than the potential form (話せる) but grammatically simpler, because the verb stays in its dictionary form and all the work happens in できる. Use it when you want a neutral, slightly formal register: signs, announcements, resumes, and polite self-descriptions favor it. Note the difference from 〜ことがある (sometimes / have the experience of): できる talks about ability, ある talks about occurrence or experience.",
    conjugation:
      "The verb before こと stays in the DICTIONARY form — no verb-group changes.\n• Ichidan: 食べる → 食べることができる.\n• Godan: 泳ぐ → 泳ぐことができる, 書く → 書くことができる, 買う → 買うことができる, 話す → 話すことができる.\n• Irregular: する → することができる, 来る → 来ることができる (kuru koto ga dekiru).\nできる (Ichidan) conjugates: できます / できません / できました / できませんでした. Negative often moves が to は for contrast: 〜ことはできません. Nouns take が directly: 運転ができる (I can drive).",
    usage:
      "Use 〜ことができる in polite explanations and formal writing: この教室ではタバコを吸うことができません (Smoking is not permitted in this classroom). In casual speech the potential form (泳げる, 話せる) is shorter and more common. For nouns (skills) just say N + ができる: ピアノができます.",
    commonMistake:
      "Putting a masu-form before こと: ✗「話しますことができます」 → ✓「話すことができます」. Attaching ことができる to a noun: ✗「ピアノことができます」 → ✓「ピアノができます」 (nouns take が directly). Also ✗「できすることができます」 type doubles — only one できる per clause.",
    examples: [
      { jp: "私は日本語を話すことができます。", en: "I can speak Japanese.", difficulty: "easy" },
      {
        jp: "ここから富士山を見ることができます。",
        en: "You can see Mount Fuji from here.",
        difficulty: "medium",
        note: "Dictionary form 見る + ことができます; the place is the topic.",
      },
      {
        jp: "申し訳ございませんが、この券は日曜日には使うことができません。",
        en: "I'm sorry, but this ticket cannot be used on Sundays.",
        difficulty: "hard",
        note: "Formal service Japanese; には marks the topicalized day.",
      },
    ],
    exercises: [
      {
        question: "私はピアノを弾く______できます。  ('I can play the piano.')",
        answer: "ことが",
        hint: "Dictionary form + ことが + できる.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct sentence: 'I can swim.' (______。)",
        type: "multiple-choice",
        options: ["泳ぐことができます。", "泳ぎますことができます。", "泳いでことができます。", "泳ぐことがします。"],
        answer: "泳ぐことができます。",
      },
      {
        question: "ここで写真を撮ることは______。  (polite negative: 'You cannot take photos here.')",
        answer: "できません",
        hint: "The できる part, polite negative; は replaces が for contrast.",
        type: "fill-blank",
      },
    ],
    order: 78,
  },
  // ===== Order 79 — Lesson 9: Wanting Objects & Opinions =====
  {
    title: "〜でしょう (deshō) — probably / right?",
    level: "N5",
    lesson: 9,
    chapter: "Wanting Objects & Opinions",
    structure: "Plain form / polite clause + でしょう",
    meaning: "probably / I suppose / ~, right? (conjecture or tag question)",
    rule:
      "でしょう has two jobs. First, CONJECTURE: it softens a prediction into 'probably / I expect': 明日は晴れるでしょう (It will probably be sunny tomorrow). The speaker is reasoning from evidence but staying humble about it. Second, TAG QUESTION: with a rising intonation, でしょう seeks agreement the way English 'right?' does: このケーキ、おいしいでしょう？ (This cake is tasty, right?). In the conjecture use the clause before でしょう is normally plain: 晴れるでしょう, 高いでしょう, 学生でしょう. The polite ます before でしょう sounds stiff and dated (✗行きますでしょう), so keep it plain.",
    conjugation:
      "Attach to the plain form of any word. Verb: 行くでしょう / 行かないでしょう / 行ったでしょう. i-adjective: 寒いでしょう / 寒かったでしょう. na-adjective / Noun: 静かでしょう, 学生でしょう (the copula だ is replaced by でしょう; formal でございましょう is rare). でしょう itself does not change tense — the time lives in the clause before it. Casual variant: だろう (明日は晴れるだろう — plain conjecture), だろう？ (seeking agreement). Negative tag: 〜じゃないでしょう.",
    usage:
      "Use conjecture でしょう in weather forecasts, predictions, and polite hedging of opinions: 明日の会議は長いでしょう (Tomorrow's meeting will probably be long). Use tag-question でしょう to invite the listener to confirm shared experience: この景色、きれいでしょう？ でしょう is politer and softer than だろう and much more certain than かもしれません (might).",
    commonMistake:
      "Stacking the copula: ✗「学生ですでしょう」 → ✓「学生でしょう」 (でしょう replaces です/だ). Keeping ます: ✗「行きますでしょう」 → ✓「行くでしょう」. Also confusing certainty levels: かもしれません = 'might', でしょう = 'probably', きっと〜 = confident 'surely' — do not write でしょう when you truly do not know.",
    examples: [
      { jp: "明日は晴れるでしょう。", en: "It will probably be sunny tomorrow.", difficulty: "easy" },
      {
        jp: "このケーキ、おいしいでしょう。",
        en: "This cake is tasty, isn't it?",
        difficulty: "medium",
        note: "With rising intonation this becomes a tag question; written as a statement it reads as confident conjecture.",
      },
      {
        jp: "田中さんはもう家に着いたでしょう。電車は三時に着きますから。",
        en: "Tanaka-san has probably arrived home by now, because the train gets in at three.",
        difficulty: "hard",
        note: "Plain past 着いた + でしょう; から supplies the evidence behind the guess.",
      },
    ],
    exercises: [
      {
        question: "明日は雨______。  ('It will probably rain tomorrow.')",
        answer: "でしょう",
        hint: "Noun 雨 + copula replaced: 雨だ → 雨でしょう.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form: 'He is probably a student.' (彼は学生______。)",
        type: "multiple-choice",
        options: ["でしょう", "ですでしょう", "だでしょう", "でしょうです"],
        answer: "でしょう",
      },
      {
        question: "彼は来ない______。  ('He probably won't come.')",
        answer: "でしょう",
        hint: "Plain negative 来ない + でしょう.",
        type: "fill-blank",
      },
    ],
    order: 79,
  },

  // ----------------------------- N4 (Orders 80–97) -----------------------------

  // ===== Order 80 — Lesson 13: Resultant States =====
  {
    title: "〜てある (te aru) — resultant state of deliberate action",
    level: "N4",
    lesson: 13,
    chapter: "Resultant States",
    structure: "Transitive verb (te-form) + ある",
    meaning: "has been (deliberately) done — and the result still stands",
    rule:
      "〜てある describes a state that resulted from someone's DELIBERATE action and is still in effect: 窓が開けてあります (The window has been opened [and it is still open] — someone opened it on purpose). The doer is not mentioned; what matters is the present result of the preparation. Compare the pair 窓が開いています (the window is open — a neutral state, no agent implied) and 窓が開けてあります (the window has been left open — someone chose to open it). Because the agent disappears from the sentence, the object moves to the が position: ドアを閉める → ドアが閉めてある. Use 〜てある for arrangements and preparations: ホテルが予約してあります (The hotel has been booked), お弁当が買ってあります (Lunch boxes have been bought in advance).",
    conjugation:
      "Te-form + ある (use TRANSITIVE verbs only).\n• Ichidan: 開ける → 開けてある, 閉める → 閉めてある, 並べる → 並べてある.\n• Godan: 書く → 書いてある, 直す → 直してある, 買う → 買ってある, 飾る → 飾ってある, 置く → 置いてある.\n• Irregular: する → してある, 来る → 来てある (kite aru — rare).\nある conjugates: 〜てあります (polite), 〜てあった (past), 〜てなかった (neg past). Negative is usually expressed as 〜ていない or 〜ていない states instead. Remember the particle rule: the thing acted on takes が (は for topic).",
    usage:
      "Use 〜てある when reporting preparations: 明日の資料がもう準備してあります (Tomorrow's handouts are already prepared). It pairs naturally with 〜ておく (do in advance): 先生に電話しておきました → 先生に電話してあります. On signs you will see its cousin 〜中 and 〜済み, but for describing your own arrangements 〜てある is the standard choice.",
    commonMistake:
      "Using an INTRANSITIVE verb: ✗「窓が開いてあります」 → ✓「窓が開けてあります」 (transitive) or ✓「窓が開いています」 (intransitive 〜ている state). Keeping を from the underlying sentence: ✗「ドアを閉めてあります」 must be ✓「ドアが閉めてあります」 — with てある the former object becomes the subject.",
    examples: [
      { jp: "窓が開けてあります。", en: "The window has been (deliberately) opened.", difficulty: "easy" },
      {
        jp: "誕生日パーティーのために、ケーキが買ってあります。",
        en: "A cake has been bought for the birthday party.",
        difficulty: "medium",
        note: "買う → 買ってある; the purpose precedes with ために.",
      },
      {
        jp: "台風が来るそうなので、非常食と水がもう用意してあります。",
        en: "Since a typhoon is reportedly coming, emergency food and water have already been set aside.",
        difficulty: "hard",
        note: "〜そうだ (hearsay) + ので (because); 用意する → 用意してある.",
      },
    ],
    exercises: [
      {
        question: "窓が______。  ('The window has been opened [on purpose and it's still open].')",
        answer: "開けてあります",
        hint: "Transitive 開ける → te-form + ある, polite.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct sentence: 'The hotel has been booked.' (ホテルが______。)",
        type: "multiple-choice",
        options: ["予約してあります。", "予約してありますを。", "予約をてあります。", "予約しあります。"],
        answer: "予約してあります。",
      },
      {
        question: "冷蔵庫にビールが______。  ('Beer has been chilled in the fridge [someone put it there].')",
        answer: "冷やしてあります",
        hint: "Transitive 冷やす (to chill) → te-form + あります.",
        type: "fill-blank",
      },
    ],
    order: 80,
  },
  // ===== Order 81 — Lesson 17: Time Clauses =====
  {
    title: "〜たことがある (ta koto ga aru) — past experience",
    level: "N4",
    lesson: 17,
    chapter: "Time Clauses",
    structure: "Verb (ta-form) + ことが ある",
    meaning: "have done ~ before / have the experience of ~",
    rule:
      "〜たことがある states that you have the EXPERIENCE of doing something at least once: 富士山に登ったことがあります (I have climbed Mount Fuji [at some point in my life]). The ta-form points at a completed event, こと turns it into 'the fact/experience of it', and ある says such an occasion exists in your history. It is the Japanese counterpart of the English present perfect 'have done'. The negative 〜たことがない means 'have never done': 生で鮨を食べたことがない (I've never eaten sushi raw). Do not use it for very recent or habitual one-off events — it frames your whole life as a resume of experiences. Contrast 〜ことがある with the DICTIONARY form + ことがある, which means 'sometimes happens': 朝ごはんを抜くことがある (I sometimes skip breakfast).",
    conjugation:
      "Ta-form + ことが ある.\n• Ichidan: 食べる → 食べたことがある, 見る → 見たことがある.\n• Godan: 行く → 行ったことがある, 読む → 読んだことがある, 買う → 買ったことがある, 飲む → 飲んだことがある, 話す → 話したことがある.\n• Irregular: する → したことがある, 来る → 来たことがある (kita koto ga aru).\nPolite: 〜ことがあります. Negative: 〜ことがない / 〜ことがありません ('have never'). Question: 〜たことがありますか (Have you ever ~?).",
    usage:
      "Use it when exchanging life stories: 日本に行ったことがありますか (Have you ever been to Japan?) — はい、三回行ったことがあります (Yes, three times). It works best with places visited, foods tried, and things tried at least once. For skills you acquired through experience, 〜たことがある also implies familiarity: この曲、どこかで聴いたことがある (I've heard this song somewhere before).",
    commonMistake:
      "Using the dictionary form by mistake: ✗「富士山に登ることがあります」 would mean 'I sometimes climb Mt. Fuji' — the experience pattern needs the ta-form: ✓「富士山に登ったことがあります」. Also ✗「登ますことがあります」 (masu-form cannot precede こと): ✓「登ったことがあります」.",
    examples: [
      { jp: "富士山に登ったことがあります。", en: "I have climbed Mount Fuji before.", difficulty: "easy" },
      {
        jp: "前に日本に行ったことがありますか。",
        en: "Have you ever been to Japan before?",
        difficulty: "medium",
        note: "Question form 〜たことがありますか; 前に = 'before (at some point in the past)'.",
      },
      {
        jp: "馬に乗ったことはありますが、競馬を見に行ったことは一度もありません。",
        en: "I have ridden a horse, but I have never once gone to watch horse racing.",
        difficulty: "hard",
        note: "〜たことはある with は slightly contrasts the two experiences; 一度も + negative = 'not even once'.",
      },
    ],
    exercises: [
      {
        question: "私はすしを食べた______があります。  ('I have eaten sushi before.')",
        answer: "こと",
        hint: "Ta-form + ことがある.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form: 'I have never seen snow.' (雪を______ことがありません。)",
        type: "multiple-choice",
        options: ["見た", "見る", "見ます", "見て"],
        answer: "見た",
      },
      {
        question: "彼は日本に______ことがありますか。  ('Has he ever been to Japan?')",
        answer: "行った",
        hint: "Godan 行く → ta-form 行った.",
        type: "fill-blank",
      },
    ],
    order: 81,
  },
  // ===== Order 82 — Lesson 14: Verb Forms & Auxiliaries =====
  {
    title: "〜すぎる (sugiru) — too much (verbs & adjectives)",
    level: "N4",
    lesson: 14,
    chapter: "Verb Forms & Auxiliaries",
    structure: "Masu-stem + すぎる / i-adj stem + すぎる / na-adj stem + すぎる",
    meaning: "too ~ / excessively ~ (usually negative judgment)",
    rule:
      "〜すぎる attaches directly to a verb's masu-stem or an adjective's stem and means the degree has passed the acceptable point: 食べすぎました (I ate too much), このかばんは高すぎる (This bag is too expensive). It nearly always carries a complaint or a warning — 'too much' in the problematic sense — though with positive words it can become a compliment: 彼は優しすぎる (He is too kind [almost to a fault]). Because すぎる is an Ichidan verb, the whole compound conjugates politely as 〜すぎます, negatively as 〜すぎない, and in the past as 〜すぎた.",
    conjugation:
      "Verbs — masu-stem + すぎる:\n• Ichidan: 食べる → 食べすぎる, 寝る → 寝すぎる.\n• Godan: 飲む → 飲みすぎる, 行く → 行きすぎる, 買う → 買いすぎる, 話す → 話しすぎる.\n• Irregular: する → しすぎる, 来る → きすぎる (kisugiru).\nAdjectives — stem + すぎる: i-adjectives drop い (高い → 高すぎる, 大きい → 大きすぎる); na-adjectives drop な (静か → 静かすぎる, 便利 → 便利すぎる).\nすぎる conjugates as Ichidan: 食べすぎる → 食べすぎます → 食べすぎた → 食べすぎない. Nominalized form: 〜すぎ (食べすぎ = overeating).",
    usage:
      "Use 〜すぎる to point out excess and its consequences: 昨夜遅くまで起きていたので、今日は眠すぎて集中できません (I stayed up late last night, so today I'm too sleepy to focus). Fixed nouns like 食べすぎ, 飲みすぎ, 疲れすぎ work as standalone words. Softer than blunt 〜すぎる when complaining to a superior: ちょっと多すぎるんじゃないでしょうか.",
    commonMistake:
      "Attaching すぎる to the dictionary form: ✗「食べるすぎる」 → ✓「食べすぎる」 (masu-stem). Leaving い on i-adjectives: ✗「高いすぎる」 → ✓「高すぎる」. Leaving な on na-adjectives: ✗「静かなすぎる」 — drop な first: ✓「静かすぎる」.",
    examples: [
      { jp: "食べすぎました。", en: "I ate too much.", difficulty: "easy" },
      {
        jp: "この問題は難しすぎて、子供には無理です。",
        en: "This problem is too difficult — it's beyond a child.",
        difficulty: "medium",
        note: "難しい → 難しすぎる, te-form すぎて links to the consequence.",
      },
      {
        jp: "会議中に彼が話しすぎたので、重要な議題に触れる時間がなくなった。",
        en: "Because he talked too much during the meeting, we ran out of time for the important topics.",
        difficulty: "hard",
        note: "話す → 話しすぎた (past); ので marks the cause-effect link.",
      },
    ],
    exercises: [
      {
        question: "昨夜、______ました。  ('Last night I drank too much.')",
        answer: "飲みすぎ",
        hint: "飲む → masu-stem 飲み + すぎる, polite past.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form: 'This bag is too heavy.' (このかばんは______。)",
        type: "multiple-choice",
        options: ["重すぎます", "重いすぎます", "重すぎるです", "重いすぎ"],
        answer: "重すぎます",
      },
      {
        question: "彼は______。  ('He works too much.' — 働く)",
        answer: "働きすぎます",
        hint: "Godan 働く → masu-stem 働き + すぎる.",
        type: "fill-blank",
      },
    ],
    order: 82,
  },
  // ===== Order 83 — Lesson 14: Verb Forms & Auxiliaries =====
  {
    title: "〜やすい / 〜にくい (yasui / nikui) — easy to / hard to do",
    level: "N4",
    lesson: 14,
    chapter: "Verb Forms & Auxiliaries",
    structure: "Masu-stem + やすい / にくい",
    meaning: "easy to ~ / hard to ~ (physical ease of an action)",
    rule:
      "〜やすい and 〜にくい attach to a verb's masu-stem and comment on how easy or difficult the ACTION itself is: このペンは書きやすい (This pen is easy to write with), この字は読みにくい (These characters are hard to read). The judgment is about the tool, the situation, or the object — not about your skill. That is the key split from 〜ことができる or 上手: 読みにくい says the text itself resists being read. Both endings conjugate as i-adjectives: 分かりやすい → 分かりやすかった, 使いにくくない. Do not confuse this やすい/にくい with the i-adjective やすい meaning 'cheap' — they only look alike in the plain form.",
    conjugation:
      "Masu-stem + やすい / にくい.\n• Ichidan: 食べる → 食べやすい / 食べにくい, 教える → 教えやすい / 教えにくい.\n• Godan: 使う → 使いやすい / 使いにくい, 分かる → 分かりやすい / 分かりにくい, 読む → 読みやすい / 読みにくい, 書く → 書きやすい / 書きにくい.\n• Irregular: する → しやすい / しにくい, 来る → 来やすい / 来にくい (kiyasui / kinikui — 'easy/hard to come').\nBoth conjugate as i-adjectives: 使いやすい → 使いやすかった (past) → 使いやすくない (neg) → 使いやすければ (conditional). Polite: 〜やすいです / 〜にくいです.",
    usage:
      "Use 〜やすい/〜にくい for products, places, and texts: この靴は走りやすい (These shoes are easy to run in), この道は歩きにくい (This road is hard to walk on). Extended uses: 分かりやすい説明 (an easy-to-understand explanation), 話しやすい人 (a person who is easy to talk to). With weather or health: 風邪をひきやすい (catch colds easily) — 〜やすい also covers things that happen readily.",
    commonMistake:
      "Attaching to the dictionary form: ✗「使うやすい」 → ✓「使いやすい」 (masu-stem). Mixing with cheap-やすい in writing: ✗「この店は安やすい」 is nonsense — 'cheap' is ✓「安い」 alone; only verbs take the masu-stem + やすい 'easy to' form. Also ✗「読むにくい」 → ✓「読みにくい」.",
    examples: [
      { jp: "このペンは書きやすいです。", en: "This pen is easy to write with.", difficulty: "easy" },
      {
        jp: "医者の字はとても読みにくいですね。",
        en: "Doctors' handwriting is really hard to read, isn't it?",
        difficulty: "medium",
        note: "読む → 読みにくい; ね invites agreement.",
      },
      {
        jp: "日本の家は部屋が狭くて、家具を置きにくい。",
        en: "Japanese houses have small rooms, so furniture is hard to place.",
        difficulty: "hard",
        note: "置く → 置きにくい; the くて clause gives the reason.",
      },
    ],
    exercises: [
      {
        question: "この本は字が大きくて、______です。  ('The print in this book is large, so it's easy to read.')",
        answer: "読みやすい",
        hint: "読む → masu-stem 読み + やすい.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form: 'This chair is hard to sit on.' (このいすは______。)",
        type: "multiple-choice",
        options: ["座りにくいです", "座るにくいです", "座にくいです", "座りにくいいます"],
        answer: "座りにくいです",
      },
      {
        question: "彼の説明はとても______。  ('His explanations are very easy to understand.' — 分かる)",
        answer: "分かりやすいです",
        hint: "分かる → masu-stem 分かり + やすい + です.",
        type: "fill-blank",
      },
    ],
    order: 83,
  },
  // ===== Order 84 — Lesson 14: Verb Forms & Auxiliaries =====
  {
    title: "〜方 (kata) — how to do",
    level: "N4",
    lesson: 14,
    chapter: "Verb Forms & Auxiliaries",
    structure: "Masu-stem + 方",
    meaning: "way of doing ~ / how to ~",
    rule:
      "〜方 turns a verb into 'the way of doing it': 使い方 (how to use / usage), 読み方 (how to read), 作り方 (how to make, a recipe). It is a productive noun-maker — attach 方 to the masu-stem of nearly any verb and you get the method or technique for that action. The resulting noun behaves like any noun: it can take の before another noun (この漢字の読み方 = the reading of this kanji), be modified by adjectives (珍しい食べ方 = an unusual way of eating), or stand alone as a topic. Learners meet it constantly on packaging, manuals, and recipes, where 作り方 and 使い方 headline the instructions.",
    conjugation:
      "Masu-stem + 方.\n• Ichidan: 食べる → 食べ方, 教える → 教え方, 開ける → 開け方.\n• Godan: 使う → 使い方, 読む → 読み方, 話す → 話し方, 書く → 書き方, やる → やり方.\n• Irregular: する → し方 ('way of doing', usually replaced by やり方 in speech); 来る has no 〜方 form — say 来る方法 (method of coming) instead.\nThe compound is a NOUN, so it never conjugates: Polite reference is 〜方はどうですか; modify nouns with の: 漢字の書き方 (the way of writing kanji).",
    usage:
      "Use 〜方 to ask for and give instructions: この単語の読み方を教えてください (Please teach me how to read this word). On forms and signs: 申し込み方 (how to apply), 使い方 (directions for use). In conversation, やり方 often replaces し方 for 'the way to do it': そのやり方はうまくいかないよ.",
    commonMistake:
      "Attaching 方 to the dictionary form: ✗「使う方」 — that reads as 'the person who uses (it)' or 'the direction of use' — for 'how to use' it must be ✓「使い方」. Also ✗「話す方」 for 'way of speaking' → ✓「話し方」 (the person who speaks is 話す方, with honorific 方).",
    examples: [
      { jp: "この漢字の読み方を教えてください。", en: "Please teach me how to read this kanji.", difficulty: "easy" },
      {
        jp: "説明書に使い方が書いてあります。",
        en: "The instructions (how to use it) are written in the manual.",
        difficulty: "medium",
        note: "使う → 使い方; 〜てあります = the deliberate-result state.",
      },
      {
        jp: "母直伝のカレーの作り方を、今度彼女にも教えるつもりです。",
        en: "Next I intend to teach my girlfriend my mother's own way of making curry.",
        difficulty: "hard",
        note: "作る → 作り方; 直伝 = passed down directly; 〜つもり = intention.",
      },
    ],
    exercises: [
      {
        question: "このカメラの______が分かりません。  ('I don't understand how to use this camera.' — 使う)",
        answer: "使い方",
        hint: "Masu-stem 使い + 方.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct word for 'how to read (a word)': (その単語の______)",
        type: "multiple-choice",
        options: ["読み方", "読む方", "読め方", "読みの方"],
        answer: "読み方",
      },
      {
        question: "これは私の国の米の______です。  ('This is how rice is cooked in my country.')",
        answer: "炊き方",
        hint: "炊く (to cook rice) → masu-stem 炊き + 方.",
        type: "fill-blank",
      },
    ],
    order: 84,
  },
  // ===== Order 85 — Lesson 17: Time Clauses =====
  {
    title: "〜あいだに / 〜うちに (aida ni / uchi ni) — while / during",
    level: "N4",
    lesson: 17,
    chapter: "Time Clauses",
    structure: "Verb / state + あいだに / うちに",
    meaning: "during ~ (pinpoint event) / while the condition lasts (before it changes)",
    rule:
      "あいだに (間に) and うちに both mean 'while ~', but they slice time differently. あいだに treats the first clause as a bounded interval and drops a pinpoint event inside it: 寝ている間に泥棒が入った (A burglar got in while I was sleeping) — one momentary event inside a stretch of time. With a DURATIVE main-clause action you drop the に and use 間 plain: 音楽を聴いている間、勉強した (I studied while listening to music). うちに, by contrast, means 'while the current condition still holds — before it changes': 日本にいるうちに富士山に登りたい (I want to climb Mt. Fuji while I'm [still] in Japan). Its signature moves are the negative form (忘れないうちに = before I forget) and change-of-state results (読んでいるうちに眠くなった = got sleepy while reading).",
    conjugation:
      "あいだに: Verb-ている + 間に (寝ている間に), Noun + の + 間に (昼休みの間に), 〜て + いる + 間に.\nうちに: plain form + うちに (若いうちに for adjectives, 学生のうちに for nouns), Verb dictionary or 〜ている + うちに (行くうちに / 読んでいるうちに), negative + うちに (忘れないうちに).\nNeither あいだ nor うち conjugates — they are nouns. The main clause carries all tense. 間 without に for actions lasting the whole interval: テレビを見ている間、ご飯を食べた.",
    usage:
      "Use あいだに for errands squeezed into a frame: 授業の間に彼にメッセージを送った (I sent him a message during class). Use うちに for opportune windows and deadlines-in-disguise: 温かいうちに食べてください (Eat it while it's warm). Note the emotional coloring: うちに often implies urgency or nostalgia, while あいだに stays neutral and clock-like.",
    commonMistake:
      "Using あいだに with a durative main action: ✗「音楽を聴いている間にずっと勉強した」 → ✓「音楽を聴いている間、ずっと勉強した」 (no に). Using 間で instead of 間に: ✗「夏休みの間で旅行する」 → ✓「夏休みの間に旅行する」. And forgetting the negative form of うちに: 'before I forget' is ✓「忘れないうちに」, NOT ✗「忘れる前に…」— both exist but 忘れないうちに is the fixed idiom.",
    examples: [
      { jp: "寝ている間に雨が降りました。", en: "It rained while I was sleeping.", difficulty: "easy" },
      {
        jp: "日本にいるうちに、京都へ行きたいです。",
        en: "I want to go to Kyoto while I'm in Japan.",
        difficulty: "medium",
        note: "うちに frames the stay as a closing window of opportunity.",
      },
      {
        jp: "忘れないうちに、先生が言ったことをメモしておこう。",
        en: "Let me jot down what the teacher said before I forget it.",
        difficulty: "hard",
        note: "Negative + うちに = 'before the state flips'; 〜ておこう = volitional of ておく.",
      },
    ],
    exercises: [
      {
        question: "授業の______、こっそりメッセージを送った。  ('I secretly sent a message during class.')",
        answer: "間に",
        hint: "Bounded interval + pinpoint event → あいだに.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct pattern: 'Read the letter while it is still light.' (明るい______手紙を読みなさい。)",
        type: "multiple-choice",
        options: ["うちに", "間に", "うちで", "間で"],
        answer: "うちに",
      },
      {
        question: "母が買い物に行っている______、部屋を掃除しました。  ('I cleaned my room while my mother was out shopping — cleaning filled the whole time.')",
        answer: "間",
        hint: "Durative action across the whole interval → plain 間 (no に).",
        type: "fill-blank",
      },
    ],
    order: 85,
  },
  // ===== Order 86 — Lesson 16: In-progress & Sequencing =====
  {
    title: "〜たびに (tabi ni) — every time",
    level: "N4",
    lesson: 16,
    chapter: "In-progress & Sequencing",
    structure: "Verb (dictionary form) + たびに / Noun + の + たびに",
    meaning: "every time ~ (whenever it happens, something follows)",
    rule:
      "〜たびに links an event to its habitual companion: この曲を聞くたびに祖母を思い出す (Every time I hear this song, I think of my grandmother). The clause before たびに is a recurring event — it must be something that happens again and again, not a one-off. The main clause then states what happens on each occasion, usually something emotional or automatic rather than scheduled. たび (度) literally counts 'occasions', so the pattern reads 'on each occasion of ~'. With nouns, insert の: 旅行のたびに (every time I travel); with verbs use the dictionary form directly (会うたびに).",
    conjugation:
      "Verb dictionary form + たびに; Noun + の + たびに.\n• Ichidan: 食べる → 食べるたびに, 見る → 見るたびに, 寝る → 寝るたびに.\n• Godan: 会う → 会うたびに, 行く → 行くたびに, 読む → 読むたびに, 聞く → 聞くたびに.\n• Irregular: する → するたびに, 来る → 来るたびに (kuru tabi ni).\nNouns: 旅行のたびに, 休みのたびに, クラス会のたびに. たび is a noun and does not conjugate; the main clause carries tense: 〜たびに〜します / 〜たびに〜しました.",
    usage:
      "Use 〜たびに for reflexive pairings: 彼は会うたびに新しいギターの話をする (Every time we meet, he talks about a new guitar). It differs from 〜とき (when) in that たびに explicitly emphasizes repetition and regularity. In speech you will also hear 〜たびごとに, a slightly heavier version with the same meaning.",
    commonMistake:
      "Using the ta-form: ✗「聞いたたびに」 → ✓「聞くたびに」 (dictionary form only). Using the masu-form: ✗「聞きますたびに」 → ✓「聞くたびに」. With nouns forgetting の: ✗「旅行たびに」 → ✓「旅行のたびに」.",
    examples: [
      { jp: "この曲を聞くたびに、祖母を思い出します。", en: "Every time I hear this song, I remember my grandmother.", difficulty: "easy" },
      {
        jp: "彼女は試験のたびに緊張して、眠れなくなります。",
        en: "Every time she has an exam, she gets nervous and can't sleep.",
        difficulty: "medium",
        note: "Noun 試験 + の + たびに; the て-form links the two results.",
      },
      {
        jp: "父は海外出張に行くたびに、お土産を買ってきてくれる。",
        en: "Every time my father goes on an overseas business trip, he buys souvenirs and brings them back for us.",
        difficulty: "hard",
        note: "〜てきてくれる = do something (movement toward the speaker) as a favor.",
      },
    ],
    exercises: [
      {
        question: "この写真を見る______、家族を思い出します。  ('Every time I look at this photo, I remember my family.')",
        answer: "たびに",
        hint: "Dictionary form + たびに.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form: 'Every time I travel, I take photos.' (______写真を撮ります。)",
        type: "multiple-choice",
        options: ["旅行のたびに", "旅行たびに", "旅行するたび", "旅行のたび"],
        answer: "旅行のたびに",
      },
      {
        question: "彼に______たびに、昔のことを思い出して泣いてしまう。  ('Every time I meet him, I end up crying as I remember the old days.' — 会う)",
        answer: "会う",
        hint: "Godan 会う stays in dictionary form before たびに.",
        type: "fill-blank",
      },
    ],
    order: 86,
  },
  // ===== Order 87 — Lesson 16: In-progress & Sequencing =====
  {
    title: "〜ごとに / 〜おきに (goto ni / oki ni) — every / at intervals",
    level: "N4",
    lesson: 16,
    chapter: "In-progress & Sequencing",
    structure: "Quantity / counter + ごとに / おきに",
    meaning: "every ~ (inclusive) / at intervals of ~ (with gaps)",
    rule:
      "ごとに divides something into regular units and attaches an event to each unit: 五メートルごとに木を植えた (We planted a tree every five meters — the whole road is divided into 5-meter lots, and each lot got a tree). おきに counts the GAP between events instead: 二時間おきに授乳する (nurse the baby at two-hour intervals — feed, wait two hours, feed again). With periods of time the two often blur together in everyday speech (三時間ごとに and 三時間おきに are both heard for medicine schedules), but with pages, lines, and seats the difference is sharp: 一ページごとに = on every page, while 一ページおきに = on every OTHER page (skip one, use one). When precision matters — timetables, dosages, drills — choose the particle that matches the logic you mean.",
    conjugation:
      "No conjugation — ごと and おき attach to quantities.\nごとに: 一メートルごとに, 五分ごとに, 三時間ごとに, 一週間ごとに, 一軒ごとに (every house).\nおきに: 二時間おきに (every two hours), 一日おきに (every other day), 一行おきに (every other line), 二メートルおきに.\nBoth are followed by a verb in any tense: 〜ごとに〜します / 〜ごとに〜しました. Colloquially 〜ごと gets に dropped in some set phrases, but keep に in careful Japanese.",
    usage:
      "Use ごとに for per-unit coverage: この電車は各駅ごとに止まる (This train stops at every station), 一問ごとに答え合わせをする (check answers after each question). Use おきに for spaced repetition or alternation: 一日おきにジムに行く (go to the gym every other day). Signs and schedules favor ごとに; medical instructions often use おきに to stress the waiting gap.",
    commonMistake:
      "Using おきに when you mean every single unit: for 'The bus comes every ten minutes.' say ✓「バスは十分ごとに来る」; ✗「十分おきに来る」 strictly means it comes, waits ten minutes, comes again — a twenty-minute cycle. Also attaching them directly to verbs: ✗「行くごとに」 — they attach to QUANTITIES (三時間ごとに), so for verbs use 〜たびに instead.",
    examples: [
      { jp: "駅前にある花屋は、季節ごとに店を飾り替えます。", en: "The flower shop by the station redecorates every season.", difficulty: "easy" },
      {
        jp: "この薬は六時間ごとに飲んでください。",
        en: "Please take this medicine every six hours.",
        difficulty: "medium",
        note: "Period + ごとに = on a six-hour cycle; note the dosing schedule wording.",
      },
      {
        jp: "彼は一日おきにジムに通っているので、週に三、四回行くことになる。",
        en: "He goes to the gym every other day, which works out to three or four times a week.",
        difficulty: "hard",
        note: "一日おきに = alternate days; 〜ことになる = 'it works out that'.",
      },
    ],
    exercises: [
      {
        question: "道の両側に十メートル______木が植えてあります。  ('Trees are planted every ten meters on both sides of the road.')",
        answer: "ごとに",
        hint: "The whole road is divided into units — inclusive 'every'.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct pattern: 'I do laundry every other day.' (______洗濯します。)",
        type: "multiple-choice",
        options: ["一日おきに", "一日ごとに", "一日おきごとに", "一日におき"],
        answer: "一日おきに",
      },
      {
        question: "バスは十五分______来ます。  ('The bus comes every fifteen minutes — a fifteen-minute cycle.')",
        answer: "ごとに",
        hint: "A regular inclusive cycle → ごとに.",
        type: "fill-blank",
      },
    ],
    order: 87,
  },
  // ===== Order 88 — Lesson 16: In-progress & Sequencing =====
  {
    title: "〜ずつ (zutsu) — each / apiece",
    level: "N4",
    lesson: 16,
    chapter: "In-progress & Sequencing",
    structure: "Quantity / counter + ずつ",
    meaning: "each / apiece / little by little (distributive)",
    rule:
      "〜ずつ distributes a quantity over people, occasions, or steps: 子供たちにりんごを二つずつあげた (I gave the kids two apples each). The quantity before ずつ is the amount PER UNIT, and the listener infers the total from the context. It also paces gradual change: 少しずつ日本語が上手になってきた (My Japanese has been improving little by little) — here the unit is time, and 少しずつ means 'a bit at a time'. Notice the difference from ごとに: ごとに marks WHEN/WHERE events recur, while ずつ marks HOW MUCH is allotted each time. ずつ is written with a small つ and functions as an adverbial particle — it never conjugates.",
    conjugation:
      "No conjugation — attaches to quantities and counters.\nDistributive: 一つずつ (one each), 二人ずつ (two people at a time), 三枚ずつ (three sheets each), 一個ずつ (one apiece).\nGradual: 少しずつ (little by little), 毎日少しずつ (a little every day); しだいに is a plain adverb alternative.\nPosition: quantity + ずつ + verb: 一つずつ取ってください. With は/も for contrast: 少しずつも休まない (not resting even a little).",
    usage:
      "Use ずつ when handing things out or pacing effort: 皆さん、一枚ずつ取ってください (Everyone, please take one sheet each). 少しずつ is the go-to phrase for gradual progress in study logs and recovery reports: 胃が小さいので、少しずつ食べています. For strict 'each person' distribution Japanese also has 〜につき, but ずつ is the everyday choice.",
    commonMistake:
      "Using 〜ごとに to distribute amounts: ✗「子供に二つごとにあげた」 — amounts per unit take ずつ: ✓「二つずつあげた」 (ごとに marks intervals, not portions). Also doubling counters: ✗「二つずつずつ」 obviously wrong; more subtly, ✗「ずつ二つ」 word order — the quantity comes first: ✓「二つずつ」.",
    examples: [
      { jp: "子供たちにケーキを一枚ずつ配りました。", en: "I handed out one piece of cake to each of the children.", difficulty: "easy" },
      {
        jp: "毎日少しずつ単語を覚えるほうが、一度にたくさん覚えるより長持ちします。",
        en: "Learning words little by little every day lasts longer than cramming many at once.",
        difficulty: "medium",
        note: "少しずつ = a little at a time; 〜ほうが compares the two study styles.",
      },
      {
        jp: "すみません、今手が離せないので、荷物は一つずつ玄関に置いていただけますか。",
        en: "Sorry, my hands are full right now — could you put the luggage in the entryway one piece at a time?",
        difficulty: "hard",
        note: "一つずつ paces the action; 〜ていただけますか is a very polite request.",
      },
    ],
    exercises: [
      {
        question: "学生に紙を______配りました。  ('I handed out two sheets of paper to each student.' — 二枚)",
        answer: "二枚ずつ",
        hint: "Counter + ずつ = amount per person.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct pattern: 'Please carry the boxes two at a time.' (箱を______運んでください。)",
        type: "multiple-choice",
        options: ["二つずつ", "二つごとに", "ずつ二つ", "二つおきに"],
        answer: "二つずつ",
      },
      {
        question: "彼は日本語が______上手になってきました。  ('His Japanese has been getting better little by little.' — 少し)",
        answer: "少しずつ",
        hint: "Little-by-little pace: 少し + ずつ.",
        type: "fill-blank",
      },
    ],
    order: 88,
  },
  // ===== Order 89 — Lesson 16: In-progress & Sequencing =====
  {
    title: "〜中 (jū / chū) — throughout / in the process",
    level: "N4",
    lesson: 16,
    chapter: "In-progress & Sequencing",
    structure: "Noun + 中 (read ジュウ or チュウ)",
    meaning: "all through ~ / throughout ~ (jū); in the middle of ~ (chū)",
    rule:
      "The kanji 中 changes its meaning with its reading. Read ジュウ it spreads over the WHOLE extent of a time or place: 一日中 (all day long), 今日中に (by the end of today), 世界中 (all over the world). Read チュウ it points at the middle of an ongoing state or activity: 会議中 (in a meeting), 電話中 (on the phone — the sign you see on trains), 使用中 (in use), 授業中 (during class). A quick test: if you can translate 'throughout / all over' → ジュウ; if you can translate 'in the middle of / currently' → チュウ. Note that 中 follows the noun directly — no の and no particle in between.",
    conjugation:
      "No conjugation — 中 is a suffix-like noun.\nRead ジュウ (whole extent): 今日中に (by today), 今週中に (by the end of this week), 一日中 (all day), 一晩中 (all night), 世界中 (all over the world), 国中 (all over the country).\nRead チュウ (mid-state): 会議中, 電話中, 使用中, 授業中, 試験中, 営業中 (open for business), 休暇中 (on leave), 工事中 (under construction).\nThe phrase then acts as a time/place adverbial: 今日中に仕上げます; 週末中出かけていました. Politeness lives in the main verb only.",
    usage:
      "Use the ジュウ reading for deadlines and whole-span statements: この仕事は今日中に終わらせたい (I want to finish this work by the end of today). Use the チュウ reading for status labels and interruptions: 彼は電話中です (He's on the phone right now), 授業中はスマホを見ない (Don't look at your phone during class). Signs on doors — 使用中 / 空室 — are pure チュウ.",
    commonMistake:
      "Misreading 今日中に as チュウ: ✗「きょうちゅうに」 → ✓「きょうじゅうに」 (by the end of today). Confusing spans with moments: ✗「一時間中に電話がかかってきた」 for a single event is odd — 一時間中 implies the whole hour continuously; say ✓「一時間の間に」 instead. Also inserting の: ✗「会議の中」 for 'in a meeting' → ✓「会議中」.",
    examples: [
      { jp: "この仕事は今日中に終わらせます。", en: "I'll get this work finished by the end of today.", difficulty: "easy" },
      {
        jp: "すみません、田中はただ今電話中です。",
        en: "I'm sorry, Tanaka is on the phone at the moment.",
        difficulty: "medium",
        note: "電話中 (chū) = mid-call; ただ今 = right now.",
      },
      {
        jp: "昨日は一日中家を掃除して過ごしたので、くたくただ。",
        en: "Yesterday I spent the whole day cleaning the house, so I'm exhausted.",
        difficulty: "hard",
        note: "一日中 (ichinichijū) = all day long; くたくた = worn out.",
      },
    ],
    exercises: [
      {
        question: "このレポートは明日______に提出してください。  ('Please submit this report by the end of tomorrow.')",
        answer: "中",
        hint: "明日 + 中 read ジュウ = by the end of tomorrow.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct reading/meaning: 一日中 means ______.",
        type: "multiple-choice",
        options: ["all day long (jū)", "in the middle of the day (chū)", "one day later", "every day"],
        answer: "all day long (jū)",
      },
      {
        question: "彼は会議______なので、後でかけ直します。  ('He is in a meeting, so I'll call back later.')",
        answer: "中",
        hint: "会議 + 中 read チュウ = currently in a meeting.",
        type: "fill-blank",
      },
    ],
    order: 89,
  },
  // ===== Order 90 — Lesson 15: Passive & Causative =====
  {
    title: "〜（ら）れる (rareru) — passive form",
    level: "N4",
    lesson: 15,
    chapter: "Passive & Causative",
    structure: "Passive verb + (agent に)",
    meaning: "be done to / is ~ed (action received from someone)",
    rule:
      "The passive flips a sentence so that the RECEIVER of the action becomes the subject. Active: 弟が私のケーキを食べた (My little brother ate my cake). Passive: 私は弟にケーキを食べられた (I had my cake eaten by my little brother). The old subject moves into a に phrase (the agent), the old object becomes the が-marked subject, and the verb takes its passive form. Japanese adds a famous second use — the SUFFERING PASSIVE — where the sentence's point is that the subject was adversely affected: 雨に降られた (I got rained on), 夜中に赤ちゃんに泣かれて眠れなかった (The baby cried in the middle of the night and [therefore] I couldn't sleep). Even intransitive verbs like 泣く or 来る can enter this form, because the grammar is about the nuisance, not about a literal object changing hands. In neutral news-style reporting, the passive simply hides the agent: この寺は三百年前に建てられました (This temple was built three hundred years ago).",
    conjugation:
      "Passive forms by verb group:\n• Ichidan: drop る, add られる. 食べる → 食べられる, 見る → 見られる.\n• Godan: change the final う-vowel to the あ-vowel (a-row), add れる. 書く → 書かれる, 読む → 読まれる, 話す → 話される, 買う → 買われる, 待つ → 待たれる, 取る → 取られる.\n• Irregular: する → される, 来る → 来られる (korareru).\nThe passive verb then conjugates like an Ichidan verb: 食べられる → 食べられます → 食べられた (past) → 食べられない (negative). Agent marker: に (弟に食べられた); direct-object subject takes が/は.",
    usage:
      "Use the neutral passive in news, history, and formal explanation where the doer is unknown or unimportant: この歌は世界中で歌られています (This song is sung all over the world). Use the suffering passive in daily complaints: すりに財布をすられた (I had my wallet pickpocketed). Note the politeness trap: 食べられる doubles as the potential 'can eat' — context and particles (私が vs 私に) disambiguate.",
    commonMistake:
      "Mixing up the passive with the causative: ✗「読まさせる」 is the causative — the passive is ✓「読まれる」. Under-shifting Godan verbs: ✗「話さる」 → ✓「話される」. Losing the agent's に: ✗「弟がケーキを食べられた」 (sounds like the brother got eaten) → ✓「私は弟にケーキを食べられた」. Also the ら抜き form ✗「食べれる」 is potential-only slang and wrong for the passive in standard Japanese: ✓「食べられる」.",
    examples: [
      { jp: "私は先生に褒められました。", en: "I was praised by the teacher.", difficulty: "easy" },
      {
        jp: "この寺は三百年前に建てられました。",
        en: "This temple was built three hundred years ago.",
        difficulty: "medium",
        note: "News-style passive with no agent mentioned; 建てる → 建てられる.",
      },
      {
        jp: "出張中に部下に勝手に契約を破られて、大変困りました。",
        en: "While I was away on business, my subordinate tore up the contract without permission, and I was in real trouble.",
        difficulty: "hard",
        note: "Suffering passive 破られる + 〜て困りました = 'was troubled by ~'.",
      },
    ],
    exercises: [
      {
        question: "私は弟に日記を読ま______。  ('I had my diary read by my brother.' — passive, polite past)",
        answer: "れました",
        hint: "Godan 読む → 読ま + れる → polite past れました.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct passive of する: 'The meeting was canceled.' (会議が______。)",
        type: "multiple-choice",
        options: ["中止されました", "中止しられました", "中止すれた", "中止しされた"],
        answer: "中止されました",
      },
      {
        question: "私は電車の中で足を踏______。  ('I got my foot stepped on on the train.' — 踏む, passive past)",
        answer: "まれた",
        hint: "Godan 踏む → a-row 踏ま + れた.",
        type: "fill-blank",
      },
    ],
    order: 90,
  },
  // ===== Order 91 — Lesson 15: Passive & Causative =====
  {
    title: "〜（さ）せる (saseru) — causative (make/let)",
    level: "N4",
    lesson: 15,
    chapter: "Passive & Causative",
    structure: "Causative verb + (person に / を)",
    meaning: "make someone do ~ / let someone do ~",
    rule:
      "The causative lets you talk about making or letting someone act. The causer becomes the subject; the person who actually performs the action slides into a に or を phrase; the verb takes its causative form: 先生は学生に本を読ませた (The teacher made/had the students read the book). Japanese does not separate 'make' from 'let' — 読ませた covers both forced and permitted readings, and context (or softening words like わざと, せめて) tells them apart: 母は子供を遊ばせた could be 'let the child play' or 'made the child play', though with a beneficiary flavor people add 〜てやる/〜てあげる to signal permission (遊ばせてやった = let him play, as a favor). Particle choice is systematic: TRANSITIVE verbs mark the worker with に (学生に書かせる), because the object keeps を; INTRANSITIVE verbs mark the worker with を (子供を外で遊ばせる), because を is otherwise unused. There is also the causative-passive 〜させられる = 'be made to do': 部長に残業させられた (I was made to work overtime by the department head) — a hallmark of complaints about pressure.",
    conjugation:
      "Causative forms by verb group:\n• Ichidan: drop る, add させる. 食べる → 食べさせる, 見る → 見させる.\n• Godan: change the final う-vowel to the あ-vowel (a-row), add せる. 書く → 書かせる, 読む → 読ませる, 待つ → 待たせる, 買う → 買わせる, 話す → 話させる.\n• Irregular: する → させる, 来る → 来させる (kosaseru).\nThe causative verb conjugates as Ichidan: 書かせる → 書かせます → 書かせた → 書かせない. Causative-passive: Ichidan 〜させられる (食べさせられる), Godan 〜せられる / 〜させられる (書かせられる), する → させられる, 来る → させられる (be made to come).",
    usage:
      "Use the causative for instructions given through others, child-rearing, and management: 母は息子に野菜を食べさせました (The mother made her son eat vegetables). Permission nuance: 部長が私に休ませてくれた (The section chief let me take the day off — favor nuance with 〜てくれた). The causative-passive 〜させられた is the complaint form: 子供の頃、毎日ピアノを練習させられた (As a child I was made to practice piano every day).",
    commonMistake:
      "Double-さ error on Godan verbs: ✗「行かさせる」 → ✓「行かせる」 (the あ-row vowel shift already supplies the さ sound). Wrong worker particle: ✗「学生を本を読ませる」 — with a transitive verb the worker takes に: ✓「学生に本を読ませる」. And mixing forms: ✗「食べすさせる」 → ✓「食べさせる」.",
    examples: [
      { jp: "先生は学生に文章を暗唱させました。", en: "The teacher made the students memorize and recite the passage.", difficulty: "easy" },
      {
        jp: "母は子供を近くの公園で遊ばせています。",
        en: "The mother lets her child play at the nearby park.",
        difficulty: "medium",
        note: "Intransitive 遊ぶ → worker marked with を; 〜ています = ongoing state of letting.",
      },
      {
        jp: "上司に無理な日程を強引に受けさせられて、週末が全部つぶれた。",
        en: "My boss strong-armed me into accepting an impossible schedule, and my whole weekend was wiped out.",
        difficulty: "hard",
        note: "Causative-passive 受けさせられる = 'was made to accept'; つぶれた = was ruined.",
      },
    ],
    exercises: [
      {
        question: "先生は学生に辞書を______。  ('The teacher makes the students use a dictionary.' — 使う, causative polite)",
        answer: "使わせます",
        hint: "Godan 使う → 使わ + せる → polite 使わせます.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct causative of 食べる: 'I made my little brother eat it.' (弟に______。)",
        type: "multiple-choice",
        options: ["食べさせた", "食べられた", "食べらせた", "食べしさせた"],
        answer: "食べさせた",
      },
      {
        question: "私は部長に残業______。  ('I was made to work overtime by the department head.' — causative-passive past)",
        answer: "させられた",
        hint: "する → させられる, plain past させられた.",
        type: "fill-blank",
      },
    ],
    order: 91,
  },
  // ===== Order 92 — Lesson 15: Passive & Causative =====
  {
    title: "〜られる / 〜える (rareru / eru) — potential form (can do)",
    level: "N4",
    lesson: 15,
    chapter: "Passive & Causative",
    structure: "Potential verb (+ が for the object)",
    meaning: "can do / be able to do ~ (learned or circumstantial ability)",
    rule:
      "The potential form expresses ability or possibility: 私は日本語が話せます (I can speak Japanese), この機械は壊れた物を直せる (This machine can repair broken things). Ichidan verbs build it with られる and Godan verbs shift their final vowel to the え-row and add る, so the two groups end up looking different — 見られる vs 書ける. A famous trap: for Ichidan verbs the potential and the passive are IDENTICAL in shape (食べられる = can eat OR be eaten); the particles decide — 私は刺身が食べられる (I can eat sashimi) versus 私は弟にケーキを食べられた (I had my cake eaten by my brother). In modern speech many people drop the ら for Ichidan potentials (食べれる, the 'ra-nuki' form), which is widespread but still considered informal — avoid it in exams and formal writing. When a sentence turns potential, the object usually switches from を to が: 日本語を話す → 日本語が話せる (though を is increasingly tolerated in casual usage).",
    conjugation:
      "Potential forms by verb group:\n• Ichidan: drop る, add られる. 食べる → 食べられる, 見る → 見られる, 寝る → 寝られる.\n• Godan: change the final う-vowel to the え-vowel (e-row), add る. 書く → 書ける, 読む → 読める, 買う → 買える, 話す → 話せる, 待つ → 待てる, 飲む → 飲める.\n• Irregular: する → できる, 来る → 来られる (korareru).\nThe potential verb conjugates as Ichidan: 話せる → 話せます → 話せた → 話せない. Object particle: を → が (刺身が食べられる). Negative ability: まだ泳げない (I still can't swim).",
    usage:
      "Use the potential for skills you have acquired (免許が取れる — can get a license) and for circumstances that allow or block an action (この券なら入場できる — with this ticket you can enter). Compare with 〜ことができる, which is more formal and slightly stiff. For 'can' due to permission, 〜てもいい is the right pattern instead.",
    commonMistake:
      "Applying the Godan rule to Ichidan verbs: ✗「食べれる」 in careful writing → ✓「食べられる」 (ra-nuki is casual only). Double potential: ✗「話せられる」 → ✓「話せる」. Keeping を in the potential sentence in tests: ✗「日本語を話せます」 is heard in speech but the exam-safe form is ✓「日本語が話せます」. And confusing passive with potential for Ichidan verbs — check the particles.",
    examples: [
      { jp: "私は少し日本語が話せます。", en: "I can speak a little Japanese.", difficulty: "easy" },
      {
        jp: "彼はピアノが弾けるし、歌も歌える。",
        en: "He can play the piano, and he can sing, too.",
        difficulty: "medium",
        note: "弾く → 弾ける, 歌う → 歌える; 〜し lists proud traits.",
      },
      {
        jp: "暗証番号を忘れてしまって、今この口座からお金を引き出せない。",
        en: "I've forgotten my PIN, so right now I can't withdraw money from this account.",
        difficulty: "hard",
        note: "引き出す → 引き出せる; 〜てしまって expresses the completed mishap.",
      },
    ],
    exercises: [
      {
        question: "私は______。  ('I can't swim.' — potential negative, polite — 泳ぐ)",
        answer: "泳げません",
        hint: "Godan 泳ぐ → e-row 泳げ + る; negative polite れません.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct potential of 見る: 'I can watch it.' (______。)",
        type: "multiple-choice",
        options: ["見られる", "見える", "見ける", "見しれる"],
        answer: "見られる",
      },
      {
        question: "刺身が______ようになりました。  ('I've become able to eat sashimi.' — 食べる, potential)",
        answer: "食べられる",
        hint: "Ichidan potential of 食べる + ようになりました (change of state).",
        type: "fill-blank",
      },
    ],
    order: 92,
  },
  // ===== Order 93 — Lesson 14: Verb Forms & Auxiliaries =====
  {
    title: "〜続ける・〜終わる・〜直す (tsuzukeru / owaru / naosu) — auxiliary compound verbs",
    level: "N4",
    lesson: 14,
    chapter: "Verb Forms & Auxiliaries",
    structure: "Masu-stem + 続ける / 終わる / 直す",
    meaning: "keep ~ing / finish ~ing / redo ~ (compound verb auxiliaries)",
    rule:
      "Japanese bolts a small set of verbs onto the masu-stem of other verbs to add aspect and repair meaning. 続ける adds continuation: 降り続ける (keep falling), 話し続ける (keep talking). 終わる marks completion of the whole action: 読み終わった (finished reading it — the book is done, cover to cover). 直す means to redo something because the first attempt was unsatisfactory: it attaches to the FIRST verb's stem — 書き直す (rewrite), 考え直す (reconsider), 見直す (look it over again). These second verbs carry the conjugation — 続ける conjugates as Ichidan, 終わる and 直す as Godan — while the first verb contributes only its stem and meaning. The compounds read as single words: 待ち続ける = 'keep waiting', one lexical unit.",
    conjugation:
      "Masu-stem + auxiliary verb.\n• Ichidan: 食べる → 食べ続ける / 食べ終わる / 食べ直す; 教える → 教え続ける.\n• Godan: 読む → 読み続ける / 読み終わる / 読み直す; 使う → 使い続ける / 使い直す; 書く → 書き続ける / 書き終わる / 書き直す.\n• Irregular: する → し続ける / し直す; 来る → 来続ける (rare in speech; normally just また来る).\nThe SECOND verb conjugates: 続ける (Ichidan): 続けます / 続けた / 続けない. 終わる (Godan): 終わります / 終わった / 終わらない. 直す (Godan): 直します / 直した / 直さない.",
    usage:
      "Use 続ける for endurance and persistence: 三時間歩き続けた (I kept walking for three hours). Use 終わる for finishing tasks with a clear endpoint: 宿題をやり終わったら遊べる (Once you finish doing your homework you can play). Use 直す for revisions and retries: 言い直す (say it again more correctly), やり直す (do it over). In casual speech 〜ちゃう (the contraction of 〜てしまう) overlaps with 終わる: 食べちゃった = ate it all up.",
    commonMistake:
      "Attaching to the dictionary form: ✗「読む終わる」 → ✓「読み終わる」 (masu-stem). Conjugating the first verb instead of the second: ✗「読み続けるました」 → ✓「読み続けました」. And splitting the compound or skipping the stem: ✗「書く直す」 / ✗「書直す」 — always the masu-stem: ✓「書き直す」.",
    examples: [
      { jp: "雨が三日間降り続きました。", en: "It kept raining for three days.", difficulty: "easy" },
      {
        jp: "その小説を全部読み終わるのに、一か月かかりました。",
        en: "It took me a month to finish reading that novel.",
        difficulty: "medium",
        note: "読み終わる = finish reading; 〜のに = 'it took ~ in order to'.",
      },
      {
        jp: "初めての面接は失敗だったが、翌週、履歴書を書き直してもう一度挑戦した。",
        en: "My first interview was a failure, but the next week I rewrote my resume and tried again.",
        difficulty: "hard",
        note: "書き直す = rewrite; もう一度 = one more time.",
      },
    ],
    exercises: [
      {
        question: "彼は二時間______ました。  ('He kept talking for two hours.' — 話す)",
        answer: "話し続け",
        hint: "Masu-stem 話し + 続ける, polite past 続けました.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct compound: 'I finished eating.' (ご飯を______。)",
        type: "multiple-choice",
        options: ["食べ終わった", "食べる終わった", "食べ終わる", "食べて終わった"],
        answer: "食べ終わった",
      },
      {
        question: "この文章は間違いが多いので、______ください。  ('This text has many mistakes, so please rewrite it.' — 書く)",
        answer: "書き直して",
        hint: "Masu-stem 書き + 直す, te-form + ください.",
        type: "fill-blank",
      },
    ],
    order: 93,
  },
  // ===== Order 94 — Lesson 17: Contrast & Purpose =====
  {
    title: "〜のに (noni) — although / for the purpose of",
    level: "N4",
    lesson: 17,
    chapter: "Contrast & Purpose",
    structure: "Plain clause + のに (contrast) / Verb (dictionary / nai) + のに (purpose)",
    meaning: "although ~ (contrary to expectation) / in order to ~ (used for)",
    rule:
      "のに has two distinct jobs. CONTRAST: attach to a plain clause to say the result betrayed the expectation: 一生懸命勉強したのに、試験に落ちた (I studied hard, and yet I failed the exam). The surprise or disappointment is baked into the particle — が or けど would state the same facts neutrally, のに judges them. For nouns and na-adjectives use なのに: 学生なのに漢字が読めない (Even though he's a student, he can't read kanji). PURPOSE: attach to a dictionary or nai-form and evaluate a tool or action: このナイフはパンを切るのに便利だ (This knife is handy for cutting bread). Here のに works like ため(に), and the main clause needs an evaluative word such as 便利, 役に立つ, 使う, 必要.",
    conjugation:
      "Contrast のに attaches to plain forms: Verb 行くのに / 行かなかったのに; i-adj 寒いのに / 寒かったのに; na-adj 静かなのに; Noun 学生なのに (だ → な).\nPurpose のに attaches to the dictionary or nai-form: 切るのに / 忘れないのに; never to ます/ました.\nのに itself does not conjugate; the main clause carries tense and politeness. Casual variant of contrast のに: 〜のにね / 〜のにさ sentence-finally (残念だね flavor). Formal alternative for purpose: ため(に).",
    usage:
      "Use contrast のに for laments and complaints where the outcome feels unfair: 予約したのに、ホテルは満室だった (Even though I had a reservation, the hotel was full). Use purpose のに in explanations of usefulness: 日本語を学ぶのにこの教科書が役に立つ (This textbook is useful for learning Japanese). Keep the two straight: contrast のに stands between clauses; purpose のに sits inside one clause before an evaluation.",
    commonMistake:
      "Dropping な after nouns/na-adjectives in the contrast use: ✗「学生のに」 → ✓「学生なのに」. Attaching the polite form in the purpose use: ✗「切りますのに」 → ✓「切るのに」. Also confusing contrast のに with possessive の + に: ✗「私のに」 is meaningless — the 'although' particle follows a whole clause, ✓「行ったのに」.",
    examples: [
      { jp: "一生懸命勉強したのに、試験に落ちてしまった。", en: "Even though I studied hard, I ended up failing the exam.", difficulty: "easy" },
      {
        jp: "この折りたたみ傘は、かばんに入れて持ち歩くのに便利です。",
        en: "This folding umbrella is convenient to carry around in a bag.",
        difficulty: "medium",
        note: "Purpose のに + evaluation 便利; the whole phrase 持ち歩く marks the use case.",
      },
      {
        jp: "何度も電話をかけたのに、一度も出てもらえず、結局直接行くことにした。",
        en: "Although I called many times, they never picked up, so in the end I decided to go in person.",
        difficulty: "hard",
        note: "Contrast のに between the clauses; 〜てもらえず = 'without being granted (the favor)'; 〜ことにした = decided to.",
      },
    ],
    exercises: [
      {
        question: "高い______、おいしくなかった。  ('Even though it was expensive, it wasn't tasty.' — i-adjective)",
        answer: "のに",
        hint: "Contrast のに after the plain i-adjective.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form: 'Although he is a student, ~' (彼は学生______、〜)",
        type: "multiple-choice",
        options: ["なのに", "のに", "ののに", "なののに"],
        answer: "なのに",
      },
      {
        question: "この辞書は漢字を調べる______役に立ちます。  ('This dictionary is useful for looking up kanji.')",
        answer: "のに",
        hint: "Purpose のに after the dictionary form.",
        type: "fill-blank",
      },
    ],
    order: 94,
  },
  // ===== Order 95 — Lesson 17: Contrast & Purpose =====
  {
    title: "〜ば〜ほど (ba ~ hodo) — the more..., the more...",
    level: "N4",
    lesson: 17,
    chapter: "Contrast & Purpose",
    structure: "Verb ば-form + Verb (dictionary) + ほど",
    meaning: "the more ~, the more ~ (proportional change)",
    rule:
      "〜ば〜ほど expresses proportional relationship: as one thing increases, the other increases (or decreases) with it. The verb appears twice — first in the ば-conditional, then in the dictionary form with ほど: 練習すればするほど上手になる (The more you practice, the better you get). ほど literally means 'to the extent of', so the pattern reads 'to the extent that you practice, you improve'. The main clause can also shrink: 悲しみが深ければ深いほど癒えるのに時間がかかる (The deeper the grief, the longer the healing takes). For i-adjectives, use ければ in the first slot and the plain adjective before ほど: 高ければ高いほど (the more expensive it is). With na-adjectives and nouns, なら fills the conditional slot: 静かなら静かなほど (the quieter, the better).",
    conjugation:
      "Verb: ば-form + dictionary form + ほど.\n• Ichidan: 食べれば食べるほど, 見れば見るほど.\n• Godan: 練習すれば練習するほど, 読めば読むほど, 学べば学ぶほど.\n• Irregular: すればするほど, 来れば来るほど (rare).\nAdjectives: i-adj 高ければ高いほど / 安ければ安いほど; na-adj 便利なら便利なほど / 静かなら静かなほど; with nouns, use なら + な + ほど only when the noun behaves adjectivally (元気なら元気なほど).\nNote: only ONE ば — the second slot is the plain form, never another ば-form.",
    usage:
      "Use 〜ば〜ほど in observations, advice, and proverbs: 年を取れば取るほど時間の流れが速く感じる (The older you get, the faster time seems to flow). A shortened variant puts ほど directly on the plain form: 練習するほど上手になる — same meaning, slightly more casual. The opposite direction works too: 食べれば食べるほど太る (the more you eat, the more you gain).",
    commonMistake:
      "Doubling the ば-form: ✗「練習すれば練習すればほど」 → ✓「練習すれば練習するほど」 (the second verb stays plain). Using ます: ✗「練習しますすれば」 → ✓「練習すれば」. For i-adjectives skipping ければ: ✗「高いば高いほど」 → ✓「高ければ高いほど」.",
    examples: [
      { jp: "練習すればするほど、上手になります。", en: "The more you practice, the better you get.", difficulty: "easy" },
      {
        jp: "この曲は聴けば聴くほど味わいが深まる。",
        en: "The more you listen to this song, the deeper its appeal grows.",
        difficulty: "medium",
        note: "聴く → 聴けば聴くほど; 味わいが深まる = the flavor deepens.",
      },
      {
        jp: "都会は便利なら便利なほど、夜の騒音に悩む住民が増えてしまう。",
        en: "The more convenient the city, the more residents end up suffering from nighttime noise.",
        difficulty: "hard",
        note: "Na-adjective 便利 → 便利なら便利なほど; 〜てしまう marks the regrettable outcome.",
      },
    ],
    exercises: [
      {
        question: "______するほど、忘れにくくなります。  ('The more you review it, the harder it becomes to forget.' — 復習)",
        answer: "復習すれば",
        hint: "ば-form first, dictionary form + ほど second.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct pattern: 'The more expensive, the better the quality.' (______品質がいい。)",
        type: "multiple-choice",
        options: ["高ければ高いほど", "高いば高いほど", "高ければ高いほどか", "高くば高いほど"],
        answer: "高ければ高いほど",
      },
      {
        question: "漢字は______覚えるほど難しくなりますね。  ('The more kanji you memorize, the harder it gets, doesn't it.')",
        answer: "覚えれば",
        hint: "覚える is Ichidan: drop る, add れば.",
        type: "fill-blank",
      },
    ],
    order: 95,
  },
  // ===== Order 96 — Lesson 13: Seems-like Patterns =====
  {
    title: "〜ような / 〜ように (yō na / yō ni) — like / as if",
    level: "N4",
    lesson: 13,
    chapter: "Seems-like Patterns",
    structure: "Noun + の + ような (modifies nouns) / ように (modifies verbs)",
    meaning: "like ~ / as if ~ (simile, example, manner, purpose)",
    rule:
      "よう comes from 様 ('way, appearance') and lets you compare things explicitly. Before a NOUN use ような: 夢のような景色 (a dreamlike view / a view like a dream). Before a VERB use ように: 鳥のように空を飛びたい (I want to fly through the sky like a bird). Nouns attach with の (〜のようだ); verbs and plain clauses attach directly (言われたように / 泣くように). The pattern covers four close cousins: SIMILE (雪のような白い肌 — skin white as snow), EXAMPLE (京都のような古い町 — a town like Kyoto), MANNER (彼は息を切らすように走ってきた — he came running, as if out of breath), and PURPOSE with non-volitional results (忘れないようにメモを取った — I took notes so I wouldn't forget). Note that ように is also the basis of 〜ようにする (make sure to) and 〜ようになる (come to), which are separate grammar points.",
    conjugation:
      "Attachment rules (no verb-group machinery — よう is a na-adjective-like noun).\nNoun + の + ような/ように: 鳥のような声, 鳥のように泳ぐ.\nVerb plain form + ように: 言われたように動く (move as told), 泣くように頼む (beg as if crying).\ni-adj + ように is rare; na-adj uses な: 静かなような態度 (an attitude as if quiet).\nよう conjugates as a na-adjective: ようだ / ようです / ようだった / ような + Noun / ように + Verb; negative ようではない. Casual spoken cousin: みたい (鳥みたいに).",
    usage:
      "Use ような/ように for vivid comparisons in description and writing: 氷のように冷たい手 (hands cold as ice). ように also introduces model sentences (先生が言うように — as the teacher says) and purposes for avoidable outcomes (風邪をひかないように気をつけて — take care not to catch a cold). In formal writing ような/ように keeps a literary tone that みたい cannot match.",
    commonMistake:
      "Using ような before verbs: ✗「鳥ような泳ぐ」 → ✓「鳥のように泳ぐ」 (ように modifies verbs). Dropping の after nouns: ✗「夢ような景色」 → ✓「夢のような景色」. And confusing the simile ように with the conjecture 〜ようだ (seems): simile compares two things, conjecture judges one situation — different grammar despite the shared shape.",
    examples: [
      { jp: "彼女は鳥のように歌えます。", en: "She can sing like a bird.", difficulty: "easy" },
      {
        jp: "これは夢のような話ですね。",
        en: "This is a story like a dream, isn't it?",
        difficulty: "medium",
        note: "夢の + ような + noun 話; the です makes it polite.",
      },
      {
        jp: "忘れないように、重要なポイントはノートに書き留めておいた。",
        en: "So as not to forget, I jotted the important points down in my notebook.",
        difficulty: "hard",
        note: "Negative + ように = purpose; 書き留めておいた = wrote and kept (ておく).",
      },
    ],
    exercises: [
      {
        question: "彼は魚______泳ぎます。  ('He swims like a fish.')",
        answer: "のように",
        hint: "Noun + の + ように before the verb.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form: 'a view like a dream' (夢______景色)",
        type: "multiple-choice",
        options: ["のような", "ような", "のように", "のよう"],
        answer: "のような",
      },
      {
        question: "風邪をひかない______、マスクをしています。  ('So as not to catch a cold, I wear a mask.')",
        answer: "ように",
        hint: "Negative plain form + ように = purpose.",
        type: "fill-blank",
      },
    ],
    order: 96,
  },
  // ===== Order 97 — Lesson 13: Seems-like Patterns =====
  {
    title: "〜そうにない / 〜そうもない (sō ni nai / sō mo nai) — unlikely to happen",
    level: "N4",
    lesson: 13,
    chapter: "Seems-like Patterns",
    structure: "Verb (masu-stem) + そうにない / そうもない",
    meaning: "doesn't look like it will ~ / is unlikely to ~",
    rule:
      "〜そうにない is the negative prediction of the conjecture 〜そうだ: 雨が降りそうです (It looks like it will rain) → 雨が降りそうにない (It doesn't look like it will rain). Attach it to the masu-stem — the same place 〜そうだ (conjecture) attaches — and never to the plain form: 来そうにない (he doesn't seem likely to come). The variant 〜そうもない adds も for emphasis: 'not even likely' — 来そうもない (he's hardly likely to come), 間に合いそうもない (it hardly looks like we'll make it in time). A third variant 〜そうにもない is even stronger and a touch literary. All three judge the FUTURE from present signs, so they pair naturally with time expressions like 今日中に, 今週中に.",
    conjugation:
      "Masu-stem + そう + にない / もない / にもない.\n• Ichidan: 食べる → 食べそうにない, 出来る → 出来そうにない.\n• Godan: 降る → 降りそうにない, 間に合う → 間に合いそうにない / 間に合いそうもない, 売れる → 売れそうにない.\n• Irregular: する → しそうにない, 来る → 来そうにない (kisō ni nai).\nThe negative tail conjugates: 〜そうにありません / 〜そうもありません (polite); past: 〜そうになかった (it didn't look like it would). Do NOT attach そう to the plain form for this pattern — 来ないそうだ is hearsay ('I hear he isn't coming'), a different grammar point entirely.",
    usage:
      "Use 〜そうにない/そうもない when signs point against an outcome: 雲が晴れてきたので、雨は降りそうもない (The clouds are clearing, so it hardly looks like rain). It is the natural way to downgrade a plan in conversation: 今日中には終わりそうにないので、明日にさせてください (It doesn't look like it'll be done today, so please let me finish tomorrow). For adjective-stem conjecture the negative is 〜くなさそう / 〜なさそう — a different shape from this verb pattern.",
    commonMistake:
      "Attaching to the plain form: ✗「来ないそうにない」 is a tangle; the correct base is the masu-stem: ✓「来そうにない」. Mixing up hearsay: ✗「来ないそうだ」 means 'I hear he isn't coming' — for 'doesn't look like coming' say ✓「来そうにない」. And polarity slip: ✗「降りそうにあります」 does not mean 'looks like it will rain' — that is ✓「降りそうです」.",
    examples: [
      { jp: "今日は雨が降りそうにありません。", en: "It doesn't look like it will rain today.", difficulty: "easy" },
      {
        jp: "電車が遅れているので、開演時間には間に合いそうもない。",
        en: "The train is running late, so it hardly looks like we'll make it in time for the opening.",
        difficulty: "medium",
        note: "間に合う → 間に合いそうもない; そうもない = 'not even likely'.",
      },
      {
        jp: "このままだと、今週中に原稿が仕上がりそうにもないので、編集者に期間の延長を頼んだ。",
        en: "At this rate the manuscript doesn't look remotely likely to be finished this week, so I asked the editor for an extension.",
        difficulty: "hard",
        note: "仕上がる → 仕上がりそうにもない (strongest variant); このままだと = 'if things stay like this'.",
      },
    ],
    exercises: [
      {
        question: "空が明るいので、今日は雪が______。  ('The sky is bright, so it doesn't look like it will snow today.' — 降る)",
        answer: "降りそうにありません",
        hint: "Masu-stem 降り + そう + polite negative にありません.",
        type: "fill-blank",
      },
      {
        question: "Choose the correct form: 'He is unlikely to come.' (彼は______。)",
        type: "multiple-choice",
        options: ["来そうにない", "来ないそうにない", "来るそうにない", "来そうくない"],
        answer: "来そうにない",
      },
      {
        question: "今からでは、終電に______。  ('At this rate we're unlikely to make the last train.' — 間に合う, emphatic)",
        answer: "間に合いそうもない",
        hint: "Masu-stem 間に合い + そうもない = 'not even likely'.",
        type: "fill-blank",
      },
    ],
    order: 97,
  },
];
