import React from "react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";

import { CustomComboBox } from "../InputField/CustomComboBox";
import type { CustomComboBoxProps } from "../InputField/CustomComboBox";

export const ControlledComboBox = <T extends FieldValues>({
  control,
  name,
  options,
}: {
  control: Control<T>;
  name: Path<T>;
} & Omit<CustomComboBoxProps, "onChange" | "value">) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...fieldRest } }) => {
        return (
          <FormItem>
            <CustomComboBox
              {...fieldRest}
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
