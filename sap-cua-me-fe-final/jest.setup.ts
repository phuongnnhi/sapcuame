// Polyfill structuredClone if not available (for JSDOM)
if (typeof global.structuredClone === 'undefined') {
    global.structuredClone = (value: unknown) => {
      try {
        const json = JSON.stringify(value);
        return json === undefined ? value : JSON.parse(json);
      } catch (error) {
        // If JSON serialization fails, return the original value as a fallback.
        void error;
        return value;
      }
    }
  }

// Polyfill window.matchMedia for JSDOM
if (typeof window.matchMedia !== 'function') {
    window.matchMedia = (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    });
}

// Import Jest DOM matchers
import '@testing-library/jest-dom';
