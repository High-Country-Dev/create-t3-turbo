import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AlertDialogProps = React.ComponentProps<typeof AlertDialog>;

export interface AlertDialog {
  title: string;
  description: string;
  contentClassName?: string;
  footerClassName?: string;
  cancelButton?: ButtonProps & { label: string };
  confirmButton?: ButtonProps & { label: string };
}

export const CustomAlertDialog = ({
  title,
  description,
  contentClassName,
  open,
  onOpenChange,
  footerClassName,
  cancelButton,
  confirmButton,
}: AlertDialog & AlertDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={contentClassName}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter
          className={cn(
            "flex flex-row justify-end gap-1",
            footerClassName,
            "w-full",
          )}
        >
          {cancelButton && (
            <AlertDialogCancel
              onClick={cancelButton?.onClick}
              className={cancelButton?.className}
              {...cancelButton}
            >
              {cancelButton?.label}
            </AlertDialogCancel>
          )}
          {confirmButton && (
            <AlertDialogAction
              onClick={confirmButton?.onClick}
              className={confirmButton?.className}
              {...confirmButton}
            >
              {confirmButton?.label}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
