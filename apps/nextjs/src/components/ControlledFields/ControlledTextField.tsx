import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";

import type { TextFieldProps } from "../InputField/CustomTextField";
import { CustomTextField } from "../InputField/CustomTextField";

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  ...props
}: {
  control: Control<T>;
  name: Path<T>;
} & Omit<TextFieldProps, "onChange" | "value">) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <FormItem>
            <FormLabel />
            <CustomTextField
              {...props}
              name={name}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
