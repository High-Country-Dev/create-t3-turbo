import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";

import type { TextFieldProps } from "../Custom/CustomTextField";
import { CustomTextField } from "../Custom/CustomTextField";

export const ControlledTextField = <T extends FieldValues>({
  name,
  ...props
}: {
  name: Path<T>;
} & Omit<TextFieldProps, "onChange" | "value">) => {
  const { control } = useFormContext();
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
