import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/prisma/seed-logic";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const counts = await seedDatabase(prisma);
    return NextResponse.json({ ok: true, ...counts });
  } catch (err) {
    console.error("[/api/seed] failed", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "unknown" },
      { status: 500 },
    );
  }
}
