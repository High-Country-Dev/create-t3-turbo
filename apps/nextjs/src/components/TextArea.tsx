import { type LabelHTMLAttributes, type TextareaHTMLAttributes } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

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
      render={({ field, fieldState, formState }) => {
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
                className={`mb-2 block w-full rounded-md border-0 bg-white/10 p-2 py-1.5 text-white shadow-sm ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${inputClassName}`}
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

const camelCaseToSpacedTitleCase = (camelCase: string) =>
  camelCase
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
