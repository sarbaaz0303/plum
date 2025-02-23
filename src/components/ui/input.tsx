import * as React from "react";

import { cn } from "@/lib/utils";
import type { LucideIcon, LucideProps } from "lucide-react";
import { Button } from "./button";

export interface InputProps
 extends React.InputHTMLAttributes<HTMLInputElement> {
 startIcon?: LucideIcon;
 endIcon?: LucideIcon;
 iconProps?: LucideProps;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
 ({ className, type, startIcon, endIcon, iconProps = {}, ...props }, ref) => {
  const StartIcon = startIcon;
  const EndIcon = endIcon;
  const { className: iconClassName, ...iconRest } = iconProps;

  return (
   <div className="relative w-full">
    <input
     type={type}
     className={cn(
      "peer flex h-10  w-full rounded-md border border-gray-500 bg-background px-4 py-2 font-sans text-base text-gray-900 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-base placeholder:text-gray-500 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-100",
      startIcon ? "pl-8" : "",
      endIcon ? "pr-8" : "",
      className
     )}
     ref={ref}
     {...props}
    />
    {StartIcon && (
     <StartIcon
      size={16}
      className={cn(
       "pointer-events-none absolute left-1.5 top-1/2 -translate-y-1/2 transform text-muted-foreground peer-focus:text-ring",
       iconClassName
      )}
      {...iconRest}
     />
    )}
    {EndIcon && (
     <Button
      type="submit"
      variant={"ghost"}
      className={cn(
       "absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground peer-focus:text-ring cursor-pointer px-2 py-1.5",
       iconClassName
      )}>
      <EndIcon size={16} {...iconRest} />
     </Button>
    )}
   </div>
  );
 }
);
Input.displayName = "Input";

export { Input };
