import type { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { camelCaseToSpacedTitleCase, classNames } from "@acme/shared";

type SwitchProps = React.ComponentProps<typeof Switch>;

interface AdditionalProps {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  containerClassName?: string;
  name: string;
}

export type CustomSwitchProps = SwitchProps & AdditionalProps;

export const CustomSwitch = ({
  label,
  name,
  labelProps,
  inputProps,
  containerClassName,
  onCheckedChange,
  checked,
  ...props
}: CustomSwitchProps) => {
  const usedLabel = label ?? camelCaseToSpacedTitleCase(name ?? "");
  const { className: labelClassName, ...labelRest } = labelProps ?? {};
  const { className: inputClassName } = inputProps ?? {};

  return (
    <div className={containerClassName}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name" className={labelClassName} {...labelRest}>
          {usedLabel}
        </Label>
        <Switch
          {...props}
          id={name}
          className={classNames(inputClassName)}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
      </div>
    </div>
  );
};
