import { type FieldsetHTMLAttributes } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

export const Checkboxes = <T extends FieldValues>({
  label,
  name,
  control,
  className,
  options,
  ...props
}: FieldsetHTMLAttributes<HTMLFieldSetElement> & {
  control: Control<T>;
  label: string;
  name: Path<T> | string;
  options: string[] | { label: string; value: string; subLabel?: string }[];
}) => {
  return (
    <fieldset {...props} className={`mb-4 mt-2 ${className}`}>
      <legend className="sr-only">{label}</legend>
      <div className="space-y-2">
        {options.map((o) => {
          let value: string;
          let label: string;
          let subLabel: string | undefined = undefined;
          if (typeof o === "string") {
            value = o;
            label = o;
          } else {
            value = o.value;
            label = o.label;
            subLabel = o.subLabel;
          }
          return (
            <Controller
              key={value}
              control={control}
              name={`${name}.${value}` as Path<T>}
              render={({ field }) => (
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      {...field}
                      id={value}
                      aria-describedby="comments-description"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-white"
                    >
                      {label}
                    </label>{" "}
                    <span id="comments-description" className="text-gray-300">
                      <span className="sr-only">{label} </span>
                      {subLabel}
                    </span>
                  </div>
                </div>
              )}
            />
          );
        })}
      </div>
    </fieldset>
  );
};
