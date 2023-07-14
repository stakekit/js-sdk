import { useCallback, useEffect, useState } from "react";
import { fadeIn, fadeOut } from "./style.css";
import { TabsProps } from "./components/tabs";

const transitions = {
  fadeIn,
  fadeOut,
};

export const useTabTransition = (tab: TabsProps["selectedTab"]) => {
  const [transitioningTab, setTransitioningTab] = useState(tab);
  const [transitionStage, setTransitionStage] =
    useState<keyof typeof transitions>("fadeIn");

  useEffect(() => {
    if (transitioningTab !== tab) setTransitionStage("fadeOut");
  }, [tab, transitioningTab]);

  const onAnimationEnd = useCallback(() => {
    if (transitionStage === "fadeOut") {
      setTransitionStage("fadeIn");
      setTransitioningTab(tab);
    }
  }, [tab, transitionStage]);

  return {
    transitioningTab,
    onAnimationEnd,
    transitionClassName:
      transitionStage === "fadeIn" ? transitions.fadeIn : transitions.fadeOut,
  };
};
