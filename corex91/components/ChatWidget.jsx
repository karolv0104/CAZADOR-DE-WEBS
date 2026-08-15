"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I can answer educational, scientific questions about our peptides — mechanism of action, molecular structure, published research. I can't advise on personal use or dosing. What would you like to know?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error("chat request failed");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong reaching the assistant. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-30">
      {open && (
        <div className="mb-3 flex h-[28rem] w-80 flex-col overflow-hidden rounded-lg border border-surface bg-white shadow-2xl sm:w-96">
          <div className="flex items-center justify-between bg-primary px-4 py-3">
            <div>
              <p className="font-display text-sm font-bold text-white">
                COREX <span className="text-cyan">91</span> Assistant
              </p>
              <p className="text-[11px] text-[#B8C4CE]">
                Educational information only
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-white"
                    : "bg-surface text-ink"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-lg bg-surface px-3 py-2 text-sm text-muted">
                Thinking…
              </div>
            )}
          </div>

          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 border-t border-surface p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a peptide's mechanism…"
              className="flex-1 rounded-md border border-surface px-3 py-2 text-sm text-ink outline-none focus:border-cyan"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-cyan text-white disabled:opacity-50"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </form>

          <p className="border-t border-surface px-4 py-2 text-[10px] leading-snug text-faint">
            For laboratory research use only. Not for human consumption. For
            questions about personal use, consult a qualified healthcare
            professional.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-opacity hover:opacity-90"
        aria-label="Toggle chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
