import { vars } from "../../../styles";

export const CircleNotchIcon = () => (
  <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx={16} cy={16} r={12} stroke="silver" strokeWidth={2} />
    <path
      d="M28 16A12 12 0 1 1 14.59 4.083"
      stroke={vars.color.text}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);
