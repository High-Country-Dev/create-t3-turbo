import type { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { camelCaseToSpacedTitleCase } from "@acme/shared";

export interface CustomRadioGroupProps {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  containerClassName?: string;
  name: string;
  onChange: (e: string) => void;
  value: string;
  options: { value: string; label: string }[];
}

export const CustomRadioGroup = ({
  label,
  value,
  name,
  labelProps,
  inputProps,
  containerClassName,
  onChange,
  options,
}: CustomRadioGroupProps) => {
  const usedLabel = label ?? camelCaseToSpacedTitleCase(name ?? "");
  const { className: labelClassName, ...labelRest } = labelProps ?? {};
  const { className: inputClassName } = inputProps ?? {};

  return (
    <div className={cn(containerClassName, "mt-1")}>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name" className={labelClassName} {...labelRest}>
          {usedLabel}
        </Label>
        <RadioGroup
          // onChange={(val) => console.log("asdasdas", val)}
          value={value}
          className={inputClassName}
        >
          {options.map((option) => (
            <div className="flex items-center space-x-2" key={option.value}>
              <RadioGroupItem
                value={option.value}
                id={option.value}
                onClick={() => onChange(option.value)}
              />
              <Label htmlFor="option-two">{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
