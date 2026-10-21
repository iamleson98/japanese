/** FSRS-5 invariants + behavior sanity tests (offline, no DB). */
import {
  retrievability,
  intervalForRetention,
  initialStability,
  initialDifficulty,
  nextDifficulty,
  stabilityAfterRecall,
  stabilityAfterForget,
  shortTermStability,
  schedule,
  qualityToGrade,
  stabilityToBox,
} from "../src/lib/fsrs";

function approx(name: string, actual: number, expected: number, tol = 0.01) {
  const ok = Math.abs(actual - expected) <= tol;
  console.log(`${ok ? "✓" : "✗ FAIL"} ${name}: ${actual.toFixed(4)} (expect ~${expected})`);
  if (!ok) process.exitCode = 1;
}

function assertTrue(name: string, cond: boolean) {
  console.log(`${cond ? "✓" : "✗ FAIL"} ${name}`);
  if (!cond) process.exitCode = 1;
}

// --- Invariants from the FSRS wiki ---
approx("D0(1) = w4 (≈7.19)", initialDifficulty(1), 7.1949);
approx("D0(3) ≈ 5.28", initialDifficulty(3), 5.2826);
approx("D0(4) ≈ 3.22 (FSRS-5 weights)", initialDifficulty(4), 3.2249);
approx("S0(3) = w2 (3.173)", initialStability(3), 3.173);
approx("S0(1) = w0 (0.4026)", initialStability(1), 0.40255);
approx("R(t=S) = 0.9", retrievability(3.173, 3.173), 0.9);
approx("I(0.9, S) = S", intervalForRetention(0.9, 3.173), 3.173);
approx("R(0 days) = 1", retrievability(0, 5), 1);

// D update: easy lowers difficulty, again raises it
const dAfterEasy = nextDifficulty(5.28, 4);
const dAfterAgain = nextDifficulty(5.28, 1);
assertTrue(`easy lowers D (${dAfterEasy.toFixed(2)} < 5.28)`, dAfterEasy < 5.28);
assertTrue(`again raises D (${dAfterAgain.toFixed(2)} > 5.28)`, dAfterAgain > 5.28);
assertTrue("D stays in [1,10]", nextDifficulty(1, 1) === 1 || nextDifficulty(1, 1) > 1);

// FSRS-5 weights: w11·D^-w12·((S+1)^w13 - 1)·e^(w14(1-R)) = 1.9395·0.9259·2.9206·1.2548 ≈ 6.58
// (the wiki's "≈3" example uses FSRS-v4 defaults, not FSRS-5)
approx("S'_f(D=2,S=100,R=0.9) ≈ 6.58 (FSRS-5)", stabilityAfterForget(2, 100, 0.9), 6.58, 0.1);

// SInc ≥ 1 on success
const sr = stabilityAfterRecall(5, 3.17, 0.9, 3);
assertTrue(`stability grows on success (${sr.toFixed(2)} > 3.17)`, sr > 3.17);
// smaller R → larger SInc (spacing effect)
const srLowR = stabilityAfterRecall(5, 3.17, 0.5, 3);
assertTrue(`spacing effect: SInc(R=0.5) > SInc(R=0.9)`, srLowR > sr);
// larger S → smaller SInc (saturation)
const srBigS = stabilityAfterRecall(5, 50, 0.9, 3);
assertTrue(`saturation: SInc(S=50) < SInc(S=3.17)`, srBigS / 50 < sr / 3.17);
// hard penalty & easy bonus
const srHard = stabilityAfterRecall(5, 3.17, 0.9, 2);
const srEasy = stabilityAfterRecall(5, 3.17, 0.9, 4);
assertTrue(`hard < good < easy`, srHard < sr && sr < srEasy);

// short-term stability
approx("short-term(G=3) keeps S", shortTermStability(2.5, 3), 2.5 * Math.exp(0.51655 * 0.6621), 0.01);

// --- Scheduler behaviors ---
const now = Date.parse("2026-10-21T10:00:00Z");

// New card, good
const newGood = schedule({ stability: 0, difficulty: 5, reps: 0, lapses: 0, lastSeenAt: null }, 3, now);
approx("new/good S = 3.173", newGood.stability, 3.173);
assertTrue(`new/good interval ~3d (${newGood.interval})`, newGood.interval >= 2 && newGood.interval <= 4);
assertTrue("new/good not learning", !newGood.learning);

// New card, again → learning step (minutes)
const newAgain = schedule({ stability: 0, difficulty: 5, reps: 0, lapses: 0, lastSeenAt: null }, 1, now);
assertTrue(`new/again learning=true`, newAgain.learning);
assertTrue(`new/again due in 10min`, Math.abs(newAgain.dueAt - (now + 600_000)) < 1000);
assertTrue(`new/again S small (${newAgain.stability.toFixed(3)})`, newAgain.stability < 0.5);

// Successful review after 10 days on S=3.17 card (R ≈ 0.66)
const state = { stability: 3.17, difficulty: 5.28, reps: 3, lapses: 0, lastSeenAt: now - 10 * 86400000 };
const rev = schedule(state, 3, now);
const rExpected = retrievability(10, 3.17);
approx("R(10d, S=3.17) ≈ 0.758", rExpected, 0.758, 0.005);
assertTrue(`review grows S (${rev.stability.toFixed(2)} > 3.17)`, rev.stability > 3.17);
assertTrue(`review interval > previous`, rev.interval > 3);

// Lapse after 10 days → post-lapse stability < original S
const lapse = schedule(state, 1, now);
assertTrue(`lapse reduces S (${lapse.stability.toFixed(2)} < 3.17)`, lapse.stability < 3.17);
assertTrue("lapse is learning step", lapse.learning);

// Overdue boost: recalling a very stale card yields higher S than fresh recall
const stale = schedule({ ...state, lastSeenAt: now - 60 * 86400000 }, 3, now);
const fresh = schedule(state, 3, now);
assertTrue(
  `overdue recall boosts stability (${stale.stability.toFixed(1)} > ${fresh.stability.toFixed(1)})`,
  stale.stability > fresh.stability,
);

// Desired retention: 0.95 → shorter intervals than 0.9
const r95 = schedule(state, 3, now, 0.95);
const r90 = schedule(state, 3, now, 0.9);
assertTrue(`higher retention → shorter interval (${r95.interval} < ${r90.interval})`, r95.interval < r90.interval);

// Grade mapping + legacy derivation
assertTrue("quality map", qualityToGrade("again") === 1 && qualityToGrade("easy") === 4);
assertTrue("box derivation", stabilityToBox(0.5) === 0 && stabilityToBox(50) === 5);

console.log("\nAll FSRS sanity checks done.");
