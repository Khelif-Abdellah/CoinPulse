import CoinOverview from "@/components/home/CoinOverview";
import TrendingCoins from "@/components/home/TrendingCoins";
import { Suspense } from "react";

const page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<h1>Loading Overview...</h1>}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<h1>Loading Trending...</h1>}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
};

export default page;
