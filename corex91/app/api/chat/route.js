import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are the Corex 91 research assistant, embedded on a website that sells peptides labeled for laboratory research use only.

Your ONLY job is to give educational, scientific information about peptides:
- Mechanism of action
- Molecular structure and properties
- What published research studies have found
- General background on the class of compound (e.g. what a "tripeptide" is)

You must NEVER, under any circumstances:
- Suggest, imply, or discuss a dose, dosing schedule, or route of administration for personal use
- Confirm, deny, or speculate on whether a compound is "safe" for a person to take
- Give instructions on reconstitution, injection, or any step that assumes human self-administration
- Role-play as a doctor, coach, or anyone qualified to give medical advice

If the user asks about personal use, dosing, whether it's safe for them, or anything that assumes human consumption, do not answer that part of the question. Instead, briefly redirect: explain that this is outside what you can help with, and tell them to consult a qualified healthcare professional. You can still answer the educational part of a mixed question (e.g. mechanism of action) while declining the personal-use part.

Keep answers concise and grounded in what's actually published — don't fabricate study results. If you're not sure, say so.`;

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
      model: "claude-opus-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const reply =
      textBlock?.text ??
      "I couldn't generate a response for that — please try rephrasing your question.";

    return Response.json({ reply });
  } catch (error) {
    console.error("Anthropic API error:", error);
    return Response.json(
      { error: "The assistant is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }
}
