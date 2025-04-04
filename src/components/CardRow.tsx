// src/components/CardRow.tsx

import { ComplaintCard } from "./ComplaintCard";

interface CardRowProps {
  title: string;
  cards: any[]; // Array of complaints (or card data)
}

export const CardRow = ({ title, cards }: CardRowProps) => {
  return (
    <div className="flex flex-col items-start gap-2 mb-6">
      <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
      <div className="flex flex-wrap justify-start gap-6 w-full">
        {cards.map((card, index) => (
          <ComplaintCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};
