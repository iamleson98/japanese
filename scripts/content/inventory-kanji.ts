/**
 * RECOVERY INVENTORY — kanji characters already covered pre-crash (300 total)
 * and grammar titles (69) that existed in the committed grammar-content.ts.
 * The 77 characters from the committed seed (BASE_KANJI + EXTRA_KANJI) come
 * first conceptually — the caller subtracts them to get the file-only chars.
 */

/** All 300 kanji covered pre-crash (DB 77 + lost kanji-n5-n4.ts 224, minus 1 overlap). */
export const KANJI_COVERED: string =
  "一二三四五六七八九十百千万日本人国学校生先大小中上下山川田水火木金土月年時分私今天気食飲行来見聞読書話車電口目手足男女子父母兄姉右左外出入立休名言音花雨前魚鳥肉米茶馬牛犬猫風雪星石竹草虫糸開閉合同歩走泳遊楽病院医薬活味送着考動屋部台空地場売買帰思知心意果実正理由料試験歌声教科乗降店待持写真字紙室社記員曜服品物事所族祖祝暦体何作使便値借貸返拾探推提換搜払投指技政議民連輸群属規則関決権法罪犯都京市町村県区野原森池鳴岩港波涙湖汽油洋橋単鉛刀刃半号枚斤兵士夫婦息血骨顔首脳胸腰腹背肺胃腸脈肝涼暖冷凍糖酒浴塩皿麦残頑険検銀銃銭鋳築建鉄錆鍋急痛症署察警防禁許律努勤功加労効勝敗参観解説訳評論誌緒続緑線絶綺縁約";

/** Pre-crash category split of the lost vocab files (for regeneration guidance). */
export const FILE_CATEGORIES: Record<string, string[]> = {
  "vocab-n5-a": ["greetings", "expressions", "family", "body", "health", "home", "school", "jobs", "people", "quantities"],
  "vocab-n5-b": ["food", "places", "transport", "shopping", "clothes", "weather", "nature", "hobbies", "time", "adjectives"],
  "vocab-n5-c": ["verbs-daily", "verbs-communication", "verbs-movement", "adverbs", "conjunctions", "question-words"],
  "vocab-n4-a": ["expressions", "time", "verbs-daily", "thinking-feelings", "people-society"],
  "vocab-n4-b": ["places", "home-life", "food-meals", "health-body", "school-work", "money-shopping", "travel", "media-communication", "adjectives", "adverbs"],
  "vocab-n3-a": ["abstract-nouns", "society", "business-office", "formal-verbs", "formal-adjectives", "formal-adverbs"],
  "vocab-n3-b": ["emotions", "relationships", "communication-casual", "culture-tradition", "arts-entertainment", "idiomatic-expressions"],
  "vocab-n3-c": ["science-technology", "medicine-body", "law-politics", "education", "sports", "nature-geography", "media", "onomatopoeia", "proverbs", "formal-verbs", "formal-nouns"],
  "vocab-n4-c": ["keigo", "events-festivals", "emergencies", "insurance-law", "house-diy", "it-electronics", "sports", "nature-geography", "conjunctions", "compound-verbs", "emotions-personality", "practical-misc"],
};

/** Counts of the lost files pre-crash (for regeneration completeness checks). */
export const FILE_COUNTS: Record<string, number> = {
  "vocab-n5-a": 250, "vocab-n5-b": 250, "vocab-n5-c": 153,
  "vocab-n4-a": 250, "vocab-n4-b": 250, "vocab-n4-c": 259,
  "vocab-n3-a": 280, "vocab-n3-b": 250, "vocab-n3-c": 251,
  "kanji-n5-n4": 224,
  "grammar-n5-n4-b": 28, "grammar-n3-b": 28,
};
