"use client";

import React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export default function Form({ children, className = "", ...props }: FormProps) {
  return (
    <form
      {...props}
      className={className}
    >
      {children}
    </form>
  );
}
