import thirdwebIcon from "./thirdweb.svg";
import { Navbar } from "./Navbar";
import { ArticleCard } from "./components/ArticleCard";
import { articleData } from "./data";

export function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-[100vh] flex flex-col items-center justify-start container max-w-screen-lg mx-auto">
        <div className="py-20">
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
      <img
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{ filter: "drop-shadow(0px 0px 24px #a726a9a8)" }}
      />
      <h1 className="text-2xl md:text-6xl font-bold tracking-tighter mb-6 text-zinc-100">
        thirdweb SDK
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-violet-500"> vite </span>
      </h1>
      <p className="text-zinc-300 text-base">
        Read the{" "}
        <code className="bg-zinc-800 text-zinc-300 px-2 rounded py-1 text-sm mx-1">
          README.md
        </code>{" "}
        file to get started.
      </p>
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