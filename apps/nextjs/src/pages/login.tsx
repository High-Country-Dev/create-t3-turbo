import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ControlledComboBox } from "~/components/ControlledFields/ControlledComboBox";
import { ControlledRadioGroup } from "~/components/ControlledFields/ControlledRadioGroup";
import { ControlledSlider } from "~/components/ControlledFields/ControlledSlider";
import { ControlledSwitch } from "~/components/ControlledFields/ControlledSwitch";
import { ControlledTextField } from "~/components/ControlledFields/ControlledTextField";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  firstName: z.string().min(5),
  lastName: z.string().min(5),
  country: z.string().min(5),
  gender: z.string(),
  age: z.number().array(),
  notifications: z.boolean(),
});

const Login = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      country: "",
      gender: "",
      age: [0],
      notifications: false,
    },
  });

  return (
    <div className="mt-50 m-auto max-w-[600px] pt-[50px]">
      <Form {...form}>
        <ControlledTextField name="firstName" />
        <ControlledTextField name="lastName" />
        <ControlledTextField name="email" />
        <ControlledTextField name="password" />
        <ControlledComboBox
          name="country"
          options={[
            {
              value: "PH",
              label: "PH",
            },
            {
              value: "US",
              label: "US",
            },
            {
              value: "JPN",
              label: "JPN",
            },
          ]}
        />
        <ControlledRadioGroup
          name="gender"
          options={[
            {
              value: "Male",
              label: "Male",
            },
            {
              value: "Female",
              label: "Female",
            },
          ]}
          inputProps={{
            className: "flex flex-row",
          }}
        />
        <ControlledSlider name="age" step={1} max={50} />
        <ControlledSwitch name="notifications" />
        <Button onClick={form.handleSubmit(() => alert())} className="mt-5">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
