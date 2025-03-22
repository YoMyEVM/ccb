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
      className="flex flex-col rounded-lg hover:bg-zinc-900 transition-colors overflow-hidden"
      style={{ border: '1px solid hsl(294, 100%, 60%)', width: '100%', maxWidth: '350px' }}
      rel="noreferrer"
    >
      <img src={image} alt={title} className="w-full aspect-square object-cover" />
      <article className="p-4 text-center">
        <h2 className="text-2xl font-semibold mb-2" style={{ color: 'hsl(294, 100%, 60%)' }}>{title}</h2>
        <p className="text-sm text-zinc-400">{description}</p>
      </article>
    </a>
  );
}