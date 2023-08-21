import type { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

import { camelCaseToSpacedTitleCase, classNames } from "@acme/shared";

type SliderProps = React.ComponentProps<typeof Slider>;
interface AdditionalProps {
  label?: string;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  containerClassName?: string;
  name: string;
  value: number[];
  onValueChange: (val: number[]) => void;
}

export type CustomSliderProps = Omit<SliderProps, "onValuChange"> &
  AdditionalProps;

export const CustomSlider = ({
  label,
  name,
  labelProps,
  inputProps,
  containerClassName,
  onValueChange,
  value,
  step = 1,
  max = 100,
  ...props
}: CustomSliderProps) => {
  const usedLabel = label ?? camelCaseToSpacedTitleCase(name ?? "");
  const { className: labelClassName, ...labelRest } = labelProps ?? {};
  const { className: inputClassName } = inputProps ?? {};

  return (
    <div className={cn(containerClassName, "mt-1")}>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name" className={labelClassName} {...labelRest}>
          {usedLabel}
        </Label>
        <Slider
          id={name}
          className={classNames(inputClassName)}
          onDrag={(e) => console.log(e)}
          value={value || [50]}
          {...props}
          step={step}
          max={max}
          onValueChange={(val: number[]) => onValueChange(val)}
        />
      </div>
    </div>
  );
};
