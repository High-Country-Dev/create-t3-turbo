import type { ReactNode } from "react";
import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export const CustomContextMenu = ({
  children = <></>,
  contentClassName,
  menuClassName,
  menuOptions,
  handleSelectOption,
  optionClassName,
}: {
  children?: ReactNode;
  contentClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
  menuOptions?: { value: string; label: string }[];
  handleSelectOption?: (val: string) => void;
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={menuClassName}>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className={contentClassName}>
        {menuOptions?.map((option) => (
          <ContextMenuItem
            className={optionClassName}
            key={option.value}
            onClick={() => handleSelectOption?.(option.value)}
          >
            {option.label}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};
