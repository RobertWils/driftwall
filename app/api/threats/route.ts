import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await prisma.threatEvent.findMany({
      orderBy: { timestamp: "desc" },
      take: 8,
    });
    return NextResponse.json(
      rows.map((r) => ({
        id: r.id,
        agentName: r.agentId,
        eventType: r.eventType,
        severity: r.severity,
        description: r.description,
        timestamp: r.timestamp.toISOString(),
      })),
    );
  } catch (err) {
    console.error("[/api/threats] db error", err);
    return NextResponse.json([], { status: 200 });
  }
}
