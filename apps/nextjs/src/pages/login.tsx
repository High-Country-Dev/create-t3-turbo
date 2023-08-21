import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ControlledCalendar } from "~/components/ControlledFields/ControlledCalendar";
import { ControlledCheckbox } from "~/components/ControlledFields/ControlledCheckbox";
import { ControlledComboBox } from "~/components/ControlledFields/ControlledComboBox";
import { ControlledRadioGroup } from "~/components/ControlledFields/ControlledRadioGroup";
import { ControlledSelect } from "~/components/ControlledFields/ControlledSelect";
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
  emailNotif: z.boolean(),
  city: z.string(),
  dateOfBirth: z.date(),
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
      city: "",
      dateOfBirth: undefined,
      emailNotif: false,
    },
  });

  return (
    <div className="mt-50 m-auto flex max-w-[600px] flex-col gap-3 pt-[50px]">
      <Form {...form}>
        <ControlledTextField name="firstName" />
        <ControlledCalendar name="dateOfBirth" mode="single" />
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
        <ControlledSelect
          name="city"
          options={[
            {
              value: "QC",
              label: "Quezon City",
            },
            {
              value: "M",
              label: "Manila",
            },
          ]}
        />
        <ControlledSlider name="age" step={1} max={50} />
        <ControlledCheckbox name="emailNotif" label="Email Notifications" />
        <ControlledSwitch name="notifications" />
        <Button onClick={form.handleSubmit(() => alert())} className="mt-5">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
