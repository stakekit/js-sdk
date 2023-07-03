import { vars } from "../../../styles";

export const XIcon = (props: { color?: keyof (typeof vars)["color"] }) => (
  <svg
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m18.75 5.25-13.5 13.5M18.75 18.75 5.25 5.25"
      stroke={props.color ? vars.color[props.color] : vars.color.textMuted}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
