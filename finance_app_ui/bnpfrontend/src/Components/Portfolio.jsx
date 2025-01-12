import React from 'react';
import { LineChart as LineChartIcon, BarChart as BarChartIcon, ArrowUpRight, ArrowDownRight, Wallet, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data - in a real app this would come from an API
const portfolioStats = {
  totalValue: 284750.50,
  dayChange: 1250.75,
  dayChangePercentage: 0.44,
  positions: [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 150, price: 175.25, change: 2.35, value: 26287.50 },
    { symbol: 'MSFT', name: 'Microsoft', shares: 100, price: 378.50, change: -1.20, value: 37850.00 },
    { symbol: 'GOOGL', name: 'Alphabet', shares: 50, price: 142.75, change: 0.85, value: 7137.50 },
    { symbol: 'AMZN', name: 'Amazon', shares: 80, price: 175.35, change: 3.25, value: 14028.00 },
    { symbol: 'NVDA', name: 'NVIDIA', shares: 45, price: 875.25, change: 5.75, value: 39386.25 },
  ]
};

// Calculate percentages for pie chart
const total = portfolioStats.positions.reduce((sum, pos) => sum + pos.value, 0);
const pieData = portfolioStats.positions.map(pos => ({
  name: pos.symbol,
  value: (pos.value / total) * 100
}));

// Colors for charts
const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981'];

function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LineChartIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">TradePro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <Wallet className="h-4 w-4" />
                <span>Deposit</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Portfolio Value</p>
                <p className="text-2xl font-bold">${portfolioStats.totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Day Change</p>
                <div className="flex items-center space-x-2">
                  <p className={`text-2xl font-bold ${portfolioStats.dayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(portfolioStats.dayChange).toLocaleString()}
                  </p>
                  {portfolioStats.dayChange >= 0 ? 
                    <ArrowUpRight className="h-5 w-5 text-green-600" /> :
                    <ArrowDownRight className="h-5 w-5 text-red-600" />
                  }
                </div>
              </div>
              <Activity className="h-8 w-8 text-indigo-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Day Change %</p>
                <div className="flex items-center space-x-2">
                  <p className={`text-2xl font-bold ${portfolioStats.dayChangePercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {portfolioStats.dayChangePercentage}%
                  </p>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-indigo-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Positions</p>
                <p className="text-2xl font-bold">{portfolioStats.positions.length}</p>
              </div>
              <BarChartIcon className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} (${value.toFixed(1)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Holdings by Value</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={portfolioStats.positions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="symbol" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => `$${Number(value).toLocaleString()}`}
                    labelFormatter={(label) => `Stock: ${label}`}
                  />
                  <Bar dataKey="value" fill="#4F46E5">
                    {portfolioStats.positions.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Positions Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Positions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {portfolioStats.positions.map((position) => (
                  <tr key={position.symbol} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600">{position.symbol}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{position.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-900">{position.shares}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-900">${position.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className={`text-sm ${position.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {position.change >= 0 ? '+' : ''}{position.change}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900">${position.value.toLocaleString()}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Portfolio;