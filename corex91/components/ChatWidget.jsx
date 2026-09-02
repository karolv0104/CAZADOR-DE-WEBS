"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";
import BotAvatar from "./BotAvatar";

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hi! I can answer scientific, educational questions about our peptides — mechanism of action, molecular structure, published research. I can't advise on personal use or dosing. What would you like to know?",
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
            "Something went wrong reaching the assistant. Please try again in a moment.",
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
          <div className="flex items-center gap-2.5 bg-primary px-4 py-3">
            <BotAvatar size={30} />
            <p className="font-display text-sm font-bold text-white">
              COREX <span className="text-cyan">91</span> Assistant
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-auto text-white/80 hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <p className="border-b border-surface bg-surface px-4 py-2 text-[10px] leading-snug text-muted">
            This assistant provides general scientific information. It does
            not replace professional advice. Products are for research use
            only.
          </p>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && <BotAvatar size={22} />}
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-white"
                      : "bg-surface text-ink"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-end gap-2">
                <BotAvatar size={22} />
                <div className="max-w-[75%] rounded-lg bg-surface px-3 py-2 text-sm text-muted">
                  Thinking…
                </div>
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
              placeholder="Ask about a mechanism of action…"
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
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-primary text-white shadow-lg transition-opacity hover:opacity-90"
        aria-label="Open chat"
      >
        {open ? <X size={22} /> : <BotAvatar size={56} />}
      </button>
    </div>
  );
}
