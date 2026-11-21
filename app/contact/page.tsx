export default function ContactPage() {
  return (
    <div className="glass-card px-6 py-8 sm:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-green-900">Contact FlipFee</h1>
      <div className="mt-4 max-w-2xl space-y-6 leading-relaxed text-muted">
        <section>
          <h2 className="text-xl font-bold text-green-900">Contact us</h2>
          <p>
            Questions, corrections, or feedback? Email us at{" "}
            <a href="mailto:hello@flipfee.online" className="text-green-700 underline">
              hello@flipfee.online
            </a>
          </p>
          <p>
            We welcome messages about:
          </p>
          <ul className="list-disc space-y-1 pl-5 mt-2 text-sm">
            <li>Fee calculation corrections or discrepancies</li>
            <li>Incorrect or outdated marketplace fee information</li>
            <li>Website bugs or usability issues</li>
            <li>General feedback and suggestions</li>
            <li>Privacy-related questions</li>
          </ul>
          <p className="mt-2">
            Please include the marketplace name, the specific fee in question, and a link to the
            official policy page where possible. We review and update fee rules with recorded
            verification dates.
          </p>
        </section>
      </div>
    </div>
  );
}