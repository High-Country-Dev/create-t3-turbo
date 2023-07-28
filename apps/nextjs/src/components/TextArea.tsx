import type { LabelHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { camelCaseToSpacedTitleCase } from "@acme/shared";

export const TextArea = <T extends FieldValues>({
  control,
  numberOfLines,
  name,
  label,
  labelProps,
  inputProps,
  containerClassName,
}: {
  control: Control<T>;
  numberOfLines: number;
  name: Path<T>;
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  containerClassName?: string;
}) => {
  const { className: labelClassName, ...labelRest } = labelProps ?? {};
  const { className: inputClassName, ...inputRest } = inputProps ?? {};
  const usedLabel = label ?? camelCaseToSpacedTitleCase(name ?? "");
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <div className={`mb-1 ${containerClassName}`}>
            <label
              htmlFor={name}
              {...labelRest}
              className={`block text-sm font-light leading-6 text-white ${labelClassName}`}
            >
              {usedLabel}
            </label>
            <div className="mt-1">
              <textarea
                id={name}
                className={`mb-2 block w-full rounded-md border-0 bg-white/10 p-2 py-1.5 text-white shadow-sm ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 ${inputClassName}`}
                rows={numberOfLines}
                {...inputRest}
                {...field}
              />
            </div>
          </div>
        );
      }}
    />
  );
};
