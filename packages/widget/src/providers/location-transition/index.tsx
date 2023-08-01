import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Location, useLocation } from "react-router-dom";
import { fadeIn, fadeOut } from "./style.css";
import { config } from "../../config";

const transitions = {
  fadeIn,
  fadeOut,
};

const LocationTransitionContext = createContext<
  | {
      location: Location;
      displayLocation: Location;
      onAnimationEnd: () => void;
      transitionClassName: string;
    }
  | undefined
>(undefined);

export const LocationTransitionProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] =
    useState<keyof typeof transitions>("fadeIn");

  if (location !== displayLocation && transitionStage !== "fadeOut") {
    setTransitionStage("fadeOut");
  }

  const onAnimationEnd = useCallback(() => {
    if (transitionStage === "fadeOut") {
      setTransitionStage("fadeIn");
      setDisplayLocation(location);
    }
  }, [location, transitionStage]);

  const value = useMemo(
    () => ({
      location,
      displayLocation: config.isTestMode ? location : displayLocation,
      onAnimationEnd,
      transitionClassName:
        transitionStage === "fadeIn" ? transitions.fadeIn : transitions.fadeOut,
    }),
    [displayLocation, location, onAnimationEnd, transitionStage]
  );

  return (
    <LocationTransitionContext.Provider value={value}>
      {children}
    </LocationTransitionContext.Provider>
  );
};

export const useLocationTransition = () => {
  const value = useContext(LocationTransitionContext);

  if (value === undefined) {
    throw new Error(
      "useLocationTransition must be used within a LocationTransitionProvider"
    );
  }

  return value;
};
