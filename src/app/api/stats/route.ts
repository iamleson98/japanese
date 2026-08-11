import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const [streakStat, totalStat, activity] = await Promise.all([
    db.stats.findUnique({ where: { key: "streak" } }),
    db.stats.findUnique({ where: { key: "totalReviewed" } }),
    db.dailyActivity.findMany({ orderBy: { date: "desc" }, take: 30 }),
  ]);
  return NextResponse.json({
    streak: streakStat?.value ?? 0,
    totalReviewed: totalStat?.value ?? 0,
    activity,
  });
}
