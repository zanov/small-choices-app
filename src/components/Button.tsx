import {ButtonHTMLAttributes, ReactNode} from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'option' | 'language';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isActive?: boolean;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-white text-black border-white',
  secondary: 'border border-neutral-700 text-neutral-300 hover:bg-neutral-800',
  option: 'border border-neutral-700 rounded-xl hover:bg-neutral-800 transition-colors',
  language: 'border',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

const activeLanguageStyles = 'bg-white text-black border-white';
const inactiveLanguageStyles = 'border-neutral-700 text-neutral-300 hover:bg-neutral-800';

export default function Button({
  variant = 'secondary',
  size = 'md',
  isActive = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 disabled:opacity-50 disabled:cursor-not-allowed';

  let variantClass = variantStyles[variant];
  if (variant === 'language') {
    variantClass = isActive ? activeLanguageStyles : inactiveLanguageStyles;
  }

  const sizeClass = sizeStyles[size];
  const combinedClassName = `${baseStyles} ${variantClass} ${sizeClass} ${className}`.trim();

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
