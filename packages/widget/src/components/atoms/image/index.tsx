import {
  HTMLProps,
  ReactNode,
  isValidElement,
  useEffect,
  useState,
} from "react";
import { BoxProps } from "../box";
import { Box } from "../box";

export type ImageProps = Omit<BoxProps, "as"> & {
  fallback?: string | ReactNode;
};

export const Image = ({ fallback, ...props }: ImageProps) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [props.src]);

  const onError: HTMLProps<HTMLImageElement>["onError"] = (e) => {
    setIsError(true);
    props.onError?.(e);
  };

  if (isError && isValidElement(fallback)) {
    return fallback;
  }

  return <Box {...props} as="img" onError={onError} />;
};
