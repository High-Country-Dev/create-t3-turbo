import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { ControlledTextField } from "~/components/ControlledFields/ControlledTextField";
import { CustomDialog } from "~/components/InputField/CustomDialog";

const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

const Dialog = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const [open, setOpen] = useState(false);
  const Button1 = () => {
    return (
      <Button
        onClick={form.handleSubmit(() => alert("complete"))}
        className="mt-10"
      >
        Save Changes
      </Button>
    );
  };

  return (
    <div className="mt-50 m-auto pt-[50px] ">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <CustomDialog
        open={open}
        onOpenChange={setOpen}
        modal={true}
        title="Dialog Title"
        contentClassName="flex flex-col items-center justify-center"
        footerButtons={[
          {
            label: "OK",
            onClick: () => alert("test"),
            className: "w-[50px]",
          },
          {
            label: "GOOD",
            onClick: () => alert("test"),
            className: "w-[100px]",
            variant: "outline",
          },
        ]}
      >
        <div className="w-[300px]">
          <Form {...form}>
            <ControlledTextField name="firstName" />
            <ControlledTextField name="lastName" />
            <ControlledTextField name="email" />
          </Form>
        </div>
      </CustomDialog>
    </div>
  );
};

export default Dialog;
