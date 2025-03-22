// src/components/ArticleCard.tsx

interface ArticleCardProps {
  title: string;
  href: string;
  description: string;
  image: string;
}

export function ArticleCard({ title, href, description, image }: ArticleCardProps) {
  return (
    <a
      href={`${href}?utm_source=vite-template`}
      target="_blank"
      className="flex flex-col border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700 overflow-hidden"
      rel="noreferrer"
    >
      <img src={image} alt={title} className="w-full aspect-square object-cover" />
      <article className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-zinc-400">{description}</p>
      </article>
    </a>
  );
}
