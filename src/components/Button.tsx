import { motion } from "motion/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "stamp";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-display tracking-wide transition-all relative overflow-hidden group";

  const variants = {
    primary:
      "px-6 py-3 bg-[var(--color-accent)] text-[var(--color-cream)] hover:bg-[var(--color-text)] rounded-sm shadow-sm hover:shadow-md",
    secondary:
      "px-6 py-3 border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-cream)] rounded-sm",
    stamp:
      "px-8 py-4 border-2 border-dashed border-[var(--color-accent)] text-[var(--color-accent)] font-handwriting text-2xl rotate-[-2deg] hover:rotate-0 hover:bg-[var(--color-accent)]/10",
  };

  const Content = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {Content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {Content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {Content}
    </button>
  );
}
