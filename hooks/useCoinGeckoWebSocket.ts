"use client";

import { useEffect, useRef, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;
const WS_URL = process.env.NEXT_PUBLIC_COINGECKO_WEBSOCET_URL;

const WS_BASE =
  WS_URL && API_KEY
    ? `${WS_URL}?x_cg_demo_api_key=${encodeURIComponent(API_KEY)}`
    : null;

export const useCoinGeckoWebSocket = ({
  coinId,
  poolId,
  liveInterval,
}: UseCoinGeckoWebSocketProps): UseCoinGeckoWebSocketReturn => {
  const wsRef = useRef<WebSocket | null>(null);

  const [price, setPrice] = useState<ExtendedPriceData | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [ohlcv, setOhlcv] = useState<OHLCData | null>(null);
  const [isWsReady, setIsWsReady] = useState(false);

  useEffect(() => {
    if (!WS_BASE) {
      console.error("Missing CoinGecko WebSocket URL or API key.");
      return;
    }

    const ws = new WebSocket(WS_BASE);
    wsRef.current = ws;

    const send = (payload: Record<string, unknown>) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(payload));
      }
    };

    const subscribe = (channel: string) => {
      send({
        command: "subscribe",
        identifier: JSON.stringify({ channel }),
      });
    };

    const stream = (channel: string, data: Record<string, unknown>) => {
      send({
        command: "message",
        identifier: JSON.stringify({ channel }),
        data: JSON.stringify(data),
      });
    };

    const handleMessage = (event: MessageEvent<string>) => {
      try {
        const msg = JSON.parse(event.data);

        if (msg.type === "ping") {
          send({ type: "pong" });
          return;
        }

        // Live CoinGecko coin price: C1
        if (msg.c === "C1") {
          setPrice({
            usd: Number(msg.p ?? 0),
            coin: msg.i,
            price: Number(msg.p ?? 0),
            change24h: Number(msg.pp ?? 0),
            marketCap: Number(msg.m ?? 0),
            volume24h: Number(msg.v ?? 0),
            timestamp: Number(msg.t ?? 0),
          });
        }

        // On-chain trades: G2
        if (msg.c === "G2") {
          const newTrade: Trade = {
            price: Number(msg.pu ?? 0),
            value: Number(msg.vo ?? 0),
            timestamp: Number(msg.t ?? 0),
            type: msg.ty,
            amount: Number(msg.to ?? 0),
          };

          setTrades((previous) => [newTrade, ...previous].slice(0, 7));
        }

        // On-chain OHLCV candles: G3
        if (msg.ch === "G3") {
          const candle: OHLCData = [
            Number(msg.t ?? 0),
            Number(msg.o ?? 0),
            Number(msg.h ?? 0),
            Number(msg.l ?? 0),
            Number(msg.c ?? 0),
          ];

          setOhlcv(candle);
        }

        if (msg.type === "error" || msg.code >= 4000) {
          console.error("CoinGecko WebSocket message:", msg);
        }
      } catch (error) {
        console.error("Could not parse WebSocket message:", error);
      }
    };

    ws.onopen = () => {
      console.log("CoinGecko WebSocket connected");
      setIsWsReady(true);

      subscribe("CGSimplePrice");
      stream("CGSimplePrice", {
        coin_id: [coinId],
        vs_currencies: ["usd"],
        action: "set_tokens",
      });

      if (!poolId) {
        console.warn("No pool ID provided; on-chain trades cannot be loaded.");
        return;
      }

      const poolAddress = poolId.replace("_", ":");

      if (!poolAddress.includes(":")) {
        console.error("Invalid pool ID format:", poolId);
        return;
      }

      console.log("Subscribing to pool:", poolAddress);

      subscribe("OnchainTrade");
      stream("OnchainTrade", {
        "network_id:pool_addresses": [poolAddress],
        action: "set_pools",
      });

      subscribe("OnchainOHLCV");
      stream("OnchainOHLCV", {
        "network_id:pool_addresses": [poolAddress],
        interval: liveInterval,
        token: "base",
        action: "set_pools",
      });
    };

    ws.onmessage = handleMessage;

    ws.onerror = (event) => {
      console.error("CoinGecko WebSocket connection error:", event);
    };

    ws.onclose = () => {
      setIsWsReady(false);
      if (wsRef.current === ws) {
        wsRef.current = null;
      }
    };

    return () => {
      ws.onopen = null;
      ws.onmessage = null;
      ws.onerror = null;
      ws.onclose = null;

      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }

      if (wsRef.current === ws) {
        wsRef.current = null;
      }
    };
  }, [coinId, poolId, liveInterval]);

  return {
    price,
    trades,
    ohlcv,
    isConnected: isWsReady,
  };
};
