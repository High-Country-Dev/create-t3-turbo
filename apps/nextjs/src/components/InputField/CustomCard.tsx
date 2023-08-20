import type { ReactNode } from "react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CustomCard = ({
  title,
  description,
  children = <></>,
  footer,
  titleClassName,
  descriptionClassName,
  footerClassName,
  className,
}: {
  children?: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  descriptionClassName?: string;
  titleClassName?: string;
  footerClassName?: string;
  className?: string;
}) => {
  return (
    <Card>
      <CardHeader>
        {title && <CardTitle className={titleClassName}>{title}</CardTitle>}
        {description && (
          <CardDescription className={descriptionClassName}>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className={className}>{children}</CardContent>
      {footer && <CardFooter className={footerClassName}>{footer}</CardFooter>}
    </Card>
  );
};
