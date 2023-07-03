import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fadeIn, fadeOut } from "./style.css";
import { config } from "../../config";

const transitions = {
  fadeIn,
  fadeOut,
};

export const useLocationTransitionAnimation = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] =
    useState<keyof typeof transitions>("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage("fadeOut");
  }, [location, displayLocation]);

  const onAnimationEnd = useCallback(() => {
    if (transitionStage === "fadeOut") {
      setTransitionStage("fadeIn");
      setDisplayLocation(location);
    }
  }, [location, transitionStage]);

  return {
    displayLocation: config.isTestMode ? location : displayLocation,
    onAnimationEnd,
    transitionClassName:
      transitionStage === "fadeIn" ? transitions.fadeIn : transitions.fadeOut,
  };
};
