import type { ReactNode } from "react";
import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const CustomHoverCard = ({
  children = <></>,
  content = <></>,
  contentClassName,
}: {
  children?: ReactNode;
  content?: ReactNode;
  contentClassName?: string;
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className={contentClassName}>
        {content}
      </HoverCardContent>
    </HoverCard>
  );
};
