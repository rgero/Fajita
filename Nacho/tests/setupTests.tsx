import '@testing-library/jest-dom';

import React from 'react';
import { vi } from 'vitest';

// Mock MUI icons to prevent EMFILE
vi.mock('@mui/icons-material', () => {
  // TypeScript-friendly proxy handler
  const handler: ProxyHandler<Record<string, any>> = {
    get: (target, prop) => {
      // Return a dummy React component for any icon import
      const DummyIcon: React.FC<any> = (props) => <span data-testid={`icon-${String(prop)}`} {...props} />;
      return DummyIcon;
    },
  };

  return new Proxy({}, handler);
});
