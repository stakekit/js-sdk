import { vars } from "../../../styles";

export const CheckCircleIcon = ({
  height,
  width,
}: {
  width?: number;
  height?: number;
}) => (
  <svg
    width={width ?? 16}
    height={height ?? 16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      d="M10.75 6.5 7.081 10 5.25 8.25"
      stroke={vars.color.text}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z"
      stroke={vars.color.text}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
