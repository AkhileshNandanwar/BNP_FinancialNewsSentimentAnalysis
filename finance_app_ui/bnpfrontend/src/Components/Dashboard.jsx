import React, { useEffect, useState } from 'react';
import { 
  BarChart3, 
  Home, 
  PieChart,
  Wallet,   
  Settings,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  RotateCw
} from 'lucide-react';

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buyingStock, setBuyingStock] = useState(null);
  const [recommendations, setRecommendations] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchLastUpdate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/last-update');
      const data = await response.json();
      setLastUpdate(data.last_update);
    } catch (error) {
      console.error('Error fetching last update:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('http://localhost:5000/api/refresh-recommendations', {
        method: 'POST'
      });
      const data = await response.json();
      
      if (response.ok && data.status === 'success') {
        await Promise.all([
          fetchLastUpdate(),
          fetchStockData(),
          fetchRecommendations()
        ]);
      } else if (response.status === 429) {
        setError('Please wait 30 minutes between refreshes.');
      } else {
        setError('Failed to refresh recommendations. Please try again later.');
      }
    } catch (error) {
      setError('Failed to refresh recommendations. Please try again later.');
    } finally {
      setRefreshing(false);
    }
  };

  const fetchStockData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolio');
      if (!response.ok) throw new Error('Failed to fetch stock data');
      const data = await response.json();
      setStocks(data);
      setLoading(false);
    } catch (err) {
      setError('There was an error fetching the stock data. Please try again later.');
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recommendations');
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      const data = await response.json();
      const recommendationsMap = data.reduce((acc, rec) => {
        acc[rec.ticker] = {
          recommendation: rec.recommendation
        };
        return acc;
      }, {});
      setRecommendations(recommendationsMap);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (stock) => {
    setBuyingStock(stock.ticker);
    try {
      const response = await fetch('http://localhost:5000/api/portfolio/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticker: stock.ticker,
          quantity: 1,
          price: stock.current_price
        })
      });
      if (!response.ok) throw new Error('Failed to process purchase');
      
      const portfolioResponse = await fetch('http://localhost:5000/api/portfolio');
      if (!portfolioResponse.ok) throw new Error('Failed to fetch updated portfolio');
      const data = await portfolioResponse.json();
      setStocks(data);
    } catch (err) {
      setError('Failed to process purchase. Please try again.');
    } finally {
      setBuyingStock(null);
    }
  };

  useEffect(() => {
    fetchStockData();
    fetchRecommendations();
    fetchLastUpdate();
  }, []);

  const formatPrice = (price) => {
    if (isNaN(price)) return '$0.00';
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const formatChange = (change) => {
    if (isNaN(change)) return '0.00%';
    const formattedChange = parseFloat(change).toFixed(2);
    return `${change >= 0 ? '+' : ''}${formattedChange}%`;
  };

  const getRecommendationStyle = (recommendation) => {
    const styles = {
      'Strong Buy': 'font-bold text-emerald-800',
      'Buy': 'font-bold text-emerald-600',
      'Hold': 'font-bold text-amber-500',
      'Sell': 'font-bold text-orange-500',
      'Strong Sell': 'font-bold text-red-600'
    };
    return styles[recommendation] || 'text-gray-600';
  };

  const getStockRecommendation = (stock) => {
    const recommendation = recommendations[stock.ticker];
    if (recommendation) {
      return recommendation.recommendation;
    }
    const dummyRecommendations = {
      AAPL: 'Strong Buy',
      GOOGL: 'Hold',
      NFLX: 'Sell',
      NVDA: 'Strong Buy',
      BABA: 'Hold',
      FB: 'Strong Sell',
      JNJ: 'Buy',
      DIS: 'Hold',
      PG: 'Buy',
      XOM: 'Hold',
      INTC: 'Buy',
      V: 'Strong Buy'
    };
    return dummyRecommendations[stock.ticker] || 'No recommendations available.';
  };

  // Remove duplicate stocks by ticker
  const uniqueStocks = [...new Map(stocks.map(stock => [stock.ticker, stock])).values()];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            BNPTradePro
          </h1>
        </div>
        <nav className="mt-6">
          {[ 
            { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
            { icon: <BarChart3 size={20} />, label: 'Markets', path: '/markets' },
            { icon: <PieChart size={20} />, label: 'Portfolio', path: '/portfolio' },
            { icon: <Wallet size={20} />, label: 'Transactions', path: '/transactions' },
            { icon: <Settings size={20} />, label: 'Signout', path: '/' }
          ].map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="flex items-center px-6 py-4 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          {/* Add Refresh Section */}
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className={`flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${
                  refreshing ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                <RotateCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh Recommendations'}
              </button>
              {lastUpdate && (
                <span className="text-sm text-gray-500">
                  Last updated: {new Date(lastUpdate).toLocaleString()}
                </span>
              )}
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
          </div>

          {/* Existing Content */}
          {loading ? (
            <div className="text-center text-gray-500">Loading stock data...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uniqueStocks.map((stock) => (
                <div
                  key={stock.ticker}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{stock.ticker}</h3>
                      <p className="text-sm text-gray-500">{stock.investor_id}</p>
                    </div>
                    <div className={`flex items-center ${stock.percentage_profit_loss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.percentage_profit_loss >= 0 ? (
                        <ArrowUpRight size={20} />
                      ) : (
                        <ArrowDownRight size={20} />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-end mb-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatPrice(stock.current_price)}
                    </div>
                    <div className={`text-sm font-medium ${stock.percentage_profit_loss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {formatChange(stock.percentage_profit_loss)}
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className={`text-sm ${getRecommendationStyle(getStockRecommendation(stock))}`}>
                      {getStockRecommendation(stock)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleBuy(stock)}
                    disabled={buyingStock === stock.ticker}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${buyingStock === stock.ticker ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    <DollarSign size={16} />
                    {buyingStock === stock.ticker ? 'Processing...' : 'Buy Stock'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;