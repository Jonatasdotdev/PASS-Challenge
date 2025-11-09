"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Indeterminate = boolean | "indeterminate";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked"> {
  checked?: Indeterminate;
  onCheckedChange?: (checked: Indeterminate) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = checked === "indeterminate";
      }
    }, [checked]);

    return (
      <input
        ref={internalRef}
        type="checkbox"
        checked={checked === "indeterminate" ? false : Boolean(checked)}
        onChange={(e) => onCheckedChange?.(e.currentTarget.checked)}
        className={cn(
          "h-4 w-4 rounded border border-black dark:border-[#3a3a3a]",
          "bg-black dark:bg-[#1a1a1a]",
          "text-white focus:ring-white focus:ring-offset-0",
          className
        )}
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";
