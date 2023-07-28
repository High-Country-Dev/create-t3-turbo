import type { SelectHTMLAttributes } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { camelCaseToSpacedTitleCase, classNames } from "@acme/shared";

export const Select = <T extends FieldValues>({
  label,
  name,
  control,
  className,
  options,
  containerClassName,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  options:
    | Record<string, string>
    | string[]
    | { label: string; value: string }[];
  containerClassName?: string;
}) => {
  const usedLabel = label ?? camelCaseToSpacedTitleCase(name ?? "");
  return (
    <div className={classNames("mb-1", containerClassName)}>
      <label
        htmlFor={name}
        className="font-regular block text-sm leading-6 text-white"
      >
        {usedLabel}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const optionsArray = Array.isArray(options)
            ? options
            : Object.values(options);
          return (
            <select
              id={name}
              className={`mb-1 mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6 ${className}`}
              {...field}
              {...props}
            >
              {props.placeholder && (
                <option disabled>{props.placeholder}</option>
              )}
              {optionsArray?.map((o) =>
                typeof o === "string" ? (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ) : (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ),
              )}
            </select>
          );
        }}
      />
    </div>
  );
};
