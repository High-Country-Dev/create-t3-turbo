import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ControlledTextField } from "~/components/ControlledFields/ControlledTextField";
import { CustomAlertDialog } from "~/components/InputField/CustomAlertDialog";
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

  const cancelButton = {
    label: "Cancel",
    onClick: () => alert("cancel"),
  };
  const continueButton = {
    label: "Continue",
    onClick: () => alert("continue"),
  };
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const alertDialogDescription =
    "This action cannot be undone. This will permanently delete your " +
    "account and remove your data from our servers.";
  return (
    <div className="mt-50 m-auto pt-[50px] ">
      <Button onClick={() => setOpenAlert(true)}>Open Alert Dialog</Button>
      <CustomAlertDialog
        open={openAlert}
        onOpenChange={setOpenAlert}
        title="Are you absolutely sure?"
        description={alertDialogDescription}
        contentClassName="flex flex-col items-center justify-center"
        cancelButton={cancelButton}
        confirmButton={continueButton}
      ></CustomAlertDialog>

      {/* CustomDialog */}
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
