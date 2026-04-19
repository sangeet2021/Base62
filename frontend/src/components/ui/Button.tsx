import { useRef, useEffect} from "react";
import type  {ButtonHTMLAttributes, ReactNode} from "react"
import gsap from "gsap";

type ButtonVariant = "primary" | "ghost" | "outline" | "danger" | "accent" | "muted";
type ButtonSize = "sm" | "md" | "lg";

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
  primary: "bg-accent text-bg font-bold",
  ghost: "bg-transparent text-muted border border-border-custom",
  outline: "bg-transparent text-text border border-text",
  danger: "bg-red-600 text-white font-bold",
  accent: "bg-accent-orange text-bg font-bold",
  muted: "bg-surface text-muted border border-border-custom",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-4 text-base",
};

const hoverColors: Record<ButtonVariant, { bg?: string; color?: string; borderColor?: string }> = {
  primary: { bg: "#ffffff" },
  ghost: { color: "#f0f0f0", borderColor: "#666666" },
  outline: { bg: "#f0f0f0", color: "#080808" },
  danger: { bg: "#ef4444" },
  accent: { bg: "#ff8c5a" },
  muted: { color: "#f0f0f0" },
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const isDisabled = disabled || loading;

  useEffect(() => {
    const el = btnRef.current;
    if (!el || isDisabled) return;

    const hover = hoverColors[variant];

    const onEnter = () => {
      gsap.to(el, {
        ...hover,
        scale: 1.03,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        bg: "",
        scale: 1,
        color: "",
        borderColor: "",
        duration: 0.2,
        ease: "power2.out",
        clearProps: "backgroundColor,color,borderColor",
      });
    };

    const onDown = () => {
      gsap.to(el, { scale: 0.97, duration: 0.1, ease: "power2.in" });
    };

    const onUp = () => {
      gsap.to(el, { scale: 1.03, duration: 0.1, ease: "power2.out" });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseup", onUp);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseup", onUp);
    };
  }, [variant, isDisabled]);

  return (
    <button
      ref={btnRef}
      disabled={isDisabled}
      className={[
        "font-display inline-flex items-center justify-center gap-2 tracking-tight",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
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