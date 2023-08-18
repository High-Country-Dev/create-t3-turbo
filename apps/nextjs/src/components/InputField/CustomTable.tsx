import React, { MouseEventHandler, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

export interface HeaderData {
  label: string;
  dataType: string;
  clickable: boolean;
  tooltip: string;
  onClick?: MouseEventHandler<HTMLTableCellElement>;
}

export interface CustomTable {
  headers: HeaderData[];
  caption: string;
  contents: Record<string, string | number | Date>[];
  containerClassName: string;
}

export const CustomTable = ({
  caption,
  headers,
  contents,
  containerClassName,
}: CustomTable) => {
  return (
    <div className={containerClassName}>
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index: number) => (
              <TableHead
                key={index}
                className={`font-medium ${
                  index === headers.length - 1 ? "text-right" : ""
                }`}
                onClick={header.clickable ? header.onClick : () => {}}
                title={header.tooltip}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {contents.map((content, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.entries(content).map(([propKey, value], columnIndex) => (
                <TableCell
                  key={columnIndex}
                  className={`font-medium ${
                    columnIndex === Object.keys(content).length - 1
                      ? "text-right"
                      : ""
                  }`}
                >
                  {value instanceof Date
                    ? format(value, "MMMM dd, yyyy")
                    : value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
