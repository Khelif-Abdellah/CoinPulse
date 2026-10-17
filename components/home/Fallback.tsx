export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image skeleton" />
        <div className="info">
          <div className="header-line-sm skeleton" />
          <div className="header-line-lg skeleton" />
        </div>
      </div>

      <div className="chart">
        <div className="chart-skeleton skeleton" />
      </div>
    </div>
  );
};

export const TrendingCoinsFallback = () => {
  const columns = [
    {
      header: "Name",
      cell: () => (
        <div className="name-link">
          <div className="name-image skeleton" />
          <div className="name-line skeleton" />
        </div>
      ),
    },
    {
      header: "24h Change",
      cell: () => (
        <div className="price-change">
          <div className="change-icon skeleton" />
          <div className="change-line skeleton" />
        </div>
      ),
    },
    {
      header: "Price",
      cell: () => <div className="price-line skeleton" />,
    },
  ];

  return (
    <section id="trending-coins-fallback">
      <h4>Trending Coins</h4>

      <div className="trending-coins-table">
        <table className="w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  className="px-2 py-3 text-left text-sm text-purple-100"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.header} className="px-2 py-3">
                    {column.cell()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export const CategoriesFallback = () => {
  const columns = [
    {
      header: "Category",
      cell: () => <div className="category-line skeleton" />,
    },
    {
      header: "Top Gainers",
      cell: () => (
        <div className="top-gainers-skeleton">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="gainer-image skeleton" />
          ))}
        </div>
      ),
    },
    {
      header: "24h Change",
      cell: () => <div className="change-line skeleton" />,
    },
    {
      header: "Market Cap",
      cell: () => (
        <div className="change-cell">
          <div className="change-line skeleton" />
        </div>
      ),
    },
    {
      header: "24h Volume",
      cell: () => <div className="volume-line skeleton" />,
    },
  ];

  return (
    <section id="categories-fallback" className="custom-scrollbar">
      <h4>Top Categories</h4>

      <div className="trending-coins-table">
        <table className="w-full mt-3">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  className="px-2 py-3 text-left text-sm text-purple-100"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.header} className="px-2 py-3">
                    {column.cell()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export const CoinDetailsFallback = () => {
  return (
    <main id="coin-details-page">
      <section className="primary">
        {/* Coin header */}
        <div id="coin-header">
          <div className="header-line-lg skeleton" />

          <div className="info">
            <div className="header-image skeleton" />

            <div className="price-row">
              <div className="header-line-lg skeleton" />
              <div className="change-line skeleton" />
            </div>
          </div>

          {/* Price statistics */}
          <ul className="stats">
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <div className="header-line-sm skeleton" />
                <div className="header-line-lg skeleton" />
              </li>
            ))}
          </ul>
        </div>

        {/* Chart */}
        <div className="trend">
          <h4>Trend Overview</h4>
          <div className="chart">
            <div className="chart-skeleton skeleton" />
          </div>
        </div>

        {/* Recent trades */}
        <div className="trades">
          <h4>Recent Trades</h4>

          <div className="trending-coins-table">
            <table className="w-full">
              <thead>
                <tr>
                  {["Price", "Amount", "Value", "Buy/Sell", "Time"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-2 py-3 text-left text-sm text-purple-100"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: 5 }).map((_, colIndex) => (
                      <td key={colIndex} className="px-2 py-3">
                        <div className="change-line skeleton" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="secondary">
        {/* Converter */}
        <div className="chart-skeleton skeleton" />

        {/* Coin details */}
        <div className="details">
          <h4>Coin Details</h4>

          <ul className="details-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <li key={index}>
                <div className="header-line-sm skeleton" />
                <div className="header-line-lg skeleton" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};
