"use client";

import { toast } from "sonner";
import { IconCopy } from "src/components/icons/copy";
import { useCopyToClipboard } from "src/hooks/useCopyToClipboard";
import { cn } from "src/lib/utils";

interface IconProps extends React.HTMLAttributes<SVGElement> {
  className?: string;
}

export const IconButtonCopy = ({
  text,
  className,
  ...props
}: { text: string } & IconProps) => {
  const [, copyToClipboard] = useCopyToClipboard();

  const onCopy = async () => {
    const success = await copyToClipboard(text);
    if (success) {
      toast.success("Copied to clipboard");
    } else {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <IconCopy
      onClick={onCopy}
      className={cn(
        "h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
};
