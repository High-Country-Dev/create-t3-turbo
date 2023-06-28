import { type SelectHTMLAttributes } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

export const Select = <T extends FieldValues>({
  label,
  name,
  control,
  className,
  options,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  control: Control<T>;
  label: string;
  name: Path<T>;
  options: string[] | { label: string; value: string }[];
}) => {
  return (
    <div className="mb-1">
      <label
        htmlFor={name}
        className="font-regular block text-sm leading-6 text-white"
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <select
              id={name}
              className={`mb-1 mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
              {...field}
              {...props}
            >
              {props.placeholder && (
                <option disabled>{props.placeholder}</option>
              )}
              {options?.map((o) =>
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
