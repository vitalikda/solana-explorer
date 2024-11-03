"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group flex justify-center"
      toastOptions={{
        duration: 3000,
        classNames: {
          toast:
            "px-6 py-4 min-w-[165px] w-fit toast group rounded-full group-[.toaster]:border-none group-[.toaster]:shadow-lg",
          success:
            "toast group-[.toaster]:bg-primary/5 group-[.toaster]:text-primary",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      position="bottom-center"
      {...props}
    />
  );
};

export { Toaster };
