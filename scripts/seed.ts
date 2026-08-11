import { db } from "@/lib/db";
import {
  EXTRA_VOCAB,
  EXTRA_GRAMMAR,
  EXTRA_KANJI,
  COUNTERS,
  CONJUGATIONS,
  EXTRA_RESOURCES,
} from "./extra-content";

/**
 * Comprehensive seed for the Nihongo Path Japanese learning app.
 * Covers JLPT N5 -> N3: kana, vocabulary, grammar, kanji, resources.
 */

type KanaSeed = {
  char: string; romaji: string; type: "hiragana" | "katakana"; row: string; order: number; pair?: string;
};

const HIRAGANA: KanaSeed[] = [
  { char: "あ", romaji: "a", type: "hiragana", row: "vowels", order: 1, pair: "ア" },
  { char: "い", romaji: "i", type: "hiragana", row: "vowels", order: 2, pair: "イ" },
  { char: "う", romaji: "u", type: "hiragana", row: "vowels", order: 3, pair: "ウ" },
  { char: "え", romaji: "e", type: "hiragana", row: "vowels", order: 4, pair: "エ" },
  { char: "お", romaji: "o", type: "hiragana", row: "vowels", order: 5, pair: "オ" },
  { char: "か", romaji: "ka", type: "hiragana", row: "k", order: 6, pair: "カ" },
  { char: "き", romaji: "ki", type: "hiragana", row: "k", order: 7, pair: "キ" },
  { char: "く", romaji: "ku", type: "hiragana", row: "k", order: 8, pair: "ク" },
  { char: "け", romaji: "ke", type: "hiragana", row: "k", order: 9, pair: "ケ" },
  { char: "こ", romaji: "ko", type: "hiragana", row: "k", order: 10, pair: "コ" },
  { char: "さ", romaji: "sa", type: "hiragana", row: "s", order: 11, pair: "サ" },
  { char: "し", romaji: "shi", type: "hiragana", row: "s", order: 12, pair: "シ" },
  { char: "す", romaji: "su", type: "hiragana", row: "s", order: 13, pair: "ス" },
  { char: "せ", romaji: "se", type: "hiragana", row: "s", order: 14, pair: "セ" },
  { char: "そ", romaji: "so", type: "hiragana", row: "s", order: 15, pair: "ソ" },
  { char: "た", romaji: "ta", type: "hiragana", row: "t", order: 16, pair: "タ" },
  { char: "ち", romaji: "chi", type: "hiragana", row: "t", order: 17, pair: "チ" },
  { char: "つ", romaji: "tsu", type: "hiragana", row: "t", order: 18, pair: "ツ" },
  { char: "て", romaji: "te", type: "hiragana", row: "t", order: 19, pair: "テ" },
  { char: "と", romaji: "to", type: "hiragana", row: "t", order: 20, pair: "ト" },
  { char: "な", romaji: "na", type: "hiragana", row: "n", order: 21, pair: "ナ" },
  { char: "に", romaji: "ni", type: "hiragana", row: "n", order: 22, pair: "ニ" },
  { char: "ぬ", romaji: "nu", type: "hiragana", row: "n", order: 23, pair: "ヌ" },
  { char: "ね", romaji: "ne", type: "hiragana", row: "n", order: 24, pair: "ネ" },
  { char: "の", romaji: "no", type: "hiragana", row: "n", order: 25, pair: "ノ" },
  { char: "は", romaji: "ha", type: "hiragana", row: "h", order: 26, pair: "ハ" },
  { char: "ひ", romaji: "hi", type: "hiragana", row: "h", order: 27, pair: "ヒ" },
  { char: "ふ", romaji: "fu", type: "hiragana", row: "h", order: 28, pair: "フ" },
  { char: "へ", romaji: "he", type: "hiragana", row: "h", order: 29, pair: "ヘ" },
  { char: "ほ", romaji: "ho", type: "hiragana", row: "h", order: 30, pair: "ホ" },
  { char: "ま", romaji: "ma", type: "hiragana", row: "m", order: 31, pair: "マ" },
  { char: "み", romaji: "mi", type: "hiragana", row: "m", order: 32, pair: "ミ" },
  { char: "む", romaji: "mu", type: "hiragana", row: "m", order: 33, pair: "ム" },
  { char: "め", romaji: "me", type: "hiragana", row: "m", order: 34, pair: "メ" },
  { char: "も", romaji: "mo", type: "hiragana", row: "m", order: 35, pair: "モ" },
  { char: "や", romaji: "ya", type: "hiragana", row: "y", order: 36, pair: "ヤ" },
  { char: "ゆ", romaji: "yu", type: "hiragana", row: "y", order: 37, pair: "ユ" },
  { char: "よ", romaji: "yo", type: "hiragana", row: "y", order: 38, pair: "ヨ" },
  { char: "ら", romaji: "ra", type: "hiragana", row: "r", order: 39, pair: "ラ" },
  { char: "り", romaji: "ri", type: "hiragana", row: "r", order: 40, pair: "リ" },
  { char: "る", romaji: "ru", type: "hiragana", row: "r", order: 41, pair: "ル" },
  { char: "れ", romaji: "re", type: "hiragana", row: "r", order: 42, pair: "レ" },
  { char: "ろ", romaji: "ro", type: "hiragana", row: "r", order: 43, pair: "ロ" },
  { char: "わ", romaji: "wa", type: "hiragana", row: "w", order: 44, pair: "ワ" },
  { char: "を", romaji: "wo", type: "hiragana", row: "w", order: 45, pair: "ヲ" },
  { char: "ん", romaji: "n", type: "hiragana", row: "n-solo", order: 46, pair: "ン" },
  { char: "が", romaji: "ga", type: "hiragana", row: "dakuten", order: 47, pair: "ガ" },
  { char: "ぎ", romaji: "gi", type: "hiragana", row: "dakuten", order: 48, pair: "ギ" },
  { char: "ぐ", romaji: "gu", type: "hiragana", row: "dakuten", order: 49, pair: "グ" },
  { char: "げ", romaji: "ge", type: "hiragana", row: "dakuten", order: 50, pair: "ゲ" },
  { char: "ご", romaji: "go", type: "hiragana", row: "dakuten", order: 51, pair: "ゴ" },
  { char: "ざ", romaji: "za", type: "hiragana", row: "dakuten", order: 52, pair: "ザ" },
  { char: "じ", romaji: "ji", type: "hiragana", row: "dakuten", order: 53, pair: "ジ" },
  { char: "ず", romaji: "zu", type: "hiragana", row: "dakuten", order: 54, pair: "ズ" },
  { char: "ぜ", romaji: "ze", type: "hiragana", row: "dakuten", order: 55, pair: "ゼ" },
  { char: "ぞ", romaji: "zo", type: "hiragana", row: "dakuten", order: 56, pair: "ゾ" },
  { char: "だ", romaji: "da", type: "hiragana", row: "dakuten", order: 57, pair: "ダ" },
  { char: "ぢ", romaji: "ji", type: "hiragana", row: "dakuten", order: 58, pair: "ヂ" },
  { char: "づ", romaji: "zu", type: "hiragana", row: "dakuten", order: 59, pair: "ヅ" },
  { char: "で", romaji: "de", type: "hiragana", row: "dakuten", order: 60, pair: "デ" },
  { char: "ど", romaji: "do", type: "hiragana", row: "dakuten", order: 61, pair: "ド" },
  { char: "ば", romaji: "ba", type: "hiragana", row: "dakuten", order: 62, pair: "バ" },
  { char: "び", romaji: "bi", type: "hiragana", row: "dakuten", order: 63, pair: "ビ" },
  { char: "ぶ", romaji: "bu", type: "hiragana", row: "dakuten", order: 64, pair: "ブ" },
  { char: "べ", romaji: "be", type: "hiragana", row: "dakuten", order: 65, pair: "ベ" },
  { char: "ぼ", romaji: "bo", type: "hiragana", row: "dakuten", order: 66, pair: "ボ" },
  { char: "ぱ", romaji: "pa", type: "hiragana", row: "handakuten", order: 67, pair: "パ" },
  { char: "ぴ", romaji: "pi", type: "hiragana", row: "handakuten", order: 68, pair: "ピ" },
  { char: "ぷ", romaji: "pu", type: "hiragana", row: "handakuten", order: 69, pair: "プ" },
  { char: "ぺ", romaji: "pe", type: "hiragana", row: "handakuten", order: 70, pair: "ペ" },
  { char: "ぽ", romaji: "po", type: "hiragana", row: "handakuten", order: 71, pair: "ポ" },
  { char: "きゃ", romaji: "kya", type: "hiragana", row: "yoon", order: 72, pair: "キャ" },
  { char: "きゅ", romaji: "kyu", type: "hiragana", row: "yoon", order: 73, pair: "キュ" },
  { char: "きょ", romaji: "kyo", type: "hiragana", row: "yoon", order: 74, pair: "キョ" },
  { char: "しゃ", romaji: "sha", type: "hiragana", row: "yoon", order: 75, pair: "シャ" },
  { char: "しゅ", romaji: "shu", type: "hiragana", row: "yoon", order: 76, pair: "シュ" },
  { char: "しょ", romaji: "sho", type: "hiragana", row: "yoon", order: 77, pair: "ショ" },
  { char: "ちゃ", romaji: "cha", type: "hiragana", row: "yoon", order: 78, pair: "チャ" },
  { char: "ちゅ", romaji: "chu", type: "hiragana", row: "yoon", order: 79, pair: "チュ" },
  { char: "ちょ", romaji: "cho", type: "hiragana", row: "yoon", order: 80, pair: "チョ" },
  { char: "にゃ", romaji: "nya", type: "hiragana", row: "yoon", order: 81, pair: "ニャ" },
  { char: "にゅ", romaji: "nyu", type: "hiragana", row: "yoon", order: 82, pair: "ニュ" },
  { char: "にょ", romaji: "nyo", type: "hiragana", row: "yoon", order: 83, pair: "ニョ" },
  { char: "ひゃ", romaji: "hya", type: "hiragana", row: "yoon", order: 84, pair: "ヒャ" },
  { char: "ひゅ", romaji: "hyu", type: "hiragana", row: "yoon", order: 85, pair: "ヒュ" },
  { char: "ひょ", romaji: "hyo", type: "hiragana", row: "yoon", order: 86, pair: "ヒョ" },
  { char: "みゃ", romaji: "mya", type: "hiragana", row: "yoon", order: 87, pair: "ミャ" },
  { char: "みゅ", romaji: "myu", type: "hiragana", row: "yoon", order: 88, pair: "ミュ" },
  { char: "みょ", romaji: "myo", type: "hiragana", row: "yoon", order: 89, pair: "ミョ" },
  { char: "りゃ", romaji: "rya", type: "hiragana", row: "yoon", order: 90, pair: "リャ" },
  { char: "りゅ", romaji: "ryu", type: "hiragana", row: "yoon", order: 91, pair: "リュ" },
  { char: "りょ", romaji: "ryo", type: "hiragana", row: "yoon", order: 92, pair: "リョ" },
];

const KATAKANA: KanaSeed[] = [
  { char: "ア", romaji: "a", type: "katakana", row: "vowels", order: 1, pair: "あ" },
  { char: "イ", romaji: "i", type: "katakana", row: "vowels", order: 2, pair: "い" },
  { char: "ウ", romaji: "u", type: "katakana", row: "vowels", order: 3, pair: "う" },
  { char: "エ", romaji: "e", type: "katakana", row: "vowels", order: 4, pair: "え" },
  { char: "オ", romaji: "o", type: "katakana", row: "vowels", order: 5, pair: "お" },
  { char: "カ", romaji: "ka", type: "katakana", row: "k", order: 6, pair: "か" },
  { char: "キ", romaji: "ki", type: "katakana", row: "k", order: 7, pair: "き" },
  { char: "ク", romaji: "ku", type: "katakana", row: "k", order: 8, pair: "く" },
  { char: "ケ", romaji: "ke", type: "katakana", row: "k", order: 9, pair: "け" },
  { char: "コ", romaji: "ko", type: "katakana", row: "k", order: 10, pair: "こ" },
  { char: "サ", romaji: "sa", type: "katakana", row: "s", order: 11, pair: "さ" },
  { char: "シ", romaji: "shi", type: "katakana", row: "s", order: 12, pair: "し" },
  { char: "ス", romaji: "su", type: "katakana", row: "s", order: 13, pair: "す" },
  { char: "セ", romaji: "se", type: "katakana", row: "s", order: 14, pair: "せ" },
  { char: "ソ", romaji: "so", type: "katakana", row: "s", order: 15, pair: "そ" },
  { char: "タ", romaji: "ta", type: "katakana", row: "t", order: 16, pair: "た" },
  { char: "チ", romaji: "chi", type: "katakana", row: "t", order: 17, pair: "ち" },
  { char: "ツ", romaji: "tsu", type: "katakana", row: "t", order: 18, pair: "つ" },
  { char: "テ", romaji: "te", type: "katakana", row: "t", order: 19, pair: "て" },
  { char: "ト", romaji: "to", type: "katakana", row: "t", order: 20, pair: "と" },
  { char: "ナ", romaji: "na", type: "katakana", row: "n", order: 21, pair: "な" },
  { char: "ニ", romaji: "ni", type: "katakana", row: "n", order: 22, pair: "に" },
  { char: "ヌ", romaji: "nu", type: "katakana", row: "n", order: 23, pair: "ぬ" },
  { char: "ネ", romaji: "ne", type: "katakana", row: "n", order: 24, pair: "ね" },
  { char: "ノ", romaji: "no", type: "katakana", row: "n", order: 25, pair: "の" },
  { char: "ハ", romaji: "ha", type: "katakana", row: "h", order: 26, pair: "は" },
  { char: "ヒ", romaji: "hi", type: "katakana", row: "h", order: 27, pair: "ひ" },
  { char: "フ", romaji: "fu", type: "katakana", row: "h", order: 28, pair: "ふ" },
  { char: "ヘ", romaji: "he", type: "katakana", row: "h", order: 29, pair: "へ" },
  { char: "ホ", romaji: "ho", type: "katakana", row: "h", order: 30, pair: "ほ" },
  { char: "マ", romaji: "ma", type: "katakana", row: "m", order: 31, pair: "ま" },
  { char: "ミ", romaji: "mi", type: "katakana", row: "m", order: 32, pair: "み" },
  { char: "ム", romaji: "mu", type: "katakana", row: "m", order: 33, pair: "む" },
  { char: "メ", romaji: "me", type: "katakana", row: "m", order: 34, pair: "め" },
  { char: "モ", romaji: "mo", type: "katakana", row: "m", order: 35, pair: "も" },
  { char: "ヤ", romaji: "ya", type: "katakana", row: "y", order: 36, pair: "や" },
  { char: "ユ", romaji: "yu", type: "katakana", row: "y", order: 37, pair: "ゆ" },
  { char: "ヨ", romaji: "yo", type: "katakana", row: "y", order: 38, pair: "よ" },
  { char: "ラ", romaji: "ra", type: "katakana", row: "r", order: 39, pair: "ら" },
  { char: "リ", romaji: "ri", type: "katakana", row: "r", order: 40, pair: "り" },
  { char: "ル", romaji: "ru", type: "katakana", row: "r", order: 41, pair: "る" },
  { char: "レ", romaji: "re", type: "katakana", row: "r", order: 42, pair: "れ" },
  { char: "ロ", romaji: "ro", type: "katakana", row: "r", order: 43, pair: "ろ" },
  { char: "ワ", romaji: "wa", type: "katakana", row: "w", order: 44, pair: "わ" },
  { char: "ヲ", romaji: "wo", type: "katakana", row: "w", order: 45, pair: "を" },
  { char: "ン", romaji: "n", type: "katakana", row: "n-solo", order: 46, pair: "ん" },
];

type Vocab = {
  word: string; reading: string; meaning: string; romaji?: string;
  level: "N5" | "N4" | "N3"; category: string; pos?: string;
  verbGroup?: string; pitchAccent?: string; lesson?: number;
  exampleJp?: string; exampleEn?: string; exampleJp2?: string; exampleEn2?: string;
  order?: number;
};

const VOCAB: Vocab[] = [
  // N5: Greetings
  { word: "こんにちは", reading: "こんにちは", meaning: "Hello / Good afternoon", romaji: "konnichiwa", level: "N5", category: "greetings", pos: "expression", exampleJp: "こんにちは、はじめまして。", exampleEn: "Hello, nice to meet you.", order: 1 },
  { word: "ありがとう", reading: "ありがとう", meaning: "Thank you", romaji: "arigatou", level: "N5", category: "greetings", pos: "expression", exampleJp: "ありがとう。", exampleEn: "Thank you.", order: 2 },
  { word: "すみません", reading: "すみません", meaning: "Excuse me / Sorry", romaji: "sumimasen", level: "N5", category: "greetings", pos: "expression", exampleJp: "すみません、駅はどこですか。", exampleEn: "Excuse me, where is the station?", order: 3 },
  { word: "おはよう", reading: "おはよう", meaning: "Good morning (casual)", romaji: "ohayou", level: "N5", category: "greetings", pos: "expression", exampleJp: "おはよう！", exampleEn: "Morning!", order: 4 },
  { word: "こんばんは", reading: "こんばんは", meaning: "Good evening", romaji: "konbanwa", level: "N5", category: "greetings", pos: "expression", order: 5 },
  { word: "さようなら", reading: "さようなら", meaning: "Goodbye", romaji: "sayounara", level: "N5", category: "greetings", pos: "expression", order: 6 },
  { word: "はじめまして", reading: "はじめまして", meaning: "Nice to meet you", romaji: "hajimemashite", level: "N5", category: "greetings", pos: "expression", order: 7 },
  { word: "いただきます", reading: "いただきます", meaning: "Phrase said before eating", romaji: "itadakimasu", level: "N5", category: "greetings", pos: "expression", order: 8 },
  { word: "おやすみ", reading: "おやすみ", meaning: "Good night", romaji: "oyasumi", level: "N5", category: "greetings", pos: "expression", order: 9 },
  // N5: Pronouns
  { word: "私", reading: "わたし", meaning: "I, me", romaji: "watashi", level: "N5", category: "pronouns", pos: "pronoun", exampleJp: "私は学生です。", exampleEn: "I am a student.", order: 10 },
  { word: "あなた", reading: "あなた", meaning: "you", romaji: "anata", level: "N5", category: "pronouns", pos: "pronoun", order: 11 },
  { word: "彼", reading: "かれ", meaning: "he / boyfriend", romaji: "kare", level: "N5", category: "pronouns", pos: "pronoun", order: 12 },
  { word: "彼女", reading: "かのじょ", meaning: "she / girlfriend", romaji: "kanojo", level: "N5", category: "pronouns", pos: "pronoun", order: 13 },
  { word: "これ", reading: "これ", meaning: "this", romaji: "kore", level: "N5", category: "pronouns", pos: "pronoun", exampleJp: "これは何ですか。", exampleEn: "What is this?", order: 14 },
  { word: "それ", reading: "それ", meaning: "that (near listener)", romaji: "sore", level: "N5", category: "pronouns", pos: "pronoun", order: 15 },
  { word: "あれ", reading: "あれ", meaning: "that (over there)", romaji: "are", level: "N5", category: "pronouns", pos: "pronoun", order: 16 },
  { word: "ここ", reading: "ここ", meaning: "here", romaji: "koko", level: "N5", category: "pronouns", pos: "pronoun", order: 17 },
  { word: "そこ", reading: "そこ", meaning: "there", romaji: "soko", level: "N5", category: "pronouns", pos: "pronoun", order: 18 },
  { word: "あそこ", reading: "あそこ", meaning: "over there", romaji: "asoko", level: "N5", category: "pronouns", pos: "pronoun", order: 19 },
  // N5: Question words
  { word: "何", reading: "なに", meaning: "what", romaji: "nani", level: "N5", category: "question", pos: "pronoun", exampleJp: "これは何ですか。", exampleEn: "What is this?", order: 20 },
  { word: "誰", reading: "だれ", meaning: "who", romaji: "dare", level: "N5", category: "question", pos: "pronoun", exampleJp: "誰が来ますか。", exampleEn: "Who will come?", order: 21 },
  { word: "どこ", reading: "どこ", meaning: "where", romaji: "doko", level: "N5", category: "question", pos: "pronoun", exampleJp: "トイレはどこですか。", exampleEn: "Where is the toilet?", order: 22 },
  { word: "いつ", reading: "いつ", meaning: "when", romaji: "itsu", level: "N5", category: "question", pos: "pronoun", order: 23 },
  { word: "どうして", reading: "どうして", meaning: "why", romaji: "doushite", level: "N5", category: "question", pos: "adverb", order: 24 },
  { word: "どう", reading: "どう", meaning: "how", romaji: "dou", level: "N5", category: "question", pos: "adverb", order: 25 },
  // N5: Common nouns
  { word: "人", reading: "ひと", meaning: "person", romaji: "hito", level: "N5", category: "nouns", pos: "noun", exampleJp: "あの人は先生です。", exampleEn: "That person is a teacher.", order: 26 },
  { word: "本", reading: "ほん", meaning: "book", romaji: "hon", level: "N5", category: "nouns", pos: "noun", exampleJp: "本を読みます。", exampleEn: "I read a book.", order: 27 },
  { word: "車", reading: "くるま", meaning: "car", romaji: "kuruma", level: "N5", category: "nouns", pos: "noun", order: 28 },
  { word: "家", reading: "いえ", meaning: "house, home", romaji: "ie", level: "N5", category: "nouns", pos: "noun", order: 29 },
  { word: "学校", reading: "がっこう", meaning: "school", romaji: "gakkou", level: "N5", category: "nouns", pos: "noun", order: 30 },
  { word: "先生", reading: "せんせい", meaning: "teacher", romaji: "sensei", level: "N5", category: "nouns", pos: "noun", exampleJp: "田中先生は日本語の先生です。", exampleEn: "Mr. Tanaka is a Japanese teacher.", order: 31 },
  { word: "学生", reading: "がくせい", meaning: "student", romaji: "gakusei", level: "N5", category: "nouns", pos: "noun", order: 32 },
  { word: "友達", reading: "ともだち", meaning: "friend", romaji: "tomodachi", level: "N5", category: "nouns", pos: "noun", order: 33 },
  { word: "水", reading: "みず", meaning: "water", romaji: "mizu", level: "N5", category: "nouns", pos: "noun", order: 34 },
  { word: "お茶", reading: "おちゃ", meaning: "tea", romaji: "ocha", level: "N5", category: "nouns", pos: "noun", order: 35 },
  { word: "ご飯", reading: "ごはん", meaning: "rice / meal", romaji: "gohan", level: "N5", category: "nouns", pos: "noun", exampleJp: "ご飯を食べます。", exampleEn: "I eat a meal.", order: 36 },
  { word: "天気", reading: "てんき", meaning: "weather", romaji: "tenki", level: "N5", category: "nouns", pos: "noun", order: 37 },
  { word: "時間", reading: "じかん", meaning: "time", romaji: "jikan", level: "N5", category: "nouns", pos: "noun", order: 38 },
  { word: "今日", reading: "きょう", meaning: "today", romaji: "kyou", level: "N5", category: "nouns", pos: "noun", order: 39 },
  { word: "明日", reading: "あした", meaning: "tomorrow", romaji: "ashita", level: "N5", category: "nouns", pos: "noun", order: 40 },
  { word: "昨日", reading: "きのう", meaning: "yesterday", romaji: "kinou", level: "N5", category: "nouns", pos: "noun", order: 41 },
  // N5: Verbs
  { word: "食べる", reading: "たべる", meaning: "to eat", romaji: "taberu", level: "N5", category: "verbs", pos: "verb", exampleJp: "パンを食べます。", exampleEn: "I eat bread.", order: 42 },
  { word: "飲む", reading: "のむ", meaning: "to drink", romaji: "nomu", level: "N5", category: "verbs", pos: "verb", exampleJp: "コーヒーを飲みます。", exampleEn: "I drink coffee.", order: 43 },
  { word: "行く", reading: "いく", meaning: "to go", romaji: "iku", level: "N5", category: "verbs", pos: "verb", exampleJp: "学校に行きます。", exampleEn: "I go to school.", order: 44 },
  { word: "来る", reading: "くる", meaning: "to come", romaji: "kuru", level: "N5", category: "verbs", pos: "verb", exampleJp: "友達が来ます。", exampleEn: "A friend comes.", order: 45 },
  { word: "見る", reading: "みる", meaning: "to see, to watch", romaji: "miru", level: "N5", category: "verbs", pos: "verb", exampleJp: "映画を見ます。", exampleEn: "I watch a movie.", order: 46 },
  { word: "聞く", reading: "きく", meaning: "to listen, to ask", romaji: "kiku", level: "N5", category: "verbs", pos: "verb", order: 47 },
  { word: "読む", reading: "よむ", meaning: "to read", romaji: "yomu", level: "N5", category: "verbs", pos: "verb", order: 48 },
  { word: "書く", reading: "かく", meaning: "to write", romaji: "kaku", level: "N5", category: "verbs", pos: "verb", order: 49 },
  { word: "話す", reading: "はなす", meaning: "to speak, to talk", romaji: "hanasu", level: "N5", category: "verbs", pos: "verb", exampleJp: "日本語を話します。", exampleEn: "I speak Japanese.", order: 50 },
  { word: "する", reading: "する", meaning: "to do", romaji: "suru", level: "N5", category: "verbs", pos: "verb", exampleJp: "勉強をします。", exampleEn: "I study.", order: 51 },
  { word: "買う", reading: "かう", meaning: "to buy", romaji: "kau", level: "N5", category: "verbs", pos: "verb", order: 52 },
  { word: "寝る", reading: "ねる", meaning: "to sleep", romaji: "neru", level: "N5", category: "verbs", pos: "verb", order: 53 },
  { word: "起きる", reading: "おきる", meaning: "to wake up", romaji: "okiru", level: "N5", category: "verbs", pos: "verb", exampleJp: "朝6時に起きます。", exampleEn: "I wake up at 6 AM.", order: 54 },
  { word: "勉強する", reading: "べんきょうする", meaning: "to study", romaji: "benkyou suru", level: "N5", category: "verbs", pos: "verb", order: 55 },
  { word: "わかる", reading: "わかる", meaning: "to understand", romaji: "wakaru", level: "N5", category: "verbs", pos: "verb", exampleJp: "日本語がわかりますか。", exampleEn: "Do you understand Japanese?", order: 56 },
  // N5: Adjectives (i)
  { word: "大きい", reading: "おおきい", meaning: "big", romaji: "ookii", level: "N5", category: "adjectives", pos: "i-adjective", exampleJp: "大きい家です。", exampleEn: "It's a big house.", order: 57 },
  { word: "小さい", reading: "ちいさい", meaning: "small", romaji: "chiisai", level: "N5", category: "adjectives", pos: "i-adjective", order: 58 },
  { word: "新しい", reading: "あたらしい", meaning: "new", romaji: "atarashii", level: "N5", category: "adjectives", pos: "i-adjective", order: 59 },
  { word: "古い", reading: "ふるい", meaning: "old (things)", romaji: "furui", level: "N5", category: "adjectives", pos: "i-adjective", order: 60 },
  { word: "高い", reading: "たかい", meaning: "tall / expensive", romaji: "takai", level: "N5", category: "adjectives", pos: "i-adjective", exampleJp: "このりんごは高いです。", exampleEn: "This apple is expensive.", order: 61 },
  { word: "安い", reading: "やすい", meaning: "cheap", romaji: "yasui", level: "N5", category: "adjectives", pos: "i-adjective", order: 62 },
  { word: "いい", reading: "いい", meaning: "good", romaji: "ii", level: "N5", category: "adjectives", pos: "i-adjective", order: 63 },
  { word: "暑い", reading: "あつい", meaning: "hot (weather)", romaji: "atsui", level: "N5", category: "adjectives", pos: "i-adjective", order: 64 },
  { word: "寒い", reading: "さむい", meaning: "cold (weather)", romaji: "samui", level: "N5", category: "adjectives", pos: "i-adjective", order: 65 },
  { word: "美味しい", reading: "おいしい", meaning: "delicious", romaji: "oishii", level: "N5", category: "adjectives", pos: "i-adjective", exampleJp: "このラーメンは美味しいです。", exampleEn: "This ramen is delicious.", order: 66 },
  // N5: Adjectives (na)
  { word: "元気", reading: "げんき", meaning: "healthy, energetic", romaji: "genki", level: "N5", category: "adjectives", pos: "na-adjective", exampleJp: "元気ですか。", exampleEn: "How are you? (Are you well?)", order: 67 },
  { word: "静か", reading: "しずか", meaning: "quiet", romaji: "shizuka", level: "N5", category: "adjectives", pos: "na-adjective", order: 68 },
  { word: "きれい", reading: "きれい", meaning: "pretty, clean", romaji: "kirei", level: "N5", category: "adjectives", pos: "na-adjective", order: 69 },
  { word: "好き", reading: "すき", meaning: "liked, favorite", romaji: "suki", level: "N5", category: "adjectives", pos: "na-adjective", exampleJp: "日本語が好きです。", exampleEn: "I like Japanese.", order: 70 },
  { word: "嫌い", reading: "きらい", meaning: "disliked", romaji: "kirai", level: "N5", category: "adjectives", pos: "na-adjective", order: 71 },
  { word: "便利", reading: "べんり", meaning: "convenient", romaji: "benri", level: "N5", category: "adjectives", pos: "na-adjective", order: 72 },
  // N5: Adverbs
  { word: "とても", reading: "とても", meaning: "very", romaji: "totemo", level: "N5", category: "adverbs", pos: "adverb", order: 73 },
  { word: "よく", reading: "よく", meaning: "often, well", romaji: "yoku", level: "N5", category: "adverbs", pos: "adverb", order: 74 },
  { word: "たくさん", reading: "たくさん", meaning: "a lot", romaji: "takusan", level: "N5", category: "adverbs", pos: "adverb", order: 75 },
  { word: "もう", reading: "もう", meaning: "already, more", romaji: "mou", level: "N5", category: "adverbs", pos: "adverb", order: 76 },
  { word: "まだ", reading: "まだ", meaning: "still, not yet", romaji: "mada", level: "N5", category: "adverbs", pos: "adverb", order: 77 },
  // N5: Numbers
  { word: "一", reading: "いち", meaning: "one", romaji: "ichi", level: "N5", category: "numbers", pos: "number", order: 78 },
  { word: "二", reading: "に", meaning: "two", romaji: "ni", level: "N5", category: "numbers", pos: "number", order: 79 },
  { word: "三", reading: "さん", meaning: "three", romaji: "san", level: "N5", category: "numbers", pos: "number", order: 80 },
  { word: "四", reading: "し/よん", meaning: "four", romaji: "shi/yon", level: "N5", category: "numbers", pos: "number", order: 81 },
  { word: "五", reading: "ご", meaning: "five", romaji: "go", level: "N5", category: "numbers", pos: "number", order: 82 },
  { word: "十", reading: "じゅう", meaning: "ten", romaji: "juu", level: "N5", category: "numbers", pos: "number", order: 83 },
  { word: "百", reading: "ひゃく", meaning: "hundred", romaji: "hyaku", level: "N5", category: "numbers", pos: "number", order: 84 },
  { word: "千", reading: "せん", meaning: "thousand", romaji: "sen", level: "N5", category: "numbers", pos: "number", order: 85 },
  { word: "万", reading: "まん", meaning: "ten thousand", romaji: "man", level: "N5", category: "numbers", pos: "number", order: 86 },
  // N5: Family
  { word: "父", reading: "ちち", meaning: "father (my own)", romaji: "chichi", level: "N5", category: "family", pos: "noun", order: 87 },
  { word: "母", reading: "はは", meaning: "mother (my own)", romaji: "haha", level: "N5", category: "family", pos: "noun", order: 88 },
  { word: "兄", reading: "あに", meaning: "older brother (my own)", romaji: "ani", level: "N5", category: "family", pos: "noun", order: 89 },
  { word: "姉", reading: "あね", meaning: "older sister (my own)", romaji: "ane", level: "N5", category: "family", pos: "noun", order: 90 },
  { word: "弟", reading: "おとうと", meaning: "younger brother", romaji: "otouto", level: "N5", category: "family", pos: "noun", order: 91 },
  { word: "妹", reading: "いもうと", meaning: "younger sister", romaji: "imouto", level: "N5", category: "family", pos: "noun", order: 92 },
  // N4 verbs
  { word: "考える", reading: "かんがえる", meaning: "to think, to consider", romaji: "kangaeru", level: "N4", category: "verbs", pos: "verb", exampleJp: "将来について考えています。", exampleEn: "I'm thinking about my future.", order: 1 },
  { word: "使う", reading: "つかう", meaning: "to use", romaji: "tsukau", level: "N4", category: "verbs", pos: "verb", order: 2 },
  { word: "作る", reading: "つくる", meaning: "to make", romaji: "tsukuru", level: "N4", category: "verbs", pos: "verb", order: 3 },
  { word: "働く", reading: "はたらく", meaning: "to work", romaji: "hataraku", level: "N4", category: "verbs", pos: "verb", exampleJp: "銀行で働いています。", exampleEn: "I work at a bank.", order: 4 },
  { word: "始まる", reading: "はじまる", meaning: "to begin (intransitive)", romaji: "hajimaru", level: "N4", category: "verbs", pos: "verb", order: 5 },
  { word: "終わる", reading: "おわる", meaning: "to end", romaji: "owaru", level: "N4", category: "verbs", pos: "verb", order: 6 },
  { word: "持つ", reading: "もつ", meaning: "to hold, to have", romaji: "motsu", level: "N4", category: "verbs", pos: "verb", order: 7 },
  { word: "待つ", reading: "まつ", meaning: "to wait", romaji: "matsu", level: "N4", category: "verbs", pos: "verb", exampleJp: "ここで待ってください。", exampleEn: "Please wait here.", order: 8 },
  { word: "教える", reading: "おしえる", meaning: "to teach, to tell", romaji: "oshieru", level: "N4", category: "verbs", pos: "verb", order: 9 },
  { word: "借りる", reading: "かりる", meaning: "to borrow", romaji: "kariru", level: "N4", category: "verbs", pos: "verb", exampleJp: "図書館で本を借りました。", exampleEn: "I borrowed a book at the library.", order: 10 },
  { word: "返す", reading: "かえす", meaning: "to return (something)", romaji: "kaesu", level: "N4", category: "verbs", pos: "verb", order: 11 },
  { word: "忘れる", reading: "わすれる", meaning: "to forget", romaji: "wasureru", level: "N4", category: "verbs", pos: "verb", order: 12 },
  { word: "思い出す", reading: "おもいだす", meaning: "to recall, to remember", romaji: "omoidasu", level: "N4", category: "verbs", pos: "verb", order: 13 },
  { word: "足りる", reading: "たりる", meaning: "to be enough, to suffice", romaji: "tariru", level: "N4", category: "verbs", pos: "verb", exampleJp: "1000円あれば足りる。", exampleEn: "1000 yen is enough.", order: 14 },
  // N4 adjectives
  { word: "忙しい", reading: "いそがしい", meaning: "busy", romaji: "isogashii", level: "N4", category: "adjectives", pos: "i-adjective", exampleJp: "最近忙しいです。", exampleEn: "I've been busy lately.", order: 15 },
  { word: "楽しい", reading: "たのしい", meaning: "fun, enjoyable", romaji: "tanoshii", level: "N4", category: "adjectives", pos: "i-adjective", order: 16 },
  { word: "難しい", reading: "むずかしい", meaning: "difficult", romaji: "muzukashii", level: "N4", category: "adjectives", pos: "i-adjective", order: 17 },
  { word: "やさしい", reading: "やさしい", meaning: "easy / kind", romaji: "yasashii", level: "N4", category: "adjectives", pos: "i-adjective", order: 18 },
  { word: "広い", reading: "ひろい", meaning: "wide, spacious", romaji: "hiroi", level: "N4", category: "adjectives", pos: "i-adjective", order: 19 },
  { word: "狭い", reading: "せまい", meaning: "narrow, cramped", romaji: "semai", level: "N4", category: "adjectives", pos: "i-adjective", order: 20 },
  { word: "有名", reading: "ゆうめい", meaning: "famous", romaji: "yuumei", level: "N4", category: "adjectives", pos: "na-adjective", order: 21 },
  { word: "大切", reading: "たいせつ", meaning: "important", romaji: "taisetsu", level: "N4", category: "adjectives", pos: "na-adjective", order: 22 },
  { word: "大変", reading: "たいへん", meaning: "tough, awful", romaji: "taihen", level: "N4", category: "adjectives", pos: "na-adjective", order: 23 },
  // N4 nouns
  { word: "予定", reading: "よてい", meaning: "plan, schedule", romaji: "yotei", level: "N4", category: "nouns", pos: "noun", exampleJp: "週末の予定は？", exampleEn: "What are your weekend plans?", order: 24 },
  { word: "約束", reading: "やくそく", meaning: "promise, appointment", romaji: "yakusoku", level: "N4", category: "nouns", pos: "noun", order: 25 },
  { word: "意味", reading: "いみ", meaning: "meaning", romaji: "imi", level: "N4", category: "nouns", pos: "noun", exampleJp: "この言葉の意味は？", exampleEn: "What is the meaning of this word?", order: 26 },
  { word: "理由", reading: "りゆう", meaning: "reason", romaji: "riyuu", level: "N4", category: "nouns", pos: "noun", order: 27 },
  { word: "経験", reading: "けいけん", meaning: "experience", romaji: "keiken", level: "N4", category: "nouns", pos: "noun", order: 28 },
  { word: "旅行", reading: "りょこう", meaning: "travel, trip", romaji: "ryokou", level: "N4", category: "nouns", pos: "noun", order: 29 },
  { word: "予約", reading: "よやく", meaning: "reservation", romaji: "yoyaku", level: "N4", category: "nouns", pos: "noun", order: 30 },
  { word: "病気", reading: "びょうき", meaning: "illness", romaji: "byouki", level: "N4", category: "nouns", pos: "noun", order: 31 },
  { word: "映画", reading: "えいが", meaning: "movie", romaji: "eiga", level: "N4", category: "nouns", pos: "noun", order: 32 },
  { word: "会議", reading: "かいぎ", meaning: "meeting", romaji: "kaigi", level: "N4", category: "nouns", pos: "noun", order: 33 },
  { word: "地震", reading: "じしん", meaning: "earthquake", romaji: "jishin", level: "N4", category: "nouns", pos: "noun", order: 34 },
  // N4 adverbs / conjunctions
  { word: "もし", reading: "もし", meaning: "if (hypothetical)", romaji: "moshi", level: "N4", category: "conjunctions", pos: "adverb", exampleJp: "もし雨が降ったら…", exampleEn: "If it rains...", order: 35 },
  { word: "けれども", reading: "けれども", meaning: "but, however", romaji: "keredomo", level: "N4", category: "conjunctions", pos: "conjunction", order: 36 },
  { word: "それで", reading: "それで", meaning: "and then, so", romaji: "sorede", level: "N4", category: "conjunctions", pos: "conjunction", order: 37 },
  { word: "それに", reading: "それに", meaning: "besides, moreover", romaji: "soreni", level: "N4", category: "conjunctions", pos: "conjunction", order: 38 },
  { word: "しかし", reading: "しかし", meaning: "however", romaji: "shikashi", level: "N4", category: "conjunctions", pos: "conjunction", order: 39 },
  { word: "だんだん", reading: "だんだん", meaning: "gradually", romaji: "dandan", level: "N4", category: "adverbs", pos: "adverb", order: 40 },
  { word: "きっと", reading: "きっと", meaning: "surely, certainly", romaji: "kitto", level: "N4", category: "adverbs", pos: "adverb", order: 41 },
  { word: "ゆっくり", reading: "ゆっくり", meaning: "slowly", romaji: "yukkuri", level: "N4", category: "adverbs", pos: "adverb", order: 42 },
  // N3 verbs
  { word: "比べる", reading: "くらべる", meaning: "to compare", romaji: "kuraberu", level: "N3", category: "verbs", pos: "verb", exampleJp: "二つの方法を比べてみた。", exampleEn: "I tried comparing the two methods.", order: 1 },
  { word: "集める", reading: "あつめる", meaning: "to collect", romaji: "atsumeru", level: "N3", category: "verbs", pos: "verb", order: 2 },
  { word: "決まる", reading: "きまる", meaning: "to be decided", romaji: "kimaru", level: "N3", category: "verbs", pos: "verb", order: 3 },
  { word: "決める", reading: "きめる", meaning: "to decide", romaji: "kimeru", level: "N3", category: "verbs", pos: "verb", exampleJp: "自分で決めます。", exampleEn: "I'll decide for myself.", order: 4 },
  { word: "感じる", reading: "かんじる", meaning: "to feel", romaji: "kanjiru", level: "N3", category: "verbs", pos: "verb", exampleJp: "寒さを感じる。", exampleEn: "I feel the cold.", order: 5 },
  { word: "気づく", reading: "きづく", meaning: "to notice", romaji: "kizuku", level: "N3", category: "verbs", pos: "verb", order: 6 },
  { word: "こまる", reading: "こまる", meaning: "to be in trouble", romaji: "komaru", level: "N3", category: "verbs", pos: "verb", exampleJp: "困ったことがあれば言ってね。", exampleEn: "Tell me if you're in trouble.", order: 7 },
  { word: "整える", reading: "ととのえる", meaning: "to arrange, to prepare", romaji: "totonoeru", level: "N3", category: "verbs", pos: "verb", order: 8 },
  { word: "応援する", reading: "おうえんする", meaning: "to support, to cheer", romaji: "ouen suru", level: "N3", category: "verbs", pos: "verb", exampleJp: "チームを応援しています。", exampleEn: "I'm cheering for the team.", order: 9 },
  { word: "解決する", reading: "かいけつする", meaning: "to solve", romaji: "kaiketsu suru", level: "N3", category: "verbs", pos: "verb", order: 10 },
  { word: "影響する", reading: "えいきょうする", meaning: "to influence", romaji: "eikyou suru", level: "N3", category: "verbs", pos: "verb", order: 11 },
  // N3 adjectives
  { word: "複雑", reading: "ふくざつ", meaning: "complicated", romaji: "fukuzatsu", level: "N3", category: "adjectives", pos: "na-adjective", exampleJp: "複雑な問題だ。", exampleEn: "It's a complicated problem.", order: 12 },
  { word: "単純", reading: "たんじゅん", meaning: "simple", romaji: "tanjun", level: "N3", category: "adjectives", pos: "na-adjective", order: 13 },
  { word: "豊か", reading: "ゆたか", meaning: "rich, abundant", romaji: "yutaka", level: "N3", category: "adjectives", pos: "na-adjective", order: 14 },
  { word: "貧乏", reading: "びんぼう", meaning: "poor", romaji: "binbou", level: "N3", category: "adjectives", pos: "na-adjective", order: 15 },
  { word: "細かい", reading: "こまかい", meaning: "detailed, small", romaji: "komakai", level: "N3", category: "adjectives", pos: "i-adjective", order: 16 },
  { word: "鋭い", reading: "するどい", meaning: "sharp", romaji: "surudoi", level: "N3", category: "adjectives", pos: "i-adjective", order: 17 },
  // N3 nouns / abstract
  { word: "関係", reading: "かんけい", meaning: "relation", romaji: "kankei", level: "N3", category: "nouns", pos: "noun", exampleJp: "気候と農業の関係。", exampleEn: "The relation between climate and agriculture.", order: 18 },
  { word: "効果", reading: "こうか", meaning: "effect", romaji: "kouka", level: "N3", category: "nouns", pos: "noun", order: 19 },
  { word: "限界", reading: "げんかい", meaning: "limit", romaji: "genkai", level: "N3", category: "nouns", pos: "noun", order: 20 },
  { word: "利益", reading: "りえき", meaning: "profit, benefit", romaji: "rieki", level: "N3", category: "nouns", pos: "noun", order: 21 },
  { word: "努力", reading: "どりょく", meaning: "effort", romaji: "doryoku", level: "N3", category: "nouns", pos: "noun", exampleJp: "努力が実を結んだ。", exampleEn: "Effort bore fruit.", order: 22 },
  { word: "態度", reading: "たいど", meaning: "attitude", romaji: "taido", level: "N3", category: "nouns", pos: "noun", order: 23 },
  { word: "事実", reading: "じじつ", meaning: "fact", romaji: "jijitsu", level: "N3", category: "nouns", pos: "noun", order: 24 },
  { word: "内容", reading: "ないよう", meaning: "content", romaji: "naiyou", level: "N3", category: "nouns", pos: "noun", order: 25 },
  { word: "状況", reading: "じょうきょう", meaning: "situation", romaji: "joukyou", level: "N3", category: "nouns", pos: "noun", order: 26 },
  { word: "機会", reading: "きかい", meaning: "opportunity", romaji: "kikai", level: "N3", category: "nouns", pos: "noun", exampleJp: "また機会があれば。", exampleEn: "If there's another opportunity.", order: 27 },
  // N3 conjunctions/adverbs
  { word: "たとえ", reading: "たとえ", meaning: "even if", romaji: "tatoe", level: "N3", category: "conjunctions", pos: "adverb", exampleJp: "たとえ雨でも行きます。", exampleEn: "Even if it rains, I'll go.", order: 28 },
  { word: "さすが", reading: "さすが", meaning: "as one would expect", romaji: "sasuga", level: "N3", category: "adverbs", pos: "adverb", order: 29 },
  { word: "できるだけ", reading: "できるだけ", meaning: "as much as possible", romaji: "dekiru dake", level: "N3", category: "adverbs", pos: "adverb", order: 30 },
  { word: "ふと", reading: "ふと", meaning: "suddenly, by chance", romaji: "futo", level: "N3", category: "adverbs", pos: "adverb", order: 31 },
  { word: "のんびり", reading: "のんびり", meaning: "leisurely", romaji: "nonbiri", level: "N3", category: "adverbs", pos: "adverb", exampleJp: "のんびり過ごしたい。", exampleEn: "I want to spend my time leisurely.", order: 32 },
];

type Grammar = {
  title: string; level: "N5" | "N4" | "N3"; structure: string; meaning: string;
  explanation: string; exampleJp: string; exampleEn: string;
  exampleJp2?: string; exampleEn2?: string; note?: string;
  commonMistake?: string; lesson?: number; order?: number;
};

const GRAMMAR: Grammar[] = [
  // N5
  { title: "です (desu) — copula", level: "N5", structure: "Noun + です", meaning: "is / am / are (polite)", explanation: "The polite copula 'desu' links a subject to a noun or na-adjective, equivalent to English 'is/am/are'. It makes the sentence polite.", exampleJp: "私は学生です。", exampleEn: "I am a student.", exampleJp2: "ここは学校です。", exampleEn2: "This is a school.", order: 1 },
  { title: "〜ます (masu) — polite verb", level: "N5", structure: "Verb (masu-stem) + ます", meaning: "polite non-past form of verbs", explanation: "Attach 'masu' to the verb stem to make a polite present/future form. Negative: 〜ません. Past: 〜ました. Past neg: 〜ませんでした.", exampleJp: "毎日日本語を勉強します。", exampleEn: "I study Japanese every day.", exampleJp2: "昨日、映画を見ました。", exampleEn2: "Yesterday I watched a movie.", order: 2 },
  { title: "〜は〜です — topic marker", level: "N5", structure: "A は B です", meaning: "A is B (As for A, it is B)", explanation: "'は' (wa) marks the topic of the sentence — what you're talking about. It is written with the hiragana 'ha' but pronounced 'wa'.", exampleJp: "私は田中です。", exampleEn: "I am Tanaka.", order: 3 },
  { title: "〜が — subject marker", level: "N5", structure: "Noun が Verb", meaning: "marks the grammatical subject", explanation: "'が' marks the subject, often used for new information or to answer 'who/what'. Compare: は = topic (old info), が = subject (new info / emphasis).", exampleJp: "誰が来ますか。山田さんが来ます。", exampleEn: "Who is coming? Yamada-san is coming.", note: "は vs が is a famously tricky distinction — see the resources section.", order: 4 },
  { title: "〜を — object marker", level: "N5", structure: "Noun を Verb", meaning: "marks the direct object", explanation: "'を' (wo) marks the direct object of a transitive verb (the thing the verb acts on). Pronounced 'o'.", exampleJp: "ご飯を食べます。", exampleEn: "I eat a meal.", order: 5 },
  { title: "〜に — time / destination / target", level: "N5", structure: "Noun に Verb", meaning: "at / to / on (time, place, target)", explanation: "'に' has many uses: specific point in time (3時に), destination of movement (学校に行く), indirect object (先生に会う), or location of existence (家にいる).", exampleJp: "7時に起きます。", exampleEn: "I wake up at 7.", exampleJp2: "学校に行きます。", exampleEn2: "I go to school.", order: 6 },
  { title: "〜で — means / location of action", level: "N5", structure: "Noun で Verb", meaning: "by means of / at (place)", explanation: "'で' marks the means/tool of an action (バスで行く — go by bus) or the location where an action occurs (図書館で勉強する — study at the library).", exampleJp: "電車で行きます。", exampleEn: "I go by train.", exampleJp2: "カフェでコーヒーを飲みます。", exampleEn2: "I drink coffee at a cafe.", order: 7 },
  { title: "〜と — and / with", level: "N5", structure: "Noun と Noun / Noun と Verb", meaning: "and (connecting nouns) / together with", explanation: "Between nouns 'と' means 'and' (本とペン = book and pen). With a person it means 'together with' (友達と行く = go with a friend).", exampleJp: "りんごとみかんを買いました。", exampleEn: "I bought apples and mandarins.", exampleJp2: "家族と旅行します。", exampleEn2: "I travel with my family.", order: 8 },
  { title: "〜の — possessive / noun modifier", level: "N5", structure: "Noun の Noun", meaning: "'s / of", explanation: "'の' connects two nouns, showing possession or relation. 私の本 = my book. 日本語の先生 = Japanese (language) teacher.", exampleJp: "私の車です。", exampleEn: "It is my car.", exampleJp2: "日本語の本を読みます。", exampleEn2: "I read a Japanese book.", order: 9 },
  { title: "〜も — also / too", level: "N5", structure: "Noun も", meaning: "also, too, as well", explanation: "Replaces は/が/を to say 'also'. 私も学生です = I am also a student.", exampleJp: "私も行きます。", exampleEn: "I will go too.", order: 10 },
  { title: "〜から — because / from", level: "N5", structure: "[reason] から [result]", meaning: "because / from", explanation: "As a conjunction 'から' gives a reason: 暑いから、窓を開ける (It's hot, so I'll open the window). As a particle it means 'from': 駅から (from the station).", exampleJp: "寒いから、ドアを閉めてください。", exampleEn: "It's cold, so please close the door.", exampleJp2: "9時から始まります。", exampleEn2: "It starts from 9 o'clock.", order: 11 },
  { title: "〜まで — until / to", level: "N5", structure: "Time/Place まで", meaning: "until / up to", explanation: "Indicates an endpoint in time or space. 9時まで (until 9). 駅まで (as far as the station). Often paired with 〜から: 9時から5時まで.", exampleJp: "5時まで働きます。", exampleEn: "I work until 5.", order: 12 },
  { title: "〜ましょう — let's / shall", level: "N5", structure: "Verb (masu-stem) + ましょう", meaning: "let's ~ / shall we ~", explanation: "Volitional polite form — invites/suggests an action together. 行きましょう = let's go.", exampleJp: "一緒に食べましょう。", exampleEn: "Let's eat together.", order: 13 },
  { title: "〜たい — want to (do)", level: "N5", structure: "Verb (masu-stem) + たい", meaning: "want to (do something)", explanation: "Attaches to the verb stem to express the speaker's desire. Conjugates as an i-adjective: 食べたくない (don't want to eat).", exampleJp: "日本へ行きたいです。", exampleEn: "I want to go to Japan.", order: 14 },
  { title: "〜ている — ongoing / state", level: "N5", structure: "Verb (te-form) + いる", meaning: "is ~ing / state of being", explanation: "Expresses an ongoing action (今、本を読んでいる — I'm reading now) or a continuing state resulting from an action (彼は結婚している — He is married).", exampleJp: "今、雨が降っています。", exampleEn: "It is raining now.", order: 15 },
  { title: "〜ない — negative plain", level: "N5", structure: "Verb (nai-stem) + ない", meaning: "not ~ (plain negative)", explanation: "Plain negative form of verbs. 食べる → 食べない (don't eat). 行く → 行かない (don't go). Polite equivalent: 〜ません.", exampleJp: "肉を食べない。", exampleEn: "I don't eat meat.", order: 16 },
  { title: "〜て — te-form (connective)", level: "N5", structure: "Verb (te-form)", meaning: "do A and (then) do B / please do", explanation: "The te-form connects actions: 食べて、寝る (eat then sleep). Used for requests with ください: 見てください (please look).", exampleJp: "朝起きて、顔を洗います。", exampleEn: "I wake up in the morning and wash my face.", exampleJp2: "これを見てください。", exampleEn2: "Please look at this.", order: 17 },
  { title: "〜た — past plain", level: "N5", structure: "Verb (ta-form)", meaning: "did ~ (plain past)", explanation: "Plain past form. 食べる → 食べた (ate). Polite: 〜ました. Negative past: 食べなかった.", exampleJp: "昨日、映画を見た。", exampleEn: "Yesterday I watched a movie.", order: 18 },
  { title: "〜より〜のほうが — comparison", level: "N5", structure: "A より B のほうが Adj", meaning: "B is more ~ than A", explanation: "Used to compare two things. A より B のほうが高い = B is more expensive than A.", exampleJp: "バスより電車のほうが速いです。", exampleEn: "The train is faster than the bus.", order: 19 },
  { title: "〜一番 — superlative", level: "N5", structure: "[category] で 一番 + Adj", meaning: "the most ~ in/among", explanation: "Expresses the superlative ('the most'). クラスで一番高い = the tallest in the class.", exampleJp: "果物の中で一番好きなのは何ですか。", exampleEn: "What do you like most among fruits?", order: 20 },
  // N4
  { title: "〜ているところ — in the middle of", level: "N4", structure: "Verb (te-form) + いる ところ です", meaning: "in the middle of doing ~", explanation: "Expresses that an action is currently in progress. ご飯を食べているところです = I'm in the middle of eating.", exampleJp: "今、レポートを書いているところです。", exampleEn: "I'm in the middle of writing the report now.", order: 1 },
  { title: "〜たばかり — just did", level: "N4", structure: "Verb (ta-form) + ばかり", meaning: "just finished doing ~", explanation: "Indicates that an action was just completed a short time ago. 日本に来たばかりです = I just arrived in Japan.", exampleJp: "昼ご飯を食べたばかりです。", exampleEn: "I just ate lunch.", order: 2 },
  { title: "〜てもいい — permission", level: "N4", structure: "Verb (te-form) + も いい", meaning: "may / it's okay to", explanation: "Asks for or grants permission. 入ってもいいですか = May I come in?", exampleJp: "ここに座ってもいいですか。", exampleEn: "May I sit here?", order: 3 },
  { title: "〜てはいけない — prohibition", level: "N4", structure: "Verb (te-form) + は いけない", meaning: "must not / forbidden to", explanation: "Expresses prohibition. 食べてはいけない = you must not eat it.", exampleJp: "ここで写真を撮ってはいけません。", exampleEn: "You must not take photos here.", order: 4 },
  { title: "〜なければならない — must", level: "N4", structure: "Verb (nai-stem) + なければ ならない", meaning: "must / have to", explanation: "Expresses obligation. 行かなければならない = I must go. Polite: 〜なければなりません.", exampleJp: "薬を飲まなければなりません。", exampleEn: "I have to take my medicine.", order: 5 },
  { title: "〜なくてもいい — don't have to", level: "N4", structure: "Verb (nai-stem) + なくても いい", meaning: "don't have to / need not", explanation: "Expresses lack of obligation. 行かなくてもいい = you don't have to go.", exampleJp: "明日来なくてもいいです。", exampleEn: "You don't have to come tomorrow.", order: 6 },
  { title: "〜たら — conditional (if/when)", level: "N4", structure: "Verb (ta-form) + ら", meaning: "if / when ~ happens", explanation: "A general conditional covering both 'if' and 'when'. 雨が降ったら、行かない (If it rains, I won't go).", exampleJp: "時間があったら、遊びに行きます。", exampleEn: "If I have time, I'll go hang out.", order: 7 },
  { title: "〜ば — conditional (hypothetical)", level: "N4", structure: "Verb (ba-form) + ば", meaning: "if (hypothetical)", explanation: "Another conditional form, often for general truths / hypotheticals. 雨が降れば、試合は中止 (If it rains, the game is cancelled).", exampleJp: "天気がよければ、出かけます。", exampleEn: "If the weather is good, I'll go out.", order: 8 },
  { title: "〜と — conditional (natural result)", level: "N4", structure: "Verb (dictionary form) + と", meaning: "whenever / when ~ (always)", explanation: "Used for natural/habitual consequences: 春になると、花が咲く (When spring comes, flowers bloom). Implies inevitable result — not for requests/intentions.", exampleJp: "このボタンを押すと、ドアが開きます。", exampleEn: "When you press this button, the door opens.", order: 9 },
  { title: "〜ましょうか — shall I?", level: "N4", structure: "Verb (masu-stem) + ましょう か", meaning: "shall I ~ (offer help)", explanation: "Offers to do something for someone. 荷物を持ちましょうか = Shall I carry your luggage?", exampleJp: "窓を開けましょうか。", exampleEn: "Shall I open the window?", order: 10 },
  { title: "〜てあげる / 〜てもらう / 〜てくれる — favors", level: "N4", structure: "Verb (te-form) + あげる/もらう/くれる", meaning: "do (a favor) for / receive a favor", explanation: "あげる: I do for someone. くれる: someone does for me. もらう: I receive someone's action. Use carefully — あげる can sound condescending toward superiors.", exampleJp: "友達に本を貸してあげました。", exampleEn: "I lent a book to my friend.", exampleJp2: "先生は私に日本語を教えてくれました。", exampleEn2: "The teacher taught me Japanese.", order: 11 },
  { title: "〜そうです (hearsay) — I heard that", level: "N4", structure: "Plain form + そうです", meaning: "I heard that ~ / they say ~", explanation: "Reports information from someone else. 明日雨が降るそうです = I heard it will rain tomorrow. Different from the conjectural 〜そう (looks like).", exampleJp: "田中さんは来月結婚するそうです。", exampleEn: "I heard Tanaka-san is getting married next month.", order: 12 },
  { title: "〜そうです (conjecture) — looks like", level: "N4", structure: "Verb stem / Adj stem + そうです", meaning: "looks like / seems", explanation: "Expresses appearance-based conjecture. 美味しそう = looks delicious. 雨が降りそう = it looks like it'll rain. Different from hearsay 〜そうです.", exampleJp: "このケーキ、美味しそうですね。", exampleEn: "This cake looks delicious, doesn't it.", order: 13 },
  { title: "〜たがる — want (3rd person)", level: "N4", structure: "Verb (masu-stem) + たがる", meaning: "wants to (3rd person)", explanation: "Use たい for your own desire. For 3rd person's desire you cannot know directly, so たがる is used: 彼は行きたがっている (he wants to go).", exampleJp: "弟は新しいゲームを欲しがっています。", exampleEn: "My little brother wants the new game.", order: 14 },
  { title: "〜つもり — intention", level: "N4", structure: "Verb (dictionary/ta form) + つもり です", meaning: "intend to", explanation: "States a plan or intention. 行くつもりです = I intend to go. Negative: 行かないつもりです = I don't intend to go.", exampleJp: "来年、日本へ行くつもりです。", exampleEn: "I intend to go to Japan next year.", order: 15 },
  { title: "〜ながら — while doing", level: "N4", structure: "Verb (masu-stem) + ながら", meaning: "while doing ~ / simultaneously", explanation: "Two actions performed at the same time. 音楽を聴きながら勉強する = study while listening to music.", exampleJp: "歩きながら電話する。", exampleEn: "I talk on the phone while walking.", order: 16 },
  { title: "〜てから — after doing", level: "N4", structure: "Verb (te-form) + から", meaning: "after doing ~", explanation: "Sequence: action A (te-form + から) then action B. ご飯を食べてから、出かける = after eating, I go out.", exampleJp: "手を洗ってから、ご飯を食べましょう。", exampleEn: "Let's eat after washing our hands.", order: 17 },
  { title: "〜し — and what's more", level: "N4", structure: "Clause 1 し、Clause 2 し", meaning: "besides / and what's more (reasons)", explanation: "Lists reasons or characteristics, often implying 'therefore'. 安いし、美味しいし、よく行く (It's cheap, it's good, so I go often).", exampleJp: "天気もいいし、時間もあるし、散歩しましょう。", exampleEn: "The weather is nice, we have time, so let's go for a walk.", order: 18 },
  // N3
  { title: "〜かもしれません — might / perhaps", level: "N3", structure: "Plain form + かもしれません", meaning: "might / perhaps ~", explanation: "Expresses possibility (around 50% certainty). 明日雨が降るかもしれません = It might rain tomorrow.", exampleJp: "彼は来ないかもしれません。", exampleEn: "He might not come.", order: 1 },
  { title: "〜はず — expectation", level: "N3", structure: "Plain form + はず です", meaning: "should be / supposed to be", explanation: "Expresses a logical expectation. もう着いているはずです = he should have arrived already (by reasoning).", exampleJp: "この時計は高いから、正確なはずです。", exampleEn: "This watch is expensive, so it should be accurate.", order: 2 },
  { title: "〜に違いない — no doubt", level: "N3", structure: "Plain form + に違いない", meaning: "there is no doubt that ~", explanation: "Strong conjecture — 'surely / definitely'. 彼が犯人に違いない = he must be the culprit.", exampleJp: "彼は絶対成功するに違いない。", exampleEn: "He will surely succeed.", order: 3 },
  { title: "〜ようだ — seems (appearance)", level: "N3", structure: "Plain form + よう だ", meaning: "it seems that / it looks like", explanation: "Conjecture based on sensory evidence or situations. 雨が降っているようだ = it seems to be raining.", exampleJp: "彼は疲れているようだ。", exampleEn: "He seems tired.", order: 4 },
  { title: "〜らしい — typical of / seems", level: "N3", structure: "Noun + らしい / Plain form + らしい", meaning: "seems to be / typical of", explanation: "Reports hearsay or typical characteristics. 春らしい天気 = weather typical of spring. 彼は来ないらしい = I hear he isn't coming.", exampleJp: "彼女は今日、病気らしい。", exampleEn: "It seems she is sick today.", order: 5 },
  { title: "〜みたいだ — seems (casual)", level: "N3", structure: "Plain form + みたい だ", meaning: "looks like / seems (casual)", explanation: "Casual equivalent of ようだ. 雨みたい = looks like rain. Very common in speech.", exampleJp: "彼、忙しいみたいだね。", exampleEn: "Looks like he's busy.", order: 6 },
  { title: "〜てしまう — completion/regret", level: "N3", structure: "Verb (te-form) + しまう", meaning: "do completely / end up ~ing (regret)", explanation: "Two nuances: (1) completing an action fully, (2) doing something with a sense of regret/accident. 食べてしまった = I ate it all (oops).", exampleJp: "うっかり財布を忘れてしまった。", exampleEn: "I accidentally left my wallet behind.", order: 7 },
  { title: "〜ておく — do in advance / leave as is", level: "N3", structure: "Verb (te-form) + おく", meaning: "do in advance / leave (a state)", explanation: "Do something now in preparation, or leave something as it is. 明日の準備をしておく = I'll prepare for tomorrow (in advance).", exampleJp: "窓を開けておいてください。", exampleEn: "Please leave the window open.", order: 8 },
  { title: "〜てみる — try doing", level: "N3", structure: "Verb (te-form) + みる", meaning: "try doing ~ (to see what happens)", explanation: "Attempting an action to experience/learn the result. この料理を食べてみる = I'll try eating this dish.", exampleJp: "一度、日本語で話してみてください。", exampleEn: "Please try speaking in Japanese once.", order: 9 },
  { title: "〜ことがある — sometimes / there are times", level: "N3", structure: "Verb (dictionary/ta form) + ことが ある", meaning: "there are times when ~ / sometimes", explanation: "Indicates occasional occurrence. 朝ご飯を食べないことがある = there are times I don't eat breakfast.", exampleJp: "彼に会うことがあります。", exampleEn: "There are times I see him.", order: 10 },
  { title: "〜ことにする — decide to", level: "N3", structure: "Verb (dictionary/ta form) + ことに する", meaning: "decide to ~ (one's own decision)", explanation: "Expresses a personal decision. 来月から日本語を勉強することにした = I decided to study Japanese from next month.", exampleJp: "今度の週末は家で休むことにした。", exampleEn: "I decided to rest at home this weekend.", order: 11 },
  { title: "〜ことになる — be decided that", level: "N3", structure: "Verb (dictionary/nai form) + ことに なる", meaning: "it has been decided that ~", explanation: "A decision made externally (by others / a plan). 来年東京へ転勤することになった = it's been decided I'll be transferred to Tokyo next year.", exampleJp: "来月、日本へ出張することになりました。", exampleEn: "It's been decided I'll go on a business trip to Japan next month.", order: 12 },
  { title: "〜ようになる — come to ~ (change)", level: "N3", structure: "Verb (dictionary/nai form) + ように なる", meaning: "come to ~ / reach the point where ~", explanation: "Describes a gradual change leading to a new ability/state. 日本語が話せるようになった = I've become able to speak Japanese.", exampleJp: "最近、早く起きられるようになりました。", exampleEn: "Recently I've become able to wake up early.", order: 13 },
  { title: "〜ようにする — make sure to / try to", level: "N3", structure: "Verb (dictionary/nai form) + ように する", meaning: "make sure to / try to ~", explanation: "Deliberate effort to do (or avoid) an action. 毎日運動するようにしている = I try to exercise every day.", exampleJp: "遅刻しないようにしています。", exampleEn: "I make sure not to be late.", order: 14 },
  { title: "〜ばかり — only / nothing but", level: "N3", structure: "Noun/Verb (ta form) + ばかり", meaning: "only / nothing but", explanation: "Indicates that something is the only thing (with a slightly negative nuance of excess). 損ばかりしている = I keep losing. 言い訳ばかりする = he does nothing but make excuses.", exampleJp: "甘いものばかり食べている。", exampleEn: "I eat nothing but sweets.", order: 15 },
  { title: "〜てたまらない — unbearably", level: "N3", structure: "Verb/Adj (te-form) + たまらない", meaning: "unbearably ~ / can't stand", explanation: "Expresses an emotion or sensation that's unbearable. 暑くてたまらない = it's so hot I can't stand it.", exampleJp: "喉が渇いてたまらない。", exampleEn: "I'm unbearably thirsty.", order: 16 },
  { title: "〜ないで — without doing", level: "N3", structure: "Verb (nai-stem) + ないで", meaning: "without doing ~", explanation: "Two actions where one is NOT done. 朝ご飯を食べないで学校へ行った = I went to school without eating breakfast.", exampleJp: "辞書を使わないで、読んでみました。", exampleEn: "I tried reading without using a dictionary.", order: 17 },
  { title: "〜ないと / 〜なきゃ — must (casual)", level: "N3", structure: "Verb (nai-stem) + ないと / なきゃ", meaning: "have to / must (casual speech)", explanation: "Casual truncation of 〜なければならない. 行かないと = I've gotta go. 行かなきゃ = I've gotta go.", exampleJp: "もう行かないと。", exampleEn: "I've gotta go now.", order: 18 },
];

type Kanji = {
  character: string; onyomi: string; kunyomi: string; meaning: string;
  level: "N5" | "N4" | "N3"; strokeCount: number; radical?: string;
  mnemonic?: string;
  exampleWord?: string; exampleRead?: string; exampleMean?: string; order?: number;
};

const KANJI: Kanji[] = [
  // N5
  { character: "一", onyomi: "イチ", kunyomi: "ひと", meaning: "one", level: "N5", strokeCount: 1, radical: "一", exampleWord: "一月", exampleRead: "いちがつ", exampleMean: "January", order: 1 },
  { character: "二", onyomi: "ニ", kunyomi: "ふた", meaning: "two", level: "N5", strokeCount: 2, radical: "二", exampleWord: "二人", exampleRead: "ふたり", exampleMean: "two people", order: 2 },
  { character: "三", onyomi: "サン", kunyomi: "み", meaning: "three", level: "N5", strokeCount: 3, radical: "一", exampleWord: "三月", exampleRead: "さんがつ", exampleMean: "March", order: 3 },
  { character: "四", onyomi: "シ", kunyomi: "よん,よ", meaning: "four", level: "N5", strokeCount: 5, radical: "口", exampleWord: "四つ", exampleRead: "よっつ", exampleMean: "four (items)", order: 4 },
  { character: "五", onyomi: "ゴ", kunyomi: "いつ", meaning: "five", level: "N5", strokeCount: 4, radical: "二", exampleWord: "五分", exampleRead: "ごふん", exampleMean: "five minutes", order: 5 },
  { character: "六", onyomi: "ロク", kunyomi: "む", meaning: "six", level: "N5", strokeCount: 4, radical: "八", exampleWord: "六月", exampleRead: "ろくがつ", exampleMean: "June", order: 6 },
  { character: "七", onyomi: "シチ", kunyomi: "なな", meaning: "seven", level: "N5", strokeCount: 2, radical: "一", exampleWord: "七つ", exampleRead: "ななつ", exampleMean: "seven (items)", order: 7 },
  { character: "八", onyomi: "ハチ", kunyomi: "や", meaning: "eight", level: "N5", strokeCount: 2, radical: "八", exampleWord: "八百", exampleRead: "はっぴゃく", exampleMean: "eight hundred", order: 8 },
  { character: "九", onyomi: "キュウ,ク", kunyomi: "ここの", meaning: "nine", level: "N5", strokeCount: 2, radical: "乙", exampleWord: "九月", exampleRead: "くがつ", exampleMean: "September", order: 9 },
  { character: "十", onyomi: "ジュウ", kunyomi: "とお", meaning: "ten", level: "N5", strokeCount: 2, radical: "十", exampleWord: "十分", exampleRead: "じゅっぷん", exampleMean: "ten minutes", order: 10 },
  { character: "百", onyomi: "ヒャク", kunyomi: "—", meaning: "hundred", level: "N5", strokeCount: 6, radical: "白", exampleWord: "三百", exampleRead: "さんびゃく", exampleMean: "300", order: 11 },
  { character: "千", onyomi: "セン", kunyomi: "ち", meaning: "thousand", level: "N5", strokeCount: 3, radical: "十", exampleWord: "千円", exampleRead: "せんえん", exampleMean: "1000 yen", order: 12 },
  { character: "万", onyomi: "マン,バン", kunyomi: "—", meaning: "ten thousand", level: "N5", strokeCount: 3, radical: "一", exampleWord: "一万", exampleRead: "いちまん", exampleMean: "10,000", order: 13 },
  { character: "日", onyomi: "ニチ,ジツ", kunyomi: "ひ,か", meaning: "day, sun", level: "N5", strokeCount: 4, radical: "日", exampleWord: "日本", exampleRead: "にほん", exampleMean: "Japan", order: 14 },
  { character: "本", onyomi: "ホン", kunyomi: "もと", meaning: "book, origin", level: "N5", strokeCount: 5, radical: "木", exampleWord: "本棚", exampleRead: "ほんだな", exampleMean: "bookshelf", order: 15 },
  { character: "人", onyomi: "ジン,ニン", kunyomi: "ひと", meaning: "person", level: "N5", strokeCount: 2, radical: "人", exampleWord: "日本人", exampleRead: "にほんじん", exampleMean: "Japanese person", order: 16 },
  { character: "国", onyomi: "コク", kunyomi: "くに", meaning: "country", level: "N5", strokeCount: 8, radical: "囗", exampleWord: "外国", exampleRead: "がいこく", exampleMean: "foreign country", order: 17 },
  { character: "学", onyomi: "ガク", kunyomi: "まな", meaning: "study, learn", level: "N5", strokeCount: 8, radical: "子", exampleWord: "学校", exampleRead: "がっこう", exampleMean: "school", order: 18 },
  { character: "校", onyomi: "コウ", kunyomi: "—", meaning: "school", level: "N5", strokeCount: 10, radical: "木", exampleWord: "高校", exampleRead: "こうこう", exampleMean: "high school", order: 19 },
  { character: "生", onyomi: "セイ,ショウ", kunyomi: "い,う", meaning: "life, birth, student", level: "N5", strokeCount: 5, radical: "生", exampleWord: "学生", exampleRead: "がくせい", exampleMean: "student", order: 20 },
  { character: "先", onyomi: "セン", kunyomi: "さき", meaning: "before, ahead", level: "N5", strokeCount: 6, radical: "儿", exampleWord: "先生", exampleRead: "せんせい", exampleMean: "teacher", order: 21 },
  { character: "大", onyomi: "ダイ,タイ", kunyomi: "おお", meaning: "big, large", level: "N5", strokeCount: 3, radical: "大", exampleWord: "大きい", exampleRead: "おおきい", exampleMean: "big", order: 22 },
  { character: "小", onyomi: "ショウ", kunyomi: "ちい,こ", meaning: "small", level: "N5", strokeCount: 3, radical: "小", exampleWord: "小さい", exampleRead: "ちいさい", exampleMean: "small", order: 23 },
  { character: "中", onyomi: "チュウ", kunyomi: "なか", meaning: "middle, inside", level: "N5", strokeCount: 4, radical: "丨", exampleWord: "中国", exampleRead: "ちゅうごく", exampleMean: "China", order: 24 },
  { character: "上", onyomi: "ジョウ", kunyomi: "うえ", meaning: "up, above", level: "N5", strokeCount: 3, radical: "一", exampleWord: "上着", exampleRead: "うわぎ", exampleMean: "jacket", order: 25 },
  { character: "下", onyomi: "カ,ゲ", kunyomi: "した", meaning: "down, below", level: "N5", strokeCount: 3, radical: "一", exampleWord: "下着", exampleRead: "したぎ", exampleMean: "underwear", order: 26 },
  { character: "山", onyomi: "サン", kunyomi: "やま", meaning: "mountain", level: "N5", strokeCount: 3, radical: "山", exampleWord: "富士山", exampleRead: "ふじさん", exampleMean: "Mt. Fuji", order: 27 },
  { character: "川", onyomi: "セン", kunyomi: "かわ", meaning: "river", level: "N5", strokeCount: 3, radical: "川", exampleWord: "川", exampleRead: "かわ", exampleMean: "river", order: 28 },
  { character: "田", onyomi: "デン", kunyomi: "た", meaning: "rice field", level: "N5", strokeCount: 5, radical: "田", exampleWord: "田んぼ", exampleRead: "たんぼ", exampleMean: "paddy field", order: 29 },
  { character: "水", onyomi: "スイ", kunyomi: "みず", meaning: "water", level: "N5", strokeCount: 4, radical: "水", exampleWord: "水泳", exampleRead: "すいえい", exampleMean: "swimming", order: 30 },
  { character: "火", onyomi: "カ", kunyomi: "ひ", meaning: "fire", level: "N5", strokeCount: 4, radical: "火", exampleWord: "火山", exampleRead: "かざん", exampleMean: "volcano", order: 31 },
  { character: "木", onyomi: "モク,ボク", kunyomi: "き", meaning: "tree, wood", level: "N5", strokeCount: 4, radical: "木", exampleWord: "木曜日", exampleRead: "もくようび", exampleMean: "Thursday", order: 32 },
  { character: "金", onyomi: "キン,コン", kunyomi: "かね", meaning: "gold, money", level: "N5", strokeCount: 8, radical: "金", exampleWord: "金曜日", exampleRead: "きんようび", exampleMean: "Friday", order: 33 },
  { character: "土", onyomi: "ド,ト", kunyomi: "つち", meaning: "earth, soil", level: "N5", strokeCount: 3, radical: "土", exampleWord: "土曜日", exampleRead: "どようび", exampleMean: "Saturday", order: 34 },
  { character: "月", onyomi: "ゲツ,ガツ", kunyomi: "つき", meaning: "moon, month", level: "N5", strokeCount: 4, radical: "月", exampleWord: "月曜日", exampleRead: "げつようび", exampleMean: "Monday", order: 35 },
  { character: "年", onyomi: "ネン", kunyomi: "とし", meaning: "year", level: "N5", strokeCount: 6, radical: "干", exampleWord: "今年", exampleRead: "ことし", exampleMean: "this year", order: 36 },
  { character: "時", onyomi: "ジ", kunyomi: "とき", meaning: "time, hour", level: "N5", strokeCount: 10, radical: "日", exampleWord: "時間", exampleRead: "じかん", exampleMean: "time", order: 37 },
  { character: "分", onyomi: "フン,ブン", kunyomi: "わ", meaning: "minute, part", level: "N5", strokeCount: 4, radical: "刀", exampleWord: "十分", exampleRead: "じゅっぷん", exampleMean: "10 minutes", order: 38 },
  { character: "私", onyomi: "シ", kunyomi: "わたし", meaning: "I, private", level: "N5", strokeCount: 7, radical: "禾", exampleWord: "私", exampleRead: "わたし", exampleMean: "I", order: 39 },
  { character: "今", onyomi: "コン,キン", kunyomi: "いま", meaning: "now", level: "N5", strokeCount: 4, radical: "人", exampleWord: "今日", exampleRead: "きょう", exampleMean: "today", order: 40 },
  { character: "天", onyomi: "テン", kunyomi: "あめ", meaning: "sky, heaven", level: "N5", strokeCount: 4, radical: "大", exampleWord: "天気", exampleRead: "てんき", exampleMean: "weather", order: 41 },
  { character: "気", onyomi: "キ,ケ", kunyomi: "—", meaning: "spirit, air", level: "N5", strokeCount: 6, radical: "気", exampleWord: "元気", exampleRead: "げんき", exampleMean: "healthy", order: 42 },
  { character: "食", onyomi: "ショク", kunyomi: "た", meaning: "eat, food", level: "N5", strokeCount: 9, radical: "食", exampleWord: "食べる", exampleRead: "たべる", exampleMean: "to eat", order: 43 },
  { character: "飲", onyomi: "イン", kunyomi: "の", meaning: "drink", level: "N5", strokeCount: 12, radical: "食", exampleWord: "飲み物", exampleRead: "のみもの", exampleMean: "drink", order: 44 },
  { character: "行", onyomi: "コウ,ギョウ", kunyomi: "い", meaning: "go, conduct", level: "N5", strokeCount: 6, radical: "行", exampleWord: "行く", exampleRead: "いく", exampleMean: "to go", order: 45 },
  { character: "来", onyomi: "ライ", kunyomi: "く", meaning: "come", level: "N5", strokeCount: 7, radical: "木", exampleWord: "来年", exampleRead: "らいねん", exampleMean: "next year", order: 46 },
  { character: "見", onyomi: "ケン", kunyomi: "み", meaning: "see, look", level: "N5", strokeCount: 7, radical: "見", exampleWord: "見る", exampleRead: "みる", exampleMean: "to see", order: 47 },
  { character: "聞", onyomi: "ブン,モン", kunyomi: "き", meaning: "hear, ask", level: "N5", strokeCount: 14, radical: "耳", exampleWord: "聞く", exampleRead: "きく", exampleMean: "to listen", order: 48 },
  { character: "読", onyomi: "ドク,トク", kunyomi: "よ", meaning: "read", level: "N5", strokeCount: 14, radical: "言", exampleWord: "読む", exampleRead: "よむ", exampleMean: "to read", order: 49 },
  { character: "書", onyomi: "ショ", kunyomi: "か", meaning: "write", level: "N5", strokeCount: 10, radical: "聿", exampleWord: "書く", exampleRead: "かく", exampleMean: "to write", order: 50 },
  { character: "話", onyomi: "ワ", kunyomi: "はな", meaning: "talk, story", level: "N5", strokeCount: 13, radical: "言", exampleWord: "話す", exampleRead: "はなす", exampleMean: "to speak", order: 51 },
  { character: "車", onyomi: "シャ", kunyomi: "くるま", meaning: "car", level: "N5", strokeCount: 7, radical: "車", exampleWord: "電車", exampleRead: "でんしゃ", exampleMean: "train", order: 52 },
  { character: "電", onyomi: "デン", kunyomi: "—", meaning: "electricity", level: "N5", strokeCount: 13, radical: "雨", exampleWord: "電話", exampleRead: "でんわ", exampleMean: "telephone", order: 53 },
  // N4
  { character: "持", onyomi: "ジ", kunyomi: "も", meaning: "hold, have", level: "N4", strokeCount: 9, radical: "扌", exampleWord: "持つ", exampleRead: "もつ", exampleMean: "to hold", order: 1 },
  { character: "待", onyomi: "タイ", kunyomi: "ま", meaning: "wait", level: "N4", strokeCount: 9, radical: "彳", exampleWord: "待つ", exampleRead: "まつ", exampleMean: "to wait", order: 2 },
  { character: "働", onyomi: "ドウ", kunyomi: "はたら", meaning: "work", level: "N4", strokeCount: 13, radical: "口", exampleWord: "働く", exampleRead: "はたらく", exampleMean: "to work", order: 3 },
  { character: "使", onyomi: "シ", kunyomi: "つか", meaning: "use", level: "N4", strokeCount: 8, radical: "人", exampleWord: "使う", exampleRead: "つかう", exampleMean: "to use", order: 4 },
  { character: "作", onyomi: "サク,サ", kunyomi: "つく", meaning: "make", level: "N4", strokeCount: 7, radical: "人", exampleWord: "作る", exampleRead: "つくる", exampleMean: "to make", order: 5 },
  { character: "教", onyomi: "キョウ", kunyomi: "おし", meaning: "teach", level: "N4", strokeCount: 11, radical: "攵", exampleWord: "教える", exampleRead: "おしえる", exampleMean: "to teach", order: 6 },
  { character: "考", onyomi: "コウ", kunyomi: "かんが", meaning: "think", level: "N4", strokeCount: 6, radical: "老", exampleWord: "考える", exampleRead: "かんがえる", exampleMean: "to think", order: 7 },
  { character: "借", onyomi: "シャク", kunyomi: "か", meaning: "borrow", level: "N4", strokeCount: 10, radical: "人", exampleWord: "借りる", exampleRead: "かりる", exampleMean: "to borrow", order: 8 },
  { character: "返", onyomi: "ヘン", kunyomi: "かえ", meaning: "return", level: "N4", strokeCount: 7, radical: "辶", exampleWord: "返す", exampleRead: "かえす", exampleMean: "to return", order: 9 },
  { character: "忘", onyomi: "ボウ", kunyomi: "わす", meaning: "forget", level: "N4", strokeCount: 7, radical: "心", exampleWord: "忘れる", exampleRead: "わすれる", exampleMean: "to forget", order: 10 },
  { character: "忙", onyomi: "ボウ", kunyomi: "いそが", meaning: "busy", level: "N4", strokeCount: 6, radical: "心", exampleWord: "忙しい", exampleRead: "いそがしい", exampleMean: "busy", order: 11 },
  { character: "広", onyomi: "コウ", kunyomi: "ひろ", meaning: "wide", level: "N4", strokeCount: 5, radical: "广", exampleWord: "広い", exampleRead: "ひろい", exampleMean: "spacious", order: 12 },
  { character: "狭", onyomi: "キョウ", kunyomi: "せま", meaning: "narrow", level: "N4", strokeCount: 10, radical: "犬", exampleWord: "狭い", exampleRead: "せまい", exampleMean: "narrow", order: 13 },
  { character: "病", onyomi: "ビョウ", kunyomi: "や", meaning: "illness", level: "N4", strokeCount: 10, radical: "疒", exampleWord: "病気", exampleRead: "びょうき", exampleMean: "illness", order: 14 },
  { character: "院", onyomi: "イン", kunyomi: "—", meaning: "institution", level: "N4", strokeCount: 11, radical: "阝", exampleWord: "病院", exampleRead: "びょういん", exampleMean: "hospital", order: 15 },
  { character: "約", onyomi: "ヤク", kunyomi: "—", meaning: "promise, approx.", level: "N4", strokeCount: 9, radical: "糸", exampleWord: "約束", exampleRead: "やくそく", exampleMean: "promise", order: 16 },
  { character: "旅", onyomi: "リョ", kunyomi: "たび", meaning: "travel", level: "N4", strokeCount: 10, radical: "方", exampleWord: "旅行", exampleRead: "りょこう", exampleMean: "trip", order: 17 },
  { character: "重", onyomi: "ジュウ,チョウ", kunyomi: "おも", meaning: "heavy", level: "N4", strokeCount: 9, radical: "里", exampleWord: "重要", exampleRead: "じゅうよう", exampleMean: "important", order: 18 },
  { character: "物", onyomi: "ブツ,モツ", kunyomi: "もの", meaning: "thing", level: "N4", strokeCount: 8, radical: "牛", exampleWord: "飲み物", exampleRead: "のみもの", exampleMean: "drink", order: 19 },
  { character: "会", onyomi: "カイ", kunyomi: "あ", meaning: "meet", level: "N4", strokeCount: 6, radical: "人", exampleWord: "会議", exampleRead: "かいぎ", exampleMean: "meeting", order: 20 },
  // N3
  { character: "比", onyomi: "ヒ", kunyomi: "くら", meaning: "compare", level: "N3", strokeCount: 4, radical: "比", exampleWord: "比べる", exampleRead: "くらべる", exampleMean: "to compare", order: 1 },
  { character: "較", onyomi: "カク", kunyomi: "—", meaning: "compare", level: "N3", strokeCount: 13, radical: "車", exampleWord: "比較", exampleRead: "ひかく", exampleMean: "comparison", order: 2 },
  { character: "集", onyomi: "シュウ", kunyomi: "あつ", meaning: "gather", level: "N3", strokeCount: 12, radical: "隹", exampleWord: "集める", exampleRead: "あつめる", exampleMean: "to collect", order: 3 },
  { character: "決", onyomi: "ケツ", kunyomi: "き", meaning: "decide", level: "N3", strokeCount: 7, radical: "氵", exampleWord: "決める", exampleRead: "きめる", exampleMean: "to decide", order: 4 },
  { character: "感", onyomi: "カン", kunyomi: "—", meaning: "feeling", level: "N3", strokeCount: 13, radical: "心", exampleWord: "感じる", exampleRead: "かんじる", exampleMean: "to feel", order: 5 },
  { character: "関", onyomi: "カン", kunyomi: "せき", meaning: "relation, barrier", level: "N3", strokeCount: 14, radical: "門", exampleWord: "関係", exampleRead: "かんけい", exampleMean: "relation", order: 6 },
  { character: "係", onyomi: "ケイ", kunyomi: "かか", meaning: "relation", level: "N3", strokeCount: 9, radical: "人", exampleWord: "関係", exampleRead: "かんけい", exampleMean: "relation", order: 7 },
  { character: "限", onyomi: "ゲン", kunyomi: "かぎ", meaning: "limit", level: "N3", strokeCount: 8, radical: "阝", exampleWord: "限界", exampleRead: "げんかい", exampleMean: "limit", order: 8 },
  { character: "界", onyomi: "カイ", kunyomi: "—", meaning: "world, boundary", level: "N3", strokeCount: 9, radical: "田", exampleWord: "世界", exampleRead: "せかい", exampleMean: "world", order: 9 },
  { character: "利", onyomi: "リ", kunyomi: "き", meaning: "profit, benefit", level: "N3", strokeCount: 7, radical: "刂", exampleWord: "利益", exampleRead: "りえき", exampleMean: "profit", order: 10 },
  { character: "益", onyomi: "エキ", kunyomi: "—", meaning: "benefit", level: "N3", strokeCount: 10, radical: "皿", exampleWord: "利益", exampleRead: "りえき", exampleMean: "profit", order: 11 },
  { character: "努", onyomi: "ド", kunyomi: "つと", meaning: "effort", level: "N3", strokeCount: 7, radical: "力", exampleWord: "努力", exampleRead: "どりょく", exampleMean: "effort", order: 12 },
  { character: "力", onyomi: "リョク,リキ", kunyomi: "ちから", meaning: "power, strength", level: "N3", strokeCount: 2, radical: "力", exampleWord: "努力", exampleRead: "どりょく", exampleMean: "effort", order: 13 },
  { character: "態", onyomi: "タイ", kunyomi: "—", meaning: "attitude, state", level: "N3", strokeCount: 14, radical: "心", exampleWord: "態度", exampleRead: "たいど", exampleMean: "attitude", order: 14 },
  { character: "度", onyomi: "ド", kunyomi: "—", meaning: "degree, times", level: "N3", strokeCount: 9, radical: "广", exampleWord: "態度", exampleRead: "たいど", exampleMean: "attitude", order: 15 },
  { character: "事", onyomi: "ジ", kunyomi: "こと", meaning: "thing, matter", level: "N3", strokeCount: 8, radical: "亅", exampleWord: "事実", exampleRead: "じじつ", exampleMean: "fact", order: 16 },
  { character: "実", onyomi: "ジツ", kunyomi: "み", meaning: "truth, reality", level: "N3", strokeCount: 8, radical: "宀", exampleWord: "事実", exampleRead: "じじつ", exampleMean: "fact", order: 17 },
  { character: "内", onyomi: "ナイ,ダイ", kunyomi: "うち", meaning: "inside", level: "N3", strokeCount: 4, radical: "冂", exampleWord: "内容", exampleRead: "ないよう", exampleMean: "content", order: 18 },
  { character: "容", onyomi: "ヨウ", kunyomi: "—", meaning: "form, content", level: "N3", strokeCount: 10, radical: "宀", exampleWord: "内容", exampleRead: "ないよう", exampleMean: "content", order: 19 },
  { character: "状", onyomi: "ジョウ", kunyomi: "—", meaning: "condition", level: "N3", strokeCount: 7, radical: "犬", exampleWord: "状況", exampleRead: "じょうきょう", exampleMean: "situation", order: 20 },
  { character: "況", onyomi: "キョウ", kunyomi: "—", meaning: "condition", level: "N3", strokeCount: 7, radical: "氵", exampleWord: "状況", exampleRead: "じょうきょう", exampleMean: "situation", order: 21 },
  { character: "機", onyomi: "キ", kunyomi: "—", meaning: "opportunity, machine", level: "N3", strokeCount: 16, radical: "木", exampleWord: "機会", exampleRead: "きかい", exampleMean: "opportunity", order: 22 },
  { character: "複", onyomi: "フク", kunyomi: "—", meaning: "complex, double", level: "N3", strokeCount: 14, radical: "衣", exampleWord: "複雑", exampleRead: "ふくざつ", exampleMean: "complicated", order: 23 },
  { character: "雑", onyomi: "ザツ,ゾウ", kunyomi: "—", meaning: "complex, mixed", level: "N3", strokeCount: 14, radical: "隹", exampleWord: "複雑", exampleRead: "ふくざつ", exampleMean: "complicated", order: 24 },
  { character: "単", onyomi: "タン", kunyomi: "—", meaning: "simple, single", level: "N3", strokeCount: 9, radical: "十", exampleWord: "単純", exampleRead: "たんじゅん", exampleMean: "simple", order: 25 },
  { character: "純", onyomi: "ジュン", kunyomi: "—", meaning: "pure", level: "N3", strokeCount: 10, radical: "糸", exampleWord: "単純", exampleRead: "たんじゅん", exampleMean: "simple", order: 26 },
  { character: "豊", onyomi: "ホウ", kunyomi: "ゆた", meaning: "rich, abundant", level: "N3", strokeCount: 13, radical: "豆", exampleWord: "豊か", exampleRead: "ゆたか", exampleMean: "abundant", order: 27 },
  { character: "貧", onyomi: "ヒン", kunyomi: "まず", meaning: "poor", level: "N3", strokeCount: 11, radical: "貝", exampleWord: "貧乏", exampleRead: "びんぼう", exampleMean: "poor", order: 28 },
  { character: "乏", onyomi: "ボウ", kunyomi: "—", meaning: "lacking", level: "N3", strokeCount: 5, radical: "丿", exampleWord: "貧乏", exampleRead: "びんぼう", exampleMean: "poor", order: 29 },
  { character: "細", onyomi: "サイ", kunyomi: "ほそ,こま", meaning: "fine, detailed", level: "N3", strokeCount: 11, radical: "糸", exampleWord: "細かい", exampleRead: "こまかい", exampleMean: "detailed", order: 30 },
  { character: "鋭", onyomi: "エイ", kunyomi: "するど", meaning: "sharp", level: "N3", strokeCount: 12, radical: "金", exampleWord: "鋭い", exampleRead: "するどい", exampleMean: "sharp", order: 31 },
  { character: "応", onyomi: "オウ", kunyomi: "—", meaning: "respond", level: "N3", strokeCount: 7, radical: "心", exampleWord: "応援", exampleRead: "おうえん", exampleMean: "support", order: 32 },
  { character: "援", onyomi: "エン", kunyomi: "—", meaning: "support, aid", level: "N3", strokeCount: 12, radical: "扌", exampleWord: "応援", exampleRead: "おうえん", exampleMean: "support", order: 33 },
  { character: "解", onyomi: "カイ,ゲ", kunyomi: "と", meaning: "solve, understand", level: "N3", strokeCount: 13, radical: "角", exampleWord: "解決", exampleRead: "かいけつ", exampleMean: "resolution", order: 34 },
  { character: "影", onyomi: "エイ", kunyomi: "かげ", meaning: "shadow, influence", level: "N3", strokeCount: 15, radical: "彡", exampleWord: "影響", exampleRead: "えいきょう", exampleMean: "influence", order: 35 },
  { character: "響", onyomi: "キョウ", kunyomi: "ひび", meaning: "echo, influence", level: "N3", strokeCount: 20, radical: "音", exampleWord: "影響", exampleRead: "えいきょう", exampleMean: "influence", order: 36 },
];

type Resource = {
  title: string; url: string; type: "video" | "playlist" | "channel";
  level: "N5" | "N4" | "N3" | "all"; topic: string; description: string; order: number;
};

const RESOURCES: Resource[] = [
  { title: "Learn ALL Hiragana in 1 Hour – How to Write and Read Japanese (JapanesePod101)", url: "https://www.youtube.com/watch?v=6p9Il_j0zjc", type: "video", level: "all", topic: "kana", description: "JapanesePod101's comprehensive one-hour video that teaches every hiragana character with stroke order and pronunciation.", order: 1 },
  { title: "Learn ALL Katakana in 1 Hour – How to Write and Read Japanese (JapanesePod101)", url: "https://www.youtube.com/watch?v=s6DKRgtVLGA", type: "video", level: "all", topic: "kana", description: "Companion video to the hiragana lesson, covering all katakana characters with writing and reading practice.", order: 2 },
  { title: "Learn Japanese Hiragana in 30 Minutes – Taka Sensei", url: "https://www.youtube.com/watch?v=pycGn3RA_lA", type: "video", level: "N5", topic: "kana", description: "A focused 30-minute crash course that walks beginners through every hiragana character with pronunciation.", order: 3 },
  { title: "Kantan Kana – Learn Hiragana and Katakana (JapanesePod101 Playlist)", url: "https://www.youtube.com/playlist?list=PLA7DB863D6946E1CD", type: "playlist", level: "all", topic: "kana", description: "JapanesePod101's flagship kana series with short bite-sized episodes for each row of hiragana and katakana.", order: 4 },
  { title: "Hiragana & Katakana Writing and Reading Practice Playlist", url: "https://www.youtube.com/playlist?list=PLVGw_A21plC4pxEbXC3Sv_9N6NizqxM3M", type: "playlist", level: "N5", topic: "kana", description: "A practice playlist that drills both hiragana and katakana through guided reading and writing exercises.", order: 5 },
  { title: "Day 1 – Learn to Read Japanese Hiragana in 10 Days (JapanesePod101)", url: "https://www.youtube.com/watch?v=lEuPIb_ZUQU", type: "video", level: "N5", topic: "kana", description: "First episode of JapanesePod101's structured 10-day program that builds hiragana fluency one day at a time.", order: 6 },
  { title: "Every Grammar Form Needed to Pass the JLPT N5 Explained", url: "https://www.youtube.com/watch?v=MByHVq3D6hM", type: "video", level: "N5", topic: "grammar", description: "A single comprehensive lesson that reviews and explains every essential N5 grammar point for the JLPT.", order: 7 },
  { title: "N5 Grammar Video Lesson Playlist", url: "https://www.youtube.com/playlist?list=PLwnx0er3vBwC5L2TSLrVKc3ZpcxGNTNl2", type: "playlist", level: "N5", topic: "grammar", description: "A structured N5 grammar playlist that breaks each grammar point into short, digestible video lessons.", order: 8 },
  { title: "JLPT N5 Playlist (Nihongo Mori)", url: "https://www.youtube.com/playlist?list=PLd5-Wp_4tLqaDGh1kvlS_N0X3O_bTaKar", type: "playlist", level: "N5", topic: "grammar", description: "Nihongo Mori's complete JLPT N5 preparation playlist covering grammar, vocabulary, and exam strategy.", order: 9 },
  { title: "JLPT N5 Lessons – JLPT Preparation Playlist", url: "https://www.youtube.com/playlist?list=PL8dhMOKO4oIfIe7XxG0sRUe4wv5YOZOXe", type: "playlist", level: "N5", topic: "grammar", description: "A full JLPT N5 course playlist with Japanese-language lessons tailored to test takers.", order: 10 },
  { title: "N4 Grammar (Lesson 26–50) Playlist", url: "https://www.youtube.com/playlist?list=PLKOA3pgec-PZC0iiPU-WryKD_I3GbCWTR", type: "playlist", level: "N4", topic: "grammar", description: "Continuation series of N4 grammar lessons walking through grammar points 26 through 50 in order.", order: 11 },
  { title: "Japanese Grammar Lessons for JLPT N5 and N4 Playlist", url: "https://www.youtube.com/playlist?list=PLag_mhJfCJ-18WyYoklCPxIpYbeRgmWLJ", type: "playlist", level: "N4", topic: "grammar", description: "A combined N5/N4 grammar playlist ideal for learners bridging from beginner to lower-intermediate.", order: 12 },
  { title: "JLPT N4 Grammar Playlist", url: "https://www.youtube.com/playlist?list=PLQ0etXJhYzGVezQk7-cPJRlKXsdhLYCBw", type: "playlist", level: "N4", topic: "grammar", description: "A dedicated N4 grammar playlist that systematically covers each grammar form required for the test.", order: 13 },
  { title: "JLPT N4 Complete Course Playlist", url: "https://www.youtube.com/playlist?list=PLjA6gjjDDM--s_ag46N30Oo6_SmiymU8A", type: "playlist", level: "N4", topic: "grammar", description: "A full N4 course playlist combining grammar, vocabulary, and reading practice for complete JLPT prep.", order: 14 },
  { title: "JLPT N3 Grammar Playlist (Nihongo Mori)", url: "https://www.youtube.com/playlist?list=PL5ZeXmpb7b5ydHBcOdhTPVyW-jKuozMng", type: "playlist", level: "N3", topic: "grammar", description: "Nihongo Mori's N3 grammar playlist covering intermediate grammar forms with example sentences.", order: 15 },
  { title: "N3 Grammar Lessons – Japanese Language Playlist", url: "https://www.youtube.com/playlist?list=PLSig2rnlR8MEfivZf720r-1Xg3MF-eDhS", type: "playlist", level: "N3", topic: "grammar", description: "A clear N3 grammar lesson series that explains each grammar point with usage notes and examples.", order: 16 },
  { title: "JLPT N3 Grammar Playlist (Japanese Lessons)", url: "https://www.youtube.com/playlist?list=PLIHtFuQRls1e9TtTVYEEt2hrOAeMS-0dO", type: "playlist", level: "N3", topic: "grammar", description: "An intermediate-level grammar playlist designed to take N4 learners up to JLPT N3 readiness.", order: 17 },
  { title: "ToKini Andy – YouTube Channel", url: "https://www.youtube.com/@ToKiniAndy", type: "channel", level: "all", topic: "grammar", description: "ToKini Andy's channel featuring thorough Genki, Quartet, and Tobira textbook grammar walkthroughs for N5–N3.", order: 18 },
  { title: "Japanese Ammo with Misa – YouTube Channel", url: "https://www.youtube.com/@JapaneseAmmowithMisa", type: "channel", level: "all", topic: "grammar", description: "Misa's popular channel offering clear, friendly grammar lessons from beginner to advanced Japanese.", order: 19 },
  { title: "Organic Japanese with Cure Dolly – YouTube Channel", url: "https://www.youtube.com/channel/UCkdmU8hGK4Fg3LghTVtKltQ", type: "channel", level: "all", topic: "grammar", description: "Cure Dolly's organic Japanese series that explains grammar from a structural, intuition-first perspective.", order: 20 },
  { title: "Tae Kim – YouTube Channel", url: "https://www.youtube.com/user/taekimjapanese", type: "channel", level: "all", topic: "grammar", description: "Official channel of Tae Kim, author of the widely-used Guide to Japanese Grammar, with companion lessons.", order: 21 },
  { title: "JapanesePod101 – YouTube Channel", url: "https://www.youtube.com/@JapanesePod101", type: "channel", level: "all", topic: "grammar", description: "The official JapanesePod101 channel with thousands of lessons spanning kana, grammar, vocabulary, and listening.", order: 22 },
  { title: "Japanese From Zero! – Day 1 Video (George Trombley)", url: "https://www.youtube.com/watch?v=RsrakMT1h2g", type: "video", level: "N5", topic: "grammar", description: "The first lesson of George Trombley's beginner-friendly Japanese From Zero video course.", order: 23 },
  { title: "Japanese Ammo with Misa: は & です Grammar Lesson for Absolute Beginners", url: "https://www.youtube.com/watch?v=UneYOL0DQxk", type: "video", level: "N5", topic: "grammar", description: "Misa's first grammar lesson introducing the particles wa and desu for absolute beginners.", order: 24 },
  { title: "NihongoDekita with Sayaka – Japanese Lessons Playlist", url: "https://www.youtube.com/playlist?list=PLw0vy_XSt5QpztU_SqwoeZYScGfHApqDA", type: "playlist", level: "all", topic: "grammar", description: "Sayaka's structured lesson playlist covering grammar and vocabulary from beginner toward intermediate level.", order: 25 },
  { title: "Learn All 800 JLPT N5 Vocabulary (Complete!)", url: "https://www.youtube.com/watch?v=nuI4OgsJv_Q", type: "video", level: "N5", topic: "vocabulary", description: "A single comprehensive video that walks through all 800 essential JLPT N5 vocabulary words.", order: 26 },
  { title: "JLPT N5 Essential Vocabulary – 591 Words for Beginners", url: "https://www.youtube.com/watch?v=eOxwB6kVovY", type: "video", level: "N5", topic: "vocabulary", description: "A focused vocabulary review video covering 591 high-frequency N5 words with readings and meanings.", order: 27 },
  { title: "JLPT N5 Basic Japanese Vocabulary Playlist", url: "https://www.youtube.com/playlist?list=PLle9ZGT02Of-HSL2B3lJxVZJpX92SIeiM", type: "playlist", level: "N5", topic: "vocabulary", description: "A thematic N5 vocabulary playlist introducing words in manageable themed chunks.", order: 28 },
  { title: "JLPT N5 Vocabulary Playlist", url: "https://www.youtube.com/playlist?list=PLKLCM_iW-_9wLF1JFSHy5qvTJzo8DgyKa", type: "playlist", level: "N5", topic: "vocabulary", description: "A growing N5 vocabulary playlist with short videos grouped by word category and difficulty.", order: 29 },
  { title: "Kanji Practice for N5 (JLPT) – Reading and Writing 107", url: "https://www.youtube.com/watch?v=j8YwW-tj1WQ", type: "video", level: "N5", topic: "kanji", description: "A guided practice video that walks through the 107 kanji required for JLPT N5 with readings and stroke order.", order: 30 },
  { title: "Learn JLPT N4 and N5 Kanji Together", url: "https://www.youtube.com/watch?v=4lx-WKmAk5E", type: "video", level: "N4", topic: "kanji", description: "A combined N4/N5 kanji lesson that helps learners efficiently study overlapping kanji for both levels.", order: 31 },
  { title: "N5 Kanji Reading and Writing Practice Playlist", url: "https://www.youtube.com/playlist?list=PLVGw_A21plC4CNCpCAU_6j7eYcRSjvvyP", type: "playlist", level: "N5", topic: "kanji", description: "A playlist of N5 kanji practice videos covering readings, meanings, and proper stroke order.", order: 32 },
  { title: "N4 Kanji Reading and Writing Practice Playlist", url: "https://www.youtube.com/playlist?list=PLVGw_A21plC6fp8brdfxka6FDuXKjb0id", type: "playlist", level: "N4", topic: "kanji", description: "Companion N4 kanji playlist that builds on N5 kanji with more advanced readings and compounds.", order: 33 },
  { title: "Easy N4 Japanese Listening Practice (25 min)", url: "https://www.youtube.com/watch?v=j_BO-wLft5Q", type: "video", level: "N4", topic: "listening", description: "A 25-minute slow-paced listening practice video tailored to JLPT N4 learners.", order: 34 },
  { title: "Easy Japanese Listening Practice N4 (40 min)", url: "https://www.youtube.com/watch?v=q6AjmSuEyns", type: "video", level: "N4", topic: "listening", description: "A longer 40-minute N4 listening session ideal for daily immersion practice.", order: 35 },
  { title: "N4 Listening Practice Tests Playlist (JLPT / NAT)", url: "https://www.youtube.com/playlist?list=PLkGU7DnOLgRPxTNFRc7utpuwhWSQC35wC", type: "playlist", level: "N4", topic: "listening", description: "A playlist of JLPT/NAT-style N4 listening practice tests with answer explanations.", order: 36 },
  { title: "JLPT N4 Listening Practice with Answers Playlist", url: "https://www.youtube.com/playlist?list=PLMP8b3W1auVm_0GisNEHRmR8IRXqJ52HM", type: "playlist", level: "N4", topic: "listening", description: "A collection of N4 listening exercises complete with answer keys for self-checking.", order: 37 },
  { title: "Japanese with Shun – YouTube Channel (N5–N4 Listening Podcast)", url: "https://www.youtube.com/@JapanesewithShun", type: "channel", level: "N4", topic: "listening", description: "Shun's beginner-friendly channel of slow, natural Japanese podcasts perfect for N5–N4 listening immersion.", order: 38 },
  { title: "Miku Real Japanese – YouTube Channel", url: "https://www.youtube.com/channel/UCsQCbl3a9FtYvA55BxdzYiQ", type: "channel", level: "all", topic: "listening", description: "Miku's channel featuring natural, everyday Japanese conversations with subtitles for N5–N3 learners.", order: 39 },
  { title: "Easy Japanese Conversation N5–N3 with Miku Real Japanese", url: "https://www.youtube.com/watch?v=u8Z2Ec5y_9o", type: "video", level: "N3", topic: "listening", description: "A multi-level conversation video useful for learners transitioning from N4 to N3 listening comprehension.", order: 40 },
  { title: "Easy Japanese Listening – Onsen Trip Talk (N5–N4)", url: "https://www.youtube.com/watch?v=Zk1bKz0bDN4", type: "video", level: "N5", topic: "listening", description: "A natural and slow onsen-themed conversation tailored to N5–N4 listening practice.", order: 41 },
  { title: "The ULTIMATE Guide to Japanese Particles", url: "https://www.youtube.com/watch?v=i9yqJggtYzo", type: "video", level: "all", topic: "particles", description: "A comprehensive overview of the most important Japanese particles and their core functions.", order: 42 },
  { title: "Japanese は and が Particles in 2 Minutes – WA vs GA", url: "https://www.youtube.com/watch?v=ytjRoTwWnzw", type: "video", level: "N4", topic: "particles", description: "A quick, clear explanation of the notoriously tricky は vs が distinction for N4 learners.", order: 43 },
  { title: "The Ultimate Guide To: は vs が (The ONLY lesson you need!)", url: "https://www.youtube.com/watch?v=FknmUij6ZIk", type: "video", level: "N3", topic: "particles", description: "An in-depth deep dive into は vs が nuance suitable for learners pushing toward N3 mastery.", order: 44 },
  { title: "WA and GA Particle Usage – Learn Japanese in 5 Minutes! #20", url: "https://www.youtube.com/watch?v=UCiIAXVr1FU", type: "video", level: "N4", topic: "particles", description: "A short focused lesson explaining when to use は versus が with clear example sentences.", order: 45 },
  { title: "Game Gengo ゲーム言語 – YouTube Channel", url: "https://www.youtube.com/@GameGengo", type: "channel", level: "all", topic: "reading", description: "Game Gengo's channel teaching Japanese reading and vocabulary through video game dialogue, ideal for motivated learners.", order: 46 },
  { title: "How to Learn Japanese with Video Games – Game Gengo Starter Guide", url: "https://www.youtube.com/watch?v=OT5l4_erQpo", type: "video", level: "all", topic: "reading", description: "Game Gengo's starter guide on using video games to practice Japanese reading comprehension from N5 upward.", order: 47 },
];

async function main() {
  console.log("🌱 Seeding Nihongo Path database...");

  await db.kana.deleteMany();
  await db.vocabulary.deleteMany();
  await db.grammar.deleteMany();
  await db.kanji.deleteMany();
  await db.counter.deleteMany();
  await db.conjugation.deleteMany();
  await db.resource.deleteMany();
  await db.flashcardProgress.deleteMany();
  await db.stats.deleteMany();
  await db.dailyActivity.deleteMany();

  const allKana = [...HIRAGANA, ...KATAKANA];
  for (const k of allKana) {
    await db.kana.create({
      data: {
        char: k.char, romaji: k.romaji, type: k.type, row: k.row,
        order: k.order, pair: k.pair ?? null,
      },
    });
  }
  console.log(`  ✓ ${allKana.length} kana seeded`);

  const seenVocab = new Set<string>();
  const allVocab: Vocab[] = [...VOCAB, ...EXTRA_VOCAB];
  for (const v of allVocab) {
    const key = `${v.word}|${v.reading}|${v.level}`;
    if (seenVocab.has(key)) continue;
    seenVocab.add(key);
    await db.vocabulary.create({
      data: {
        word: v.word, reading: v.reading, meaning: v.meaning, romaji: v.romaji ?? null,
        level: v.level, category: v.category, pos: v.pos ?? null,
        verbGroup: v.verbGroup ?? null, pitchAccent: v.pitchAccent ?? null,
        lesson: v.lesson ?? null,
        exampleJp: v.exampleJp ?? null, exampleEn: v.exampleEn ?? null,
        exampleJp2: v.exampleJp2 ?? null, exampleEn2: v.exampleEn2 ?? null,
        order: v.order ?? 0,
      },
    });
  }
  console.log(`  ✓ ${seenVocab.size} vocabulary words seeded`);

  const allGrammar: Grammar[] = [...GRAMMAR, ...EXTRA_GRAMMAR];
  let grammarCount = 0;
  const seenGrammar = new Set<string>();
  for (const g of allGrammar) {
    if (seenGrammar.has(g.title)) continue;
    seenGrammar.add(g.title);
    await db.grammar.create({
      data: {
        title: g.title, level: g.level, structure: g.structure, meaning: g.meaning,
        explanation: g.explanation, exampleJp: g.exampleJp, exampleEn: g.exampleEn,
        exampleJp2: g.exampleJp2 ?? null, exampleEn2: g.exampleEn2 ?? null,
        note: g.note ?? null, commonMistake: g.commonMistake ?? null,
        lesson: g.lesson ?? null, order: g.order ?? 0,
      },
    });
    grammarCount++;
  }
  console.log(`  ✓ ${grammarCount} grammar points seeded`);

  const allKanji: Kanji[] = [...KANJI, ...EXTRA_KANJI];
  const seenKanji = new Set<string>();
  let kanjiCount = 0;
  for (const k of allKanji) {
    if (seenKanji.has(k.character)) continue;
    seenKanji.add(k.character);
    await db.kanji.create({
      data: {
        character: k.character, onyomi: k.onyomi, kunyomi: k.kunyomi, meaning: k.meaning,
        level: k.level, strokeCount: k.strokeCount, jlpt: k.level,
        radical: k.radical ?? null, mnemonic: k.mnemonic ?? null,
        exampleWord: k.exampleWord ?? null,
        exampleRead: k.exampleRead ?? null, exampleMean: k.exampleMean ?? null,
        order: k.order ?? 0,
      },
    });
    kanjiCount++;
  }
  console.log(`  ✓ ${kanjiCount} kanji seeded`);

  // Counters
  for (const c of COUNTERS) {
    await db.counter.create({
      data: {
        kanji: c.kanji, reading: c.reading, meaning: c.meaning, level: c.level,
        one: c.one, two: c.two, three: c.three, four: c.four, five: c.five,
        six: c.six, seven: c.seven, eight: c.eight, nine: c.nine, ten: c.ten,
        exampleJp: c.exampleJp ?? null, exampleEn: c.exampleEn ?? null,
        note: c.note ?? null, order: c.order,
      },
    });
  }
  console.log(`  ✓ ${COUNTERS.length} counters seeded`);

  // Conjugations
  for (const c of CONJUGATIONS) {
    await db.conjugation.create({
      data: {
        verb: c.verb, reading: c.reading, group: c.group, level: c.level,
        meaning: c.meaning, dict: c.dict, masu: c.masu, nai: c.nai, ta: c.ta, te: c.te,
        potential: c.potential ?? null, passive: c.passive ?? null,
        causative: c.causative ?? null, volitional: c.volitional ?? null,
        conditional: c.conditional ?? null, imperative: c.imperative ?? null,
        order: c.order,
      },
    });
  }
  console.log(`  ✓ ${CONJUGATIONS.length} conjugation tables seeded`);

  const allResources: Resource[] = [...RESOURCES, ...EXTRA_RESOURCES];
  const seenResource = new Set<string>();
  let resourceCount = 0;
  for (const r of allResources) {
    if (seenResource.has(r.url)) continue;
    seenResource.add(r.url);
    await db.resource.create({
      data: {
        title: r.title, url: r.url, type: r.type, level: r.level,
        topic: r.topic, description: r.description, order: r.order,
      },
    });
    resourceCount++;
  }
  console.log(`  ✓ ${resourceCount} resources seeded`);

  await db.stats.create({ data: { key: "streak", value: 0 } });
  await db.stats.create({ data: { key: "totalReviewed", value: 0 } });

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
