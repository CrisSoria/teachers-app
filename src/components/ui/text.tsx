import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textVariants = cva(
  "text-foreground inline-block",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
        destructive: "text-destructive",
        success: "text-success",
        warning: "text-warning",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      leading: {
        none: "leading-none",
        tight: "leading-tight",
        snug: "leading-snug",
        normal: "leading-normal",
        relaxed: "leading-relaxed",
        loose: "leading-loose",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "base",
      weight: "normal",
      align: "left",
      leading: "normal",
    },
  }
)

type TextElement = "p" | "span" | "div" | "label";

export type TextProps<T extends React.ElementType = "p"> = {
  asChild?: boolean;
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, "as"> &
  VariantProps<typeof textVariants>;

function Text<T extends React.ElementType = "p">({
  className,
  variant,
  size,
  weight,
  align,
  leading,
  asChild = false,
  as,
  ...props
}: TextProps<T>) {
  const Comp = asChild ? Slot : (as || "p")

  return (
    <Comp
      className={cn(textVariants({ variant, size, weight, align, leading, className }))}
      {...props}
    />
  )
}

export { Text, textVariants }