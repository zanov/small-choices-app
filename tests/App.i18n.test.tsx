import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, it, expect, beforeEach} from 'vitest';
import App from '../src/App';
import '../src/i18n';

describe('App i18n', () => {
  beforeEach(() => {
    window.location.href = 'http://localhost/';
    window.location.pathname = '/';
    window.location.search = '';
  });

  it('defaults to English', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/What do you choose/i)).toBeDefined();
    });
  });

  it('displays English translations correctly', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Coffee')).toBeDefined();
      expect(screen.getByText('Tea')).toBeDefined();
    });
  });

  it('switches to Bulgarian when BG button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/What do you choose/i)).toBeDefined();
    });

    const bgButton = screen.getByText('BG');
    await user.click(bgButton);

    await waitFor(() => {
      expect(screen.getByText(/Кое избираш/i)).toBeDefined();
      expect(screen.getByText('Кафе')).toBeDefined();
      expect(screen.getByText('Чай')).toBeDefined();
    });
  });

  it('switches to Spanish when ES button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/What do you choose/i)).toBeDefined();
    });

    const esButton = screen.getByText('ES');
    await user.click(esButton);

    await waitFor(() => {
      expect(screen.getByText(/¿Qué eliges/i)).toBeDefined();
      expect(screen.getByText('Café')).toBeDefined();
      expect(screen.getByText('Té')).toBeDefined();
    });
  });

  it('displays localized result text after completing quiz', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Switch to Bulgarian
    const bgButton = screen.getByText('BG');
    await user.click(bgButton);

    // Answer all questions
    for (let i = 0; i < 4; i++) {
      await waitFor(() => {
        const options = screen.getAllByRole('button').filter((btn) => {
          const text = btn.textContent || '';
          return text !== 'EN' && text !== 'BG' && text !== 'ES' && !text.includes('?');
        });
        expect(options.length).toBeGreaterThan(0);
      });
      const options = screen.getAllByRole('button').filter((btn) => {
        const text = btn.textContent || '';
        return text !== 'EN' && text !== 'BG' && text !== 'ES' && !text.includes('?');
      });
      await user.click(options[0]);
    }

    // Check for Bulgarian result text
    await waitFor(() => {
      const resultText = screen.getByText(/Тихият дълбок|Будният наблюдател/i);
      expect(resultText).toBeDefined();
    });
  });

  it('updates button labels based on language', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Complete quiz in English
    for (let i = 0; i < 4; i++) {
      await waitFor(() => {
        const options = screen.getAllByRole('button').filter((btn) => {
          const text = btn.textContent || '';
          return text !== 'EN' && text !== 'BG' && text !== 'ES' && !text.includes('?');
        });
        expect(options.length).toBeGreaterThan(0);
      });
      const options = screen.getAllByRole('button').filter((btn) => {
        const text = btn.textContent || '';
        return text !== 'EN' && text !== 'BG' && text !== 'ES' && !text.includes('?');
      });
      await user.click(options[0]);
    }

    await waitFor(() => {
      expect(screen.getByText('Share')).toBeDefined();
      expect(screen.getByText('Download')).toBeDefined();
      expect(screen.getByText('Try Again')).toBeDefined();
    });

    // Switch to Bulgarian
    const bgButton = screen.getByText('BG');
    await user.click(bgButton);

    await waitFor(() => {
      expect(screen.getByText('Сподели')).toBeDefined();
      expect(screen.getByText('Изтегли')).toBeDefined();
      expect(screen.getByText('Опитай пак')).toBeDefined();
    });
  });
});
