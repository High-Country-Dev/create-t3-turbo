import type {
  ChangeEvent,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { camelCaseToSpacedTitleCase, classNames } from "@acme/shared";

export interface TextFieldProps {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  containerClassName?: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const CustomTextField = ({
  label,
  value,
  name,
  labelProps,
  inputProps,
  containerClassName,
  onChange,
}: TextFieldProps) => {
  const usedLabel = label ?? camelCaseToSpacedTitleCase(name ?? "");
  const { className: labelClassName, ...labelRest } = labelProps ?? {};
  const { className: inputClassName, type, ...inputRest } = inputProps ?? {};

  return (
    <div className={containerClassName}>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name" className={labelClassName} {...labelRest}>
          {usedLabel}
        </Label>
        <Input
          id={name}
          type={type ?? "text"}
          className={classNames(
            "mt-1 block w-full rounded-md border-0 px-2 py-1.5 shadow-sm sm:text-sm sm:leading-6",
            "text-gray-900 shadow-sm placeholder:text-gray-400",
            "ring-1 ring-inset ring-gray-300",
            "focus:ring-2 focus:ring-inset focus:ring-green-700",
            inputClassName,
          )}
          onChange={onChange}
          {...inputRest}
          value={value ?? ""}
        />
      </div>
    </div>
  );
};
