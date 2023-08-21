import type { ReactNode } from "react";
import React from "react";
import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type DialogProps = React.ComponentProps<typeof Dialog>;

type FooterButtonProps = ButtonProps & {
  label: string;
};
export interface CustomDialog {
  title: string;
  children: ReactNode;
  contentClassName?: string;
  footerButtons?: FooterButtonProps[];
  footerClassName?: string;
}

export const CustomDialog = ({
  title,
  children,
  contentClassName,
  open,
  onOpenChange,
  footerClassName,
  footerButtons = [
    {
      label: "OK",
      variant: "default",
      onClick: () => onOpenChange?.(false),
    },
  ],
}: CustomDialog & DialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={contentClassName}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {children}
          </DialogHeader>
        )}
        <DialogFooter
          className={cn(
            "flex flex-row justify-end gap-1",
            footerClassName,
            "w-full",
          )}
        >
          {footerButtons?.map((button) => (
            <Button
              variant={button.variant ?? "default"}
              key={button.label}
              {...button}
            >
              {button.label}
            </Button>
          ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
