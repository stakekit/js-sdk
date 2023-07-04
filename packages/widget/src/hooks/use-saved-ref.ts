import { MutableRefObject, useRef } from "react";

export const useSavedRef = <T>(value: T): Readonly<MutableRefObject<T>> => {
  const savedRef = useRef<T>(value);
  savedRef.current = value;

  return savedRef;
};
