import React, { ReactNode } from "react";
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
import { cn } from "@/lib/utils";

type AlertDialogProps = React.ComponentProps<typeof AlertDialog>;

type FooterButton = {
  label: string;
  onClick: () => void;
  className?: string;
};

export interface AlertDialog {
  title: string;
  description: string;
  contentClassName?: string;
  footerClassName?: string;
  cancelButton?: FooterButton;
  continueButton?: FooterButton;
}

export const CustomAlertDialog = ({
  title,
  description,
  contentClassName,
  open,
  onOpenChange,
  footerClassName,
  cancelButton = {
    label: "Cancel",
    onClick: () => alert("cancel"),
  },
  continueButton = {
    label: "Continue",
    onClick: () => alert("Continue"),
  },
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
          <AlertDialogCancel
            onClick={cancelButton?.onClick}
            className={cancelButton?.className}
          >
            {cancelButton?.label}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={continueButton?.onClick}
            className={continueButton?.className}
          >
            {continueButton?.label}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
