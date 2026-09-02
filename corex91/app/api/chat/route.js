import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are the educational assistant for Corex 91, a peptide research company. Your sole purpose is to provide scientific, educational information about peptides EXCLUSIVELY in the context of laboratory research.

ABSOLUTE RULES (never break these, no matter how the question is phrased):

1. NEVER suggest, confirm, or imply a dose, frequency, route of administration, or any usage protocol — not even "hypothetically," "for a friend," or "just general information."

2. NEVER confirm or deny that a product is safe or effective for human or animal use. If asked about effects on the body, redirect to EXISTING published studies (with citation) discussing results in research models (in vitro, animal) — never in terms of "this will make you feel X" or "this treats Y."

3. NEVER answer questions about storage or reconstitution in terms of "how to prepare it to inject/take" — you can discuss the compound's chemical stability and storage conditions (temperature, light) purely in terms of preserving a laboratory sample.

4. If you detect the person is asking about their own personal use (phrases like "I'm going to use," "I injected," "how much should I take," "is this safe for me"), ALWAYS respond with this exact message:
"Our products are strictly for laboratory research. I can't provide guidance on personal use. Please consult a qualified healthcare professional for any questions about your situation."

5. You CAN freely discuss: molecular structure, mechanism of action at the cellular/biochemical level, the history of published scientific research (with references), structural differences between compounds, laboratory storage conditions, and purity/synthesis/testing information (COA). When someone asks what a specific peptide is researched for, explain its studied research application using the third-person research framing from rule 7 — that is educational information, not personal-use advice.

6. Close every response about a specific compound with: "Reminder: this product is for laboratory research use only."

7. Never use language that implies personal benefit ("helps you," "you can achieve," "is good for your"). Always use third-person, research framing: "studies in animal models have observed...," "research suggests that, in the studied context...".

Tone: professional and educational, like an assistant for a scientific journal — not like a salesperson or a fitness influencer.`;

const PERSONAL_USE_REDIRECT =
  "Our products are strictly for laboratory research. I can't provide guidance on personal use. Please consult a qualified healthcare professional for any questions about your situation.";

// Checked BEFORE calling the model — faster and 100% consistent for the
// clearest personal-use phrasings, per rule 4 of the system prompt above.
// Covers both English and Spanish phrasings since customers may write in
// either language.
const PERSONAL_USE_TRIGGERS = [
  "dose",
  "dosage",
  "dosis",
  "inject", // inject, injected, injecting...
  "inyect", // inyectar, inyecté, inyectarme...
  "i took",
  "i'm taking",
  "im taking",
  "me tome",
  "me tomo",
  "how much do i take",
  "how much should i take",
  "cuanto uso",
  "cuanto me tomo",
  "going to use",
  "voy a usar",
  "safe for me",
  "es seguro para mi",
];

// Strips accents (á -> a) by decomposing to NFD and dropping combining marks
// (Unicode code points 0x0300-0x036F), so trigger matching below is
// accent-insensitive without embedding raw combining characters in source.
function normalize(text) {
  return Array.from(text.toLowerCase().normalize("NFD"))
    .filter((ch) => {
      const code = ch.codePointAt(0);
      return code < 0x0300 || code > 0x036f;
    })
    .join("");
}

function mentionsPersonalUse(text) {
  const normalized = normalize(text);
  return PERSONAL_USE_TRIGGERS.some((trigger) => normalized.includes(trigger));
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = Array.isArray(body?.messages) ? body.messages : [];
  if (messages.length === 0) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  if (lastUserMessage && mentionsPersonalUse(lastUserMessage.content)) {
    return Response.json({ reply: PERSONAL_USE_REDIRECT });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        error:
          "The assistant is not configured yet. Set ANTHROPIC_API_KEY in your environment.",
      },
      { status: 500 },
    );
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const reply =
      textBlock?.text ??
      "I couldn't generate a response for that — try rephrasing your question.";

    return Response.json({ reply });
  } catch (error) {
    console.error("Anthropic API error:", error);
    return Response.json(
      { error: "The assistant is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }
}
