import { forwardRef, InputHTMLAttributes } from "react";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  boxSize?: "small" | "medium" | "large";
  textSize?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "black";
  label?: React.ReactNode;
  description?: React.ReactNode;
  active?: boolean;
  block?: boolean;
  loading?: boolean;
  iconPrefix?: React.ReactNode;
  iconSuffix?: React.ReactNode;
  image?: React.ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      boxSize = "medium",
      textSize = "medium",
      color = "primary",
      label,
      description,
      active = false,
      block = false,
      loading = false,
      iconPrefix,
      iconSuffix,
      image,
      className,
      checked,
      disabled,
      onChange,
      ...rest
    },
    ref
  ) => {
    const boxSizeClasses = {
      small: "w-4 h-4 rounded-sm",
      medium: "w-6 h-6 rounded-lg",
      large: "w-8 h-8 rounded-xl",
    }[boxSize];
    const textSizeClasses = {
      small: "text-[0.625rem]",
      medium: "text-sm",
      large: "text-lg",
    }[textSize];

    const baseClasses = `
      relative flex items-center justify-between
      rounded-2xl overflow-hidden cursor-pointer transition duration-300
      ${disabled ? "opacity-60 cursor-not-allowed" : "hover:opacity-80"}
      ${
        checked || active
          ? `button-bg-${color} shadow-[0_0_0_4px_#F9731640]`
          : "bg-[#F3F3F4]"
      }
    `;

    const mergedClasses = className
      ? `${baseClasses} ${className}`
      : baseClasses;

    return (
      <label className={mergedClasses}>
        {image && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            {image}
          </div>
        )}

        <div className="absolute inset-0 z-10 flex items-center justify-between px-4">
          {iconPrefix && <div className="ml-2">{iconPrefix}</div>}
          <div className="flex flex-col items-end text-right ml-auto">
            {label && (
              <p className={`peyda-semibold ${textSizeClasses} leading-none`}>{label}</p>
            )}
            {description && (
              <span className="text-xs text-gray-500 mt-1">{description}</span>
            )}
          </div>
          {iconSuffix && <div className="mr-2">{iconSuffix}</div>}

          <div
            className={`flex justify-center items-center border-2 transition-all ${
              checked || active
                ? "border-white"
                : color === "black"
                ? "border-black"
                : "border-gray-600"
            } ${boxSizeClasses}`}
          >
            {checked && (
              <div
                className={`${
                  color === "black" ? "bg-black" : "bg-primary"
                } rounded-sm w-1/2 h-1/2`}
              ></div>
            )}
          </div>
        </div>

        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
          className="absolute opacity-0 inset-0 cursor-pointer"
          {...rest}
        />
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
