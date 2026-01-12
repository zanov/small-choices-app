import '@testing-library/jest-dom';
import {beforeEach, vi} from 'vitest';

// Mock window.location
Object.defineProperty(window, 'location', {
  writable: true,
  value: {
    href: 'http://localhost/',
    pathname: '/',
    search: '',
    replace: vi.fn(),
  },
});

// Mock window.history
Object.defineProperty(window, 'history', {
  writable: true,
  value: {
    replaceState: vi.fn(),
    pushState: vi.fn(),
  },
});

// Mock navigator.share
Object.defineProperty(navigator, 'share', {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(navigator, 'canShare', {
  writable: true,
  value: vi.fn(),
});

// Mock fetch
global.fetch = vi.fn();

beforeEach(() => {
  // Reset window.location before each test
  window.location.href = 'http://localhost/';
  window.location.pathname = '/';
  window.location.search = '';
  vi.clearAllMocks();
});
