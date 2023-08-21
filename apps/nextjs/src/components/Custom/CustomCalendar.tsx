import type { LabelHTMLAttributes } from "react";
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { CalendarProps } from "@/components/ui/calendar";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type {
  DayPickerMultipleProps,
  DayPickerRangeProps,
  DayPickerSingleProps,
} from "react-day-picker";

import { camelCaseToSpacedTitleCase, classNames } from "@acme/shared";

export type CustomCalendarProps = {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: CalendarProps;
  containerClassName?: string;
  name: string;
  selected: Date | Date[] | undefined;
  onSelect?:
    | Omit<DayPickerSingleProps["onSelect"], "value">
    | Omit<DayPickerMultipleProps["onSelect"], "value">
    | Omit<DayPickerRangeProps["onSelect"], "value">;
} & CalendarProps;

const CustomCalendar = ({
  label,
  name,
  labelProps,
  inputProps,
  containerClassName,
  onSelect: onChange,
  selected: value,
  mode = "multiple",
}: CustomCalendarProps) => {
  const { className: labelClassName, ...labelRest } = labelProps ?? {};
  const { className: inputClassName } = inputProps ?? {};
  const usedLabel = label ?? camelCaseToSpacedTitleCase(name ?? "");
  const valueToString = useMemo(() => {
    if (!value) return undefined;
    if (Array.isArray(value))
      return value.map((a) => format(a as Date, "PPP")).join(" - ");
    if (value instanceof Date) return format(value, "PPP");
    return "";
  }, [value]);

  return (
    <div className={cn(containerClassName, "mt-1")}>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name" className={labelClassName} {...labelRest}>
          {usedLabel}
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={classNames(
                "text-muted-foreground w-[280px] justify-start text-left font-normal",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {valueToString ? valueToString : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            {/* TODO */}
            <Calendar
              className={inputClassName}
              mode={mode}
              selected={value}
              initialFocus
              //@ts-ignore
              onSelect={onChange}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export { CustomCalendar };
