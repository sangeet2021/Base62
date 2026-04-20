import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'danger' | 'accent' | 'muted';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:  'bg-accent text-bg font-bold hover:bg-white active:scale-97',
  ghost:    'bg-transparent text-muted border border-border-custom hover:text-[#f0f0f0] hover:border-[#666] active:scale-97',
  outline:  'bg-transparent text-text border border-text hover:bg-[#f0f0f0] hover:text-[#080808] active:scale-97',
  danger:   'bg-red-600 text-white font-bold hover:bg-red-500 active:scale-97',
  accent:   'bg-accent-orange text-bg font-bold hover:bg-[#ff8c5a] active:scale-97',
  muted:    'bg-surface text-muted border border-border-custom hover:text-[#f0f0f0] active:scale-97',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        'font-display inline-flex items-center justify-center gap-2 tracking-tight cursor-pointer',
        'transition-all duration-200 ease-out',
        'hover:scale-[1.03]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
}