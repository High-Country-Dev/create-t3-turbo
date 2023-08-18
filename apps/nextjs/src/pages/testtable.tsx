import React from "react";
import { z } from "zod";

import { CustomTable, HeaderData } from "~/components/InputField/CustomTable";

const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

const handleHeaderClick = () => {
  // Handle the header click logic here
  alert("Clicked");
};

const TestTable = () => {
  const headers: HeaderData[] = [
    {
      label: "Invoice",
      dataType: "string",
      tooltip: "Sort by Invoice",
      clickable: true,
      onClick: handleHeaderClick,
    },
    {
      label: "Status",
      dataType: "string",
      tooltip: "Sort by Status",
      clickable: false,
    },
    {
      label: "Payment Method",
      dataType: "string",
      tooltip: "Sort by Payment Method",
      clickable: false,
    },
    {
      label: "Amount",
      dataType: "number",
      tooltip: "Sort by Amount",
      clickable: false,
    },
    {
      label: "Date",
      dataType: "number",
      tooltip: "Sort by Amount",
      clickable: false,
    },
  ];

  const contents = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      totalAmount: "$250.00",
      date: "August 18, 2023",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      paymentMethod: "PayPal",
      totalAmount: "$150.00",
      date: new Date(),
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      paymentMethod: "Bank Transfer",
      totalAmount: "$350.00",
      date: new Date(),
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      totalAmount: "$450.00",
      date: new Date(),
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      paymentMethod: "PayPal",
      totalAmount: "$550.00",
      date: new Date(),
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      paymentMethod: "Bank Transfer",
      totalAmount: "$200.00",
      date: new Date(),
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      paymentMethod: "Credit Card",
      totalAmount: "$300.00",
      date: "",
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
