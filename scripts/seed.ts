import { db, schema } from "@/db";
import { v4 as uuid } from "uuid";
import { EXPANDED_GRAMMAR } from "./grammar-content";

/**
 * Drizzle-based seed for the Nihongo Path Japanese learning app.
 * Seeds: kana, vocabulary, grammar (EXPANDED), kanji (chunked into sets),
 *        counters, conjugations, resources.
 */

// =================== KANA ===================
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

// =================== VOCABULARY ===================
// (Imported from extra-content.ts to keep this file manageable)
import { EXTRA_VOCAB, EXTRA_KANJI, COUNTERS, CONJUGATIONS, EXTRA_RESOURCES } from "./extra-content";

type Vocab = {
  word: string; reading: string; meaning: string; romaji?: string;
  level: "N5" | "N4" | "N3"; category: string; pos?: string;
  verbGroup?: string; pitchAccent?: string; lesson?: number;
  exampleJp?: string; exampleEn?: string; exampleJp2?: string; exampleEn2?: string;
  order?: number;
};

// Original base vocab (N5 core + N4 + N3) — kept inline for stability
const BASE_VOCAB: Vocab[] = [
  // N5 greetings
  { word: "こんにちは", reading: "こんにちは", meaning: "Hello / Good afternoon", romaji: "konnichiwa", level: "N5", category: "greetings", pos: "expression", lesson: 1, exampleJp: "こんにちは、はじめまして。", exampleEn: "Hello, nice to meet you.", order: 1 },
  { word: "ありがとう", reading: "ありがとう", meaning: "Thank you", romaji: "arigatou", level: "N5", category: "greetings", pos: "expression", lesson: 1, exampleJp: "ありがとう。", exampleEn: "Thank you.", order: 2 },
  { word: "すみません", reading: "すみません", meaning: "Excuse me / Sorry", romaji: "sumimasen", level: "N5", category: "greetings", pos: "expression", lesson: 1, exampleJp: "すみません、駅はどこですか。", exampleEn: "Excuse me, where is the station?", order: 3 },
  { word: "おはよう", reading: "おはよう", meaning: "Good morning (casual)", romaji: "ohayou", level: "N5", category: "greetings", pos: "expression", lesson: 1, exampleJp: "おはよう！", exampleEn: "Morning!", order: 4 },
  { word: "こんばんは", reading: "こんばんは", meaning: "Good evening", romaji: "konbanwa", level: "N5", category: "greetings", pos: "expression", lesson: 1, order: 5 },
  { word: "さようなら", reading: "さようなら", meaning: "Goodbye", romaji: "sayounara", level: "N5", category: "greetings", pos: "expression", lesson: 1, order: 6 },
  { word: "はじめまして", reading: "はじめまして", meaning: "Nice to meet you", romaji: "hajimemashite", level: "N5", category: "greetings", pos: "expression", lesson: 1, order: 7 },
  { word: "いただきます", reading: "いただきます", meaning: "Phrase said before eating", romaji: "itadakimasu", level: "N5", category: "greetings", pos: "expression", lesson: 4, order: 8 },
  { word: "おやすみ", reading: "おやすみ", meaning: "Good night", romaji: "oyasumi", level: "N5", category: "greetings", pos: "expression", lesson: 1, order: 9 },
  { word: "私", reading: "わたし", meaning: "I, me", romaji: "watashi", level: "N5", category: "pronouns", pos: "pronoun", lesson: 1, exampleJp: "私は学生です。", exampleEn: "I am a student.", order: 10 },
  { word: "あなた", reading: "あなた", meaning: "you", romaji: "anata", level: "N5", category: "pronouns", pos: "pronoun", lesson: 1, order: 11 },
  { word: "彼", reading: "かれ", meaning: "he / boyfriend", romaji: "kare", level: "N5", category: "pronouns", pos: "pronoun", lesson: 2, order: 12 },
  { word: "彼女", reading: "かのじょ", meaning: "she / girlfriend", romaji: "kanojo", level: "N5", category: "pronouns", pos: "pronoun", lesson: 2, order: 13 },
  { word: "これ", reading: "これ", meaning: "this", romaji: "kore", level: "N5", category: "pronouns", pos: "pronoun", lesson: 2, exampleJp: "これは何ですか。", exampleEn: "What is this?", order: 14 },
  { word: "それ", reading: "それ", meaning: "that (near listener)", romaji: "sore", level: "N5", category: "pronouns", pos: "pronoun", lesson: 2, order: 15 },
  { word: "あれ", reading: "あれ", meaning: "that (over there)", romaji: "are", level: "N5", category: "pronouns", pos: "pronoun", lesson: 2, order: 16 },
  { word: "ここ", reading: "ここ", meaning: "here", romaji: "koko", level: "N5", category: "pronouns", pos: "pronoun", lesson: 2, order: 17 },
  { word: "そこ", reading: "そこ", meaning: "there", romaji: "soko", level: "N5", category: "pronouns", pos: "pronoun", lesson: 2, order: 18 },
  { word: "あそこ", reading: "あそこ", meaning: "over there", romaji: "asoko", level: "N5", category: "pronouns", pos: "pronoun", lesson: 2, order: 19 },
  { word: "何", reading: "なに", meaning: "what", romaji: "nani", level: "N5", category: "question", pos: "pronoun", lesson: 1, exampleJp: "これは何ですか。", exampleEn: "What is this?", order: 20 },
  { word: "誰", reading: "だれ", meaning: "who", romaji: "dare", level: "N5", category: "question", pos: "pronoun", lesson: 2, exampleJp: "誰が来ますか。", exampleEn: "Who will come?", order: 21 },
  { word: "どこ", reading: "どこ", meaning: "where", romaji: "doko", level: "N5", category: "question", pos: "pronoun", lesson: 2, exampleJp: "トイレはどこですか。", exampleEn: "Where is the toilet?", order: 22 },
  { word: "いつ", reading: "いつ", meaning: "when", romaji: "itsu", level: "N5", category: "question", pos: "pronoun", lesson: 3, order: 23 },
  { word: "どうして", reading: "どうして", meaning: "why", romaji: "doushite", level: "N5", category: "question", pos: "adverb", lesson: 3, order: 24 },
  { word: "どう", reading: "どう", meaning: "how", romaji: "dou", level: "N5", category: "question", pos: "adverb", lesson: 3, order: 25 },
  { word: "人", reading: "ひと", meaning: "person", romaji: "hito", level: "N5", category: "nouns", pos: "noun", lesson: 2, exampleJp: "あの人は先生です。", exampleEn: "That person is a teacher.", order: 26 },
  { word: "本", reading: "ほん", meaning: "book", romaji: "hon", level: "N5", category: "nouns", pos: "noun", lesson: 5, exampleJp: "本を読みます。", exampleEn: "I read a book.", order: 27 },
  { word: "車", reading: "くるま", meaning: "car", romaji: "kuruma", level: "N5", category: "nouns", pos: "noun", lesson: 5, order: 28 },
  { word: "家", reading: "いえ", meaning: "house, home", romaji: "ie", level: "N5", category: "nouns", pos: "noun", lesson: 2, order: 29 },
  { word: "学校", reading: "がっこう", meaning: "school", romaji: "gakkou", level: "N5", category: "nouns", pos: "noun", lesson: 2, order: 30 },
  { word: "先生", reading: "せんせい", meaning: "teacher", romaji: "sensei", level: "N5", category: "nouns", pos: "noun", lesson: 2, exampleJp: "田中先生は日本語の先生です。", exampleEn: "Mr. Tanaka is a Japanese teacher.", order: 31 },
  { word: "学生", reading: "がくせい", meaning: "student", romaji: "gakusei", level: "N5", category: "nouns", pos: "noun", lesson: 2, order: 32 },
  { word: "友達", reading: "ともだち", meaning: "friend", romaji: "tomodachi", level: "N5", category: "nouns", pos: "noun", lesson: 2, order: 33 },
  { word: "水", reading: "みず", meaning: "water", romaji: "mizu", level: "N5", category: "nouns", pos: "noun", lesson: 4, order: 34 },
  { word: "お茶", reading: "おちゃ", meaning: "tea", romaji: "ocha", level: "N5", category: "nouns", pos: "noun", lesson: 4, order: 35 },
  { word: "ご飯", reading: "ごはん", meaning: "rice / meal", romaji: "gohan", level: "N5", category: "nouns", pos: "noun", lesson: 4, exampleJp: "ご飯を食べます。", exampleEn: "I eat a meal.", order: 36 },
  { word: "天気", reading: "てんき", meaning: "weather", romaji: "tenki", level: "N5", category: "nouns", pos: "noun", lesson: 6, order: 37 },
  { word: "時間", reading: "じかん", meaning: "time", romaji: "jikan", level: "N5", category: "nouns", pos: "noun", lesson: 3, order: 38 },
  { word: "今日", reading: "きょう", meaning: "today", romaji: "kyou", level: "N5", category: "nouns", pos: "noun", lesson: 3, order: 39 },
  { word: "明日", reading: "あした", meaning: "tomorrow", romaji: "ashita", level: "N5", category: "nouns", pos: "noun", lesson: 3, order: 40 },
  { word: "昨日", reading: "きのう", meaning: "yesterday", romaji: "kinou", level: "N5", category: "nouns", pos: "noun", lesson: 3, order: 41 },
  { word: "食べる", reading: "たべる", meaning: "to eat", romaji: "taberu", level: "N5", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 4, exampleJp: "パンを食べます。", exampleEn: "I eat bread.", order: 42 },
  { word: "飲む", reading: "のむ", meaning: "to drink", romaji: "nomu", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 4, exampleJp: "コーヒーを飲みます。", exampleEn: "I drink coffee.", order: 43 },
  { word: "行く", reading: "いく", meaning: "to go", romaji: "iku", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 5, exampleJp: "学校に行きます。", exampleEn: "I go to school.", order: 44 },
  { word: "来る", reading: "くる", meaning: "to come", romaji: "kuru", level: "N5", category: "verbs", pos: "verb", verbGroup: "irregular", lesson: 5, exampleJp: "友達が来ます。", exampleEn: "A friend comes.", order: 45 },
  { word: "見る", reading: "みる", meaning: "to see, to watch", romaji: "miru", level: "N5", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 5, exampleJp: "映画を見ます。", exampleEn: "I watch a movie.", order: 46 },
  { word: "聞く", reading: "きく", meaning: "to listen, to ask", romaji: "kiku", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 5, order: 47 },
  { word: "読む", reading: "よむ", meaning: "to read", romaji: "yomu", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 5, order: 48 },
  { word: "書く", reading: "かく", meaning: "to write", romaji: "kaku", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 5, order: 49 },
  { word: "話す", reading: "はなす", meaning: "to speak, to talk", romaji: "hanasu", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 5, exampleJp: "日本語を話します。", exampleEn: "I speak Japanese.", order: 50 },
  { word: "する", reading: "する", meaning: "to do", romaji: "suru", level: "N5", category: "verbs", pos: "verb", verbGroup: "irregular", lesson: 5, exampleJp: "勉強をします。", exampleEn: "I study.", order: 51 },
  { word: "買う", reading: "かう", meaning: "to buy", romaji: "kau", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 5, order: 52 },
  { word: "寝る", reading: "ねる", meaning: "to sleep", romaji: "neru", level: "N5", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 7, order: 53 },
  { word: "起きる", reading: "おきる", meaning: "to wake up", romaji: "okiru", level: "N5", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 7, exampleJp: "朝6時に起きます。", exampleEn: "I wake up at 6 AM.", order: 54 },
  { word: "勉強する", reading: "べんきょうする", meaning: "to study", romaji: "benkyou suru", level: "N5", category: "verbs", pos: "verb", verbGroup: "irregular", lesson: 5, order: 55 },
  { word: "わかる", reading: "わかる", meaning: "to understand", romaji: "wakaru", level: "N5", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 7, exampleJp: "日本語がわかりますか。", exampleEn: "Do you understand Japanese?", order: 56 },
  { word: "大きい", reading: "おおきい", meaning: "big", romaji: "ookii", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, exampleJp: "大きい家です。", exampleEn: "It's a big house.", order: 57 },
  { word: "小さい", reading: "ちいさい", meaning: "small", romaji: "chiisai", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, order: 58 },
  { word: "新しい", reading: "あたらしい", meaning: "new", romaji: "atarashii", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, order: 59 },
  { word: "古い", reading: "ふるい", meaning: "old (things)", romaji: "furui", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, order: 60 },
  { word: "高い", reading: "たかい", meaning: "tall / expensive", romaji: "takai", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, exampleJp: "このりんごは高いです。", exampleEn: "This apple is expensive.", order: 61 },
  { word: "安い", reading: "やすい", meaning: "cheap", romaji: "yasui", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, order: 62 },
  { word: "いい", reading: "いい", meaning: "good", romaji: "ii", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, order: 63 },
  { word: "暑い", reading: "あつい", meaning: "hot (weather)", romaji: "atsui", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, order: 64 },
  { word: "寒い", reading: "さむい", meaning: "cold (weather)", romaji: "samui", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 6, order: 65 },
  { word: "美味しい", reading: "おいしい", meaning: "delicious", romaji: "oishii", level: "N5", category: "adjectives", pos: "i-adjective", lesson: 4, exampleJp: "このラーメンは美味しいです。", exampleEn: "This ramen is delicious.", order: 66 },
  { word: "元気", reading: "げんき", meaning: "healthy, energetic", romaji: "genki", level: "N5", category: "adjectives", pos: "na-adjective", lesson: 1, exampleJp: "元気ですか。", exampleEn: "How are you? (Are you well?)", order: 67 },
  { word: "静か", reading: "しずか", meaning: "quiet", romaji: "shizuka", level: "N5", category: "adjectives", pos: "na-adjective", lesson: 6, order: 68 },
  { word: "きれい", reading: "きれい", meaning: "pretty, clean", romaji: "kirei", level: "N5", category: "adjectives", pos: "na-adjective", lesson: 6, order: 69 },
  { word: "好き", reading: "すき", meaning: "liked, favorite", romaji: "suki", level: "N5", category: "adjectives", pos: "na-adjective", lesson: 6, exampleJp: "日本語が好きです。", exampleEn: "I like Japanese.", order: 70 },
  { word: "嫌い", reading: "きらい", meaning: "disliked", romaji: "kirai", level: "N5", category: "adjectives", pos: "na-adjective", lesson: 6, order: 71 },
  { word: "便利", reading: "べんり", meaning: "convenient", romaji: "benri", level: "N5", category: "adjectives", pos: "na-adjective", lesson: 5, order: 72 },
  { word: "とても", reading: "とても", meaning: "very", romaji: "totemo", level: "N5", category: "adverbs", pos: "adverb", lesson: 7, order: 73 },
  { word: "よく", reading: "よく", meaning: "often, well", romaji: "yoku", level: "N5", category: "adverbs", pos: "adverb", lesson: 7, order: 74 },
  { word: "たくさん", reading: "たくさん", meaning: "a lot", romaji: "takusan", level: "N5", category: "adverbs", pos: "adverb", lesson: 7, order: 75 },
  { word: "もう", reading: "もう", meaning: "already, more", romaji: "mou", level: "N5", category: "adverbs", pos: "adverb", lesson: 7, order: 76 },
  { word: "まだ", reading: "まだ", meaning: "still, not yet", romaji: "mada", level: "N5", category: "adverbs", pos: "adverb", lesson: 7, order: 77 },
  { word: "一", reading: "いち", meaning: "one", romaji: "ichi", level: "N5", category: "numbers", pos: "number", lesson: 3, order: 78 },
  { word: "二", reading: "に", meaning: "two", romaji: "ni", level: "N5", category: "numbers", pos: "number", lesson: 3, order: 79 },
  { word: "三", reading: "さん", meaning: "three", romaji: "san", level: "N5", category: "numbers", pos: "number", lesson: 3, order: 80 },
  { word: "四", reading: "し/よん", meaning: "four", romaji: "shi/yon", level: "N5", category: "numbers", pos: "number", lesson: 3, order: 81 },
  { word: "五", reading: "ご", meaning: "five", romaji: "go", level: "N5", category: "numbers", pos: "number", lesson: 3, order: 82 },
  { word: "十", reading: "じゅう", meaning: "ten", romaji: "juu", level: "N5", category: "numbers", pos: "number", lesson: 3, order: 83 },
  { word: "百", reading: "ひゃく", meaning: "hundred", romaji: "hyaku", level: "N5", category: "numbers", pos: "number", lesson: 3, order: 84 },
  { word: "千", reading: "せん", meaning: "thousand", romaji: "sen", level: "N5", category: "numbers", pos: "number", lesson: 3, order: 85 },
  { word: "万", reading: "まん", meaning: "ten thousand", romaji: "man", level: "N5", category: "numbers", pos: "number", lesson: 3, order: 86 },
  { word: "父", reading: "ちち", meaning: "father (my own)", romaji: "chichi", level: "N5", category: "family", pos: "noun", lesson: 2, order: 87 },
  { word: "母", reading: "はは", meaning: "mother (my own)", romaji: "haha", level: "N5", category: "family", pos: "noun", lesson: 2, order: 88 },
  { word: "兄", reading: "あに", meaning: "older brother (my own)", romaji: "ani", level: "N5", category: "family", pos: "noun", lesson: 2, order: 89 },
  { word: "姉", reading: "あね", meaning: "older sister (my own)", romaji: "ane", level: "N5", category: "family", pos: "noun", lesson: 2, order: 90 },
  { word: "弟", reading: "おとうと", meaning: "younger brother", romaji: "otouto", level: "N5", category: "family", pos: "noun", lesson: 2, order: 91 },
  { word: "妹", reading: "いもうと", meaning: "younger sister", romaji: "imouto", level: "N5", category: "family", pos: "noun", lesson: 2, order: 92 },
];

// N4 + N3 vocab (compact)
const N4_VOCAB: Vocab[] = [
  { word: "考える", reading: "かんがえる", meaning: "to think, to consider", romaji: "kangaeru", level: "N4", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 13, exampleJp: "将来について考えています。", exampleEn: "I'm thinking about my future.", order: 1 },
  { word: "使う", reading: "つかう", meaning: "to use", romaji: "tsukau", level: "N4", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 13, order: 2 },
  { word: "作る", reading: "つくる", meaning: "to make", romaji: "tsukuru", level: "N4", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 13, order: 3 },
  { word: "働く", reading: "はたらく", meaning: "to work", romaji: "hataraku", level: "N4", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 13, exampleJp: "銀行で働いています。", exampleEn: "I work at a bank.", order: 4 },
  { word: "始まる", reading: "はじまる", meaning: "to begin (intransitive)", romaji: "hajimaru", level: "N4", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 13, order: 5 },
  { word: "終わる", reading: "おわる", meaning: "to end", romaji: "owaru", level: "N4", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 13, order: 6 },
  { word: "持つ", reading: "もつ", meaning: "to hold, to have", romaji: "motsu", level: "N4", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 13, order: 7 },
  { word: "待つ", reading: "まつ", meaning: "to wait", romaji: "matsu", level: "N4", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 13, exampleJp: "ここで待ってください。", exampleEn: "Please wait here.", order: 8 },
  { word: "教える", reading: "おしえる", meaning: "to teach, to tell", romaji: "oshieru", level: "N4", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 13, order: 9 },
  { word: "借りる", reading: "かりる", meaning: "to borrow", romaji: "kariru", level: "N4", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 13, exampleJp: "図書館で本を借りました。", exampleEn: "I borrowed a book at the library.", order: 10 },
  { word: "返す", reading: "かえす", meaning: "to return (something)", romaji: "kaesu", level: "N4", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 13, order: 11 },
  { word: "忘れる", reading: "わすれる", meaning: "to forget", romaji: "wasureru", level: "N4", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 13, order: 12 },
  { word: "忙しい", reading: "いそがしい", meaning: "busy", romaji: "isogashii", level: "N4", category: "adjectives", pos: "i-adjective", lesson: 13, exampleJp: "最近忙しいです。", exampleEn: "I've been busy lately.", order: 15 },
  { word: "楽しい", reading: "たのしい", meaning: "fun, enjoyable", romaji: "tanoshii", level: "N4", category: "adjectives", pos: "i-adjective", lesson: 13, order: 16 },
  { word: "難しい", reading: "むずかしい", meaning: "difficult", romaji: "muzukashii", level: "N4", category: "adjectives", pos: "i-adjective", lesson: 13, order: 17 },
  { word: "広い", reading: "ひろい", meaning: "wide, spacious", romaji: "hiroi", level: "N4", category: "adjectives", pos: "i-adjective", lesson: 13, order: 19 },
  { word: "有名", reading: "ゆうめい", meaning: "famous", romaji: "yuumei", level: "N4", category: "adjectives", pos: "na-adjective", lesson: 13, order: 21 },
  { word: "大切", reading: "たいせつ", meaning: "important", romaji: "taisetsu", level: "N4", category: "adjectives", pos: "na-adjective", lesson: 13, order: 22 },
  { word: "予定", reading: "よてい", meaning: "plan, schedule", romaji: "yotei", level: "N4", category: "nouns", pos: "noun", lesson: 13, exampleJp: "週末の予定は？", exampleEn: "What are your weekend plans?", order: 24 },
  { word: "意味", reading: "いみ", meaning: "meaning", romaji: "imi", level: "N4", category: "nouns", pos: "noun", lesson: 13, exampleJp: "この言葉の意味は？", exampleEn: "What is the meaning of this word?", order: 26 },
  { word: "旅行", reading: "りょこう", meaning: "travel, trip", romaji: "ryokou", level: "N4", category: "nouns", pos: "noun", lesson: 13, order: 29 },
  { word: "映画", reading: "えいが", meaning: "movie", romaji: "eiga", level: "N4", category: "nouns", pos: "noun", lesson: 13, order: 32 },
  { word: "しかし", reading: "しかし", meaning: "however", romaji: "shikashi", level: "N4", category: "conjunctions", pos: "conjunction", lesson: 13, order: 39 },
  { word: "だんだん", reading: "だんだん", meaning: "gradually", romaji: "dandan", level: "N4", category: "adverbs", pos: "adverb", lesson: 13, order: 40 },
  { word: "きっと", reading: "きっと", meaning: "surely, certainly", romaji: "kitto", level: "N4", category: "adverbs", pos: "adverb", lesson: 13, order: 41 },
  { word: "ゆっくり", reading: "ゆっくり", meaning: "slowly", romaji: "yukkuri", level: "N4", category: "adverbs", pos: "adverb", lesson: 13, order: 42 },
];

const N3_VOCAB: Vocab[] = [
  { word: "比べる", reading: "くらべる", meaning: "to compare", romaji: "kuraberu", level: "N3", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 19, exampleJp: "二つの方法を比べてみた。", exampleEn: "I tried comparing the two methods.", order: 1 },
  { word: "集める", reading: "あつめる", meaning: "to collect", romaji: "atsumeru", level: "N3", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 19, order: 2 },
  { word: "決まる", reading: "きまる", meaning: "to be decided", romaji: "kimaru", level: "N3", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 19, order: 3 },
  { word: "決める", reading: "きめる", meaning: "to decide", romaji: "kimeru", level: "N3", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 19, exampleJp: "自分で決めます。", exampleEn: "I'll decide for myself.", order: 4 },
  { word: "感じる", reading: "かんじる", meaning: "to feel", romaji: "kanjiru", level: "N3", category: "verbs", pos: "verb", verbGroup: "ichidan", lesson: 19, exampleJp: "寒さを感じる。", exampleEn: "I feel the cold.", order: 5 },
  { word: "気づく", reading: "きづく", meaning: "to notice", romaji: "kizuku", level: "N3", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 19, order: 6 },
  { word: "こまる", reading: "こまる", meaning: "to be in trouble", romaji: "komaru", level: "N3", category: "verbs", pos: "verb", verbGroup: "godan", lesson: 19, exampleJp: "困ったことがあれば言ってね。", exampleEn: "Tell me if you're in trouble.", order: 7 },
  { word: "応援する", reading: "おうえんする", meaning: "to support, to cheer", romaji: "ouen suru", level: "N3", category: "verbs", pos: "verb", verbGroup: "irregular", lesson: 19, exampleJp: "チームを応援しています。", exampleEn: "I'm cheering for the team.", order: 9 },
  { word: "解決する", reading: "かいけつする", meaning: "to solve", romaji: "kaiketsu suru", level: "N3", category: "verbs", pos: "verb", verbGroup: "irregular", lesson: 19, order: 10 },
  { word: "影響する", reading: "えいきょうする", meaning: "to influence", romaji: "eikyou suru", level: "N3", category: "verbs", pos: "verb", verbGroup: "irregular", lesson: 19, order: 11 },
  { word: "複雑", reading: "ふくざつ", meaning: "complicated", romaji: "fukuzatsu", level: "N3", category: "adjectives", pos: "na-adjective", lesson: 19, exampleJp: "複雑な問題だ。", exampleEn: "It's a complicated problem.", order: 12 },
  { word: "単純", reading: "たんじゅん", meaning: "simple", romaji: "tanjun", level: "N3", category: "adjectives", pos: "na-adjective", lesson: 19, order: 13 },
  { word: "豊か", reading: "ゆたか", meaning: "rich, abundant", romaji: "yutaka", level: "N3", category: "adjectives", pos: "na-adjective", lesson: 19, order: 14 },
  { word: "細かい", reading: "こまかい", meaning: "detailed, small", romaji: "komakai", level: "N3", category: "adjectives", pos: "i-adjective", lesson: 19, order: 16 },
  { word: "鋭い", reading: "するどい", meaning: "sharp", romaji: "surudoi", level: "N3", category: "adjectives", pos: "i-adjective", lesson: 19, order: 17 },
  { word: "関係", reading: "かんけい", meaning: "relation", romaji: "kankei", level: "N3", category: "nouns", pos: "noun", lesson: 19, exampleJp: "気候と農業の関係。", exampleEn: "The relation between climate and agriculture.", order: 18 },
  { word: "効果", reading: "こうか", meaning: "effect", romaji: "kouka", level: "N3", category: "nouns", pos: "noun", lesson: 19, order: 19 },
  { word: "限界", reading: "げんかい", meaning: "limit", romaji: "genkai", level: "N3", category: "nouns", pos: "noun", lesson: 19, order: 20 },
  { word: "努力", reading: "どりょく", meaning: "effort", romaji: "doryoku", level: "N3", category: "nouns", pos: "noun", lesson: 19, exampleJp: "努力が実を結んだ。", exampleEn: "Effort bore fruit.", order: 22 },
  { word: "事実", reading: "じじつ", meaning: "fact", romaji: "jijitsu", level: "N3", category: "nouns", pos: "noun", lesson: 19, order: 24 },
  { word: "内容", reading: "ないよう", meaning: "content", romaji: "naiyou", level: "N3", category: "nouns", pos: "noun", lesson: 19, order: 25 },
  { word: "状況", reading: "じょうきょう", meaning: "situation", romaji: "joukyou", level: "N3", category: "nouns", pos: "noun", lesson: 19, order: 26 },
  { word: "機会", reading: "きかい", meaning: "opportunity", romaji: "kikai", level: "N3", category: "nouns", pos: "noun", lesson: 19, exampleJp: "また機会があれば。", exampleEn: "If there's another opportunity.", order: 27 },
  { word: "たとえ", reading: "たとえ", meaning: "even if", romaji: "tatoe", level: "N3", category: "conjunctions", pos: "adverb", lesson: 19, exampleJp: "たとえ雨でも行きます。", exampleEn: "Even if it rains, I'll go.", order: 28 },
  { word: "さすが", reading: "さすが", meaning: "as one would expect", romaji: "sasuga", level: "N3", category: "adverbs", pos: "adverb", lesson: 19, order: 29 },
  { word: "できるだけ", reading: "できるだけ", meaning: "as much as possible", romaji: "dekiru dake", level: "N3", category: "adverbs", pos: "adverb", lesson: 19, order: 30 },
  { word: "のんびり", reading: "のんびり", meaning: "leisurely", romaji: "nonbiri", level: "N3", category: "adverbs", pos: "adverb", lesson: 19, exampleJp: "のんびり過ごしたい。", exampleEn: "I want to spend my time leisurely.", order: 32 },
];

const ALL_VOCAB: Vocab[] = [...BASE_VOCAB, ...EXTRA_VOCAB, ...N4_VOCAB, ...N3_VOCAB];

// =================== KANJI (chunked into sets of 10) ===================
type Kanji = {
  character: string; onyomi: string; kunyomi: string; meaning: string;
  level: "N5" | "N4" | "N3"; strokeCount: number; radical?: string;
  mnemonic?: string;
  exampleWord?: string; exampleRead?: string; exampleMean?: string; order?: number;
};

const BASE_KANJI: Kanji[] = [
  { character: "一", onyomi: "イチ", kunyomi: "ひと", meaning: "one", level: "N5", strokeCount: 1, radical: "一", mnemonic: "A single horizontal stroke — the simplest kanji, representing one.", exampleWord: "一月", exampleRead: "いちがつ", exampleMean: "January", order: 1 },
  { character: "二", onyomi: "ニ", kunyomi: "ふた", meaning: "two", level: "N5", strokeCount: 2, radical: "二", mnemonic: "Two horizontal strokes stacked.", exampleWord: "二人", exampleRead: "ふたり", exampleMean: "two people", order: 2 },
  { character: "三", onyomi: "サン", kunyomi: "み", meaning: "three", level: "N5", strokeCount: 3, radical: "一", mnemonic: "Three horizontal strokes.", exampleWord: "三月", exampleRead: "さんがつ", exampleMean: "March", order: 3 },
  { character: "四", onyomi: "シ", kunyomi: "よん,よ", meaning: "four", level: "N5", strokeCount: 5, radical: "口", mnemonic: "A box (口) with two legs — the kanji for four.", exampleWord: "四つ", exampleRead: "よっつ", exampleMean: "four (items)", order: 4 },
  { character: "五", onyomi: "ゴ", kunyomi: "いつ", meaning: "five", level: "N5", strokeCount: 4, radical: "二", mnemonic: "Five strokes forming a symmetrical shape.", exampleWord: "五分", exampleRead: "ごふん", exampleMean: "five minutes", order: 5 },
  { character: "六", onyomi: "ロク", kunyomi: "む", meaning: "six", level: "N5", strokeCount: 4, radical: "八", mnemonic: "A person with arms and legs spread.", exampleWord: "六月", exampleRead: "ろくがつ", exampleMean: "June", order: 6 },
  { character: "七", onyomi: "シチ", kunyomi: "なな", meaning: "seven", level: "N5", strokeCount: 2, radical: "一", mnemonic: "A diagonal cross — looks like a 7.", exampleWord: "七つ", exampleRead: "ななつ", exampleMean: "seven (items)", order: 7 },
  { character: "八", onyomi: "ハチ", kunyomi: "や", meaning: "eight", level: "N5", strokeCount: 2, radical: "八", mnemonic: "Two strokes opening outward like open legs.", exampleWord: "八百", exampleRead: "はっぴゃく", exampleMean: "eight hundred", order: 8 },
  { character: "九", onyomi: "キュウ,ク", kunyomi: "ここの", meaning: "nine", level: "N5", strokeCount: 2, radical: "乙", mnemonic: "A hook shape — represents nine.", exampleWord: "九月", exampleRead: "くがつ", exampleMean: "September", order: 9 },
  { character: "十", onyomi: "ジュウ", kunyomi: "とお", meaning: "ten", level: "N5", strokeCount: 2, radical: "十", mnemonic: "A plus sign — ten.", exampleWord: "十分", exampleRead: "じゅっぷん", exampleMean: "ten minutes", order: 10 },
  { character: "百", onyomi: "ヒャク", kunyomi: "—", meaning: "hundred", level: "N5", strokeCount: 6, radical: "白", mnemonic: "One (一) on top of white (白) — one hundred.", exampleWord: "三百", exampleRead: "さんびゃく", exampleMean: "300", order: 11 },
  { character: "千", onyomi: "セン", kunyomi: "ち", meaning: "thousand", level: "N5", strokeCount: 3, radical: "十", mnemonic: "A simplified picture of a person — thousand.", exampleWord: "千円", exampleRead: "せんえん", exampleMean: "1000 yen", order: 12 },
  { character: "万", onyomi: "マン,バン", kunyomi: "—", meaning: "ten thousand", level: "N5", strokeCount: 3, radical: "一", mnemonic: "A stylized scorpion — used for ten thousand.", exampleWord: "一万", exampleRead: "いちまん", exampleMean: "10,000", order: 13 },
  { character: "日", onyomi: "ニチ,ジツ", kunyomi: "ひ,か", meaning: "day, sun", level: "N5", strokeCount: 4, radical: "日", mnemonic: "A picture of the sun with a center dot.", exampleWord: "日本", exampleRead: "にほん", exampleMean: "Japan", order: 14 },
  { character: "本", onyomi: "ホン", kunyomi: "もと", meaning: "book, origin", level: "N5", strokeCount: 5, radical: "木", mnemonic: "A tree (木) with a line at the base marking its origin.", exampleWord: "本棚", exampleRead: "ほんだな", exampleMean: "bookshelf", order: 15 },
  { character: "人", onyomi: "ジン,ニン", kunyomi: "ひと", meaning: "person", level: "N5", strokeCount: 2, radical: "人", mnemonic: "A person standing with legs together, leaning slightly.", exampleWord: "日本人", exampleRead: "にほんじん", exampleMean: "Japanese person", order: 16 },
  { character: "国", onyomi: "コク", kunyomi: "くに", meaning: "country", level: "N5", strokeCount: 8, radical: "囗", mnemonic: "A box enclosing a king (玉) — a kingdom, country.", exampleWord: "外国", exampleRead: "がいこく", exampleMean: "foreign country", order: 17 },
  { character: "学", onyomi: "ガク", kunyomi: "まな", meaning: "study, learn", level: "N5", strokeCount: 8, radical: "子", mnemonic: "A child (子) under a roof learning — to study.", exampleWord: "学校", exampleRead: "がっこう", exampleMean: "school", order: 18 },
  { character: "校", onyomi: "コウ", kunyomi: "—", meaning: "school", level: "N5", strokeCount: 10, radical: "木", mnemonic: "A tree (木) plus crossing (交) — a school building.", exampleWord: "高校", exampleRead: "こうこう", exampleMean: "high school", order: 19 },
  { character: "生", onyomi: "セイ,ショウ", kunyomi: "い,う", meaning: "life, birth, student", level: "N5", strokeCount: 5, radical: "生", mnemonic: "A growing plant — life, birth, student.", exampleWord: "学生", exampleRead: "がくせい", exampleMean: "student", order: 20 },
  { character: "先", onyomi: "セン", kunyomi: "さき", meaning: "before, ahead", level: "N5", strokeCount: 6, radical: "儿", mnemonic: "A person (儿) going ahead of others — before, prior.", exampleWord: "先生", exampleRead: "せんせい", exampleMean: "teacher", order: 21 },
  { character: "大", onyomi: "ダイ,タイ", kunyomi: "おお", meaning: "big, large", level: "N5", strokeCount: 3, radical: "大", mnemonic: "A person with arms outstretched — big.", exampleWord: "大きい", exampleRead: "おおきい", exampleMean: "big", order: 22 },
  { character: "小", onyomi: "ショウ", kunyomi: "ちい,こ", meaning: "small", level: "N5", strokeCount: 3, radical: "小", mnemonic: "Three small strokes — small things.", exampleWord: "小さい", exampleRead: "ちいさい", exampleMean: "small", order: 23 },
  { character: "中", onyomi: "チュウ", kunyomi: "なか", meaning: "middle, inside", level: "N5", strokeCount: 4, radical: "丨", mnemonic: "A box with a line through the middle — inside, middle.", exampleWord: "中国", exampleRead: "ちゅうごく", exampleMean: "China", order: 24 },
  { character: "上", onyomi: "ジョウ", kunyomi: "うえ", meaning: "up, above", level: "N5", strokeCount: 3, radical: "一", mnemonic: "A mark above a line — up, above.", exampleWord: "上着", exampleRead: "うわぎ", exampleMean: "jacket", order: 25 },
  { character: "下", onyomi: "カ,ゲ", kunyomi: "した", meaning: "down, below", level: "N5", strokeCount: 3, radical: "一", mnemonic: "A mark below a line — down, below.", exampleWord: "下着", exampleRead: "したぎ", exampleMean: "underwear", order: 26 },
  { character: "山", onyomi: "サン", kunyomi: "やま", meaning: "mountain", level: "N5", strokeCount: 3, radical: "山", mnemonic: "Three peaks — a mountain.", exampleWord: "富士山", exampleRead: "ふじさん", exampleMean: "Mt. Fuji", order: 27 },
  { character: "川", onyomi: "セン", kunyomi: "かわ", meaning: "river", level: "N5", strokeCount: 3, radical: "川", mnemonic: "Three flowing lines — a river.", exampleWord: "川", exampleRead: "かわ", exampleMean: "river", order: 28 },
  { character: "田", onyomi: "デン", kunyomi: "た", meaning: "rice field", level: "N5", strokeCount: 5, radical: "田", mnemonic: "A divided field — a rice paddy.", exampleWord: "田んぼ", exampleRead: "たんぼ", exampleMean: "paddy field", order: 29 },
  { character: "水", onyomi: "スイ", kunyomi: "みず", meaning: "water", level: "N5", strokeCount: 4, radical: "水", mnemonic: "A splashing stream — water.", exampleWord: "水泳", exampleRead: "すいえい", exampleMean: "swimming", order: 30 },
  { character: "火", onyomi: "カ", kunyomi: "ひ", meaning: "fire", level: "N5", strokeCount: 4, radical: "火", mnemonic: "Sparks flying — fire.", exampleWord: "火山", exampleRead: "かざん", exampleMean: "volcano", order: 31 },
  { character: "木", onyomi: "モク,ボク", kunyomi: "き", meaning: "tree, wood", level: "N5", strokeCount: 4, radical: "木", mnemonic: "A tree with branches and roots.", exampleWord: "木曜日", exampleRead: "もくようび", exampleMean: "Thursday", order: 32 },
  { character: "金", onyomi: "キン,コン", kunyomi: "かね", meaning: "gold, money", level: "N5", strokeCount: 8, radical: "金", mnemonic: "Umbrella over buried treasure — gold, money.", exampleWord: "金曜日", exampleRead: "きんようび", exampleMean: "Friday", order: 33 },
  { character: "土", onyomi: "ド,ト", kunyomi: "つち", meaning: "earth, soil", level: "N5", strokeCount: 3, radical: "土", mnemonic: "A plant sprouting from the ground — earth.", exampleWord: "土曜日", exampleRead: "どようび", exampleMean: "Saturday", order: 34 },
  { character: "月", onyomi: "ゲツ,ガツ", kunyomi: "つき", meaning: "moon, month", level: "N5", strokeCount: 4, radical: "月", mnemonic: "A crescent moon — moon, month.", exampleWord: "月曜日", exampleRead: "げつようび", exampleMean: "Monday", order: 35 },
  { character: "年", onyomi: "ネン", kunyomi: "とし", meaning: "year", level: "N5", strokeCount: 6, radical: "干", mnemonic: "A man carrying a harvest — a year.", exampleWord: "今年", exampleRead: "ことし", exampleMean: "this year", order: 36 },
  { character: "時", onyomi: "ジ", kunyomi: "とき", meaning: "time, hour", level: "N5", strokeCount: 10, radical: "日", mnemonic: "Sun (日) plus temple (寺) — time of day.", exampleWord: "時間", exampleRead: "じかん", exampleMean: "time", order: 37 },
  { character: "分", onyomi: "フン,ブン", kunyomi: "わ", meaning: "minute, part", level: "N5", strokeCount: 4, radical: "刀", mnemonic: "A sword (刀) dividing — to divide, minute.", exampleWord: "十分", exampleRead: "じゅっぷん", exampleMean: "10 minutes", order: 38 },
  { character: "私", onyomi: "シ", kunyomi: "わたし", meaning: "I, private", level: "N5", strokeCount: 7, radical: "禾", mnemonic: "Rice plant (禾) plus a line — private, me.", exampleWord: "私", exampleRead: "わたし", exampleMean: "I", order: 39 },
  { character: "今", onyomi: "コン,キン", kunyomi: "いま", meaning: "now", level: "N5", strokeCount: 4, radical: "人", mnemonic: "A roof with a person under it — now, present.", exampleWord: "今日", exampleRead: "きょう", exampleMean: "today", order: 40 },
  { character: "天", onyomi: "テン", kunyomi: "あめ", meaning: "sky, heaven", level: "N5", strokeCount: 4, radical: "大", mnemonic: "A great (大) person over a line — heaven, sky.", exampleWord: "天気", exampleRead: "てんき", exampleMean: "weather", order: 41 },
  { character: "気", onyomi: "キ,ケ", kunyomi: "—", meaning: "spirit, air", level: "N5", strokeCount: 6, radical: "気", mnemonic: "Steam rising — spirit, energy, air.", exampleWord: "元気", exampleRead: "げんき", exampleMean: "healthy", order: 42 },
  { character: "食", onyomi: "ショク", kunyomi: "た", meaning: "eat, food", level: "N5", strokeCount: 9, radical: "食", mnemonic: "A roof over food in a bowl — to eat.", exampleWord: "食べる", exampleRead: "たべる", exampleMean: "to eat", order: 43 },
  { character: "飲", onyomi: "イン", kunyomi: "の", meaning: "drink", level: "N5", strokeCount: 12, radical: "食", mnemonic: "Food (食) plus欠 (lack) — to drink.", exampleWord: "飲み物", exampleRead: "のみもの", exampleMean: "drink", order: 44 },
  { character: "行", onyomi: "コウ,ギョウ", kunyomi: "い", meaning: "go, conduct", level: "N5", strokeCount: 6, radical: "行", mnemonic: "An intersection — to go, to cross.", exampleWord: "行く", exampleRead: "いく", exampleMean: "to go", order: 45 },
  { character: "来", onyomi: "ライ", kunyomi: "く", meaning: "come", level: "N5", strokeCount: 7, radical: "木", mnemonic: "A tree (木) with people coming — to come.", exampleWord: "来年", exampleRead: "らいねん", exampleMean: "next year", order: 46 },
  { character: "見", onyomi: "ケン", kunyomi: "み", meaning: "see, look", level: "N5", strokeCount: 7, radical: "見", mnemonic: "An eye on legs — to see.", exampleWord: "見る", exampleRead: "みる", exampleMean: "to see", order: 47 },
  { character: "聞", onyomi: "ブン,モン", kunyomi: "き", meaning: "hear, ask", level: "N5", strokeCount: 14, radical: "耳", mnemonic: "An ear (耳) at a gate (門) — to hear, to ask.", exampleWord: "聞く", exampleRead: "きく", exampleMean: "to listen", order: 48 },
  { character: "読", onyomi: "ドク,トク", kunyomi: "よ", meaning: "read", level: "N5", strokeCount: 14, radical: "言", mnemonic: "Words (言) to sell (売) — to read.", exampleWord: "読む", exampleRead: "よむ", exampleMean: "to read", order: 49 },
  { character: "書", onyomi: "ショ", kunyomi: "か", meaning: "write", level: "N5", strokeCount: 10, radical: "聿", mnemonic: "A brush — to write.", exampleWord: "書く", exampleRead: "かく", exampleMean: "to write", order: 50 },
  { character: "話", onyomi: "ワ", kunyomi: "はな", meaning: "talk, story", level: "N5", strokeCount: 13, radical: "言", mnemonic: "Words (言) plus tongue (舌) — to speak.", exampleWord: "話す", exampleRead: "はなす", exampleMean: "to speak", order: 51 },
  { character: "車", onyomi: "シャ", kunyomi: "くるま", meaning: "car", level: "N5", strokeCount: 7, radical: "車", mnemonic: "A cart seen from above — car.", exampleWord: "電車", exampleRead: "でんしゃ", exampleMean: "train", order: 52 },
  { character: "電", onyomi: "デン", kunyomi: "—", meaning: "electricity", level: "N5", strokeCount: 13, radical: "雨", mnemonic: "Rain (雨) with a tail — lightning, electricity.", exampleWord: "電話", exampleRead: "でんわ", exampleMean: "telephone", order: 53 },
];

const ALL_KANJI: Kanji[] = [...BASE_KANJI, ...EXTRA_KANJI];

// =================== RESOURCES ===================
type Resource = {
  title: string; url: string; type: "video" | "playlist" | "channel";
  level: "N5" | "N4" | "N3" | "all"; topic: string; description: string; order: number;
};

const YOUTUBE_RESOURCES: Resource[] = [
  { title: "Learn ALL Hiragana in 1 Hour (JapanesePod101)", url: "https://www.youtube.com/watch?v=6p9Il_j0zjc", type: "video", level: "all", topic: "kana", description: "Comprehensive one-hour video teaching every hiragana with stroke order and pronunciation.", order: 1 },
  { title: "Learn ALL Katakana in 1 Hour (JapanesePod101)", url: "https://www.youtube.com/watch?v=s6DKRgtVLGA", type: "video", level: "all", topic: "kana", description: "Companion to the hiragana lesson, covering all katakana with writing and reading practice.", order: 2 },
  { title: "Kantan Kana Playlist (JapanesePod101)", url: "https://www.youtube.com/playlist?list=PLA7DB863D6946E1CD", type: "playlist", level: "all", topic: "kana", description: "Bite-sized episodes for each row of hiragana and katakana.", order: 4 },
  { title: "Every Grammar Form Needed to Pass JLPT N5", url: "https://www.youtube.com/watch?v=MByHVq3D6hM", type: "video", level: "N5", topic: "grammar", description: "A single comprehensive lesson reviewing every essential N5 grammar point.", order: 7 },
  { title: "N5 Grammar Video Lesson Playlist", url: "https://www.youtube.com/playlist?list=PLwnx0er3vBwC5L2TSLrVKc3ZpcxGNTNl2", type: "playlist", level: "N5", topic: "grammar", description: "Structured N5 grammar playlist breaking each point into short lessons.", order: 8 },
  { title: "JLPT N4 Grammar Playlist", url: "https://www.youtube.com/playlist?list=PLQ0etXJhYzGVezQk7-cPJRlKXsdhLYCBw", type: "playlist", level: "N4", topic: "grammar", description: "A dedicated N4 grammar playlist covering each grammar form.", order: 13 },
  { title: "JLPT N3 Grammar Playlist (Nihongo Mori)", url: "https://www.youtube.com/playlist?list=PL5ZeXmpb7b5ydHBcOdhTPVyW-jKuozMng", type: "playlist", level: "N3", topic: "grammar", description: "N3 grammar playlist with intermediate grammar forms and example sentences.", order: 15 },
  { title: "ToKini Andy — YouTube Channel", url: "https://www.youtube.com/@ToKiniAndy", type: "channel", level: "all", topic: "grammar", description: "Thorough Genki, Quartet, and Tobira textbook grammar walkthroughs for N5–N3.", order: 18 },
  { title: "Japanese Ammo with Misa — Channel", url: "https://www.youtube.com/@JapaneseAmmowithMisa", type: "channel", level: "all", topic: "grammar", description: "Clear, friendly grammar lessons from beginner to advanced.", order: 19 },
  { title: "Organic Japanese with Cure Dolly — Channel", url: "https://www.youtube.com/channel/UCkdmU8hGK4Fg3LghTVtKltQ", type: "channel", level: "all", topic: "grammar", description: "Cure Dolly's structural, intuition-first grammar series.", order: 20 },
  { title: "JapanesePod101 — YouTube Channel", url: "https://www.youtube.com/@JapanesePod101", type: "channel", level: "all", topic: "grammar", description: "Thousands of lessons spanning kana, grammar, vocabulary, and listening.", order: 22 },
  { title: "Learn All 800 JLPT N5 Vocabulary", url: "https://www.youtube.com/watch?v=nuI4OgsJv_Q", type: "video", level: "N5", topic: "vocabulary", description: "A single video walking through all 800 essential JLPT N5 vocabulary words.", order: 26 },
  { title: "JLPT N5 Essential Vocabulary – 591 Words", url: "https://www.youtube.com/watch?v=eOxwB6kVovY", type: "video", level: "N5", topic: "vocabulary", description: "Focused vocabulary review covering 591 high-frequency N5 words.", order: 27 },
  { title: "Kanji Practice for N5 (JLPT) – 107 Kanji", url: "https://www.youtube.com/watch?v=j8YwW-tj1WQ", type: "video", level: "N5", topic: "kanji", description: "Guided practice for the 107 kanji required for JLPT N5.", order: 30 },
  { title: "Easy N4 Japanese Listening Practice (25 min)", url: "https://www.youtube.com/watch?v=j_BO-wLft5Q", type: "video", level: "N4", topic: "listening", description: "25-minute slow-paced listening practice tailored to JLPT N4 learners.", order: 34 },
  { title: "Easy Japanese Listening Practice N4 (40 min)", url: "https://www.youtube.com/watch?v=q6AjmSuEyns", type: "video", level: "N4", topic: "listening", description: "Longer 40-minute N4 listening session for daily immersion.", order: 35 },
  { title: "Japanese with Shun — N5–N4 Listening Podcast", url: "https://www.youtube.com/@JapanesewithShun", type: "channel", level: "N4", topic: "listening", description: "Beginner-friendly slow, natural Japanese podcasts for listening immersion.", order: 38 },
  { title: "Miku Real Japanese — Channel", url: "https://www.youtube.com/channel/UCsQCbl3a9FtYvA55BxdzYiQ", type: "channel", level: "all", topic: "listening", description: "Natural, everyday Japanese conversations with subtitles for N5–N3.", order: 39 },
  { title: "The ULTIMATE Guide to Japanese Particles", url: "https://www.youtube.com/watch?v=i9yqJggtYzo", type: "video", level: "all", topic: "particles", description: "Comprehensive overview of the most important Japanese particles.", order: 42 },
  { title: "は vs が — The ONLY lesson you need!", url: "https://www.youtube.com/watch?v=FknmUij6ZIk", type: "video", level: "N3", topic: "particles", description: "In-depth deep dive into は vs が nuance for N3 mastery.", order: 44 },
  { title: "Game Gengo — Channel", url: "https://www.youtube.com/@GameGengo", type: "channel", level: "all", topic: "reading", description: "Teaches Japanese reading and vocabulary through video game dialogue.", order: 46 },
  // Extra free resources (non-YouTube)
  { title: "Tae Kim's Guide to Japanese Grammar", url: "https://guidetojapanese.org/learn/grammar", type: "channel", level: "all", topic: "grammar", description: "The legendary free grammar guide — rational, intuitive, example-driven.", order: 48 },
  { title: "Tofugu — Learn Japanese Guide", url: "https://www.tofugu.com/learn-japanese", type: "channel", level: "all", topic: "grammar", description: "Tofugu's master guide tying together all their free articles.", order: 49 },
  { title: "Jisho.org — Online Japanese Dictionary", url: "https://jisho.org", type: "channel", level: "all", topic: "vocabulary", description: "The de facto Japanese-English dictionary. Search by kanji, kana, JLPT level.", order: 51 },
  { title: "NHK News Web Easy", url: "https://www3.nhk.or.jp/news/easy/", type: "channel", level: "N4", topic: "reading", description: "Real NHK news rewritten in simple Japanese with furigana and slow audio.", order: 56 },
  { title: "renshuu.org — Free Japanese Learning", url: "https://www.renshuu.org", type: "channel", level: "all", topic: "vocabulary", description: "Adaptive free SRS for vocab, kanji, grammar through N1.", order: 57 },
  { title: "Bunpro — Japanese Grammar SRS", url: "https://bunpro.jp", type: "channel", level: "all", topic: "grammar", description: "Typed-input SRS for grammar with example sentences and audio.", order: 58 },
  { title: "JLPT Sensei — N5/N4/N3 Grammar Lists", url: "https://jlptsensei.com/jlpt-n5-grammar-list", type: "channel", level: "N5", topic: "grammar", description: "Free complete JLPT grammar lists with example sentences and PDFs.", order: 62 },
];

// =================== MAIN ===================
async function main() {
  console.log("🌱 Seeding Nihongo Path database (Drizzle)...");

  // Wipe all tables
  await Promise.all([
    db.delete(schema.kana),
    db.delete(schema.vocabulary),
    db.delete(schema.grammar),
    db.delete(schema.kanji),
    db.delete(schema.counter),
    db.delete(schema.conjugation),
    db.delete(schema.resource),
    db.delete(schema.flashcardProgress),
    db.delete(schema.stats),
    db.delete(schema.dailyActivity),
    db.delete(schema.lessonProgress),
    db.delete(schema.exerciseProgress),
  ]);

  // Kana
  const allKana = [...HIRAGANA, ...KATAKANA];
  for (const k of allKana) {
    await db.insert(schema.kana).values({
      id: uuid(), char: k.char, romaji: k.romaji, type: k.type, row: k.row,
      order: k.order, pair: k.pair ?? null,
    });
  }
  console.log(`  ✓ ${allKana.length} kana seeded`);

  // Vocabulary (dedupe by word+reading+level)
  const seenVocab = new Set<string>();
  for (const v of ALL_VOCAB) {
    const key = `${v.word}|${v.reading}|${v.level}`;
    if (seenVocab.has(key)) continue;
    seenVocab.add(key);
    await db.insert(schema.vocabulary).values({
      id: uuid(),
      word: v.word, reading: v.reading, meaning: v.meaning, romaji: v.romaji ?? null,
      level: v.level, category: v.category, pos: v.pos ?? null,
      verbGroup: v.verbGroup ?? null, pitchAccent: v.pitchAccent ?? null,
      lesson: v.lesson ?? null,
      exampleJp: v.exampleJp ?? null, exampleEn: v.exampleEn ?? null,
      exampleJp2: v.exampleJp2 ?? null, exampleEn2: v.exampleEn2 ?? null,
      order: v.order ?? 0,
    });
  }
  console.log(`  ✓ ${seenVocab.size} vocabulary words seeded`);

  // Grammar (EXPANDED)
  const seenGrammar = new Set<string>();
  let grammarCount = 0;
  for (const g of EXPANDED_GRAMMAR) {
    if (seenGrammar.has(g.title)) continue;
    seenGrammar.add(g.title);
    // Pick first example as the legacy single-example fields for backward compat
    const easyEx = g.examples.find((e) => e.difficulty === "easy") ?? g.examples[0];
    const hardEx = g.examples.find((e) => e.difficulty === "hard") ?? g.examples[1];
    await db.insert(schema.grammar).values({
      id: uuid(),
      title: g.title, level: g.level, lesson: g.lesson, chapter: g.chapter,
      structure: g.structure, meaning: g.meaning,
      rule: g.rule, conjugation: g.conjugation, usage: g.usage,
      commonMistake: g.commonMistake,
      examples: JSON.stringify(g.examples),
      exercises: JSON.stringify(g.exercises),
      // Legacy compat:
      explanation: g.rule,
      exampleJp: easyEx?.jp ?? null,
      exampleEn: easyEx?.en ?? null,
      exampleJp2: hardEx?.jp ?? null,
      exampleEn2: hardEx?.en ?? null,
      note: g.commonMistake ?? null,
      order: g.order,
    });
    grammarCount++;
  }
  console.log(`  ✓ ${grammarCount} grammar points seeded (EXPANDED)`);

  // Kanji — chunk into sets of 10 per level
  // Sort by level then order, then assign set numbers 1, 2, 3... within each level
  const seenKanji = new Set<string>();
  const kanjiByLevel: Record<string, Kanji[]> = { N5: [], N4: [], N3: [] };
  for (const k of ALL_KANJI) {
    if (seenKanji.has(k.character)) continue;
    seenKanji.add(k.character);
    if (!kanjiByLevel[k.level]) kanjiByLevel[k.level] = [];
    kanjiByLevel[k.level].push(k);
  }
  let kanjiCount = 0;
  for (const lvl of ["N5", "N4", "N3"] as const) {
    const arr = kanjiByLevel[lvl];
    arr.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    arr.forEach((k, idx) => {
      const set = Math.floor(idx / 10) + 1; // 1-based set per level
      // tag the kanji with its set
      (k as any)._set = set;
    });
  }
  for (const lvl of ["N5", "N4", "N3"] as const) {
    for (const k of kanjiByLevel[lvl]) {
      await db.insert(schema.kanji).values({
        id: uuid(),
        character: k.character, onyomi: k.onyomi, kunyomi: k.kunyomi, meaning: k.meaning,
        level: k.level, strokeCount: k.strokeCount, jlpt: k.level,
        radical: k.radical ?? null, mnemonic: k.mnemonic ?? null,
        set: (k as any)._set,
        exampleWord: k.exampleWord ?? null,
        exampleRead: k.exampleRead ?? null, exampleMean: k.exampleMean ?? null,
        order: k.order ?? 0,
      });
      kanjiCount++;
    }
  }
  console.log(`  ✓ ${kanjiCount} kanji seeded (chunked into sets of 10)`);

  // Counters
  for (const c of COUNTERS) {
    await db.insert(schema.counter).values({
      id: uuid(),
      kanji: c.kanji, reading: c.reading, meaning: c.meaning, level: c.level,
      one: c.one, two: c.two, three: c.three, four: c.four, five: c.five,
      six: c.six, seven: c.seven, eight: c.eight, nine: c.nine, ten: c.ten,
      exampleJp: c.exampleJp ?? null, exampleEn: c.exampleEn ?? null,
      note: c.note ?? null, order: c.order,
    });
  }
  console.log(`  ✓ ${COUNTERS.length} counters seeded`);

  // Conjugations
  for (const c of CONJUGATIONS) {
    await db.insert(schema.conjugation).values({
      id: uuid(),
      verb: c.verb, reading: c.reading, group: c.group, level: c.level,
      meaning: c.meaning, dict: c.dict, masu: c.masu, nai: c.nai, ta: c.ta, te: c.te,
      potential: c.potential ?? null, passive: c.passive ?? null,
      causative: c.causative ?? null, volitional: c.volitional ?? null,
      conditional: c.conditional ?? null, imperative: c.imperative ?? null,
      order: c.order,
    });
  }
  console.log(`  ✓ ${CONJUGATIONS.length} conjugation tables seeded`);

  // Resources
  const seenResource = new Set<string>();
  let resourceCount = 0;
  for (const r of YOUTUBE_RESOURCES) {
    if (seenResource.has(r.url)) continue;
    seenResource.add(r.url);
    await db.insert(schema.resource).values({
      id: uuid(),
      title: r.title, url: r.url, type: r.type, level: r.level,
      topic: r.topic, description: r.description, order: r.order,
    });
    resourceCount++;
  }
  console.log(`  ✓ ${resourceCount} resources seeded`);

  // default stats
  await db.insert(schema.stats).values({ id: uuid(), key: "streak", value: 0 });
  await db.insert(schema.stats).values({ id: uuid(), key: "totalReviewed", value: 0 });

  console.log("✅ Seed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
