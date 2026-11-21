import { FAQ as FAQS } from "@/data/faq";

export default function FAQ() {
  return (
    <section className="glass-card p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-green-800">Frequently asked questions</h2>
      <div className="mt-3 divide-y divide-border">
        {FAQS.map((f, i) => (
          <details key={i} className="group py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-medium text-text">
              {f.question}
              <span className="text-muted transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}