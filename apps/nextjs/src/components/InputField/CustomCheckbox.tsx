import type { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { CheckedState } from "@radix-ui/react-checkbox";

import { camelCaseToSpacedTitleCase, classNames } from "@acme/shared";

export interface CheckboxProps {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  containerClassName?: string;
  name: string;
  onChange: (checked: CheckedState) => void;
  value: boolean;
}

export const CustomCheckbox = ({
  name,
  label,
  labelProps,
  inputProps,
  containerClassName,
  onChange,
  value,
}: CheckboxProps) => {
  const { className: labelClassName, ...labelRest } = labelProps ?? {};
  const { className: inputClassName } = inputProps ?? {};
  const usedLabel = label ?? camelCaseToSpacedTitleCase(name ?? "");

  return (
    <div className={containerClassName}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name" className={labelClassName} {...labelRest}>
          {usedLabel}
        </Label>

        <Checkbox
          name={name}
          checked={value}
          onCheckedChange={onChange}
          className={classNames(
            inputClassName,
            "rounded-sm border border-black",
          )}
        />
      </div>
    </div>
  );
};
