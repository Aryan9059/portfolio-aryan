## Overview

PixelFi is a real-time financial portfolio platform that aggregates stock data, runs ML predictions, and delivers live updates via a Kafka-driven microservices architecture — all wrapped in a polished Next.js dashboard.

## System Architecture

```
┌──────────────┐     ┌────────────────┐     ┌──────────────┐
│  Next.js UI  │────▶│  FastAPI Gate  │────▶│  Kafka Bus   │
└──────────────┘     └────────────────┘     └──────┬───────┘
                                                   │
              ┌──────────────┬──────────────────────┤
              ▼              ▼                      ▼
      ┌──────────────┐ ┌──────────┐        ┌──────────────┐
      │ ML Service   │ │ Portfolio│        │ Notif Service│
      │ (LSTM model) │ │ Service  │        │  (webhooks)  │
      └──────────────┘ └──────────┘        └──────────────┘
```

## Features

- **Portfolio Dashboard** — Real-time P&L, allocation charts, sector exposure heatmap.
- **ML Predictions** — LSTM neural network trained on 5-year historical OHLCV data, served via FastAPI.
- **Event Streaming** — Apache Kafka pipelines market tick data to the frontend with < 120ms end-to-end latency.
- **Auth** — Clerk handles auth with multi-tenancy support for different portfolio namespaces.
- **Containerized** — All 5 microservices are Dockerized and orchestrated via Docker Compose.

## ML Model

The prediction engine uses a stacked **LSTM (Long Short-Term Memory)** model:

```python
model = Sequential([
    LSTM(128, return_sequences=True, input_shape=(60, features)),
    Dropout(0.2),
    LSTM(64, return_sequences=False),
    Dropout(0.2),
    Dense(25),
    Dense(1)
])
```

- Training window: 60 days of OHLCV + technical indicators (RSI, MACD, Bollinger Bands)
- Evaluation metric: RMSE on held-out test set

## Kafka Topic Design

| Topic | Producers | Consumers |
|-------|-----------|-----------|
| `market.ticks` | Data ingestion service | ML service, Portfolio service |
| `predictions.out` | ML service | Frontend WebSocket gateway |
| `alerts.trigger` | Portfolio service | Notification service |

## Why Kafka?

REST polling at tick-level frequency (sub-second) creates unacceptable load. Kafka's log-based architecture lets multiple services consume the same market feed independently without coupling them — and scales horizontally with partitions if the user base grows.
