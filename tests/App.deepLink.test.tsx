import {render, screen, waitFor} from '@testing-library/react';
import {describe, it, expect, beforeEach} from 'vitest';
import App from '../src/App';
import {RESULTS} from '../src/data';
import '../src/i18n';

describe('App Deep Links', () => {
  beforeEach(() => {
    // Reset window.location before each test
    window.location.href = 'http://localhost/';
    window.location.pathname = '/';
    window.location.search = '';
  });

  it('loads language from URL parameter', async () => {
    window.location.search = '?lng=bg';
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Кое избираш/i)).toBeDefined();
    });
  });

  it('defaults to English when no language parameter', async () => {
    window.location.search = '';
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/What do you choose/i)).toBeDefined();
    });
  });

  it('loads shared result from URL path', async () => {
    const testSlug = RESULTS[0].slug;
    window.location.pathname = `/r/${testSlug}`;
    window.location.search = '';

    render(<App />);

    // Should show result card directly
    await waitFor(() => {
      expect(screen.getByText(/The Quiet Deep|The Wakeful Observer/i)).toBeDefined();
    });
  });

  it('combines language parameter with shared result path', async () => {
    const testSlug = RESULTS[0].slug;
    window.location.pathname = `/r/${testSlug}`;
    window.location.search = '?lng=bg';

    render(<App />);

    // Should show result in Bulgarian
    await waitFor(() => {
      expect(screen.getByText(/Тихият дълбок|Будният наблюдател/i)).toBeDefined();
    });
  });
});
