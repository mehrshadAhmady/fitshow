import React from "react";

interface ProgressionBarProps {
  value: number;
  max?: number;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
  variant?: "default" | "outline" | "glass";
  className?: string;
}

const ProgressionBar: React.FC<ProgressionBarProps> = ({
  value,
  max = 100,
  size = "small",
  color = "primary",
  variant = "default",
  className,
}) => {

  return (
    <div className="w-full h-full bg-[#11121452] rounded-xs">
      <div
        className="mr-auto h-2 bg-primary transition-all duration-700 ease-in-out"
        style={{
          width: `${(value / max) * 100}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressionBar;
