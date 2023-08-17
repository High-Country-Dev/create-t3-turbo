import React from "react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

import type { CheckboxProps } from "../InputField/CustomCheckbox";
import { CustomCheckbox } from "../InputField/CustomCheckbox";

export const ControlledCheckbox = <T extends FieldValues>({
  name,
}: {
  name: Path<T>;
} & Omit<CheckboxProps, "onChange" | "value">) => {
  const { control } = useFormContext();
  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { value, onChange, ...fieldRest } }) => {
        return (
          <FormItem>
            <CustomCheckbox {...fieldRest} value={value} onChange={onChange} />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
