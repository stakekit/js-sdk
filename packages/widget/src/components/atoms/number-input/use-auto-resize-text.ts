import { RefObject, useEffect } from "react";
import { usePrevious } from "../../../hooks/use-previous";
import { vars } from "../../../styles";
import { initialFontSizeVar } from "./styles.css";

export const useAutoResizeText = ({
  inputVal,
  inputRef,
  spanRef,
}: {
  inputVal: string;
  inputRef: RefObject<HTMLInputElement>;
  spanRef: RefObject<HTMLSpanElement>;
}) => {
  const prevVal = usePrevious(inputVal);

  useEffect(() => {
    if (
      !inputRef.current ||
      !spanRef.current ||
      !prevVal ||
      inputVal.length === prevVal.length
    ) {
      return;
    }

    const newFontSize = scale({
      inputEl: inputRef.current,
      spanEl: spanRef.current,
    });

    inputRef.current.style.fontSize = `${newFontSize}px`;
    spanRef.current.style.fontSize = `${newFontSize}px`;
  }, [inputRef, inputVal, prevVal, spanRef]);
};

const scale = ({
  inputEl,
  spanEl,
}: {
  inputEl: HTMLInputElement;
  spanEl: HTMLSpanElement;
}) => {
  if (typeof window === "undefined") return null;

  const currentInputWidth = inputEl.offsetWidth;

  const descendingFontSizes = getDescendingFontSizes(inputEl);

  let currentFontSize = parseFloat(window.getComputedStyle(spanEl).fontSize);

  for (const fs of descendingFontSizes) {
    spanEl.style.fontSize = `${fs}px`;
    if (spanEl.offsetWidth < currentInputWidth) {
      currentFontSize = fs;
      break;
    }
  }

  return currentFontSize;
};

const convertRemToPixels = (rem: number) =>
  rem *
  parseFloat(
    typeof window === "undefined"
      ? "0"
      : getComputedStyle(document.documentElement).fontSize
  );

const getDescendingFontSizes = (el: HTMLElement) =>
  [
    initialFontSizeVar,
    vars.fontSize["2xl"],
    vars.fontSize.xl,
    vars.fontSize.lgx,
    vars.fontSize.lg,
  ].map((fs) =>
    convertRemToPixels(
      parseFloat(
        window
          .getComputedStyle(el)
          .getPropertyValue(fs.replace(/(var\()|(\))/g, ""))
      )
    )
  );
