/**
 * FSRS-5 — Free Spaced Repetition Scheduler (open-spaced-repetition).
 * Implementation follows the published FSRS-5 spec:
 * https://github.com/open-spaced-repetition/awesome-fsrs/wiki/The-Algorithm
 *
 * FSRS models each card's memory as three values:
 *  - Difficulty D ∈ [1,10]   how hard it is to strengthen this memory
 *  - Stability S (days)      time for recall probability R to drop to 90%
 *  - Retrievability R ∈ [0,1] probability you can recall it right now
 *
 * Benchmarks (Expertium/Ye, SRS Benchmark) show FSRS beats SM-2 for ~99.6% of
 * users: fewer reviews for the same retention, no "ease hell", graceful
 * handling of overdue reviews.
 */

export type Grade = 1 | 2 | 3 | 4; // 1=again, 2=hard, 3=good, 4=easy

export const GRADE_LABEL: Record<Grade, string> = {
  1: "again",
  2: "hard",
  3: "good",
  4: "easy",
};

/** FSRS-5 default parameters (19 weights). */
export const FSRS_W = [
  0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046,
  1.54575, 0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315,
  2.9898, 0.51655, 0.6621,
] as const;

const DECAY = -0.5;
const FACTOR = 19 / 81;
const MIN_STABILITY = 0.1;
const DAY_MS = 86_400_000;

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

/** Retrievability: probability of recall after `elapsedDays` with stability S. */
export function retrievability(elapsedDays: number, stability: number): number {
  if (stability <= 0) return 0;
  const r = Math.pow(1 + FACTOR * (elapsedDays / stability), DECAY);
  return clamp(r, 0, 1);
}

/** Interval (days) that yields recall probability `r` for stability S. */
export function intervalForRetention(r: number, stability: number): number {
  const interval = (stability / FACTOR) * (Math.pow(r, 1 / DECAY) - 1);
  return Math.max(0.01, interval);
}

/** S0(G): initial stability after the first rating. */
export function initialStability(g: Grade): number {
  return Math.max(MIN_STABILITY, FSRS_W[g - 1]);
}

/** D0(G): initial difficulty after the first rating. */
export function initialDifficulty(g: Grade): number {
  return clamp(FSRS_W[4] - Math.exp(FSRS_W[5] * (g - 1)) + 1, 1, 10);
}

/** D'(D,G): difficulty update with linear damping + mean reversion to D0(4). */
export function nextDifficulty(d: number, g: Grade): number {
  const deltaD = -FSRS_W[6] * (g - 3);
  const dPrime = d + deltaD * ((10 - d) / 9);
  const d0Easy = initialDifficulty(4);
  return clamp(FSRS_W[7] * d0Easy + (1 - FSRS_W[7]) * dPrime, 1, 10);
}

/** S'_r: stability after a successful recall (hard/good/easy). */
export function stabilityAfterRecall(d: number, s: number, r: number, g: Grade): number {
  const hardPenalty = g === 2 ? FSRS_W[15] : 1;
  const easyBonus = g === 4 ? FSRS_W[16] : 1;
  const sInc =
    1 +
    Math.exp(FSRS_W[8]) *
      (11 - d) *
      Math.pow(s, -FSRS_W[9]) *
      (Math.exp(FSRS_W[10] * (1 - r)) - 1) *
      hardPenalty *
      easyBonus;
  return Math.max(MIN_STABILITY, s * sInc);
}

/** S'_f: post-lapse stability after forgetting. */
export function stabilityAfterForget(d: number, s: number, r: number): number {
  const sf =
    FSRS_W[11] * Math.pow(d, -FSRS_W[12]) * (Math.pow(s + 1, FSRS_W[13]) - 1) * Math.exp(FSRS_W[14] * (1 - r));
  return Math.max(MIN_STABILITY, sf);
}

/** Short-term stability after a same-day review. */
export function shortTermStability(s: number, g: Grade): number {
  return Math.max(MIN_STABILITY, s * Math.exp(FSRS_W[17] * (g - 3 + FSRS_W[18])));
}

/** ±5% interval fuzz to avoid review pileups (applied to intervals ≥ 2.5 days). */
function fuzz(interval: number): number {
  if (interval < 2.5) return interval;
  const jitter = 1 + (Math.random() * 0.1 - 0.05);
  return interval * jitter;
}

export type MemoryState = {
  stability: number; // S
  difficulty: number; // D
  reps: number;
  lapses: number;
  lastSeenAt: number | null; // epoch ms
};

export type ScheduleResult = {
  stability: number;
  difficulty: number;
  interval: number; // days (0 → due within minutes/learning step)
  dueAt: number; // epoch ms
  retrievability: number; // R at review time
  elapsedDays: number;
  learning: boolean; // true → same-session relearning (minutes-scale)
};

/**
 * Full FSRS-5 scheduler.
 * @param state   current memory state (stability/difficulty/reps/lapses/lastSeenAt)
 * @param grade   1=again 2=hard 3=good 4=easy
 * @param now     epoch ms of the review
 * @param desiredRetention target recall probability (default 0.9)
 */
export function schedule(
  state: Pick<MemoryState, "stability" | "difficulty" | "reps" | "lapses" | "lastSeenAt">,
  grade: Grade,
  now = Date.now(),
  desiredRetention = 0.9,
): ScheduleResult {
  const isNew = state.reps === 0;
  const elapsedDays = state.lastSeenAt
    ? Math.max(0, (now - state.lastSeenAt) / DAY_MS)
    : 0;
  const r = isNew ? 1 : retrievability(elapsedDays, state.stability);
  const sameDay = !isNew && elapsedDays < 0.833; // < 20h counts as same-day

  let stability: number;
  let difficulty: number;
  let interval: number; // days
  let learning = false;

  if (isNew) {
    stability = initialStability(grade);
    difficulty = initialDifficulty(grade);
    if (grade === 1) {
      // Failed on first sight — short learning step, retry within minutes
      learning = true;
      interval = 0;
    } else {
      interval = clamp(Math.round(fuzz(intervalForRetention(desiredRetention, stability))), 1, 36_500);
    }
  } else if (sameDay) {
    // In-session / same-day relearning path
    difficulty = nextDifficulty(state.difficulty, grade);
    if (grade === 1) {
      stability = stabilityAfterForget(state.difficulty, state.stability, r);
      learning = true;
      interval = 0;
    } else if (grade === 2) {
      stability = shortTermStability(state.stability, grade);
      learning = true; // hard same-day → come back later this session
      interval = 0;
    } else {
      // good/easy same-day → graduate to a real interval
      stability = shortTermStability(state.stability, grade);
      interval = clamp(Math.round(fuzz(intervalForRetention(desiredRetention, stability))), 1, 36_500);
    }
  } else {
    difficulty = nextDifficulty(state.difficulty, grade);
    if (grade === 1) {
      stability = stabilityAfterForget(state.difficulty, state.stability, r);
      learning = true;
      interval = 0;
    } else {
      stability = stabilityAfterRecall(state.difficulty, state.stability, r, grade);
      interval = clamp(Math.round(fuzz(intervalForRetention(desiredRetention, stability))), 1, 36_500);
    }
  }

  const LEARNING_DELAY_MS = 10 * 60 * 1000; // 10 minutes
  const HARD_SAME_DAY_MS = 25 * 60 * 1000; // 25 minutes
  const dueAt = learning
    ? now + (grade === 2 ? HARD_SAME_DAY_MS : LEARNING_DELAY_MS)
    : now + Math.max(interval, 0) * DAY_MS + 60 * 1000;

  return {
    stability,
    difficulty,
    interval,
    dueAt,
    retrievability: r,
    elapsedDays,
    learning,
  };
}

/** Map legacy quality strings to FSRS grades. */
export function qualityToGrade(quality: string): Grade {
  switch (quality) {
    case "again":
      return 1;
    case "hard":
      return 2;
    case "easy":
      return 4;
    default:
      return 3;
  }
}

/** Derived legacy Leitner box from stability (used by old dashboards). */
export function stabilityToBox(stability: number): number {
  if (stability < 1) return 0;
  if (stability < 3) return 1;
  if (stability < 7) return 2;
  if (stability < 15) return 3;
  if (stability < 35) return 4;
  return 5;
}

/** Derived legacy ease (×100) from FSRS difficulty. */
export function difficultyToEase(difficulty: number): number {
  // D=1 (easy) → 310, D=5 → 250, D=10 (hard) → 170
  return Math.round(clamp(262 - (difficulty - 5) * 19, 130, 350));
}

/** Human-readable summary of the next review. */
export function describeInterval(days: number): string {
  if (days <= 0) return "later this session";
  if (days < 1) return "<1 day";
  if (days === 1) return "1 day";
  if (days < 30) return `${Math.round(days)} days`;
  if (days < 365) return `${(days / 30).toFixed(1)} months`;
  return `${(days / 365).toFixed(1)} years`;
}
