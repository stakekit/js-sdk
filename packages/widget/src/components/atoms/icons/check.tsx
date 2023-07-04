import { vars } from "../../../styles";

export const CheckIcon = (props: { color?: string; hw?: number }) => (
  <svg
    width={props.hw ?? 24}
    height={props.hw ?? 24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
  >
    <path
      d="M27 9 13 23l-7-7"
      stroke={props.color ?? vars.color.text}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
