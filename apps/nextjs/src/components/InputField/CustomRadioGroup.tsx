import type {
  ChangeEvent,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { camelCaseToSpacedTitleCase } from "@acme/shared";

export interface CustomRadioGroupProps {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  containerClassName?: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
    <div className={containerClassName}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name" className={labelClassName} {...labelRest}>
          {usedLabel}
        </Label>
        <RadioGroup
          onChange={onChange}
          defaultValue={value}
          className={inputClassName}
        >
          {options.map((option) => (
            <div className="flex items-center space-x-2" key={option.value}>
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor="option-two">{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};
