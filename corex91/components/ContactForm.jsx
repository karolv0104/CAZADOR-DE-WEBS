"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${form.name || "website"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`,
    );
    window.location.href = `mailto:support@corex91.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted">
          Name
        </label>
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className="mt-1.5 w-full rounded-md border border-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-cyan"
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          className="mt-1.5 w-full rounded-md border border-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-cyan"
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="mt-1.5 w-full resize-none rounded-md border border-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-cyan"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Send message
      </button>
    </form>
  );
}
