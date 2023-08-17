import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface CustomDialog {
  title: string;
  description: string;
  containerClassName?: string;
  children: ReactNode;
  contentClassName: string;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  footer: React.JSX.Element | string;
}

export const CustomDialog = ({
  title,
  description,
  footer,
  children,
  buttonProps,
  contentClassName,
}: CustomDialog) => {
  const { className: buttonClassName, name: buttonName } = buttonProps ?? {};

  return (
    <div className="containerClassName">
      <Dialog>
        <DialogTrigger asChild>
          <Button className={buttonClassName}>{buttonName}</Button>
        </DialogTrigger>
        <DialogContent className={contentClassName}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
            {children}
          </DialogHeader>
          <DialogFooter>{footer}</DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
