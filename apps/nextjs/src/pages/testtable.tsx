import React from "react";
import { z } from "zod";

import { CustomTable } from "~/components/InputField/CustomTable";

const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

const TestTable = () => {
  const headers = ["Invoice", "Status", "Payment Method", "Amount"];
  const contents = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      totalAmount: "$250.00",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      paymentMethod: "PayPal",
      totalAmount: "$150.00",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      paymentMethod: "Bank Transfer",
      totalAmount: "$350.00",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      totalAmount: "$450.00",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      paymentMethod: "PayPal",
      totalAmount: "$550.00",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      paymentMethod: "Bank Transfer",
      totalAmount: "$200.00",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      paymentMethod: "Credit Card",
      totalAmount: "$300.00",
    },
  ];

  return (
    <div className="mt-50 m-auto max-w-[600px] pt-[50px] ">
      <CustomTable
        containerClassName="bg-blue-100"
        caption="A list of your recent invoices."
        contents={contents}
        headers={headers}
      ></CustomTable>
    </div>
  );
};

export default TestTable;
