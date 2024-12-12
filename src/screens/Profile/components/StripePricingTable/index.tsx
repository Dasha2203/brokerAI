import React, { useEffect } from 'react';
import { Props } from './types';

const StripePricingTable = ({
  pricingTableId,
  publishableKey,
  sessionSecret,
}: Props) => {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://js.stripe.com/v3/pricing-table.js"]',
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/pricing-table.js';
      script.async = true;
      document.body.appendChild(script);
    }
    return () => {
      if (existingScript) return;
      const scriptToRemove = document.querySelector(
        'script[src="https://js.stripe.com/v3/pricing-table.js"]',
      );
      if (scriptToRemove) document.body.removeChild(scriptToRemove);
    };
  }, []);

  return (
    <div>
      <stripe-pricing-table
        pricing-table-id={pricingTableId}
        customer-session-client-secret={sessionSecret}
        publishable-key={publishableKey}
      />
    </div>
  );
};

export default StripePricingTable;
