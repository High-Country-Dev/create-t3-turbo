import type { ReactNode } from "react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const CustomSheet = ({
  children = <></>,
  content = <></>,
  contentClassName,
  title,
  titleClassName,
}: {
  children?: ReactNode;
  title: string;
  content?: ReactNode;
  contentClassName?: string;
  titleClassName?: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className={titleClassName}>{title}</SheetTitle>
          <SheetDescription className={contentClassName}>
            {content}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
