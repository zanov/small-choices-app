import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, it, expect, vi} from 'vitest';
import Button from '../src/components/Button';

describe('Button', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('applies default variant and size classes', () => {
    const {container} = render(<Button>Test</Button>);
    const button = container.querySelector('button');
    expect(button?.className).toContain('border');
    expect(button?.className).toContain('px-4');
    expect(button?.className).toContain('py-2');
  });

  it('applies primary variant styles', () => {
    const {container} = render(<Button variant='primary'>Primary</Button>);
    const button = container.querySelector('button');
    expect(button?.className).toContain('bg-white');
    expect(button?.className).toContain('text-black');
  });

  it('applies secondary variant styles', () => {
    const {container} = render(<Button variant='secondary'>Secondary</Button>);
    const button = container.querySelector('button');
    expect(button?.className).toContain('border');
    expect(button?.className).toContain('hover:bg-neutral-800');
  });

  it('applies option variant styles', () => {
    const {container} = render(<Button variant='option'>Option</Button>);
    const button = container.querySelector('button');
    expect(button?.className).toContain('rounded-xl');
    expect(button?.className).toContain('transition-colors');
  });

  it('applies language variant with active state', () => {
    const {container} = render(
      <Button variant='language' isActive={true}>
        EN
      </Button>,
    );
    const button = container.querySelector('button');
    expect(button?.className).toContain('bg-white');
    expect(button?.className).toContain('text-black');
  });

  it('applies language variant with inactive state', () => {
    const {container} = render(
      <Button variant='language' isActive={false}>
        BG
      </Button>,
    );
    const button = container.querySelector('button');
    expect(button?.className).toContain('border-neutral-700');
    expect(button?.className).toContain('text-neutral-300');
  });

  it('applies small size styles', () => {
    const {container} = render(<Button size='sm'>Small</Button>);
    const button = container.querySelector('button');
    expect(button?.className).toContain('px-2');
    expect(button?.className).toContain('py-1');
    expect(button?.className).toContain('text-xs');
  });

  it('applies medium size styles', () => {
    const {container} = render(<Button size='md'>Medium</Button>);
    const button = container.querySelector('button');
    expect(button?.className).toContain('px-4');
    expect(button?.className).toContain('py-2');
  });

  it('applies large size styles', () => {
    const {container} = render(<Button size='lg'>Large</Button>);
    const button = container.querySelector('button');
    expect(button?.className).toContain('px-6');
    expect(button?.className).toContain('py-3');
    expect(button?.className).toContain('text-lg');
  });

  it('handles onClick events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByText('Click me');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const {container} = render(<Button className='custom-class'>Test</Button>);
    const button = container.querySelector('button');
    expect(button?.className).toContain('custom-class');
  });

  it('passes through HTML button attributes', () => {
    render(
      <Button type='submit' disabled data-testid='test-button'>
        Submit
      </Button>,
    );
    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });

  it('applies disabled state styles', () => {
    const {container} = render(<Button disabled>Disabled</Button>);
    const button = container.querySelector('button');
    expect(button?.className).toContain('opacity-50');
    expect(button?.className).toContain('cursor-not-allowed');
  });

  it('applies focus styles', () => {
    const {container} = render(<Button>Focusable</Button>);
    const button = container.querySelector('button');
    expect(button?.className).toContain('focus:outline-none');
    expect(button?.className).toContain('focus:ring-2');
  });
});
