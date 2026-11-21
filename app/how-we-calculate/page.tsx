"use client";

import { useEffect } from "react";

export default function RedirectPage() {
  useEffect(() => {
    window.location.replace("/methodology");
  }, []);
  return (
    <div className="glass-card p-6">
      <p className="text-muted">Redirecting to <a href="/methodology" className="text-green-700 underline">/methodology</a>...</p>
    </div>
  );
}