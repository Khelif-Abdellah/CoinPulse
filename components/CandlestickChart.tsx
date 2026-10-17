"use client";

import {
  getCandlestickConfig,
  getChartConfig,
  LIVE_INTERVAL_BUTTONS,
  PERIOD_BUTTONS,
  PERIOD_CONFIG,
} from "@/constants";
import {
  startTransition,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  CandlestickSeries,
  createChart,
  IChartApi,
  ISeriesApi,
} from "lightweight-charts";
import { fetcher } from "@/lib/coingecko.actions";
import { convertOHLCData } from "@/lib/utils";

const CandlestickChart = ({
  children,
  data,
  coinId,
  height = 360,
  initialPeriod = "daily",
  liveOhlcv = null,
  mode = "historical",
  liveInterval,
  setLiveInterval,
}: CandlestickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesREf = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const prevOhlcDataLength = useRef<number>(data?.length || 0);

  const [period, setPeriod] = useState(initialPeriod);
  const [ohlcData, setOhlcData] = useState<OHLCData[]>(data ?? []);
  const [isPending, setTransaction] = useTransition();

  const fetchOhlcData = async (selectedPeriod: Period) => {
    try {
      const { days } = PERIOD_CONFIG[selectedPeriod];

      const newData = await fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`, {
        vs_currency: "usd",
        days,
        precision: "full",
      });

      startTransition(() => {
        setOhlcData(newData ?? []);
      });
    } catch (error) {
      console.error("Error fetching OHLC data:", error);
    }
  };

  const handelPeriodChange = (newperiod: Period) => {
    if (newperiod === period) return;

    setPeriod(newperiod);
    fetchOhlcData(newperiod);
  };

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const showTime = ["daily", "weekly", "monthly"].includes(period);

    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientWidth,
    });
    const series = chart.addSeries(CandlestickSeries, getCandlestickConfig());

    series.setData(convertOHLCData(ohlcData));
    chart.timeScale().fitContent();

    chartRef.current = chart;
    candleSeriesREf.current = series;

    const Observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      chart.applyOptions({
        width: entries[0].contentRect.width,
      });
    });

    Observer.observe(container);

    return () => {
      Observer.disconnect();
      chart.remove();
      chartRef.current = null;
      candleSeriesREf.current = null;
    };
  }, [height, period]);

  useEffect(() => {
    if (!candleSeriesREf.current) return;

    const convertdSeconds = ohlcData.map(
      (item) =>
        [
          Math.floor(item[0] / 1000),
          item[1],
          item[2],
          item[3],
          item[4],
        ] as OHLCData
    );

    let merged: OHLCData[];
    if (liveOhlcv) {
      const liveTimestamp = liveOhlcv[0];

      const lastHistoricalCandles = convertdSeconds[convertdSeconds.length - 1];

      if (lastHistoricalCandles && lastHistoricalCandles[0] === liveTimestamp) {
        merged = [...convertdSeconds.slice(0, -1), liveOhlcv];
      } else {
        merged = [...convertdSeconds, liveOhlcv];
      }
    } else {
      merged = convertdSeconds;
    }

    merged.sort((a, b) => a[0] - b[0]);

    const converted = convertOHLCData(merged);

    candleSeriesREf.current.setData(converted);

    const dataChanged = prevOhlcDataLength.current !== ohlcData.length;

    if (dataChanged || mode === "historical") {
      chartRef.current?.timeScale().fitContent();
      prevOhlcDataLength.current = ohlcData.length;
    }
  }, [ohlcData, period, liveOhlcv, mode]);
  return (
    <div id="candlestick-chart">
      <div className="chart-header">
        <div className="flex-1">{children}</div>

        <div className="button-group">
          <span className="text-sm mx-2 font-medium text-purple-100/50">
            Period:
          </span>

          {PERIOD_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              className={
                period === value ? "config-button-active" : "config-button"
              }
              onClick={() => handelPeriodChange(value)}
              disabled={isPending}
            >
              {label}
            </button>
          ))}
        </div>

        {liveInterval && setLiveInterval && (
          <div className="button-group">
            <span className="text-sm mx-2 font-medium text-purple-100/50">
              Update Frequency:
            </span>

            {LIVE_INTERVAL_BUTTONS.map(({ value, label }) => (
              <button
                key={value}
                className={
                  liveInterval === value
                    ? "config-button-active"
                    : "config-button"
                }
                onClick={() => setLiveInterval(value)}
                disabled={isPending}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div ref={chartContainerRef} className="chart" style={{ height }} />
    </div>
  );
};

export default CandlestickChart;
