import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        variant === "primary" && "bg-foreground text-background hover:opacity-90",
        variant === "secondary" && "bg-zinc-100 text-foreground hover:bg-zinc-200",
        variant === "outline" && "border border-zinc-300 hover:bg-zinc-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
