import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headingVariants = cva(
  "font-semibold tracking-tight text-foreground text-balance",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
        muted: "text-muted-foreground",
        gradient: "bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent",
      },
      size: {
        h1: "text-4xl md:text-5xl lg:text-6xl",
        h2: "text-3xl md:text-4xl lg:text-5xl",
        h3: "text-2xl md:text-3xl lg:text-4xl",
        h4: "text-xl md:text-2xl lg:text-3xl",
        h5: "text-lg md:text-xl lg:text-2xl",
        h6: "text-base md:text-lg lg:text-xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "h2",
      weight: "semibold",
    },
  }
)

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

function Heading({
  className,
  variant,
  size,
  weight,
  asChild = false,
  as,
  ...props
}: HeadingProps) {
  const Comp = asChild ? Slot : (as || "h2")

  return (
    <Comp
      className={cn(headingVariants({ variant, size, weight, className }))}
      {...props}
    />
  )
}

export { Heading, headingVariants }