import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface CustomTable {
  headers: string[];
  caption: string;
  contents: Record<string, any>;
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
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {contents.map((content: any, rowIndex: number) => (
            <TableRow key={rowIndex}>
              {Object.keys(content).map((propertyKey, columnIndex: number) => (
                <TableCell
                  key={propertyKey}
                  className={`font-medium ${
                    columnIndex === Object.keys(content).length - 1
                      ? "text-right"
                      : ""
                  }`}
                >
                  {content[propertyKey]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
