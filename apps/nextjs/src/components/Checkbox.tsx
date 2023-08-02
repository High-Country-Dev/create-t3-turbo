import type { InputHTMLAttributes, LabelHTMLAttributes } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { camelCaseToSpacedTitleCase, classNames } from '@acme/shared'

export const Checkbox = <T extends FieldValues>({
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
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>
  containerClassName?: string
}) => {
  const { className: labelClassName, ...labelRest } = labelProps ?? {}
  const { className: inputClassName, ...inputRest } = inputProps ?? {}
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
              type='checkbox'
              className={classNames(
                'mt-1 block h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-700 focus:ring-offset-gray-900',
                inputClassName,
              )}
              onChange={onChange}
              {...inputRest}
              {...fieldRest}
              value={value ?? ''}
              checked={value}
            />
          </div>
        )
      }}
    />
  )
}
