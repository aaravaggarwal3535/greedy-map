import React from 'react';
import { Button } from '@/components/ui/button';
import { FiLock, FiUnlock } from 'react-icons/fi';

const PremiumContent = ({ title, description, children, hasPurchased, onPurchase }) => {
  if (hasPurchased) {
    // User has purchased, show the actual content
    return <>{children}</>;
  }

  // User hasn't purchased, show paywall
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm">
      <div className="text-center max-w-3xl mx-auto py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
          <FiLock className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-gray-600 mb-8">
          {description}
        </p>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 max-w-md mx-auto">
            <h3 className="font-semibold text-lg mb-2">What you'll get:</h3>
            <ul className="text-left space-y-2 mb-4">
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-green-100 rounded-full text-green-500 flex-shrink-0 mr-2 text-center">✓</span>
                <span>Access to 30+ project ideas across multiple categories</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-green-100 rounded-full text-green-500 flex-shrink-0 mr-2 text-center">✓</span>
                <span>Detailed project requirements and learning outcomes</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-green-100 rounded-full text-green-500 flex-shrink-0 mr-2 text-center">✓</span>
                <span>GitHub repositories and demo links for inspiration</span>
              </li>
            </ul>
          </div>
          
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            onClick={onPurchase}
          >
            <FiUnlock className="mr-2 h-5 w-5" />
            Unlock Premium Projects for $9.99
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            One-time payment, lifetime access. No subscription required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumContent;
