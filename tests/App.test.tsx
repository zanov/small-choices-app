import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import App from '../src/App';

describe('App', () => {
  it('renders language buttons', () => {
    render(<App />);
    expect(screen.getByText('BG')).toBeDefined();
    expect(screen.getByText('EN')).toBeDefined();
    expect(screen.getByText('ES')).toBeDefined();
  });
});
