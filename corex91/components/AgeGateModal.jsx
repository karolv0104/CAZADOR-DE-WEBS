"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "corex91_gate_confirmed";

export default function AgeGateModal() {
  const [visible, setVisible] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [isResearchOnly, setIsResearchOnly] = useState(false);

  useEffect(() => {
    const confirmed = window.localStorage.getItem(STORAGE_KEY);
    if (confirmed !== "true") {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = visible ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [visible]);

  function handleEnter() {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  }

  function handleExit() {
    window.location.href = "https://www.google.com";
  }

  if (!visible) return null;

  const canEnter = isAdult && isResearchOnly;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <p className="font-display text-sm font-semibold tracking-widest text-cyan">
          COREX 91
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold text-primary">
          Research access.
        </h2>
        <p className="mt-3 text-sm text-muted">
          Please confirm the following before entering the site.
        </p>

        <div className="mt-6 space-y-4">
          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={isAdult}
              onChange={(e) => setIsAdult(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-primary"
            />
            <span>I am 18 years of age or older.</span>
          </label>

          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={isResearchOnly}
              onChange={(e) => setIsResearchOnly(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-primary"
            />
            <span>
              I understand these products are for laboratory research use
              only and are not for human consumption.
            </span>
          </label>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={handleExit}
            className="flex-1 rounded-md border border-surface py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-surface"
          >
            Exit
          </button>
          <button
            type="button"
            onClick={handleEnter}
            disabled={!canEnter}
            className="flex-1 rounded-md bg-primary py-2.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            Enter
          </button>
        </div>

        <p className="mt-6 text-center text-[11px] font-semibold uppercase tracking-wide text-faint">
          For research use only. Not for human consumption.
        </p>
      </div>
    </div>
  );
}
