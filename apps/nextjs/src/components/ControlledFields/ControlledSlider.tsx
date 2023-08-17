import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";

import { CustomSlider } from "../InputField/CustomSlider";
import type { CustomSliderProps } from "../InputField/CustomSlider";

export const ControlledSlider = <T extends FieldValues>({
  name,
  ...props
}: {
  name: Path<T>;
} & Omit<CustomSliderProps, "onChange" | "value" | "onValueChange">) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...fieldRest } }) => {
        return (
          <FormItem>
            <FormLabel />
            <CustomSlider
              value={value}
              {...fieldRest}
              {...props}
              onValueChange={onChange}
            />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
