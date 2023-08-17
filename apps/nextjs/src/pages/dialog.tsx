import React from "react";
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
    <div className="mt-50 m-auto max-w-[600px] pt-[50px] ">
      <CustomDialog
        buttonProps={{
          className: "bg-red-400",
          name: "Edit Profile",
        }}
        contentClassName="sm:max-w-[425px]"
        footer={Button1()}
        title="Dialog Title"
        description="Dialog Description"
      >
        <Form {...form}>
          <ControlledTextField control={form.control} name="firstName" />
          <ControlledTextField control={form.control} name="lastName" />
          <ControlledTextField control={form.control} name="email" />
        </Form>
      </CustomDialog>
    </div>
  );
};

export default Dialog;
