import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";

import type { CustomCalendarProps } from "../InputField/CustomCalendar";
import { CustomCalendar } from "../InputField/CustomCalendar";

export const ControlledCalendar = <T extends FieldValues>({
  name,
  ...props
}: {
  name: Path<T>;
} & Omit<CustomCalendarProps, "onSelect" | "selected">) => {
  const { control } = useFormContext();
  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { value, onChange, ...fieldRest } }) => {
        return (
          <FormItem>
            <FormLabel />
            <CustomCalendar
              selected={value}
              onSelect={onChange}
              {...fieldRest}
              {...props}
            />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
