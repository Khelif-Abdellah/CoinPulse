# CoinPulse — Real-Time Cryptocurrency Dashboard

<p align="center">
  <strong>Explore cryptocurrency markets. Track prices. Analyze market trends.</strong>
</p>

<p align="center">
  A modern cryptocurrency dashboard built with Next.js, TypeScript, and the CoinGecko API.
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [CoinGecko API Integration](#coingecko-api-integration)
- [WebSocket Integration](#websocket-integration)
- [Pagination](#pagination)
- [Data Fetching and Caching](#data-fetching-and-caching)
- [Loading States and Suspense](#loading-states-and-suspense)
- [Coin Details and Market Analysis](#coin-details-and-market-analysis)
- [Styling and UI](#styling-and-ui)
- [Error Handling](#error-handling)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [Learning Outcomes](#learning-outcomes)
- [License](#license)

---

## Overview

**CoinPulse** is a cryptocurrency market dashboard designed to provide users with an accessible view of digital asset prices, market performance, rankings, and historical price information.

The application uses the CoinGecko API to retrieve cryptocurrency market data and integrates WebSocket technology for supported live market updates.

The frontend is built with Next.js and TypeScript, with reusable components, asynchronous data fetching, responsive styling, and loading fallbacks.

The project demonstrates practical full-stack development concepts, including API integration, asynchronous rendering, pagination, caching, reusable UI components, and real-time communication.

### Project Goals

- Display cryptocurrency market information in a clean, modern interface.
- Retrieve market data from an external API.
- Present cryptocurrency rankings and market statistics.
- Provide paginated navigation through coin listings.
- Display individual cryptocurrency information and historical price data.
- Integrate WebSocket-based market updates where supported.
- Improve perceived performance with loading skeletons and Suspense boundaries.
- Maintain a codebase that can be extended and deployed.

---

## Features

### 1. Cryptocurrency Market Overview

The dashboard provides an overview of the cryptocurrency market, including supported coin information and market statistics.

Depending on the data returned by the API, the interface can display:

- Cryptocurrency name and logo.
- Current USD price.
- Market capitalization.
- Market capitalization rank.
- Twenty-four-hour price change.
- Price movement indicators.
- Historical price charts.

### 2. Trending Cryptocurrencies

The trending section retrieves trending cryptocurrency information from CoinGecko.

It is designed to display:

- Cryptocurrency names and logos.
- Current market information where available.
- Price changes and visual indicators.
- Links to individual cryptocurrency pages.

**API endpoint:** `GET /search/trending`

### 3. Cryptocurrency Categories

The categories section displays cryptocurrency market categories returned by CoinGecko.

Depending on the fields provided by the API, categories can include:

- Category name.
- Market capitalization.
- Market capitalization change.
- Market share or related market metrics.

**API endpoint:** `GET /coins/categories`

### 4. All Coins

The all-coins page displays cryptocurrency market data in a reusable table.

The table includes:

- Market capitalization rank.
- Cryptocurrency name, symbol, and image.
- Current price.
- Twenty-four-hour price change.
- Market capitalization.

Users can click a cryptocurrency's name or rank to navigate to its details page.

**API endpoint:** `GET /coins/markets`

### 5. Pagination

The coin listing uses URL-based pagination to navigate through market results.

The page number is read from the URL, and the selected page is sent to the API.

For example:

- `/coins?page=1`
- `/coins?page=2`
- `/coins?page=3`

This approach supports shareable URLs and browser navigation.

### 6. Individual Coin Details

The dynamic coin details route provides a dedicated page for a cryptocurrency.

The page retrieves coin-specific information and historical price data.

**API endpoints:**

- `GET /coins/{id}`
- `GET /coins/{id}/ohlc`

The exact information displayed depends on the fields requested and returned by CoinGecko.

### 7. WebSocket-Based Live Updates

The application includes WebSocket integration for supported market data.

The WebSocket connection can be used to receive supported live price updates and other subscribed market events.

The project has also explored pool-related trade and OHLCV subscriptions. Availability depends on the CoinGecko WebSocket product, subscription permissions, and the selected channel.

WebSocket data should be distinguished from ordinary REST API responses: REST retrieves a snapshot, while WebSocket messages can update the interface as new events arrive.

### 8. Loading Skeletons

The application includes loading fallback components for asynchronous sections, including:

- Coin overview.
- Trending coins.
- Categories.

Skeletons help communicate that data is being loaded and reduce the visual disruption caused by waiting for external API responses.

### 9. Reusable Components

The project uses reusable components and utilities to keep page code organized.

Examples include:

- `DataTable`
- `CoinsPagination`
- `CandlestickChart`
- `LiveDataWrapper`
- Coin overview and trending fallbacks
- Currency and percentage formatting utilities

---

## Screenshots

...

```text
docs/
├── home.png
├── coins.png
└── coin-details.png
```

Example Markdown:

```markdown
![CoinPulse home page](docs/home.png)

![Cryptocurrency listings](docs/coins.png)

![Coin details and chart](docs/coin-details.png)
```

Replace these examples with actual screenshots from your application.

---

## Technology Stack

| Technology            | Purpose                                                                  |
| --------------------- | ------------------------------------------------------------------------ |
| Next.js 16            | React framework, routing, server rendering, and application architecture |
| React                 | Component-based user interface                                           |
| TypeScript            | Static typing and improved maintainability                               |
| CoinGecko API         | Cryptocurrency market data                                               |
| WebSocket             | Supported live market updates                                            |
| Tailwind CSS          | Utility-first styling                                                    |
| Lucide React          | Interface icons                                                          |
| `next/image`          | Image optimization and image rendering                                   |
| `next/link`           | Client-side navigation                                                   |
| `query-string` / `qs` | Query-string construction, depending on the installed package            |
| Suspense              | Asynchronous rendering and loading fallbacks                             |
| Vercel                | Potential deployment platform                                            |

The exact package versions should be taken from `package.json` and the lockfile.

---

## Architecture

CoinPulse follows a component-oriented Next.js architecture.

```text
User's Browser
      |
      v
Next.js Application
      |
      +---- Home Dashboard
      |       |
      |       +---- Coin Overview
      |       +---- Trending Coins
      |       +---- Categories
      |
      +---- All Coins Page
      |       |
      |       +---- Market Data Table
      |       +---- Pagination
      |
      +---- Coin Details Page
      |       |
      |       +---- Coin Information
      |       +---- Historical OHLC Data
      |       +---- Live Data Components
      |
      v
Data Access Layer
      |
      +---- REST API Fetcher
      |       |
      |       v
      |    CoinGecko REST API
      |
      +---- WebSocket Client
              |
              v
       CoinGecko WebSocket
```

### Architectural Responsibilities

**Pages and routes**

Pages determine which information should be displayed and coordinate the components needed for each route.

**Data access layer**

The shared fetcher in `lib/coingecko.actions.ts` centralizes REST requests, API headers, query parameters, caching options, and HTTP error handling.

**Reusable components**

Components such as `DataTable` and `CoinsPagination` separate presentation and interaction logic from page-level data retrieval.

**WebSocket integration**

The WebSocket client manages the live connection and subscriptions separately from REST-based data retrieval.

**Utility functions**

Formatting helpers keep price, currency, and percentage presentation consistent across the application.

---

## Project Structure

The following is a representative structure based on the files used in the project. Keep only directories that actually exist in your repository.

```text
coinpulse/
├── app/
│   ├── coins/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── DataTable.tsx
│   ├── CoinsPagination.tsx
│   ├── CandlestickChart.tsx
│   ├── LiveDataWrapper.tsx
│   ├── CoinOverview.tsx
│   ├── CoinOverviewFallback.tsx
│   ├── TrendingCoins.tsx
│   ├── TrendingCoinsFallback.tsx
│   └── CategoriesFallback.tsx
│
├── hooks/
│   └── useCoinGeckoWebSocket.ts
│
├── lib/
│   ├── coingecko.actions.ts
│   └── utils.ts
│
├── public/
│
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

Your actual WebSocket hook and fallback component locations may differ. Update the tree to match the final repository.

---

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js LTS compatible with your Next.js version.
- npm, pnpm, yarn, or the package manager associated with your lockfile.
- Git.
- A CoinGecko API key appropriate for the endpoints and subscription channels you use.

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

Replace the placeholders with your actual Git repository URL and directory name.

### 2. Install Dependencies

For an npm project:

```bash
npm install
```

If the repository uses another package manager, use the matching lockfile and command instead.

### 3. Configure Environment Variables

Create a `.env.local` file in the project root.

Use the variable names expected by your code. A configuration based on the current project may look like this:

```env
COINGECKO_BASE_URL=https://pro-api.coingecko.com/api/v3
COINGECKO_API_KEY=your_rest_api_key

NEXT_PUBLIC_COINGECKO_WEBSOCKET_URL=wss://your-supported-websocket-endpoint
NEXT_PUBLIC_COINGECKO_API_KEY=your_websocket_demo_key
```

**Important:** The WebSocket URL and key above are configuration examples, not a guarantee that a particular endpoint or key type supports your subscriptions. Use the endpoint, authentication method, and product permissions specified by your CoinGecko plan.

If your current code uses the misspelled variable `NEXT_PUBLIC_COINGECKO_WEBSOCET_URL`, update the code and `.env.local` consistently to use `NEXT_PUBLIC_COINGECKO_WEBSOCKET_URL`.

### 4. Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Build for Production

```bash
npm run build
```

### 6. Run the Production Build Locally

```bash
npm run start
```

Run the build command successfully before testing the production server.

---

## Environment Variables

| Variable                              | Purpose                                                              | Exposure             |
| ------------------------------------- | -------------------------------------------------------------------- | -------------------- |
| `COINGECKO_BASE_URL`                  | Base URL for REST API requests                                       | Server-side          |
| `COINGECKO_API_KEY`                   | REST API authentication                                              | Server-side secret   |
| `NEXT_PUBLIC_COINGECKO_WEBSOCKET_URL` | WebSocket endpoint used by client code                               | Public configuration |
| `NEXT_PUBLIC_COINGECKO_API_KEY`       | Client-side WebSocket authentication, if required by the chosen plan | Publicly exposed     |

The exact variable names depend on the implementation. They must match the names read by the application.

### Environment Variable Security

Next.js exposes variables prefixed with `NEXT_PUBLIC_` to browser code. Never put a private API secret in a `NEXT_PUBLIC_` variable.

If a WebSocket service requires a secret key that must not be exposed in the browser, do not pass that key through a public environment variable. Use an appropriate server-side architecture supported by the provider.

Add `.env.local` to `.gitignore` and never commit real API keys.

After changing environment variables, restart the development server.

---

## CoinGecko API Integration

CoinPulse uses CoinGecko as its external market data provider.

The shared REST fetcher is located in:

```text
lib/coingecko.actions.ts
```

Centralizing requests in one module avoids duplicating API configuration throughout the application.

### API Endpoints Used

| Endpoint            | Purpose                                                   |
| ------------------- | --------------------------------------------------------- |
| `/coins/markets`    | Market listings, ranks, prices, and market capitalization |
| `/search/trending`  | Trending cryptocurrency data                              |
| `/coins/categories` | Cryptocurrency category data                              |
| `/coins/{id}`       | Details for an individual coin                            |
| `/coins/{id}/ohlc`  | Open, high, low, and close price data                     |

The response fields, query parameters, and endpoint availability depend on the selected CoinGecko API product.

### Shared Fetcher

The fetcher should be responsible for:

1. Constructing a URL from the configured base URL and endpoint.
2. Serializing query parameters.
3. Adding the appropriate API authentication header.
4. Sending the HTTP request.
5. Applying the requested cache or revalidation policy.
6. Checking the HTTP status.
7. Parsing the JSON response.
8. Reporting useful errors when the request fails.

A typical request in the application looks like this:

```tsx
const coinsData = await fetcher<CoinMarketData[]>("/coins/markets", {
  vs_currency: "usd",
  order: "market_cap_desc",
  per_page: 10,
  page: currentPage,
  sparkline: "false",
  price_change_percentage: "24h",
});
```

This retrieves a page of market results sorted by market capitalization.

The generic TypeScript type helps the application reason about the expected response shape. It does not validate the actual response at runtime.

### Why Centralize API Requests?

A shared fetcher provides:

- Consistent authentication.
- Consistent error handling.
- Easier API configuration.
- A single place to adjust caching.
- Less duplicated request logic.
- A foundation for future validation, logging, and retry policies.

### API Rate Limits

CoinGecko API limits depend on the API plan, endpoint, and usage conditions.

To avoid unnecessary requests:

- Cache suitable market data.
- Avoid repeatedly fetching identical data during a single render.
- Use WebSocket subscriptions only where appropriate.
- Handle HTTP `429 Too Many Requests` responses.
- Avoid automatic retries without a limit and backoff policy.
- Review provider usage and rate-limit documentation when changing plans.

---

## WebSocket Integration

The application includes a WebSocket-based live-data integration.

Unlike a normal HTTP request, a WebSocket connection can remain open and deliver messages over time.

### REST API vs. WebSocket

| REST API                            | WebSocket                                       |
| ----------------------------------- | ----------------------------------------------- |
| Retrieves a response to a request   | Maintains a persistent connection               |
| Suitable for initial page data      | Suitable for supported live updates             |
| Often uses caching and revalidation | Receives messages while connected               |
| Commonly returns JSON snapshots     | Can deliver event or update messages            |
| Requests are made as needed         | Requires connection and subscription management |

A practical design is to use REST to load the initial page and WebSocket to update the relevant live values afterward.

### WebSocket Lifecycle

A robust client should handle the following lifecycle:

1. Read the configured WebSocket URL and authentication settings.
2. Establish a connection.
3. Wait for the connection to open.
4. Authenticate or subscribe according to the provider's protocol.
5. Parse incoming messages.
6. Update React state for relevant messages.
7. Handle connection errors and server-initiated closures.
8. Reconnect when appropriate.
9. Clean up listeners and close the connection when the component unmounts.

### Subscriptions

The project has explored subscriptions such as:

- `CGSimplePrice`
- `OnchainTrade`
- `OnchainOHLCV`

Subscription names, parameters, authentication, and availability must match the documentation for the WebSocket product enabled for your account. A channel name alone does not guarantee that a subscription is authorized or active.

### React Cleanup

WebSocket connections should be managed within an appropriate React effect or dedicated hook.

Cleanup should remove event listeners and close the connection when it is no longer needed.

During Next.js development, React Strict Mode can run an effect setup and cleanup more than once. This may cause an initial connection to close before another connection is established. Inspect the complete connection and subscription logs before assuming that every early closure represents a production failure.

### Production Considerations

A production-quality WebSocket client should ideally include:

- Explicit connection states.
- Subscription acknowledgements.
- Server error handling.
- Safe message parsing.
- Bounded reconnection attempts or exponential backoff.
- Heartbeat handling if required by the provider.
- Duplicate subscription prevention.
- Cleanup on unmount.
- Protection against stale messages.
- A fallback when live data is unavailable.

Do not label data as live unless the subscription is confirmed and incoming updates are actually being processed.

---

## Pagination

The all-coins page uses page-based pagination through the URL's `page` query parameter.

### How It Works

The page receives asynchronous search parameters, extracts `page`, and validates it before making the API request.

Conceptually:

```tsx
const { page } = await searchParams;

const parsedPage = Number(Array.isArray(page) ? page[0] : page);

const currentPage =
  Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
```

This protects against invalid values such as:

```text
/coins?page=0
/coins?page=-1
/coins?page=abc
```

Invalid page values fall back to page 1.

### Requesting a Page

The API request includes:

```tsx
{
  vs_currency: "usd",
  order: "market_cap_desc",
  per_page: 10,
  page: currentPage,
  sparkline: "false",
  price_change_percentage: "24h",
}
```

The `per_page` parameter controls how many results are requested, while `page` selects the result page.

### Pagination UI

`CoinsPagination` receives values such as:

- `currentPage`
- `totalPages`
- `hasMorePages`

The component can use these to render navigation controls and disable invalid actions.

### Important Pagination Limitation

If the UI estimates the total number of pages instead of obtaining an authoritative total from the API, the displayed total is an approximation.

A check such as:

```tsx
const hasMorePages = coinsData.length === PER_PAGE;
```

indicates that a full page was returned. It does not prove that another page exists, because the API could return exactly that many results on its final page.

For reliable navigation, consider a provider-supported result total if available, or use the presence of a full page as a practical heuristic and handle empty responses gracefully.

### Why URL-Based Pagination?

URL-based pagination makes it possible to:

- Share a specific listing page.
- Refresh without losing the selected page.
- Use browser back and forward navigation.
- Keep navigation state explicit.
- Avoid storing the current page only in local component state.

---

## Data Fetching and Caching

The project uses asynchronous server-side data fetching for market sections and coin detail pages.

Where supported by the current Next.js configuration, caching and revalidation can reduce repeated REST API requests.

For example, the fetcher may accept a revalidation duration:

```tsx
await fetcher<TrendingResponse>("/search/trending", undefined, 300);
```

This represents a request configured with a 300-second revalidation interval, assuming the fetcher forwards that value to Next.js correctly.

### Choosing Cache Durations

Different data types have different freshness requirements.

| Data                        | Suggested strategy                            |
| --------------------------- | --------------------------------------------- |
| Trending coins              | Cache briefly if suitable                     |
| Categories                  | Cache for longer if changes are infrequent    |
| Market listings             | Revalidate according to the desired freshness |
| Individual coin information | Cache or revalidate based on the use case     |
| Live WebSocket values       | Update through the active subscription        |

These are design recommendations, not confirmation that each route currently uses the same policy.

### Next.js Cache Behavior

Caching behavior depends on the installed Next.js version, fetch options, route configuration, and whether Cache Components or other caching features are enabled.

Review the current Next.js documentation and test the actual behavior before relying on a particular cache lifetime.

Avoid assuming that every server-side request is automatically cached.

---

## Loading States and Suspense

Some dashboard sections make asynchronous API requests. Without a fallback, users may see a blank area while data is loading.

CoinPulse uses React Suspense and dedicated skeleton components to improve this experience.

Examples include:

```tsx
<Suspense fallback={<p>Loading coins...</p>}>
  <CoinsContent searchParams={searchParams} />
</Suspense>
```

The fallback can be replaced with a skeleton that matches the final component's layout.

### Benefits

- Provides immediate visual feedback.
- Reduces perceived loading time.
- Helps prevent large layout shifts when designed carefully.
- Allows independent sections to load asynchronously.
- Makes loading behavior explicit in the UI.

### Recommended Practice

Use dedicated fallbacks for complex sections, and ensure that loading, empty, and error states are treated as different situations.

A loading skeleton should not remain visible indefinitely if an API request fails.

---

## Coin Details and Market Analysis

The dynamic route:

```text
app/coins/[id]/page.tsx
```

allows the application to render a page for a selected cryptocurrency.

The coin identifier is passed to the relevant CoinGecko endpoint.

For example:

```text
/coins/bitcoin
/coins/ethereum
```

### Historical OHLC Data

The OHLC endpoint provides open, high, low, and close values for supported time intervals.

These values can be used to construct candlestick charts.

A candlestick typically represents:

- **Open:** price at the start of the interval.
- **High:** highest price in the interval.
- **Low:** lowest price in the interval.
- **Close:** price at the end of the interval.

The selected endpoint's supported interval and data range depend on CoinGecko's API rules and plan.

### Live Market Data

Historical chart data and live WebSocket data have different responsibilities. Historical REST responses provide a baseline; live messages can update supported values after the connection and subscription are active.

The interface should make it clear when a value is historical, cached, or being updated live.

---

## Styling and UI

The project uses Tailwind CSS utilities and custom global styles to implement the CoinPulse visual system.

The interface includes dark backgrounds, contrasting text, market movement colors, reusable table styles, and loading skeletons.

### Styling Principles

- Use consistent spacing and typography.
- Keep contrast sufficient for readability.
- Use green and red indicators consistently for price movements.
- Ensure hover states are visible for interactive elements.
- Keep navigation links limited to the intended clickable areas.
- Use responsive layouts for desktop and smaller screens.
- Keep shared styles centralized where practical.

### Image Optimization

The project uses `next/image` for cryptocurrency logos.

Ensure that remote image hosts are configured in `next.config.ts` when required by the installed Next.js version.

Check image URLs carefully. An invalid hostname or malformed URL can prevent an image from rendering.

---

## Error Handling

External API requests and live connections can fail. A robust application should handle these failures deliberately.

### REST API Errors

Common HTTP failures include:

| Status | Meaning                                         | Suggested action                                       |
| ------ | ----------------------------------------------- | ------------------------------------------------------ |
| `400`  | Invalid request or unsupported parameter        | Inspect the URL and query parameters                   |
| `401`  | Missing or invalid authentication               | Verify the API key and authentication header           |
| `403`  | Access is forbidden or not included in the plan | Check endpoint permissions and subscription            |
| `404`  | Resource or endpoint not found                  | Verify the coin ID and endpoint                        |
| `429`  | Rate limit exceeded                             | Reduce request frequency and apply appropriate backoff |
| `5xx`  | Provider or upstream server error               | Retry carefully when appropriate                       |

An HTTP `400` error is not necessarily an API-key problem. Inspect the exact request URL, query values, endpoint, and provider response body.

### WebSocket Errors

Common causes include:

- Incorrect endpoint.
- Invalid authentication.
- Unsupported subscription.
- Missing subscription parameters.
- Network interruption.
- Plan restrictions.
- Incorrect message parsing.

Log connection state and provider error messages during development, but never log private credentials.

### Empty Data

The UI should handle cases where the API returns an empty array or omits optional values.

Do not assume that every cryptocurrency has every optional field populated.

---

## Available Scripts

Run the scripts defined in your `package.json`.

A typical Next.js project includes:

| Command            | Purpose                      |
| ------------------ | ---------------------------- |
| `npm run dev`      | Start the development server |
| `npm run build`    | Create a production build    |
| `npm run start`    | Start the production server  |
| `npm run lint`     | Run linting, if configured   |
| `npx tsc --noEmit` | Run TypeScript type checking |

The lint command depends on your installed Next.js version and project scripts. Check `package.json` rather than assuming every command is configured.

Before deploying, run the production build and address errors.

---

## Deployment

CoinPulse can be deployed to a compatible hosting platform, such as Vercel, after the build and environment configuration are verified.

### Deployment Checklist

1. Push the project to a Git repository.
2. Import the repository into the hosting platform.
3. Select the correct project root.
4. Configure the required environment variables.
5. Confirm that the REST API key is not exposed to browser code.
6. Confirm that the WebSocket endpoint is valid and available to the selected plan.
7. Build the application.
8. Open the deployed site and test the main routes.
9. Check logs for API failures and subscription errors.
10. Verify pagination, image loading, and responsive behavior.

### Production Validation

Test at least the following routes:

```text
/
 /coins
 /coins?page=2
 /coins/bitcoin
```

Remove the extra space before `/coins` if copying these routes into a checklist or test script.

Also verify that:

- Environment variables exist in the production environment.
- API requests succeed outside your local machine.
- Remote images load correctly.
- The WebSocket connection uses the intended endpoint.
- The browser console contains no unexpected errors.
- The production build completes successfully.

### Deployment Security

Never commit `.env.local`, API keys, or other credentials to Git.

If a credential has been exposed publicly, rotate it through the provider's dashboard.

---

## Security Considerations

Although CoinPulse is a frontend-focused application, API credentials and external data access still require care.

Recommended practices include:

- Keep private REST API keys on the server.
- Never commit secrets to source control.
- Avoid exposing privileged API keys through public environment variables.
- Validate query parameters and external data.
- Do not assume TypeScript generics validate external responses.
- Avoid rendering untrusted API strings as raw HTML.
- Use bounded retries and reasonable request timeouts where appropriate.
- Avoid logging authentication headers or tokens.
- Monitor API usage and rate limits.
- Review provider terms before redistributing or storing market data.

If private WebSocket credentials are required, use a server-side connection or another provider-approved design instead of exposing the credentials to the browser.

---

## Troubleshooting

### 1. The REST API Returns `400 Bad Request`

Check:

- The base URL.
- The requested endpoint.
- Query parameter names and values.
- The encoded request URL.
- The API product's supported parameters.
- The exact response body from CoinGecko.

For example, ensure that the endpoint and query parameters match the documentation for your account's API product.

### 2. The REST API Returns `401` or `403`

Check the API key, authentication header, endpoint access, and account permissions.

Confirm that your environment variable names match the variables used by the fetcher.

### 3. Cryptocurrency Images Do Not Load

Verify the remote image URL and configure the permitted image host in `next.config.ts` as required by Next.js.

### 4. The WebSocket Connects but No Trades Appear

A successful connection does not guarantee a successful subscription.

Check:

- Whether the subscription request was sent.
- Whether the provider acknowledged the subscription.
- Whether the selected channel is available to your plan.
- Whether the requested pool or asset identifier is valid.
- Whether the server sends messages for the selected market.
- Whether the client parses the received message correctly.
- Whether the component updates its state when new data arrives.

### 5. WebSocket Connections Close During Development

React development behavior may cause an effect to set up, clean up, and set up again.

Check whether the connection subsequently opens, whether the subscription succeeds, and whether messages are received before diagnosing a persistent failure.

### 6. Pagination Shows Unexpected Results

Verify that the `page` query parameter is parsed as a positive integer and that the API receives the intended `page` and `per_page` values.

Remember that an estimated total page count is not necessarily an authoritative total from the provider.

### 7. Loading Skeletons Never Disappear

Inspect the server logs for rejected API requests. Ensure that the relevant component handles errors and that its fallback is associated with the intended Suspense boundary.

### 8. The Application Works Locally but Fails After Deployment

Compare the local and production environment variables, check the deployed build logs, and inspect API and WebSocket errors in the appropriate server or browser console.

---

## Future Improvements

The following are potential improvements rather than claims that these features are already implemented.

### Reliability

- Add runtime validation for external API responses.
- Add controlled retries with exponential backoff where appropriate.
- Improve REST API and WebSocket error states.
- Add a clear indicator for live connection status.
- Provide graceful fallback behavior when live data is unavailable.

### Market Features

- Add cryptocurrency search.
- Add sorting and filtering to the coin table.
- Add favorites or watchlists.
- Add additional time ranges for historical charts.
- Display supported market volume and supply statistics.
- Add comparison views for selected cryptocurrencies.

### Performance

- Review cache policies for every data source.
- Avoid duplicate requests.
- Optimize large lists and chart rendering.
- Reduce unnecessary client-side re-renders.
- Measure real performance using production builds.

### Testing and Code Quality

- Add unit tests for formatting utilities and pagination logic.
- Add tests for API response handling.
- Add component tests for table navigation.
- Add integration tests for important routes.
- Add end-to-end tests for core user flows.
- Configure automated checks in CI.

### Accessibility

- Add accessible labels to interactive elements.
- Verify keyboard navigation.
- Ensure sufficient color contrast.
- Use semantic headings and table markup.
- Make loading and connection states understandable to assistive technologies.

### Operations

- Add structured, secret-safe logging.
- Monitor API failures and usage.
- Document environment setup for contributors.
- Establish a release and deployment checklist.

---

## Learning Outcomes

CoinPulse provides practical experience with several modern web development concepts.

### Next.js and React

- App Router architecture.
- Server and client component boundaries.
- Dynamic route segments.
- Asynchronous components.
- Suspense and loading states.
- Client-side navigation.

### TypeScript

- Generic API response types.
- Typed component props.
- Data modeling.
- Type-safe utility functions.
- Handling optional API values.

### API Integration

- HTTP requests and query parameters.
- Authentication headers.
- JSON response handling.
- Error handling.
- Caching and revalidation.
- External service limitations.

### Real-Time Communication

- WebSocket lifecycle management.
- Subscription-based updates.
- Message parsing.
- Connection cleanup.
- Reconnection strategies.

### UI Engineering

- Reusable data tables.
- URL-based pagination.
- Responsive layouts.
- Skeleton loading states.
- Currency and percentage formatting.
- Interactive navigation and hover states.

---

## License

Choose and add a license before distributing the project publicly.

If the repository does not yet have a license, all rights are generally reserved by default; do not assume that other developers can reuse the code simply because the repository is public.

---

## Acknowledgments

- [CoinGecko](https://www.coingecko.com/) — cryptocurrency market data.
- [Next.js](https://nextjs.org/) — React framework.
- [React](https://react.dev/) — user interface library.
- [Tailwind CSS](https://tailwindcss.com/) — styling utilities.
- [Lucide](https://lucide.dev/) — icons.

---

<p align="center">
  <strong>CoinPulse</strong><br/>
  <em>Explore the market. Understand the movement.</em>
</p>
