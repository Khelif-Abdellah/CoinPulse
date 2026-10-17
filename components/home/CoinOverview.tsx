import { fetcher } from "@/lib/coingecko.actions";
import Image from "next/image";
import { CoinOverviewFallback } from "./Fallback";
import CandlestickChart from "../CandlestickChart";

const CoinOverview = async () => {
  try {
    const [coin, coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>("/coins/bitcoin"),
      fetcher<OHLCData[]>("/coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: 1,
        precision: "full",
      }),
    ]);

    return (
      <div id="coin-overview">
        <CandlestickChart
          data={coinOHLCData}
          coinId="bitcoin"
          initialPeriod="daily"
        >
          <div className="header pt-2">
            <Image
              src={coin.image.large}
              alt={`${coin.name} logo`}
              width={56}
              height={56}
              style={{ width: 56, height: "auto" }}
            />

            <div className="info">
              <p>
                {coin.name} / {coin.symbol.toUpperCase()}
              </p>

              <h1>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(coin.market_data.current_price.usd)}
              </h1>
            </div>
          </div>
        </CandlestickChart>
      </div>
    );
  } catch (error) {
    console.error("Error fetching coin overview:", error);

    return <CoinOverviewFallback />;
  }
};

export default CoinOverview;
