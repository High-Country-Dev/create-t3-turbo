import React from "react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";

import type { CustomRadioGroupProps } from "../InputField/CustomRadioGroup";
import { CustomRadioGroup } from "../InputField/CustomRadioGroup";

export const ControlledRadioGroup = <T extends FieldValues>({
  control,
  name,
  options,
  ...rest
}: {
  control: Control<T>;
  name: Path<T>;
} & Omit<CustomRadioGroupProps, "onChange" | "value">) => {
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
