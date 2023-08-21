import React from "react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";

import type { CustomRadioGroupProps } from "../Custom/CustomRadioGroup";
import { CustomRadioGroup } from "../Custom/CustomRadioGroup";

export const ControlledRadioGroup = <T extends FieldValues>({
  name,
  options,
  ...rest
}: {
  name: Path<T>;
} & Omit<CustomRadioGroupProps, "onChange" | "value">) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...fieldRest } }) => {
        return (
          <FormItem>
            <CustomRadioGroup
              {...fieldRest}
              {...rest}
              options={options}
              value={value}
              onChange={onChange}
            />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
