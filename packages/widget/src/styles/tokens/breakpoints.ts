export const breakpoints = {
  mobile: 0,
  tablet: 520,
  // desktop: 1280,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const minMediaQuery = (breakpoint: Breakpoint) =>
  `screen and (min-width: ${breakpoints[breakpoint]}px)`;

export const maxMediaQuery = (breakpoint: Breakpoint) =>
  `screen and (max-width: ${breakpoints[breakpoint] - 1}px)`;
