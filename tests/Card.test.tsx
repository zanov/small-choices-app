import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Card from '../src/components/Card';
import {Result} from '../src/types';

describe('Card', () => {
  const mockResult: Result = {
    slug: 'test-result',
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    text: 'Test description text',
    theme: 'from-blue-500 to-purple-500',
  };

  it('renders result card with correct content', () => {
    render(<Card result={mockResult} />);
    expect(screen.getByText('Test Title')).toBeDefined();
    expect(screen.getByText('Test Subtitle')).toBeDefined();
    expect(screen.getByText('Test description text')).toBeDefined();
  });

  it('has share-card id for image capture', () => {
    const {container} = render(<Card result={mockResult} />);
    const shareCard = container.querySelector('#share-card');
    expect(shareCard).toBeDefined();
  });

  it('applies theme classes correctly', () => {
    const {container} = render(<Card result={mockResult} />);
    const card = container.querySelector('#share-card');
    expect(card?.className).toContain('from-blue-500');
    expect(card?.className).toContain('to-purple-500');
  });

  it('displays footer text', () => {
    render(<Card result={mockResult} />);
    expect(screen.getByText('SmallChoices.app')).toBeDefined();
  });

  it('renders with different result data', () => {
    const anotherResult: Result = {
      slug: 'another-result',
      title: 'Another Title',
      subtitle: 'Another Subtitle',
      text: 'Another text',
      theme: 'from-green-500 to-yellow-500',
    };

    render(<Card result={anotherResult} />);
    expect(screen.getByText('Another Title')).toBeDefined();
    expect(screen.getByText('Another Subtitle')).toBeDefined();
    expect(screen.getByText('Another text')).toBeDefined();
  });
});
