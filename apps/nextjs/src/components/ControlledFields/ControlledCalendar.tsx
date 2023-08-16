import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";

import type { CustomCalendarProps } from "../InputField/CustomCalendar";
import { CustomCalendar } from "../InputField/CustomCalendar";

export const ControlledCalendar = <T extends FieldValues>({
  control,
  name,
}: {
  control: Control<T>;
  name: Path<T>;
} & Omit<CustomCalendarProps, "onSelect" | "selected">) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { value, onChange, ...fieldRest } }) => {
        return (
          <FormItem>
            <FormLabel />
            <CustomCalendar
              {...fieldRest}
              selected={value}
              onSelect={onChange}
            />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
