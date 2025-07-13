import React from 'react';
import { Check, Minus } from 'lucide-react';

const CPPricing = ({ selected }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Pricing</h2>
        </div>

        <div className="px-6">
          <div className="overflow-x-auto">
            <div className="divide-y divide-gray-200">
              {/* Free Trial Row */}
              <div
                className="grid divide-x divide-gray-200"
                style={{
                  gridTemplateColumns:
                    selected.length === 3 ? '180px 1fr 1fr 1fr' : '180px 1fr 1fr',
                }}
              >
                <div className="py-4 pl-4 pr-8 font-medium">Free Trial</div>
                {selected.map((software, index) => (
                  <div key={index} className="py-4 px-6 flex justify-center items-center gap-2">
                    {software.pricing.hasFreeTrialPeriod ? (
                      <>
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600">
                          {software.pricing.freeTrialDays} days
                        </span>
                      </>
                    ) : (
                      <Minus className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                ))}
              </div>

              {/* Entry Level Pricing Row */}
              <div
                className="grid divide-x divide-gray-200"
                style={{
                  gridTemplateColumns:
                    selected.length === 3 ? '180px 1fr 1fr 1fr' : '180px 1fr 1fr',
                }}
              >
                <div className="py-4 pl-4 pr-8 font-medium">Starting Price</div>
                {selected.map((software, index) => (
                  <div key={index} className="py-4 px-6 flex justify-center items-center">
                    <span className="text-sm">
                      {software.pricing.hasFreeVersion ? 
                        'Free' : 
                        software.pricing.tiers[0].price + '/' + software.pricing.tiers[0].billingPeriod
                      }
                    </span>
                  </div>
                ))}
              </div>

              {/* Browse All Plans Row */}
              <div
                className="grid divide-x divide-gray-200"
                style={{
                  gridTemplateColumns:
                    selected.length === 3 ? '180px 1fr 1fr 1fr' : '180px 1fr 1fr',
                }}
              >
                <div className="py-4 pl-4 pr-8 font-medium"></div>
                {selected.map((software, index) => (
                  <div key={index} className="py-4 px-6 flex justify-center">
                    <a 
                      href="#" 
                      className="text-sm text-blue-600 hover:text-blue-700"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add pricing plan navigation logic here
                      }}
                    >
                      Browse all pricing plan
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPPricing;