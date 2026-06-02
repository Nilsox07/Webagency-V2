import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, recordTool } from "@/lib/lumi-prompt";
import { runFallback } from "@/lib/lumi-fallback";
import { missingRequiredSlots } from "@/lib/lumi-schema";
import { estimatePrice } from "@/lib/lumi-pricing";
import type { PackageId } from "@/lib/packages";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface LumiRequest {
  packageId: PackageId;
  messages: ChatMessage[];
  data: Record<string, unknown>;
}

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

export async function POST(req: NextRequest) {
  let body: LumiRequest;
  try {
    body = (await req.json()) as LumiRequest;
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { packageId, messages = [], data = {} } = body;
  if (!packageId) {
    return NextResponse.json({ error: "Kein Paket gewählt." }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // ── Fallback-Modus (kein API-Key) ──────────────────────────────────────
  if (!apiKey) {
    const result = runFallback(packageId, messages, data);
    return NextResponse.json({
      message: result.message,
      data: result.data,
      finished: result.finished,
      estimate: estimatePrice(packageId, result.data),
      mode: "fallback",
    });
  }

  // ── LLM-Modus (Claude) ─────────────────────────────────────────────────
  try {
    const client = new Anthropic({ apiKey });
    const branche = data.branche as string | undefined;
    const system = buildSystemPrompt(packageId, branche);

    // Konversation für Claude aufbereiten. Bei leerer Historie initialer Kick.
    const convo: Anthropic.MessageParam[] =
      messages.length === 0
        ? [{ role: "user", content: "Starte das Briefing mit einer kurzen Begrüßung und der ersten Frage." }]
        : messages.map((m) => ({ role: m.role, content: m.content }));

    // Aktuell erfasste Daten als Kontext anhängen
    convo.push({
      role: "user",
      content: `(Systemkontext, nicht beantworten: Bereits erfasste Daten = ${JSON.stringify(
        data
      )}. Stelle die nächste sinnvolle Frage oder schließe ab.)`,
    });

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system,
      tools: [recordTool],
      tool_choice: { type: "tool", name: "record" },
      messages: convo,
    });

    const toolUse = response.content.find((c) => c.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      // Fallback, falls Claude kein Tool nutzt
      const result = runFallback(packageId, messages, data);
      return NextResponse.json({
        message: result.message,
        data: result.data,
        finished: result.finished,
        estimate: estimatePrice(packageId, result.data),
        mode: "fallback",
      });
    }

    const input = toolUse.input as {
      message: string;
      updates?: Record<string, unknown>;
      finished?: boolean;
    };

    const mergedData = { ...data, ...(input.updates || {}) };

    // Deterministischer Vollständigkeits-Check: required-Slots müssen gefüllt sein
    const missing = missingRequiredSlots(
      packageId,
      mergedData,
      mergedData.branche as string | undefined
    );
    const finished = Boolean(input.finished) && missing.length === 0;

    return NextResponse.json({
      message: input.message,
      data: mergedData,
      finished,
      estimate: estimatePrice(packageId, mergedData),
      mode: "llm",
    });
  } catch (err) {
    console.error("Lumi LLM error:", err);
    // Bei API-Fehler graceful auf Fallback umschalten
    const result = runFallback(packageId, messages, data);
    return NextResponse.json({
      message: result.message,
      data: result.data,
      finished: result.finished,
      estimate: estimatePrice(packageId, result.data),
      mode: "fallback",
    });
  }
}
