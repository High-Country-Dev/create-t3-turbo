import type { LabelHTMLAttributes } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import type { CalendarProps } from "@/components/ui/calendar";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import type { DateRange, SelectSingleEventHandler } from "react-day-picker";

import { camelCaseToSpacedTitleCase, classNames } from "@acme/shared";

export interface CustomCalendarProps {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: CalendarProps;
  containerClassName?: string;
  name: string;
  onSelect: SelectSingleEventHandler;
}

const CustomCalendar = ({
  label,
  name,
  labelProps,
  inputProps,
  containerClassName,
  onSelect: onChange,
  selected: value,
}: CustomCalendarProps & CalendarProps) => {
  const { className: labelClassName, ...labelRest } = labelProps ?? {};
  const { className: inputClassName } = inputProps ?? {};
  const usedLabel = label ?? camelCaseToSpacedTitleCase(name ?? "");

  return (
    <div className={containerClassName}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
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
              <span>Pick a date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            {/* TODO */}
            <Calendar
              mode={"single"}
              selected={value}
              onSelect={onChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export { CustomCalendar };
