import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

export function buttonClasses(variant: ButtonVariant = "primary", className?: string): string {
  return cn(
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
    variant === "primary" && "bg-foreground text-background hover:opacity-90",
    variant === "secondary" && "bg-zinc-100 text-foreground hover:bg-zinc-200",
    variant === "outline" && "border border-zinc-300 hover:bg-zinc-50",
    className
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button className={buttonClasses(variant, className)} {...props}>
      {children}
    </button>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  /** Opens in a new tab with a safe rel */
  external?: boolean;
}

/** A link styled as a button — never nest a <button> inside an <a>. */
export function ButtonLink({ className, variant = "primary", external, children, ...props }: ButtonLinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a className={buttonClasses(variant, className)} {...externalProps} {...props}>
      {children}
    </a>
  );
}
