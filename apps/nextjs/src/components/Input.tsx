import type { InputHTMLAttributes, LabelHTMLAttributes } from 'react'
import type { Control, FieldValues, Path, PathValue } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { camelCaseToSpacedTitleCase, classNames } from '@acme/shared'

export const Input = <T extends FieldValues>({
  control,
  name,
  label,
  labelProps,
  inputProps,
  containerClassName,
}: {
  control: Control<T>
  name: Path<T>
  label?: string
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  containerClassName?: string
}) => {
  const { className: labelClassName, ...labelRest } = labelProps ?? {}
  const { className: inputClassName, type, ...inputRest } = inputProps ?? {}
  const usedLabel = label ?? camelCaseToSpacedTitleCase(name ?? '')
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...fieldRest } }) => {
        return (
          <div className={containerClassName}>
            <label
              htmlFor={name}
              {...labelRest}
              className={`block text-sm font-medium leading-6 text-white ${labelClassName}`}
            >
              {usedLabel}
            </label>
            <input
              id={name}
              type={type ?? 'text'}
              className={classNames(
                'mt-1 block w-full rounded-md border-0 py-1.5 shadow-sm sm:text-sm sm:leading-6',
                'text-gray-900 shadow-sm placeholder:text-gray-400',
                'ring-1 ring-inset ring-gray-300',
                'focus:ring-2 focus:ring-inset focus:ring-green-700',
                inputClassName,
              )}
              onChange={(event) =>
                onChange(
                  (type === 'number'
                    ? parseInt(event.target.value)
                    : event.target.value) as PathValue<T, Path<T>>,
                )
              }
              {...inputRest}
              {...fieldRest}
              value={value ?? ''}
            />
          </div>
        )
      }}
    />
  )
}
