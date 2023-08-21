import React from "react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";

import { CustomSelect } from "../Custom/CustomSelect";
import type { CustomSelectProps } from "../Custom/CustomSelect";

export const ControlledSelect = <T extends FieldValues>({
  name,
  options,
}: {
  name: Path<T>;
} & Omit<CustomSelectProps, "onChange" | "value">) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...fieldRest } }) => {
        return (
          <FormItem>
            <CustomSelect
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
