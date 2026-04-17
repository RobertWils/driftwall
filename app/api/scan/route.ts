import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { computeResults, type Framework } from "@/lib/attacks";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: {
    framework?: string;
    config?: string;
    email?: string | null;
    agentName?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const framework = (["LangChain", "AutoGen", "CrewAI", "Custom"].includes(body.framework ?? "")
    ? body.framework
    : "Custom") as Framework;

  const config = (body.config ?? "").slice(0, 20_000);
  if (!config.trim()) {
    return NextResponse.json({ error: "config is required" }, { status: 400 });
  }

  const { results, riskScore, profile } = computeResults(framework);

  try {
    const saved = await prisma.agentScan.create({
      data: {
        agentName: body.agentName?.slice(0, 120) || `${framework} Agent`,
        framework,
        configSnapshot: config,
        riskScore,
        attackResults: results,
        email: body.email?.slice(0, 200) || null,
      },
      select: { id: true, createdAt: true },
    });
    return NextResponse.json({
      id: saved.id,
      createdAt: saved.createdAt,
      framework,
      riskScore,
      label: profile.label,
      results,
    });
  } catch (err) {
    console.error("[/api/scan] persist failed, returning unpersisted result", err);
    return NextResponse.json({
      id: null,
      createdAt: new Date().toISOString(),
      framework,
      riskScore,
      label: profile.label,
      results,
      persisted: false,
    });
  }
}
