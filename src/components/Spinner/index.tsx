interface SpinnerProps {
  size?: number | "medium" | "small" | "large";
  borderWidth?: number;
  borderColor?: string;
}

export default function Spinner({
  size = "small",
  borderWidth = typeof size === "number" ? size / 10 : undefined,
  borderColor,
}: SpinnerProps) {
  return (
    <div
      className="block w-8 h-8 rounded-full box-border border-4 border-current border-b-transparent animate-spin"
      style={{
        width: typeof size === "number" ? `${size / 16}rem` : undefined,
        height: typeof size === "number" ? `${size / 16}rem` : undefined,
        borderWidth: typeof borderWidth === "number" ? `${borderWidth / 16}rem` : undefined,
        borderTopColor: borderColor,
        borderLeftColor: borderColor,
        borderRightColor: borderColor,
      }}
    />
  );
}
