import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, it, expect, beforeEach, vi} from 'vitest';
import App from '../src/App';
import '../src/i18n';

// Mock html2canvas
vi.mock('html2canvas', () => ({
  default: vi.fn(() =>
    Promise.resolve({
      toDataURL: () => 'data:image/png;base64,mock',
      toBlob: (callback: (blob: Blob | null) => void) => {
        callback(new Blob(['mock'], {type: 'image/png'}));
      },
    }),
  ),
}));

describe('App', () => {
  beforeEach(() => {
    // Reset URL and history before each test
    window.history.replaceState({}, '', '/');
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {href: 'http://localhost/', pathname: '/', search: ''},
    });
  });

  it('renders language buttons', () => {
    render(<App />);
    expect(screen.getByText('BG')).toBeDefined();
    expect(screen.getByText('EN')).toBeDefined();
    expect(screen.getByText('ES')).toBeDefined();
  });

  it('displays first question on initial render', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/What do you choose/i)).toBeDefined();
    });
  });

  it('shows question options', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Coffee')).toBeDefined();
      expect(screen.getByText('Tea')).toBeDefined();
    });
  });

  it('progresses to next question when answer is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/What do you choose/i)).toBeDefined();
    });

    const coffeeButton = screen.getByText('Coffee');
    await user.click(coffeeButton);

    await waitFor(() => {
      expect(screen.getByText(/Where do you feel better/i)).toBeDefined();
    });
  });

  it('shows result card after answering all questions', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Answer all 4 questions
    const questions = [
      /What do you choose/i,
      /Where do you feel better/i,
      /How do you live/i,
      /Do you prefer to work/i,
    ];

    for (let i = 0; i < questions.length; i++) {
      await waitFor(() => {
        expect(screen.getByText(questions[i])).toBeDefined();
      });
      // Click first option for each question
      const options = screen.getAllByRole('button').filter((btn) => {
        const text = btn.textContent || '';
        return text !== 'EN' && text !== 'BG' && text !== 'ES' && !text.includes('?');
      });
      if (options.length > 0) {
        await user.click(options[0]);
      }
    }

    // Should show result card
    await waitFor(() => {
      expect(screen.getByText(/The Quiet Deep|The Wakeful Observer/i)).toBeDefined();
    });
  });

  it('shows share, download, and try again buttons on result screen', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Answer all questions
    for (let i = 0; i < 4; i++) {
      await waitFor(() => {
        const options = screen.getAllByRole('button').filter((btn) => {
          const text = btn.textContent || '';
          return text !== 'EN' && text !== 'BG' && text !== 'ES' && !text.includes('?');
        });
        if (options.length > 0) {
          return options[0];
        }
      });
      const options = screen.getAllByRole('button').filter((btn) => {
        const text = btn.textContent || '';
        return text !== 'EN' && text !== 'BG' && text !== 'ES' && !text.includes('?');
      });
      if (options.length > 0) {
        await user.click(options[0]);
      }
    }

    await waitFor(() => {
      expect(screen.getByText(/Share/i)).toBeDefined();
      expect(screen.getByText(/Download/i)).toBeDefined();
      expect(screen.getByText(/Try Again/i)).toBeDefined();
    });
  });

  it('switches language when language button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/What do you choose/i)).toBeDefined();
    });

    const bgButton = screen.getByText('BG');
    await user.click(bgButton);

    await waitFor(() => {
      // Should show Bulgarian question
      expect(screen.getByText(/Кое избираш/i)).toBeDefined();
    });
  });

  it('highlights active language button', async () => {
    render(<App />);
    const enButton = screen.getByText('EN');
    // EN should be active by default
    expect(enButton.className).toContain('bg-white');
  });
});
