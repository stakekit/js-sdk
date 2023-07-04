import { useEffect, useState } from "react";
import { rootSelector } from "../styles";

export const useRootElement = () => {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!document) return;

    setRootElement(document.querySelector(rootSelector) as HTMLElement);
  }, []);

  return rootElement;
};
