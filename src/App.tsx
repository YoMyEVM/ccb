import { ArticleCard } from "./components/ArticleCard";
import { articleData } from "./data";

export function App() {
  return (
    <main className="min-h-[100vh] flex flex-col items-center justify-start container max-w-screen-lg mx-auto">
      <div className="py-10">
        <Header />
        <ThirdwebResources />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center -mt-5 mb-10 mt-10 md:mb-10">    
      <span className="inline-block -skew-x-6 text-2xl" style={{ color: 'hsl(0, 0.00%, 93.70%)' }}>Got a Complaint?</span>      
    </header>
  );
}

function ThirdwebResources() {
  return (
    <div className="grid gap-4 lg:grid-cols-4 justify-center">
      {articleData.map((item, i) => (
        <ArticleCard key={i} {...item} />
      ))}
    </div>
  );
}
