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
