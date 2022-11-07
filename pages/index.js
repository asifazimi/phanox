import { Fragment } from "react";

// componets
import { Hero, TrendingProducts, Sale, Testimonials } from "../container";

export default function Home() {
  return (
    <div className="bg-white">
      <main>
        {/* Hero */}
        <Hero />

        {/* Trending products */}
        <TrendingProducts />

        {/* Sale and testimonials */}
        <div className="relative overflow-hidden">
          {/* Sale */}
          <Sale />

          {/* Testimonials */}
          <Testimonials />
        </div>
      </main>
    </div>
  );
}
