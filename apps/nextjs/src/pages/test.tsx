import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ControlledCalendar } from "~/components/ControlledFields/ControlledCalendar";
import { ControlledCheckbox } from "~/components/ControlledFields/ControlledCheckbox";
import { ControlledTextField } from "~/components/ControlledFields/ControlledTextField";

const FormSchema = z.object({
  inputText: z.string().min(10),
  checkbox: z.boolean(),
  calendar: z.date(),
});

const Test = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      inputText: "",
      checkbox: undefined,
      calendar: undefined,
    },
  });
  const { control, watch, handleSubmit } = form;
  const inputText = watch("inputText");
  const checkbox = watch("checkbox");
  const calendar = watch("calendar");

  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <div className="flex flex-row items-start justify-center gap-2">
        <div className="flex w-[600px] flex-col gap-3">
          <Form {...form}>
            <Label className="text-lg font-bold">Inputs:</Label>
            <ControlledTextField
              control={control}
              name={"inputText"}
              inputProps={{
                placeholder: "Input text here",
              }}
            />
            <ControlledCheckbox control={control} name="checkbox" />
            <ControlledCalendar control={control} name="calendar" />
            <Button onClick={handleSubmit((errors) => console.log({ errors }))}>
              Submit
            </Button>
          </Form>
        </div>
        <div className="flex w-[600px] flex-col gap-3">
          <Label className="text-lg font-bold">Values:</Label>
          <div>{inputText}</div>
          <div>{checkbox.toString()}</div>
          <div>{calendar?.toString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Test;
