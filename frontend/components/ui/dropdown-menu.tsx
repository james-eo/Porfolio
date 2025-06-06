import * as React from "react";

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ children, asChild, ...props }, ref) =>
  asChild ? (
    <>{children}</>
  ) : (
    <button ref={ref} {...props}>
      {children}
    </button>
  )
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { align?: string }) => (
  <div {...props}>{children}</div>
);

export const DropdownMenuItem = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>;
