import type { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import React from "react";
import { FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { camelCaseToSpacedTitleCase } from "@acme/shared";

type SelectProps = React.ComponentProps<typeof Select>;
interface AdditionalProps {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  containerClassName?: string;
  name: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
}

export type CustomSelectProps = SelectProps & AdditionalProps;

export const CustomSelect = ({
  label,
  name,
  onChange,
  value,
  inputProps,
  labelProps,
  options,
  containerClassName,
}: CustomSelectProps) => {
  const usedLabel = label ?? camelCaseToSpacedTitleCase(name ?? "");
  const { className: labelClassName, ...labelRest } = labelProps ?? {};
  const { className: inputClassName } = inputProps ?? {};

  return (
    <div className={cn(containerClassName, "mt-1")}>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name" className={labelClassName} {...labelRest}>
          {usedLabel}
        </Label>
        <div className={inputClassName}>
          <Select onValueChange={onChange} defaultValue={value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
