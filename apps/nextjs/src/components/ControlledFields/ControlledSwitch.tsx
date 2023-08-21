import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";

import type { CustomSwitchProps } from "../Custom/CustomSwitch";
import { CustomSwitch } from "../Custom/CustomSwitch";

export const ControlledSwitch = <T extends FieldValues>({
  name,
  ...props
}: {
  name: Path<T>;
} & Omit<CustomSwitchProps, "checked" | "onCheckedChange">) => {
  const { control } = useFormContext();
  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { value, onChange, ...fieldRest } }) => {
        return (
          <FormItem>
            <FormLabel />
            <CustomSwitch
              {...props}
              {...fieldRest}
              onCheckedChange={onChange}
              checked={value}
              name={name}
            />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
