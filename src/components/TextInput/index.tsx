"use client";

import React, { forwardRef } from "react";

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "prefix" | "suffix"
  > {
  value?: string | number;
  type: "text" | "email" | "password" | "number";
  inputSize?: "small" | "medium" | "large";
  variant?: "default" | "outline" | "transparent";
  color?: "primary" | "secondary";
  radius?: "none" | "small" | "large" | "full";
  iconPrefix?: React.ReactNode;
  iconSuffix?: React.ReactNode;
  error?: string;
}

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value = "",
      type = "text",
      inputSize = "small",
      variant = "default",
      color = "primary",
      radius = "small",
      iconPrefix,
      iconSuffix,
      error,
      className,
      ...props
    },
    ref
  ) => {
    const { placeholder, ...inputProps } = props;

    const baseClasses = `w-full h-[3.5rem] rounded-[0.75rem] ${
      iconPrefix ? "px-12" : "px-6"
    } input-bg-${color} disabled:opacity-50 disabled:cursor-not-allowed focus:outline-4 focus:outline-[#F9731640]`;
    const mergedClasses = className
      ? `${baseClasses} ${className}`
      : baseClasses;

    return (
      <div className="relative h-fit w-full" style={{direction: "ltr"}}>
        {iconPrefix && (
          <div className="absolute top-[50%] -translate-y-[50%] left-3 w-fit h-fit">
            {iconPrefix}
          </div>
        )}
        <input
          value={value}
          type={type}
          data-is-active={!!value}
          ref={ref}
          placeholder={placeholder}
          {...inputProps}
          className={mergedClasses}
        />
        {iconSuffix && (
          <div className="absolute top-[50%] -translate-y-[50%] right-3 w-fit h-fit">
            {iconSuffix}
          </div>
        )}
        {error && (
          <p className="absolute text-secondary text-[10px] -mt-5 ml-12 z-10">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
