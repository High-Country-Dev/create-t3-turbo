import React from "react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

import { CustomComboBox } from "../Custom/CustomComboBox";
import type { CustomComboBoxProps } from "../Custom/CustomComboBox";

export const ControlledComboBox = <T extends FieldValues>({
  name,
  options,
}: {
  name: Path<T>;
} & Omit<CustomComboBoxProps, "onChange" | "value">) => {
  const { control } = useFormContext();
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
