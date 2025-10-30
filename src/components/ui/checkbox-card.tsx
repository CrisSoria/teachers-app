import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const checkboxCardVariants = cva(
  "relative inline-flex items-center justify-between w-full p-5 rounded-lg cursor-pointer transition-all duration-200 border-2",
  {
    variants: {
      variant: {
        default:
          "bg-card text-card-foreground border-border hover:bg-accent/50 data-[checked=true]:border-primary data-[checked=true]:bg-primary/5 dark:data-[checked=true]:bg-primary/10",
        primary:
          "bg-card text-card-foreground border-border hover:bg-primary/5 data-[checked=true]:border-primary data-[checked=true]:bg-primary/10 data-[checked=true]:text-primary-foreground dark:data-[checked=true]:bg-primary/20",
        secondary:
          "bg-card text-card-foreground border-border hover:bg-secondary/50 data-[checked=true]:border-secondary data-[checked=true]:bg-secondary data-[checked=true]:text-secondary-foreground",
        success:
          "bg-card text-card-foreground border-border hover:bg-green-50 dark:hover:bg-green-950/20 data-[checked=true]:border-green-500 data-[checked=true]:bg-green-50 dark:data-[checked=true]:bg-green-950/30 data-[checked=true]:text-green-700 dark:data-[checked=true]:text-green-400",
        destructive:
          "bg-card text-card-foreground border-border hover:bg-destructive/5 data-[checked=true]:border-destructive data-[checked=true]:bg-destructive/10 data-[checked=true]:text-destructive",
        outline:
          "bg-transparent text-foreground border-border hover:border-primary/50 data-[checked=true]:border-primary data-[checked=true]:bg-primary/5",
      },
      size: {
        sm: "p-3 text-sm",
        default: "p-5",
        lg: "p-6 text-lg",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed hover:bg-card",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      disabled: false,
    },
  }
);

export type CheckboxCardProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof checkboxCardVariants>,
  "size" | "disabled" // We'll handle these separately
> & {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  badge?: string;
  badgeVariant?: "default" | "success" | "warning" | "destructive";
  showCheckIcon?: boolean;
  contentClassName?: string;
  labelClassName?: string;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
};

const CheckboxCard = React.forwardRef<HTMLInputElement, CheckboxCardProps>(
  (
    {
      className,
      labelClassName,
      contentClassName,
      iconClassName,
      variant,
      size,
      disabled,
      title,
      description,
      icon: Icon,
      badge,
      badgeVariant = "default",
      showCheckIcon = true,
      onCheckedChange,
      checked,
      defaultChecked,
      id,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = React.useState(
      checked ?? defaultChecked ?? false
    );

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      if (checked === undefined) {
        setIsChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
      props.onChange?.(e);
    };

    const generatedId = React.useId();
    const inputId = id || generatedId;

    const badgeColors = {
      default: "bg-muted text-muted-foreground",
      success:
        "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
      warning:
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
      destructive: "bg-destructive/10 text-destructive",
    };

    return (
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          className="sr-only peer"
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <label
          htmlFor={inputId}
          data-checked={isChecked}
          className={cn(
            checkboxCardVariants({ variant, size, disabled }),
            labelClassName
          )}
        >
          <div
            className={cn("flex items-start gap-4 flex-1", contentClassName)}
          >
            {Icon && (
              <div
                className={cn(
                  "shrink-0 transition-colors",
                  isChecked ? "text-current" : "text-muted-foreground",
                  iconClassName
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
            )}
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold leading-none">{title}</span>
                {badge && (
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium",
                      badgeColors[badgeVariant]
                    )}
                  >
                    {badge}
                  </span>
                )}
              </div>
              {description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
          {showCheckIcon && (
            <div
              className={cn(
                "shrink-0 ml-4 transition-all duration-200",
                isChecked ? "scale-100 opacity-100" : "scale-0 opacity-0"
              )}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </label>
      </div>
    );
  }
);

CheckboxCard.displayName = "CheckboxCard";

export { CheckboxCard, checkboxCardVariants };
