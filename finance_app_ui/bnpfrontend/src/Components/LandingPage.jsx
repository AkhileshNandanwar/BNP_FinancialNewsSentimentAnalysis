import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { Menu, Shield, TrendingUp, Activity } from 'lucide-react';  // Import icons from lucide-react

const Landingpage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-500 text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
          <div className="font-bold text-2xl tracking-tight">BNPTradepro</div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-blue-200 transition-colors duration-200">Markets</Link>
            <Link to="/" className="hover:text-blue-200 transition-colors duration-200">Trade</Link>
            <Link to="/" className="hover:text-blue-200 transition-colors duration-200">Portfolio</Link>
            <Link to="/learn" className="hover:text-blue-200 transition-colors duration-200">Learn</Link>
          </div>
          <div className="space-x-4">
            <button className="px-6 py-2.5 text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg">
             <Link to="/login">Login</Link>
            </button>
            <button className="px-6 py-2.5 bg-blue-500 rounded-lg hover:bg-blue-400 transition-all duration-200 shadow-md hover:shadow-lg border border-blue-400">
            <Link to="/signup">Signup</Link>
            </button>
          </div>
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </nav>

        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-8 leading-tight">
              Trade with Confidence on a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
                Secure Platform
              </span>
            </h1>
            <p className="text-xl mb-12 text-blue-100 leading-relaxed">
              Join millions of traders worldwide. Get access to global markets with our powerful trading tools.
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Trading Now
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-20">Why Choose BNPTradepro</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Shield className="w-16 h-16 text-indigo-600" />}
              title="Secure Trading"
              description="Advanced encryption and security measures to protect your assets and transactions"
            />
            <FeatureCard 
              icon={<TrendingUp className="w-16 h-16 text-indigo-600" />}
              title="Advanced Charts"
              description="Professional-grade charting tools and technical indicators for precise analysis"
            />
            <FeatureCard 
              icon={<Activity className="w-16 h-16 text-indigo-600" />}
              title="Real-time Data"
              description="Lightning-fast market data and instant trade execution at your fingertips"
            />
          </div>
        </div>
      </section>

      {/* Market Overview Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16">Popular Markets</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <MarketCard 
              symbol="BTC/USD"
              name="Bitcoin"
              price="47,234.50"
              change="+2.45%"
              isPositive={true}
            />
            <MarketCard 
              symbol="ETH/USD"
              name="Ethereum"
              price="2,854.20"
              change="-0.82%"
              isPositive={false}
            />
            <MarketCard 
              symbol="AAPL"
              name="Apple Inc."
              price="178.25"
              change="+1.23%"
              isPositive={true}
            />
            <MarketCard 
              symbol="TSLA"
              name="Tesla Inc."
              price="242.80"
              change="+3.15%"
              isPositive={true}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Start Trading?</h2>
          <p className="text-xl mb-12 text-blue-100 max-w-2xl mx-auto">
            Create your account in minutes and access global markets with professional trading tools
          </p>
          <button className="px-10 py-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Open Free Account
          </button>
        </div>
      </section>
    </div>
  );
};

// FeatureCard component definition
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="mb-6 p-4 bg-indigo-50 rounded-xl inline-block">{icon}</div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const MarketCard = ({ symbol, name, price, change, isPositive }) => (
  <div className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="font-bold text-xl mb-1">{symbol}</h3>
        <p className="text-gray-500 text-sm">{name}</p>
      </div>
      <div className={`px-3 py-1 rounded-full text-sm ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {change}
      </div>
    </div>
    <p className="text-3xl font-bold mb-2">${price}</p>
    <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? '▲' : '▼'} Last 24h
    </div>
  </div>
);

const style = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
`;

export default Landingpage;
