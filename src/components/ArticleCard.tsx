// src/components/ArticleCard.tsx

interface ArticleCardProps {
  title: string;
  href: string;
  description: string;
}

export function ArticleCard({ title, href, description }: ArticleCardProps) {
  return (
    <a
      href={`${href}?utm_source=vite-template`}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
      rel="noreferrer"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-zinc-400">{description}</p>
      </article>
    </a>
  );
} 
