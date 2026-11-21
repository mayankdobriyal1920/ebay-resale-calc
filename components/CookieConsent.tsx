"use client";

import { useEffect, useState } from "react";

const KEY = "ebay-cal:consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  function accept() {
    try {
      window.localStorage.setItem(KEY, "accepted");
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-white/95 p-4 shadow-xl backdrop-blur">
      <p className="text-sm text-muted">
        We use essential storage for your inputs. If analytics or ads are enabled, they may use
        cookies. See the Privacy Policy.
      </p>
      <div className="mt-3 flex justify-end gap-2">
        <a href="/privacy-policy" className="rounded-lg px-3 py-1.5 text-sm text-green-700 underline">
          Privacy
        </a>
        <button onClick={accept} className="btn-primary text-sm">
          Got it
        </button>
      </div>
    </div>
  );
}