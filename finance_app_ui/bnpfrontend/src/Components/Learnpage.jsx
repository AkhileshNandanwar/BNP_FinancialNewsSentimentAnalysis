import React from 'react';
import { BookOpen, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';

function LearnPage() {
  const courses = [
    {
      title: "Fundamentals of Trading",
      description: "Master the basics of financial markets and trading principles",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />, // changed to green
      duration: "4 weeks"
    },
    {
      title: "Risk Management",
      description: "Learn essential risk management strategies for trading",
      icon: <Users className="w-6 h-6 text-green-600" />, // changed to green
      duration: "3 weeks"
    },
    {
      title: "Advanced Trading Strategies",
      description: "Explore sophisticated trading techniques and market analysis",
      icon: <Award className="w-6 h-6 text-green-600" />, // changed to green
      duration: "6 weeks"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Featured Image */}
        <div className="mb-16 rounded-xl overflow-hidden shadow-lg">
          <img 
            src="https://www.asifma.org/wp-content/uploads/bfi_thumb/bnpp_website-34wjvg3glae8ktegwc82kkzgjf730ommxv5ll3bda5xle2qks.png"
            alt="Trading Dashboard"
            className="w-full h-[350px] object-cover"
          />
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">{course.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{course.duration}</span>
                <button className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Learn with BNP Paribas?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <BookOpen className="w-6 h-6 text-green-600 flex-shrink-0" /> {/* changed to green */}
              <div>
                <h3 className="font-semibold mb-2">Expert-Led Content</h3>
                <p className="text-gray-600">Learn from industry professionals with years of trading experience</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0" /> {/* changed to green */}
              <div>
                <h3 className="font-semibold mb-2">Real Market Insights</h3>
                <p className="text-gray-600">Access real-time market data and practical trading scenarios</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnPage;
