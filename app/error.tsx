"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-danger">Something went wrong</h1>
      <button onClick={reset} className="text-green-700 underline">
        Try again
      </button>
    </div>
  );
}