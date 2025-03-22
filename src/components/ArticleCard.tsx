// src/components/ArticleCard.tsx

interface ArticleCardProps {
  title: string;
  href: string;
  description: string;
  image: string;
  bonus: string;
}

export function ArticleCard({ title, href, description, image, bonus }: ArticleCardProps) {
  return (
    <a
      href={href}
      className="flex flex-col rounded-lg hover:bg-zinc-900 transition-colors overflow-hidden"
      style={{ border: '1px solid hsl(294, 100%, 60%)', width: '100%', maxWidth: '350px' }}
      rel="noreferrer"
    >
      <div className="text-center text-xl font-bold py-2">
        <div className="text-white">Bonus</div>
        <div className="text-3xl" style={{ color: '#0edbe5' }}>{bonus}</div>
      </div>
      <img src={image} alt={title} className="w-full aspect-square object-cover" />
      <article className="p-4 text-center">
        <h2 className="text-2xl font-semibold mb-2 text-white">{title}</h2>
        <p className="text-xl" style={{ color: 'hsl(119, 100%, 60%)' }}>{description}</p>
      </article>
    </a>
  );
}
