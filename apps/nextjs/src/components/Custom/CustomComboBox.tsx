import type { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";

import { camelCaseToSpacedTitleCase } from "@acme/shared";

export interface CustomComboBoxProps {
  value: string;
  onChange: (value?: string) => void;
  options: { value: string; label: string }[];

  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  containerClassName?: string;
  name: string;
  emptyLabel?: string;
}
export const CustomComboBox = ({
  options,
  value,
  onChange,
  label,
  name,
  labelProps,
  inputProps,
  containerClassName,
  emptyLabel = "No Results Found",
}: CustomComboBoxProps) => {
  const { className: labelClassName, ...labelRest } = labelProps ?? {};
  const { className: inputClassName } = inputProps ?? {};
  const usedLabel = label ?? camelCaseToSpacedTitleCase(name ?? "");

  const placeholder = inputProps?.placeholder ?? "Select...";

  return (
    <div className={cn(containerClassName, "mt-1")}>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name" className={labelClassName} {...labelRest}>
          {usedLabel}
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "mt-1 justify-between",
                  value && "text-muted-foreground",
                )}
              >
                {value
                  ? options.find((item) => item.value === value)?.label
                  : placeholder}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command className={inputClassName}>
              <CommandInput placeholder={placeholder} className="h-9" />
              <CommandEmpty>{emptyLabel}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    value={option.label}
                    key={option.value}
                    onSelect={() => {
                      onChange(option.value);
                    }}
                  >
                    {option.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
