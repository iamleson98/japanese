// Extra content from deep research — appended to the main seed.
// Adds: 48 N5 vocab, 12 grammar points, 24 kanji, 14 resources,
//       20 counters, verb conjugation tables, mnemonics.

import type { PrismaClient } from "@prisma/client";

type Vocab = {
  word: string; reading: string; meaning: string; romaji?: string;
  level: "N5" | "N4" | "N3"; category: string; pos?: string;
  verbGroup?: string; pitchAccent?: string; lesson?: number;
  exampleJp?: string; exampleEn?: string; exampleJp2?: string; exampleEn2?: string;
  order?: number;
};

// ---------------- Vocabulary additions ----------------
export const EXTRA_VOCAB: Vocab[] = [
  // Time expressions (lesson 3)
  { word: "今", reading: "いま", meaning: "now", romaji: "ima", level: "N5", category: "time", pos: "noun", lesson: 3, exampleJp: "今、何時ですか。", exampleEn: "What time is it now?", exampleJp2: "今、学校にいます。", exampleEn2: "I'm at school now.", order: 100 },
  { word: "朝", reading: "あさ", meaning: "morning", romaji: "asa", level: "N5", category: "time", pos: "noun", lesson: 3, exampleJp: "朝、コーヒーを飲みます。", exampleEn: "I drink coffee in the morning.", order: 101 },
  { word: "昼", reading: "ひる", meaning: "noon / daytime", romaji: "hiru", level: "N5", category: "time", pos: "noun", lesson: 3, order: 102 },
  { word: "夜", reading: "よる", meaning: "night", romaji: "yoru", level: "N5", category: "time", pos: "noun", lesson: 3, exampleJp: "夜、本を読みます。", exampleEn: "I read a book at night.", order: 103 },
  { word: "今朝", reading: "けさ", meaning: "this morning", romaji: "kesa", level: "N5", category: "time", pos: "noun", lesson: 3, exampleJp: "今朝、パンを食べました。", exampleEn: "I ate bread this morning.", order: 104 },
  { word: "今晩", reading: "こんばん", meaning: "tonight", romaji: "konban", level: "N5", category: "time", pos: "noun", lesson: 3, order: 105 },
  { word: "今週", reading: "こんしゅう", meaning: "this week", romaji: "konshuu", level: "N5", category: "time", pos: "noun", lesson: 3, order: 106 },
  { word: "来週", reading: "らいしゅう", meaning: "next week", romaji: "raishuu", level: "N5", category: "time", pos: "noun", lesson: 3, exampleJp: "来週、東京へ行きます。", exampleEn: "I'm going to Tokyo next week.", order: 107 },
  { word: "先週", reading: "せんしゅう", meaning: "last week", romaji: "senshuu", level: "N5", category: "time", pos: "noun", lesson: 3, order: 108 },
  { word: "今月", reading: "こんげつ", meaning: "this month", romaji: "kongetsu", level: "N5", category: "time", pos: "noun", lesson: 3, order: 109 },
  { word: "来月", reading: "らいげつ", meaning: "next month", romaji: "raigetsu", level: "N5", category: "time", pos: "noun", lesson: 3, order: 110 },
  { word: "来年", reading: "らいねん", meaning: "next year", romaji: "rainen", level: "N5", category: "time", pos: "noun", lesson: 3, exampleJp: "来年、日本へ行きます。", exampleEn: "I'll go to Japan next year.", order: 111 },
  { word: "去年", reading: "きょねん", meaning: "last year", romaji: "kyonen", level: "N5", category: "time", pos: "noun", lesson: 3, order: 112 },
  { word: "毎日", reading: "まいにち", meaning: "every day", romaji: "mainichi", level: "N5", category: "time", pos: "adverb", lesson: 3, exampleJp: "毎日、日本語を勉強します。", exampleEn: "I study Japanese every day.", order: 113 },
  { word: "時々", reading: "ときどき", meaning: "sometimes", romaji: "tokidoki", level: "N5", category: "time", pos: "adverb", lesson: 3, exampleJp: "時々、映画を見ます。", exampleEn: "Sometimes I watch movies.", order: 114 },
  { word: "月曜日", reading: "げつようび", meaning: "Monday", romaji: "getsuyoubi", level: "N5", category: "time", pos: "noun", lesson: 3, exampleJp: "月曜日に仕事があります。", exampleEn: "I have work on Monday.", order: 115 },
  { word: "火曜日", reading: "かようび", meaning: "Tuesday", romaji: "kayoubi", level: "N5", category: "time", pos: "noun", lesson: 3, order: 116 },
  { word: "水曜日", reading: "すいようび", meaning: "Wednesday", romaji: "suiyoubi", level: "N5", category: "time", pos: "noun", lesson: 3, order: 117 },
  { word: "木曜日", reading: "もくようび", meaning: "Thursday", romaji: "mokuyoubi", level: "N5", category: "time", pos: "noun", lesson: 3, order: 118 },
  { word: "金曜日", reading: "きんようび", meaning: "Friday", romaji: "kinyoubi", level: "N5", category: "time", pos: "noun", lesson: 3, order: 119 },
  { word: "土曜日", reading: "どようび", meaning: "Saturday", romaji: "doyoubi", level: "N5", category: "time", pos: "noun", lesson: 3, order: 120 },
  { word: "日曜日", reading: "にちようび", meaning: "Sunday", romaji: "nichiyoubi", level: "N5", category: "time", pos: "noun", lesson: 3, exampleJp: "日曜日に休みます。", exampleEn: "I rest on Sunday.", order: 121 },

  // Common nouns
  { word: "仕事", reading: "しごと", meaning: "work / job", romaji: "shigoto", level: "N5", category: "nouns", pos: "noun", lesson: 5, exampleJp: "仕事は忙しいです。", exampleEn: "My work is busy.", order: 122 },
  { word: "会社", reading: "かいしゃ", meaning: "company", romaji: "kaisha", level: "N5", category: "nouns", pos: "noun", lesson: 5, order: 123 },
  { word: "駅", reading: "えき", meaning: "station", romaji: "eki", level: "N5", category: "places", pos: "noun", lesson: 5, exampleJp: "駅はどこですか。", exampleEn: "Where is the station?", order: 124 },
  { word: "店", reading: "みせ", meaning: "shop / store", romaji: "mise", level: "N5", category: "places", pos: "noun", lesson: 5, order: 125 },
  { word: "部屋", reading: "へや", meaning: "room", romaji: "heya", level: "N5", category: "places", pos: "noun", lesson: 5, exampleJp: "私の部屋は広いです。", exampleEn: "My room is spacious.", order: 126 },
  { word: "名前", reading: "なまえ", meaning: "name", romaji: "namae", level: "N5", category: "nouns", pos: "noun", lesson: 1, exampleJp: "お名前は何ですか。", exampleEn: "What is your name?", order: 127 },
  { word: "電話", reading: "でんわ", meaning: "telephone / call", romaji: "denwa", level: "N5", category: "nouns", pos: "noun", lesson: 5, exampleJp: "電話をかけます。", exampleEn: "I'll make a phone call.", order: 128 },
  { word: "写真", reading: "しゃしん", meaning: "photograph", romaji: "shashin", level: "N5", category: "nouns", pos: "noun", lesson: 5, exampleJp: "写真を撮ります。", exampleEn: "I take a photo.", order: 129 },
  { word: "音楽", reading: "おんがく", meaning: "music", romaji: "ongaku", level: "N5", category: "nouns", pos: "noun", lesson: 5, exampleJp: "音楽を聞きます。", exampleEn: "I listen to music.", order: 130 },
  { word: "新聞", reading: "しんぶん", meaning: "newspaper", romaji: "shinbun", level: "N5", category: "nouns", pos: "noun", lesson: 5, order: 131 },
  { word: "雨", reading: "あめ", meaning: "rain", romaji: "ame", level: "N5", category: "nature", pos: "noun", lesson: 6, exampleJp: "今日、雨が降っています。", exampleEn: "It's raining today.", order: 132 },
  { word: "雪", reading: "ゆき", meaning: "snow", romaji: "yuki", level: "N5", category: "nature", pos: "noun", lesson: 6, order: 133 },
  { word: "空", reading: "そら", meaning: "sky", romaji: "sora", level: "N5", category: "nature", pos: "noun", lesson: 6, order: 134 },
  { word: "海", reading: "うみ", meaning: "sea", romaji: "umi", level: "N5", category: "nature", pos: "noun", lesson: 6, exampleJp: "夏に海へ行きます。", exampleEn: "I go to the sea in summer.", order: 135 },
  { word: "道", reading: "みち", meaning: "road / way", romaji: "michi", level: "N5", category: "places", pos: "noun", lesson: 5, order: 136 },
  { word: "色", reading: "いろ", meaning: "color", romaji: "iro", level: "N5", category: "nouns", pos: "noun", lesson: 6, exampleJp: "何色が好きですか。", exampleEn: "What color do you like?", order: 137 },
  { word: "男", reading: "おとこ", meaning: "man", romaji: "otoko", level: "N5", category: "nouns", pos: "noun", lesson: 2, order: 138 },
  { word: "女", reading: "おんな", meaning: "woman", romaji: "onna", level: "N5", category: "nouns", pos: "noun", lesson: 2, order: 139 },
  { word: "子供", reading: "こども", meaning: "child", romaji: "kodomo", level: "N5", category: "family", pos: "noun", lesson: 2, exampleJp: "子供が公園で遊んでいます。", exampleEn: "Children are playing in the park.", order: 140 },
  { word: "家族", reading: "かぞく", meaning: "family", romaji: "kazoku", level: "N5", category: "family", pos: "noun", lesson: 2, exampleJp: "家族は四人です。", exampleEn: "My family has four people.", order: 141 },

  // Food
  { word: "肉", reading: "にく", meaning: "meat", romaji: "niku", level: "N5", category: "food", pos: "noun", lesson: 4, exampleJp: "肉を食べます。", exampleEn: "I eat meat.", order: 142 },
  { word: "野菜", reading: "やさい", meaning: "vegetables", romaji: "yasai", level: "N5", category: "food", pos: "noun", lesson: 4, exampleJp: "野菜をたくさん食べます。", exampleEn: "I eat a lot of vegetables.", order: 143 },
  { word: "魚", reading: "さかな", meaning: "fish", romaji: "sakana", level: "N5", category: "food", pos: "noun", lesson: 4, order: 144 },
  { word: "果物", reading: "くだもの", meaning: "fruit", romaji: "kudamono", level: "N5", category: "food", pos: "noun", lesson: 4, order: 145 },
  { word: "パン", reading: "パン", meaning: "bread", romaji: "pan", level: "N5", category: "food", pos: "noun", lesson: 4, exampleJp: "朝、パンを食べます。", exampleEn: "I eat bread in the morning.", order: 146 },
  { word: "牛乳", reading: "ぎゅうにゅう", meaning: "milk", romaji: "gyuunyuu", level: "N5", category: "food", pos: "noun", lesson: 4, order: 147 },
  { word: "卵", reading: "たまご", meaning: "egg", romaji: "tamago", level: "N5", category: "food", pos: "noun", lesson: 4, order: 148 },

  // Verbs
  { word: "ある", reading: "ある", meaning: "to exist (inanimate)", romaji: "aru", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 7, exampleJp: "机の上に本があります。", exampleEn: "There is a book on the desk.", order: 149 },
  { word: "いる", reading: "いる", meaning: "to exist (animate) / to stay", romaji: "iru", level: "N5", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 7, exampleJp: "猫がいます。", exampleEn: "There is a cat.", order: 150 },
  { word: "出る", reading: "でる", meaning: "to exit / to leave", romaji: "deru", level: "N5", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 7, exampleJp: "家を出ます。", exampleEn: "I leave the house.", order: 151 },
  { word: "入る", reading: "はいる", meaning: "to enter", romaji: "hairu", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 7, exampleJp: "部屋に入ります。", exampleEn: "I enter the room.", order: 152 },
  { word: "帰る", reading: "かえる", meaning: "to return (home)", romaji: "kaeru", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 7, exampleJp: "家に帰ります。", exampleEn: "I return home.", order: 153 },
  { word: "立つ", reading: "たつ", meaning: "to stand", romaji: "tatsu", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 7, order: 154 },
  { word: "座る", reading: "すわる", meaning: "to sit", romaji: "suwaru", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 7, order: 155 },
  { word: "会う", reading: "あう", meaning: "to meet", romaji: "au", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 2, exampleJp: "友達に会います。", exampleEn: "I meet a friend.", order: 156 },
  { word: "思う", reading: "おもう", meaning: "to think", romaji: "omou", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 7, exampleJp: "いいと思う。", exampleEn: "I think it's good.", order: 157 },
  { word: "着く", reading: "つく", meaning: "to arrive", romaji: "tsuku", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 7, exampleJp: "駅に着きました。", exampleEn: "I arrived at the station.", order: 158 },
  { word: "歩く", reading: "あるく", meaning: "to walk", romaji: "aruku", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 7, exampleJp: "駅まで歩きます。", exampleEn: "I walk to the station.", order: 159 },
  { word: "走る", reading: "はしる", meaning: "to run", romaji: "hashiru", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 7, order: 160 },
  { word: "習う", reading: "ならう", meaning: "to learn (from someone)", romaji: "narau", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 7, exampleJp: "先生に日本語を習います。", exampleEn: "I learn Japanese from a teacher.", order: 161 },
  { word: "着る", reading: "きる", meaning: "to wear (upper body)", romaji: "kiru", level: "N5", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 7, exampleJp: "シャツを着ます。", exampleEn: "I wear a shirt.", order: 162 },

  // i-adjectives
  { word: "暖かい", reading: "あたたかい", meaning: "warm", romaji: "atatakai", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, exampleJp: "今日は暖かいです。", exampleEn: "Today is warm.", order: 163 },
  { word: "涼しい", reading: "すずしい", meaning: "cool (weather)", romaji: "suzushii", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, order: 164 },
  { word: "重い", reading: "おもい", meaning: "heavy", romaji: "omoi", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, order: 165 },
  { word: "軽い", reading: "かるい", meaning: "light (weight)", romaji: "karui", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, order: 166 },
  { word: "速い", reading: "はやい", meaning: "fast", romaji: "hayai", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, exampleJp: "新幹線は速いです。", exampleEn: "The Shinkansen is fast.", order: 167 },
  { word: "遅い", reading: "おそい", meaning: "late / slow", romaji: "osoi", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, exampleJp: "電車が遅いです。", exampleEn: "The train is late.", order: 168 },
  { word: "長い", reading: "ながい", meaning: "long", romaji: "nagai", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, order: 169 },
  { word: "短い", reading: "みじかい", meaning: "short", romaji: "mijikai", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, order: 170 },
  { word: "赤い", reading: "あかい", meaning: "red", romaji: "akai", level: "N5", category: "colors", pos: "i-adjective", lesson: 6, order: 171 },
  { word: "青い", reading: "あおい", meaning: "blue", romaji: "aoi", level: "N5", category: "colors", pos: "i-adjective", lesson: 6, order: 172 },
  { word: "白い", reading: "しろい", meaning: "white", romaji: "shiroi", level: "N5", category: "colors", pos: "i-adjective", lesson: 6, order: 173 },
  { word: "黒い", reading: "くろい", meaning: "black", romaji: "kuroi", level: "N5", category: "colors", pos: "i-adjective", lesson: 6, order: 174 },
  { word: "若い", reading: "わかい", meaning: "young", romaji: "wakai", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 2, order: 175 },

  // na-adjectives
  { word: "暇", reading: "ひま", meaning: "free (not busy)", romaji: "hima", level: "N5", category: "adjectives", pos: "na-adjective", lesson: 5, exampleJp: "今日は暇です。", exampleEn: "I'm free today.", order: 176 },
  { word: "親切", reading: "しんせつ", meaning: "kind", romaji: "shinsetsu", level: "N5", category: "adjectives", pos: "na-adjective", lesson: 2, order: 177 },
  { word: "簡単", reading: "かんたん", meaning: "simple / easy", romaji: "kantan", level: "N5", category: "adjectives", pos: "na-adjective", lesson: 7, exampleJp: "この問題は簡単です。", exampleEn: "This problem is easy.", order: 178 },
  { word: "残念", reading: "ざんねん", meaning: "unfortunate / too bad", romaji: "zannen", level: "N5", category: "adjectives", pos: "na-adjective", lesson: 7, exampleJp: "残念ですね。", exampleEn: "That's too bad, isn't it.", order: 179 },

  // Adverbs
  { word: "すぐ", reading: "すぐ", meaning: "immediately", romaji: "sugu", level: "N5", category: "adverbs", pos: "adverb", lesson: 7, exampleJp: "すぐ行きます。", exampleEn: "I'll go immediately.", order: 180 },
  { word: "もっと", reading: "もっと", meaning: "more", romaji: "motto", level: "N5", category: "adverbs", pos: "adverb", lesson: 7, exampleJp: "もっと勉強したい。", exampleEn: "I want to study more.", order: 181 },
  { word: "ずっと", reading: "ずっと", meaning: "all along / by far", romaji: "zutto", level: "N5", category: "adverbs", pos: "adverb", lesson: 7, exampleJp: "ずっとここにいます。", exampleEn: "I'll be here all along.", order: 182 },
  { word: "全部", reading: "ぜんぶ", meaning: "all", romaji: "zenbu", level: "N5", category: "adverbs", pos: "adverb", lesson: 7, exampleJp: "全部食べました。", exampleEn: "I ate everything.", order: 183 },
  { word: "なかなか", reading: "なかなか", meaning: "quite / not readily", romaji: "nakanaka", level: "N5", category: "adverbs", pos: "adverb", lesson: 7, exampleJp: "なかなか上手になりません。", exampleEn: "I don't get good easily.", order: 184 },

  // Greetings/expressions
  { word: "はい", reading: "はい", meaning: "yes", romaji: "hai", level: "N5", category: "greetings", pos: "expression", lesson: 1, order: 185 },
  { word: "いいえ", reading: "いいえ", meaning: "no / not at all", romaji: "iie", level: "N5", category: "greetings", pos: "expression", lesson: 1, order: 186 },
  { word: "お願いします", reading: "おねがいします", meaning: "please (do me a favor)", romaji: "onegaishimasu", level: "N5", category: "greetings", pos: "expression", lesson: 1, exampleJp: "コーヒーをお願いします。", exampleEn: "A coffee, please.", order: 187 },
  { word: "どういたしまして", reading: "どういたしまして", meaning: "you're welcome", romaji: "douitashimashite", level: "N5", category: "greetings", pos: "expression", lesson: 1, order: 188 },
  { word: "ごめんなさい", reading: "ごめんなさい", meaning: "I'm sorry (casual)", romaji: "gomennasai", level: "N5", category: "greetings", pos: "expression", lesson: 1, order: 189 },
  { word: "ただいま", reading: "ただいま", meaning: "I'm home", romaji: "tadaima", level: "N5", category: "greetings", pos: "expression", lesson: 1, order: 190 },
  { word: "お帰りなさい", reading: "おかえりなさい", meaning: "welcome back", romaji: "okaerinasai", level: "N5", category: "greetings", pos: "expression", lesson: 1, order: 191 },
  { word: "いってきます", reading: "いってきます", meaning: "I'm leaving (and coming back)", romaji: "ittekimasu", level: "N5", category: "greetings", pos: "expression", lesson: 1, order: 192 },
  { word: "おめでとう", reading: "おめでとう", meaning: "congratulations", romaji: "omedetou", level: "N5", category: "greetings", pos: "expression", lesson: 1, order: 193 },
  { word: "ごちそうさまでした", reading: "ごちそうさまでした", meaning: "thank you for the meal", romaji: "gochisousamadeshita", level: "N5", category: "greetings", pos: "expression", lesson: 4, order: 194 },
];

// ---------------- Grammar additions ----------------
type Grammar = {
  title: string; level: "N5" | "N4" | "N3"; structure: string; meaning: string;
  explanation: string; exampleJp: string; exampleEn: string;
  exampleJp2?: string; exampleEn2?: string; note?: string; commonMistake?: string;
  lesson?: number; order?: number;
};

export const EXTRA_GRAMMAR: Grammar[] = [
  { title: "〜か — question particle", level: "N5", structure: "Sentence + か", meaning: "turns a statement into a question", explanation: "Adding か to the end of a sentence makes it a question. In polite speech it often replaces the question mark. With polite form (〜ます/〜です), か is optional but common in formal contexts.", exampleJp: "これは本ですか。", exampleEn: "Is this a book?", exampleJp2: "田中さんは学生ですか。", exampleEn2: "Is Tanaka-san a student?", commonMistake: "In casual speech, か can sound rough/masculine; use rising intonation instead (これ本？).", lesson: 1, order: 21 },
  { title: "〜ね / 〜よ — sentence-ending particles", level: "N5", structure: "Sentence + ね / よ", meaning: "ね = seek agreement; よ = assert info new to listener", explanation: "ね confirms shared understanding ('nice day, isn't it?'). よ asserts info the listener probably doesn't know ('it's a nice day, you know.'). Combine: よね = '..., right?'", exampleJp: "いい天気ですね。", exampleEn: "Nice weather, isn't it?", exampleJp2: "これ、美味しいですよ。", exampleEn2: "This is delicious, you know.", lesson: 1, order: 22 },
  { title: "〜へ — direction particle", level: "N5", structure: "Place + へ + Verb of motion", meaning: "indicates destination (interchangeable with に for movement)", explanation: "へ (pronounced 'e') marks the destination of a movement verb like 行く, 来る, 帰る. With movement verbs, へ and に are interchangeable; へ emphasizes direction.", exampleJp: "日本へ行きます。", exampleEn: "I'm going to Japan.", exampleJp2: "家へ帰ります。", exampleEn2: "I'm going home.", note: "Written with the hiragana 'he' へ but pronounced 'e'.", lesson: 5, order: 23 },
  { title: "〜や〜など — incomplete list", level: "N5", structure: "Noun + や + Noun (+ など)", meaning: "things such as A and B (open-ended)", explanation: "Like と, but lists are NOT exhaustive — 'A and B (among others)'. Often followed by など to emphasize 'etc.'", exampleJp: "机の上に本やペンがあります。", exampleEn: "There are books and pens (among other things) on the desk.", exampleJp2: "肉や魚を食べます。", exampleEn2: "I eat things like meat and fish.", commonMistake: "と implies an exhaustive list (ONLY A and B); や implies a non-exhaustive list.", lesson: 5, order: 24 },
  { title: "〜てください — polite request", level: "N5", structure: "Verb (te-form) + ください", meaning: "please do ~", explanation: "Polite request or instruction. Not a strong command — soft enough for strangers.", exampleJp: "ここに名前を書いてください。", exampleEn: "Please write your name here.", exampleJp2: "もう一度言ってください。", exampleEn2: "Please say it once more.", lesson: 7, order: 25 },
  { title: "〜ませんか — invitation", level: "N5", structure: "Verb (masu-stem) + ません か", meaning: "won't you ~? (invitation)", explanation: "Invites someone to do something with you. Polite and friendly.", exampleJp: "一緒に昼ご飯を食べませんか。", exampleEn: "Won't you have lunch together?", exampleJp2: "映画を見に行きませんか。", exampleEn2: "Won't you go see a movie?", lesson: 2, order: 26 },
  { title: "〜が欲しい — want (object)", level: "N5", structure: "Noun + が + 欲しい", meaning: "I want (a thing)", explanation: "Expresses desire for a thing. Like 〜たい but for nouns. Conjugates as i-adjective: 欲しくない (don't want).", exampleJp: "新しい車が欲しいです。", exampleEn: "I want a new car.", exampleJp2: "何が欲しいですか。", exampleEn2: "What do you want?", commonMistake: "Avoid for 3rd person — use 欲しがっている instead.", lesson: 7, order: 27 },
  { title: "〜と思う — I think that", level: "N5", structure: "Plain form + と 思う", meaning: "I think that ~", explanation: "Expresses opinion. Plain form precedes と. Use と思います (polite). For past: と思った (I thought).", exampleJp: "明日は晴れると思います。", exampleEn: "I think it will be sunny tomorrow.", exampleJp2: "この本は面白いと思う。", exampleEn2: "I think this book is interesting.", commonMistake: "Don't say ✗「思います明日晴れると」 — the と must come right before 思う.", lesson: 7, order: 28 },
  { title: "〜ので — because (formal)", level: "N4", structure: "Plain form + ので", meaning: "because ~ (more formal/polite than から)", explanation: "Like から but softer and more polite. Often used in business or to soften refusals.", exampleJp: "寒いので、窓を閉めます。", exampleEn: "Because it's cold, I'll close the window.", exampleJp2: "病気なので、休みます。", exampleEn2: "I'm sick, so I'll take the day off.", commonMistake: "Don't use ので to make blunt demands — its softness is its purpose.", lesson: 8, order: 19 },
  { title: "〜ほうがいい — had better", level: "N4", structure: "Verb (ta-form) + ほうがいい / Verb (nai-stem) + ない ほうがいい", meaning: "you'd better ~ / you should ~", explanation: "Gives advice or recommendation. Past form for affirmative (食べたほうがいい = you'd better eat), negative for avoidance (食べないほうがいい = you'd better not eat).", exampleJp: "薬を飲んだほうがいいですよ。", exampleEn: "You'd better take medicine.", exampleJp2: "無理しないほうがいい。", exampleEn2: "You shouldn't push yourself.", commonMistake: "✗「食べるほうがいい」 — must be past form 食べた for the affirmative.", lesson: 8, order: 20 },
  { title: "〜時 — when / at the time of", level: "N4", structure: "Plain form + 時", meaning: "when ~ / at the time of ~", explanation: "Tense matters: V-dict + 時 = before doing V (日本へ行く時、薬を買う = before going to Japan I'll buy medicine); V-ta + 時 = after doing V (日本へ行った時、薬を買った = when I went to Japan I bought medicine).", exampleJp: "暇な時、本を読みます。", exampleEn: "When I'm free, I read books.", exampleJp2: "日本へ行った時、富士山を見ました。", exampleEn2: "When I went to Japan, I saw Mt. Fuji.", commonMistake: "Tense before 時 flips meaning — review carefully.", lesson: 8, order: 21 },
  { title: "〜前に / 〜後で — before / after", level: "N4", structure: "V(dict) + 前に / V(ta) + 後で", meaning: "before doing ~ / after doing ~", explanation: "Sequence two actions. 前 (before): use dictionary form (食べる前に手を洗う). 後 (after): use ta-form + 後で (食べてから後で/食べた後で出かける). Note: 後で is usually followed by で.", exampleJp: "食べる前に手を洗います。", exampleEn: "I wash my hands before eating.", exampleJp2: "食べた後で、歯を磨きます。", exampleEn2: "After eating, I brush my teeth.", commonMistake: "✗「食べた前に」 — 前 always takes dictionary form.", lesson: 8, order: 22 },
];

// ---------------- Kanji additions ----------------
type Kanji = {
  character: string; onyomi: string; kunyomi: string; meaning: string;
  level: "N5" | "N4" | "N3"; strokeCount: number; radical?: string;
  mnemonic?: string;
  exampleWord?: string; exampleRead?: string; exampleMean?: string; order?: number;
};

export const EXTRA_KANJI: Kanji[] = [
  { character: "口", onyomi: "コウ,ク", kunyomi: "くち", meaning: "mouth", level: "N5", strokeCount: 3, radical: "口", mnemonic: "A simple picture of an open mouth — a square shape.", exampleWord: "口", exampleRead: "くち", exampleMean: "mouth", order: 60 },
  { character: "目", onyomi: "モク", kunyomi: "め", meaning: "eye", level: "N5", strokeCount: 5, radical: "目", mnemonic: "A vertical eye with a pupil inside — the kanji for 'eye'.", exampleWord: "目", exampleRead: "め", exampleMean: "eye", order: 61 },
  { character: "手", onyomi: "シュ", kunyomi: "て", meaning: "hand", level: "N5", strokeCount: 4, radical: "手", mnemonic: "A hand with five fingers branching out (the strokes fan like fingers).", exampleWord: "手", exampleRead: "て", exampleMean: "hand", order: 62 },
  { character: "足", onyomi: "ソク", kunyomi: "あし,た", meaning: "foot / leg / enough", level: "N5", strokeCount: 7, radical: "足", mnemonic: "A leg with the knee bent and foot at the bottom — also means 'enough' (足りる).", exampleWord: "足", exampleRead: "あし", exampleMean: "foot", order: 63 },
  { character: "男", onyomi: "ダン,ナン", kunyomi: "おとこ", meaning: "man / male", level: "N5", strokeCount: 7, radical: "田", mnemonic: "Power (力) in a rice field (田) — a man working the fields.", exampleWord: "男人", exampleRead: "おとこ", exampleMean: "man", order: 64 },
  { character: "女", onyomi: "ジョ,ニョ", kunyomi: "おんな,め", meaning: "woman / female", level: "N5", strokeCount: 3, radical: "女", mnemonic: "A graceful figure with crossed arms — a woman.", exampleWord: "女人", exampleRead: "おんな", exampleMean: "woman", order: 65 },
  { character: "子", onyomi: "シ,ス", kunyomi: "こ", meaning: "child", level: "N5", strokeCount: 3, radical: "子", mnemonic: "A baby with arms outstretched — the kanji for 'child'.", exampleWord: "子供", exampleRead: "こども", exampleMean: "child", order: 66 },
  { character: "父", onyomi: "フ", kunyomi: "ちち", meaning: "father", level: "N5", strokeCount: 4, radical: "父", mnemonic: "Two hands holding an axe — the family patriarch.", exampleWord: "父", exampleRead: "ちち", exampleMean: "father (my own)", order: 67 },
  { character: "母", onyomi: "ボ", kunyomi: "はは", meaning: "mother", level: "N5", strokeCount: 5, radical: "母", mnemonic: "A woman nursing — the two dots are breasts; the kanji for 'mother'.", exampleWord: "母", exampleRead: "はは", exampleMean: "mother (my own)", order: 68 },
  { character: "兄", onyomi: "キョウ", kunyomi: "あに", meaning: "older brother", level: "N5", strokeCount: 5, radical: "儿", mnemonic: "A mouth (口) on legs (儿) — the older brother who speaks for the family.", exampleWord: "兄", exampleRead: "あに", exampleMean: "older brother (my own)", order: 69 },
  { character: "姉", onyomi: "シ", kunyomi: "あね", meaning: "older sister", level: "N5", strokeCount: 8, radical: "女", mnemonic: "A woman (女) plus a market/stand (市) — the older sister.", exampleWord: "姉", exampleRead: "あね", exampleMean: "older sister (my own)", order: 70 },
  { character: "右", onyomi: "ウ,ユウ", kunyomi: "みぎ", meaning: "right", level: "N5", strokeCount: 5, radical: "口", mnemonic: "A hand (the top) offering a mouth (口) — the right hand (used for eating).", exampleWord: "右", exampleRead: "みぎ", exampleMean: "right", order: 71 },
  { character: "左", onyomi: "サ", kunyomi: "ひだり", meaning: "left", level: "N5", strokeCount: 5, radical: "工", mnemonic: "A hand (the top) holding a carpenter's tool (工) — the left hand (used for crafting).", exampleWord: "左", exampleRead: "ひだり", exampleMean: "left", order: 72 },
  { character: "外", onyomi: "ガイ,ゲ", kunyomi: "そと,ほか", meaning: "outside", level: "N5", strokeCount: 5, radical: "夕", mnemonic: "Evening (夕) divination — going outside at dusk.", exampleWord: "外", exampleRead: "そと", exampleMean: "outside", order: 73 },
  { character: "出", onyomi: "シュツ", kunyomi: "で,だ", meaning: "exit / go out", level: "N5", strokeCount: 5, radical: "凵", mnemonic: "A mountain (山) coming out of a box (凵) — emergence, going out.", exampleWord: "出る", exampleRead: "でる", exampleMean: "to exit", order: 74 },
  { character: "入", onyomi: "ニュウ", kunyomi: "い,は", meaning: "enter", level: "N5", strokeCount: 2, radical: "入", mnemonic: "An arrow pointing into a structure — entering.", exampleWord: "入る", exampleRead: "はいる", exampleMean: "to enter", order: 75 },
  { character: "立", onyomi: "リツ", kunyomi: "た", meaning: "stand", level: "N5", strokeCount: 5, radical: "立", mnemonic: "A person standing with arms slightly raised.", exampleWord: "立つ", exampleRead: "たつ", exampleMean: "to stand", order: 76 },
  { character: "休", onyomi: "キュウ", kunyomi: "やす", meaning: "rest", level: "N5", strokeCount: 6, radical: "人", mnemonic: "A person (人) leaning against a tree (木) — taking a rest.", exampleWord: "休む", exampleRead: "やすむ", exampleMean: "to rest", order: 77 },
  { character: "名", onyomi: "メイ,ミョウ", kunyomi: "な", meaning: "name", level: "N5", strokeCount: 6, radical: "口", mnemonic: "Evening (夕) + mouth (口) — names were given at evening gatherings.", exampleWord: "名前", exampleRead: "なまえ", exampleMean: "name", order: 78 },
  { character: "言", onyomi: "ゲン,ゴン", kunyomi: "い", meaning: "say / word", level: "N5", strokeCount: 7, radical: "言", mnemonic: "Words coming out of a mouth — the kanji for 'to say'.", exampleWord: "言う", exampleRead: "いう", exampleMean: "to say", order: 79 },
  { character: "音", onyomi: "オン,イン", kunyomi: "おと,ね", meaning: "sound", level: "N5", strokeCount: 9, radical: "音", mnemonic: "The sun (日) standing on a mouth (口) — sound emerging.", exampleWord: "音", exampleRead: "おと", exampleMean: "sound", order: 80 },
  { character: "花", onyomi: "カ", kunyomi: "はな", meaning: "flower", level: "N5", strokeCount: 7, radical: "艹", mnemonic: "Grass/plant radical (艹) on top of change (化) — flowers change quickly.", exampleWord: "花", exampleRead: "はな", exampleMean: "flower", order: 81 },
  { character: "雨", onyomi: "ウ", kunyomi: "あめ", meaning: "rain", level: "N5", strokeCount: 8, radical: "雨", mnemonic: "Raindrops falling through a sky — the kanji for 'rain'.", exampleWord: "雨", exampleRead: "あめ", exampleMean: "rain", order: 82 },
  { character: "前", onyomi: "ゼン", kunyomi: "まえ", meaning: "before / front", level: "N5", strokeCount: 9, radical: "刀", mnemonic: "Boat (舟) + knife (刀) — cutting to the front of the line.", exampleWord: "前", exampleRead: "まえ", exampleMean: "front / before", order: 83 },
];

// ---------------- Counters ----------------
type Counter = {
  kanji: string; reading: string; meaning: string; level: "N5" | "N4" | "N3";
  one: string; two: string; three: string; four: string; five: string;
  six: string; seven: string; eight: string; nine: string; ten: string;
  exampleJp?: string; exampleEn?: string; note?: string; order: number;
};

export const COUNTERS: Counter[] = [
  { kanji: "つ", reading: "つ", meaning: "general counter (for small numbers, 1–9)", level: "N5", one: "ひとつ", two: "ふたつ", three: "みっつ", four: "よっつ", five: "いつつ", six: "むっつ", seven: "ななつ", eight: "やっつ", nine: "ここのつ", ten: "とお", exampleJp: "りんごをふたつください。", exampleEn: "Two apples, please.", note: "Only used for 1-9. The traditional Japanese counting system — useful when you don't know the right counter.", order: 1 },
  { kanji: "個", reading: "こ", meaning: "small, round objects (apples, eggs, stones)", level: "N5", one: "いっこ", two: "にこ", three: "さんこ", four: "よんこ", five: "ごこ", six: "ろっこ", seven: "ななこ", eight: "はっこ", nine: "きゅうこ", ten: "じゅっこ", exampleJp: "りんごを三個買いました。", exampleEn: "I bought three apples.", note: "All-voiced sound, no sound changes after 1/6/8/10 (those get small っ).", order: 2 },
  { kanji: "人", reading: "にん", meaning: "people", level: "N5", one: "ひとり", two: "ふたり", three: "さんにん", four: "よにん", five: "ごにん", six: "ろくにん", seven: "しちにん", eight: "はちにん", nine: "きゅうにん", ten: "じゅうにん", exampleJp: "家族は四人です。", exampleEn: "My family is four people.", note: "1 and 2 are special (ひとり、ふたり); from 3 onward use number+にん. Note: 4 is よにん (not しにん — that means 'dead person'!).", order: 3 },
  { kanji: "枚", reading: "まい", meaning: "flat, thin objects (paper, plates, shirts, CDs)", level: "N5", one: "いちまい", two: "にまい", three: "さんまい", four: "よんまい", five: "ごまい", six: "ろくまい", seven: "ななまい", eight: "はちまい", nine: "きゅうまい", ten: "じゅうまい", exampleJp: "紙を二枚ください。", exampleEn: "Two sheets of paper, please.", note: "No sound changes — one of the easiest counters.", order: 4 },
  { kanji: "本", reading: "ほん", meaning: "long, thin objects (pens, bottles, trees, legs)", level: "N5", one: "いっぽん", two: "にほん", three: "さんぼん", four: "よんほん", five: "ごほん", six: "ろっぽん", seven: "ななほん", eight: "はっぽん", nine: "きゅうほん", ten: "じゅっぽん", exampleJp: "ビールを三本飲みました。", exampleEn: "I drank three bottles of beer.", note: "Notorious sound changes: 1, 6, 8, 10 → っぽん; 3 → ぼん; 2, 4, 5, 7, 9 → ほん.", order: 5 },
  { kanji: "冊", reading: "さつ", meaning: "books, magazines, bound volumes", level: "N5", one: "いっさつ", two: "にさつ", three: "さんさつ", four: "よんさつ", five: "ごさつ", six: "ろくさつ", seven: "ななさつ", eight: "はっさつ", nine: "きゅうさつ", ten: "じゅっさつ", exampleJp: "本を二冊借りました。", exampleEn: "I borrowed two books.", note: "Sound changes: 1, 8, 10 → っさつ.", order: 6 },
  { kanji: "匹", reading: "ひき", meaning: "small animals (cats, dogs, fish, insects)", level: "N5", one: "いっぴき", two: "にひき", three: "さんびき", four: "よんひき", five: "ごひき", six: "ろっぴき", seven: "ななひき", eight: "はっぴき", nine: "きゅうひき", ten: "じゅっぴき", exampleJp: "猫を二匹飼っています。", exampleEn: "I keep two cats.", note: "Same pattern as 本: 1/6/8/10 → ぴき; 3 → びき.", order: 7 },
  { kanji: "台", reading: "だい", meaning: "machines, vehicles (cars, TVs, computers)", level: "N5", one: "いちだい", two: "にだい", three: "さんだい", four: "よんだい", five: "ごだい", six: "ろくだい", seven: "ななだい", eight: "はちだい", nine: "きゅうだい", ten: "じゅうだい", exampleJp: "車を一台買いました。", exampleEn: "I bought one car.", note: "No sound changes — straightforward.", order: 8 },
  { kanji: "杯", reading: "はい", meaning: "cups, glasses, bowlfuls", level: "N5", one: "いっぱい", two: "にはい", three: "さんばい", four: "よんはい", five: "ごはい", six: "ろっぱい", seven: "ななはい", eight: "はっぱい", nine: "きゅうはい", ten: "じゅっぱい", exampleJp: "コーヒーを二杯飲みました。", exampleEn: "I drank two cups of coffee.", note: "Same pattern as 本: 1/6/8/10 → ぱい; 3 → ばい. Note: いっぱい also means 'full'.", order: 9 },
  { kanji: "階", reading: "かい", meaning: "floors (of a building)", level: "N5", one: "いっかい", two: "にかい", three: "さんがい", four: "よんかい", five: "ごかい", six: "ろっかい", seven: "ななかい", eight: "はっかい", nine: "きゅうかい", ten: "じゅっかい", exampleJp: "三階に住んでいます。", exampleEn: "I live on the third floor.", note: "3 → がい (special). 1, 6, 8, 10 → かい with small っ.", order: 10 },
  { kanji: "歳", reading: "さい", meaning: "age (years old)", level: "N5", one: "いっさい", two: "にさい", three: "さんさい", four: "よんさい", five: "ごさい", six: "ろくさい", seven: "ななさい", eight: "はっさい", nine: "きゅうさい", ten: "じゅっさい", exampleJp: "娘は八歳です。", exampleEn: "My daughter is eight years old.", note: "1, 8, 10 → っさい. 20 years old is special: はたち (not にじゅっさい).", order: 11 },
  { kanji: "番", reading: "ばん", meaning: "ordinal number (1st, 2nd, etc.)", level: "N5", one: "いちばん", two: "にばん", three: "さんばん", four: "よんばん", five: "ごばん", six: "ろくばん", seven: "ななばん", eight: "はちばん", nine: "きゅうばん", ten: "じゅうばん", exampleJp: "一番早い電車に乗る。", exampleEn: "I take the first (earliest) train.", note: "一番 also means 'number one / best'. No sound changes.", order: 12 },
  { kanji: "円", reading: "えん", meaning: "yen (currency)", level: "N5", one: "いちえん", two: "にえん", three: "さんえん", four: "よえん", five: "ごえん", six: "ろくえん", seven: "ななえん", eight: "はちえん", nine: "きゅうえん", ten: "じゅうえん", exampleJp: "これ、百円です。", exampleEn: "This is 100 yen.", note: "4 → よえん (not しえん). No real sound changes.", order: 13 },
  { kanji: "時", reading: "じ", meaning: "o'clock (time)", level: "N5", one: "いちじ", two: "にじ", three: "さんじ", four: "よじ", five: "ごじ", six: "ろくじ", seven: "しちじ", eight: "はちじ", nine: "くじ", ten: "じゅうじ", exampleJp: "今、三時です。", exampleEn: "It's 3 o'clock now.", note: "4 → よじ, 7 → しちじ, 9 → くじ (special readings).", order: 14 },
  { kanji: "分", reading: "ふん", meaning: "minutes", level: "N5", one: "いっぷん", two: "にふん", three: "さんぷん", four: "よんぷん", five: "ごふん", six: "ろっぷん", seven: "ななふん", eight: "はっぷん", nine: "きゅうふん", ten: "じゅっぷん", exampleJp: "五分待ってください。", exampleEn: "Please wait five minutes.", note: "Sound changes: 1, 6, 8, 10 → ぷん; 3, 4 → ぷん; others ふん.", order: 15 },
  { kanji: "日", reading: "にち", meaning: "days of the month / days count", level: "N5", one: "ついたち", two: "ふつか", three: "みっか", four: "よっか", five: "いつか", six: "むいか", seven: "なのか", eight: "ようか", nine: "ここのか", ten: "とおか", exampleJp: "三日に旅行します。", exampleEn: "I'll travel on the 3rd.", note: "Days of the month have unique Japanese names for 1-10, 14, 20, 24. Worth memorizing.", order: 16 },
  { kanji: "月", reading: "かげつ", meaning: "months (duration)", level: "N4", one: "いっかげつ", two: "にかげつ", three: "さんかげつ", four: "よんかげつ", five: "ごかげつ", six: "ろっかげつ", seven: "ななかげつ", eight: "はっかげつ", nine: "きゅうかげつ", ten: "じゅっかげつ", exampleJp: "日本に三か月住んでいます。", exampleEn: "I've lived in Japan for three months.", note: "Don't confuse with 月 (つき) = months counting with 〜ヶ月.", order: 17 },
  { kanji: "週間", reading: "しゅうかん", meaning: "weeks (duration)", level: "N4", one: "いっしゅうかん", two: "にしゅうかん", three: "さんしゅうかん", four: "よんしゅうかん", five: "ごしゅうかん", six: "ろくしゅうかん", seven: "ななしゅうかん", eight: "はっしゅうかん", nine: "きゅうしゅうかん", ten: "じゅっしゅうかん", exampleJp: "二週間休みます。", exampleEn: "I'll take two weeks off.", note: "1, 8, 10 → っしゅうかん.", order: 18 },
  { kanji: "年", reading: "ねん", meaning: "years (duration)", level: "N4", one: "いちねん", two: "にねん", three: "さんねん", four: "よねん", five: "ごねん", six: "ろくねん", seven: "ななねん", eight: "はちねん", nine: "きゅうねん", ten: "じゅうねん", exampleJp: "三年日本語を勉強しています。", exampleEn: "I've studied Japanese for three years.", note: "4 → よねん (not しねん).", order: 19 },
  { kanji: "回", reading: "かい", meaning: "frequency (times / occurrences)", level: "N4", one: "いっかい", two: "にかい", three: "さんかい", four: "よんかい", five: "ごかい", six: "ろっかい", seven: "ななかい", eight: "はちかい", nine: "きゅうかい", ten: "じゅっかい", exampleJp: "一週間に三回泳ぎます。", exampleEn: "I swim three times a week.", note: "1, 6, 8, 10 → かい with small っ.", order: 20 },
];

// ---------------- Conjugation tables ----------------
type Conjugation = {
  verb: string; reading: string; group: "godan" | "ichidan" | "irregular" | "i-adj" | "na-adj";
  level: "N5" | "N4" | "N3"; meaning: string;
  dict: string; masu: string; nai: string; ta: string; te: string;
  potential?: string; passive?: string; causative?: string; volitional?: string;
  conditional?: string; imperative?: string;
  order: number;
};

export const CONJUGATIONS: Conjugation[] = [
  // Irregular verbs
  { verb: "する", reading: "する", group: "irregular", level: "N5", meaning: "to do", dict: "する", masu: "します", nai: "しない", ta: "した", te: "して", potential: "できる", passive: "される", causative: "させる", volitional: "しよう", conditional: "すれば", imperative: "しろ", order: 1 },
  { verb: "来る", reading: "くる", group: "irregular", level: "N5", meaning: "to come", dict: "来る", masu: "来ます", nai: "来ない", ta: "来た", te: "来て", potential: "来られる", passive: "来られる", causative: "来させる", volitional: "来よう", conditional: "来れば", imperative: "来い", order: 2 },

  // Ichidan (ru-verbs) — drop る
  { verb: "食べる", reading: "たべる", group: "ichidan", level: "N5", meaning: "to eat", dict: "食べる", masu: "食べます", nai: "食べない", ta: "食べた", te: "食べて", potential: "食べられる", passive: "食べられる", causative: "食べさせる", volitional: "食べよう", conditional: "食べれば", imperative: "食べろ", order: 3 },
  { verb: "見る", reading: "みる", group: "ichidan", level: "N5", meaning: "to see", dict: "見る", masu: "見ます", nai: "見ない", ta: "見た", te: "見て", potential: "見られる", passive: "見られる", causative: "見させる", volitional: "見よう", conditional: "見れば", imperative: "見ろ", order: 4 },
  { verb: "起きる", reading: "おきる", group: "ichidan", level: "N5", meaning: "to wake up", dict: "起きる", masu: "起きます", nai: "起きない", ta: "起きた", te: "起きて", potential: "起きられる", passive: "起きられる", causative: "起きさせる", volitional: "起きよう", conditional: "起きれば", imperative: "起きろ", order: 5 },
  { verb: "寝る", reading: "ねる", group: "ichidan", level: "N5", meaning: "to sleep", dict: "寝る", masu: "寝ます", nai: "寝ない", ta: "寝た", te: "寝て", potential: "寝られる", passive: "寝られる", causative: "寝させる", volitional: "寝よう", conditional: "寝れば", imperative: "寝ろ", order: 6 },
  { verb: "出る", reading: "でる", group: "ichidan", level: "N5", meaning: "to exit", dict: "出る", masu: "出ます", nai: "出ない", ta: "出た", te: "出て", potential: "出られる", passive: "出られる", causative: "出させる", volitional: "出よう", conditional: "出れば", imperative: "出ろ", order: 7 },
  { verb: "着る", reading: "きる", group: "ichidan", level: "N5", meaning: "to wear", dict: "着る", masu: "着ます", nai: "着ない", ta: "着た", te: "着て", potential: "着られる", passive: "着られる", causative: "着させる", volitional: "着よう", conditional: "着れば", imperative: "着ろ", order: 8 },
  { verb: "教える", reading: "おしえる", group: "ichidan", level: "N4", meaning: "to teach", dict: "教える", masu: "教えます", nai: "教えない", ta: "教えた", te: "教えて", potential: "教えられる", passive: "教えられる", causative: "教えさせる", volitional: "教えよう", conditional: "教えれば", imperative: "教えろ", order: 9 },
  { verb: "借りる", reading: "かりる", group: "ichidan", level: "N4", meaning: "to borrow", dict: "借りる", masu: "借ります", nai: "借りない", ta: "借りた", te: "借りて", potential: "借りられる", passive: "借りられる", causative: "借りさせる", volitional: "借りよう", conditional: "借りれば", imperative: "借りろ", order: 10 },

  // Godan (u-verbs) — change final u-vowel
  { verb: "行く", reading: "いく", group: "godan", level: "N5", meaning: "to go", dict: "行く", masu: "行きます", nai: "行かない", ta: "行った", te: "行って", potential: "行ける", passive: "行かれる", causative: "行かせる", volitional: "行こう", conditional: "行けば", imperative: "行け", order: 11 },
  { verb: "飲む", reading: "のむ", group: "godan", level: "N5", meaning: "to drink", dict: "飲む", masu: "飲みます", nai: "飲まない", ta: "飲んだ", te: "飲んで", potential: "飲める", passive: "飲まれる", causative: "飲ませる", volitional: "飲もう", conditional: "飲めば", imperative: "飲め", order: 12 },
  { verb: "読む", reading: "よむ", group: "godan", level: "N5", meaning: "to read", dict: "読む", masu: "読みます", nai: "読まない", ta: "読んだ", te: "読んで", potential: "読める", passive: "読まれる", causative: "読ませる", volitional: "読もう", conditional: "読めば", imperative: "読め", order: 13 },
  { verb: "書く", reading: "かく", group: "godan", level: "N5", meaning: "to write", dict: "書く", masu: "書きます", nai: "書かない", ta: "書いた", te: "書いて", potential: "書ける", passive: "書かれる", causative: "書かせる", volitional: "書こう", conditional: "書けば", imperative: "書け", order: 14 },
  { verb: "話す", reading: "はなす", group: "godan", level: "N5", meaning: "to speak", dict: "話す", masu: "話します", nai: "話さない", ta: "話した", te: "話して", potential: "話せる", passive: "話される", causative: "話させる", volitional: "話そう", conditional: "話せば", imperative: "話せ", order: 15 },
  { verb: "買う", reading: "かう", group: "godan", level: "N5", meaning: "to buy", dict: "買う", masu: "買います", nai: "買わない", ta: "買った", te: "買って", potential: "買える", passive: "買われる", causative: "買わせる", volitional: "買おう", conditional: "買えば", imperative: "買え", order: 16 },
  { verb: "会う", reading: "あう", group: "godan", level: "N5", meaning: "to meet", dict: "会う", masu: "会います", nai: "会わない", ta: "会った", te: "会って", potential: "会える", passive: "会われる", causative: "会わせる", volitional: "会おう", conditional: "会えば", imperative: "会え", order: 17 },
  { verb: "待つ", reading: "まつ", group: "godan", level: "N4", meaning: "to wait", dict: "待つ", masu: "待ちます", nai: "待たない", ta: "待った", te: "待って", potential: "待てる", passive: "待たれる", causative: "待たせる", volitional: "待とう", conditional: "待てば", imperative: "待て", order: 18 },
  { verb: "持つ", reading: "もつ", group: "godan", level: "N4", meaning: "to hold", dict: "持つ", masu: "持ちます", nai: "持たない", ta: "持った", te: "持って", potential: "持てる", passive: "持たれる", causative: "持たせる", volitional: "持とう", conditional: "持てば", imperative: "持て", order: 19 },
  { verb: "働く", reading: "はたらく", group: "godan", level: "N4", meaning: "to work", dict: "働く", masu: "働きます", nai: "働かない", ta: "働いた", te: "働いて", potential: "働ける", passive: "働かれる", causative: "働かせる", volitional: "働こう", conditional: "働けば", imperative: "働け", order: 20 },
  { verb: "帰る", reading: "かえる", group: "godan", level: "N5", meaning: "to return", dict: "帰る", masu: "帰ります", nai: "帰らない", ta: "帰った", te: "帰って", potential: "帰れる", passive: "帰られる", causative: "帰らせる", volitional: "帰ろう", conditional: "帰れば", imperative: "帰れ", order: 21 },
  { verb: "歩く", reading: "あるく", group: "godan", level: "N5", meaning: "to walk", dict: "歩く", masu: "歩きます", nai: "歩かない", ta: "歩いた", te: "歩いて", potential: "歩ける", passive: "歩かれる", causative: "歩かせる", volitional: "歩こう", conditional: "歩けば", imperative: "歩け", order: 22 },

  // i-adjectives
  { verb: "高い", reading: "たかい", group: "i-adj", level: "N5", meaning: "tall / expensive (i-adj paradigm)", dict: "高い", masu: "高いです", nai: "高くない", ta: "高かった", te: "高くて", order: 23 },
  { verb: "美味しい", reading: "おいしい", group: "i-adj", level: "N5", meaning: "delicious (i-adj paradigm)", dict: "美味しい", masu: "美味しいです", nai: "美味しくない", ta: "美味しかった", te: "美味しくて", order: 24 },
  { verb: "新しい", reading: "あたらしい", group: "i-adj", level: "N5", meaning: "new (i-adj paradigm)", dict: "新しい", masu: "新しいです", nai: "新しくない", ta: "新しかった", te: "新しくて", order: 25 },

  // na-adjectives
  { verb: "静か", reading: "しずか", group: "na-adj", level: "N5", meaning: "quiet (na-adj paradigm)", dict: "静かだ", masu: "静かです", nai: "静かじゃない", ta: "静かだった", te: "静かで", order: 26 },
  { verb: "元気", reading: "げんき", group: "na-adj", level: "N5", meaning: "healthy (na-adj paradigm)", dict: "元気だ", masu: "元気です", nai: "元気じゃない", ta: "元気だった", te: "元気で", order: 27 },
];

// ---------------- Resources additions ----------------
type Resource = {
  title: string; url: string; type: "video" | "playlist" | "channel";
  level: "N5" | "N4" | "N3" | "all"; topic: string; description: string; order: number;
};

export const EXTRA_RESOURCES: Resource[] = [
  { title: "Tae Kim's Guide to Japanese Grammar", url: "https://guidetojapanese.org/learn/grammar", type: "channel", level: "all", topic: "grammar", description: "The legendary free grammar guide — rational, intuitive, example-driven. Covers casual speech from day one.", order: 48 },
  { title: "Tofugu — Learn Japanese: A Ridiculously Detailed Guide", url: "https://www.tofugu.com/learn-japanese", type: "channel", level: "all", topic: "grammar", description: "Tofugu's master guide tying together all their free hiragana/katakana/kanji/grammar articles. Beginner-friendly roadmap.", order: 49 },
  { title: "Tofugu — Japanese Learning Resources Database", url: "https://www.tofugu.com/japanese-learning-resources-database", type: "channel", level: "all", topic: "grammar", description: "Searchable database of 450+ Japanese learning resources, filterable by focus and teaching method.", order: 50 },
  { title: "Jisho.org — Online Japanese Dictionary", url: "https://jisho.org", type: "channel", level: "all", topic: "vocabulary", description: "The de facto Japanese-English dictionary. Search by kanji, kana, romaji, English, JLPT level, or stroke count. Includes pitch accent and example sentences.", order: 51 },
  { title: "Marugoto Japanese Online Course (JF)", url: "https://marugoto.jpf.go.jp/e-learning", type: "channel", level: "all", topic: "grammar", description: "The Japan Foundation's free official course. Downloadable PDFs and audio for A1–A2 (N5–N4 equivalent). Embassy-recommended.", order: 52 },
  { title: "JF Japanese e-Learning Minato", url: "https://minato-jf.jp", type: "channel", level: "all", topic: "grammar", description: "The Japan Foundation's full e-learning portal hosting Marugoto and many other free tutor-led and self-study Japanese courses.", order: 53 },
  { title: "Erin's Challenge! I Can Speak Japanese (JF)", url: "https://www.erin.jpf.go.jp/en", type: "channel", level: "N4", topic: "listening", description: "Free video-drama lessons by the Japan Foundation, designed for elementary to intermediate learners. Skits, manga, and grammar explanations.", order: 54 },
  { title: "NHK World Easy Japanese — 48 Free Lessons", url: "https://www3.nhk.or.jp/nhkworld/lesson/en", type: "channel", level: "N5", topic: "listening", description: "Japan's public broadcaster provides 48 free audio lessons with downloadable PDFs. Covers daily greetings and travel phrases with cultural notes.", order: 55 },
  { title: "NHK News Web Easy (やさしいことばニュース)", url: "https://www3.nhk.or.jp/news/easy/", type: "channel", level: "N4", topic: "reading", description: "Real NHK news rewritten in simple Japanese with full furigana, hover dictionary, and slow audio. Excellent daily reading practice for N4–N3.", order: 56 },
  { title: "renshuu.org — Free Japanese Learning", url: "https://www.renshuu.org", type: "channel", level: "all", topic: "vocabulary", description: "Adaptive free SRS for vocab, kanji, grammar through N1. Adjusts furigana to your known kanji. Includes 10,000+ user-made lessons and games.", order: 57 },
  { title: "Bunpro — Japanese Grammar SRS", url: "https://bunpro.jp", type: "channel", level: "all", topic: "grammar", description: "Typed-input SRS for grammar with example sentences and audio. Free tier covers N5–N3 grammar points in JLPT order.", order: 58 },
  { title: "Wasabi — Learn Japanese Online", url: "https://wasabi-jpn.com", type: "channel", level: "all", topic: "grammar", description: "Free grammar reference with side-by-side comparisons of similar grammar points. Also offers pronunciation guides and manga-style materials.", order: 59 },
  { title: "Maggie Sensei — Japanese Grammar", url: "https://maggiesensei.com/category/grammar", type: "channel", level: "all", topic: "grammar", description: "Hundreds of bite-sized grammar lessons covering real-life colloquial Japanese. Often more practical than textbook Japanese.", order: 60 },
  { title: "Imabi — Guided Japanese Mastery", url: "https://imabi.org", type: "channel", level: "all", topic: "grammar", description: "400+ free in-depth grammar lessons from absolute beginner to advanced. More rigorous than Tae Kim; great for learners who want depth.", order: 61 },
  { title: "JLPT Sensei — N5/N4/N3 Grammar Lists", url: "https://jlptsensei.com/jlpt-n5-grammar-list", type: "channel", level: "N5", topic: "grammar", description: "Free complete JLPT grammar lists with example sentences, usage notes, and PDF downloads. Direct mapping to your JLPT structure.", order: 62 },
  { title: "Kanshudo — Learn Japanese Fast", url: "https://www.kanshudo.com", type: "channel", level: "all", topic: "kanji", description: "Free kanji learning with the mnemonic 'cascading kanji' approach. AI sentence builder and grammar tutor. Useful for kanji lookup by radical.", order: 63 },
  { title: "JapanesePod101 — Free Lessons", url: "https://www.japanesepod101.com/welcome-to-free", type: "channel", level: "all", topic: "listening", description: "Free audio lessons (3-5 new per week) with downloadable PDFs. The 7-day free trial unlocks the full lesson library.", order: 64 },
];
