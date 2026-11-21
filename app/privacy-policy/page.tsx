"use client";

import { useEffect } from "react";

export default function RedirectPage() {
  useEffect(() => {
    window.location.replace("/privacy");
  }, []);
  return (
    <div className="glass-card p-6">
      <p className="text-muted">Redirecting to <a href="/privacy" className="text-green-700 underline">/privacy</a>...</p>
    </div>
  );
}