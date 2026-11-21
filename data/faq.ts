export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: "Are these results exact payouts?",
    answer:
      "No. Results are estimates. Actual fees may vary by category, seller plan, order conditions, location, shipping method, taxes and promotions. Official marketplace policies take precedence.",
  },
  {
    question: "Does this tool store my inputs?",
    answer:
      "Inputs stay in your browser. The calculator has no backend and does not transmit item costs, sale prices or profit amounts.",
  },
  {
    question: "Why do marketplaces show different fees?",
    answer:
      "Each marketplace uses a different fee base and rate. Expand the fee breakdown to see the fee name, rate, base and arithmetic for each.",
  },
];