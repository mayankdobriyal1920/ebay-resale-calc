import Link from "next/link";
export default function EtsyFeeCalculatorPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-green-800">Etsy Fee Calculator</h1>
      <p className="text-muted">Phase 2 marketplace. Not yet implemented.</p>
      <Link href="/" className="text-green-700 underline">Back to home</Link>
    </div>
  );
}