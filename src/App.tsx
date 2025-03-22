import { Navbar } from "./Navbar";
import { ArticleCard } from "./components/ArticleCard";
import { articleData } from "./data";

export function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-[100vh] flex flex-col items-center justify-start container max-w-screen-lg mx-auto">
        <div className="py-10">
          <Header />
          <ThirdwebResources />
        </div>
      </main>
    </>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">

      <h1 className="text-2xl md:text-6xl font-bold tracking-tighter mt-1 -mb-10 text-zinc-100">
        My EVM
		<span className="text-zinc-300 inline-block mx-1">  </span>
		<span className="inline-block -skew-x-6" style={{ color: 'hsl(294, 100%, 60%)' }}>.xyz</span>

      </h1>

    </header>
  );
}

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      {articleData.map((item, i) => (
        <ArticleCard key={i} {...item} />
      ))}
    </div>
  );
}