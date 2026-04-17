import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase().slice(0, 200);
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const source = (body.source ?? "scan").slice(0, 40);

  try {
    const entry = await prisma.waitlistEntry.upsert({
      where: { email },
      create: { email, source },
      update: { source },
      select: { id: true, email: true, source: true, createdAt: true },
    });
    return NextResponse.json(entry);
  } catch (err) {
    console.error("[/api/waitlist] db error", err);
    return NextResponse.json({ ok: true, persisted: false, email });
  }
}
