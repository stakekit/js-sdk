import "./polyfills";
import "@rainbow-me/rainbowkit/styles.css";
import "./styles/theme/global.css";
import "./translation";
import ReactDOM from "react-dom/client";
import { ComponentProps } from "react";
import { Location, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useToggleTheme } from "./hooks";
import { container } from "./style.css";
import {
  ReviewPage,
  Layout,
  Details,
  PositionsPage,
  EarnPage,
  StakeStepsPage,
  UnstakeOrClaimStepsPage,
  UnstakeOrClaimCompletePage,
  StakeCompletePage,
} from "./pages";
import { Box } from "./components";
import { useWebViewConnectMachine } from "./hooks/use-webview-connect-machine";
import { Providers } from "./providers";
import {
  SettingsContextProvider,
  SettingsContextType,
} from "./providers/settings";
import classNames from "classnames";
import { PositionDetails } from "./pages/position-details";
import { useLocationTransition } from "./providers/location-transition";
import { UnstakeOrClaimReviewPage } from "./pages/unstake-or-claim-review";
import { UnstakeOrClaimContextProvider } from "./state/unstake";
import { StakeCheck } from "./pages/cheks/stake-check";
import { UnstakeOrClaimCheck } from "./pages/cheks/unstake-or-claim-check";

const Widget = () => {
  useToggleTheme();

  useWebViewConnectMachine();

  const { location, displayLocation, transitionClassName, onAnimationEnd } =
    useLocationTransition();

  return (
    <Box
      background="background"
      className={classNames([
        container,
        shouldAnimate(displayLocation, location) && transitionClassName,
      ])}
      onAnimationEnd={onAnimationEnd}
    >
      <Routes location={displayLocation}>
        <Route element={<Layout />}>
          <Route element={<Details />}>
            <Route index element={<EarnPage />} />
            <Route path="positions" element={<PositionsPage />} />
          </Route>

          <Route element={<StakeCheck />}>
            <Route path="review" element={<ReviewPage />} />
            <Route path="steps" element={<StakeStepsPage />} />
            <Route path="complete" element={<StakeCompletePage />} />
          </Route>

          <Route
            element={
              <UnstakeOrClaimContextProvider>
                <Outlet />
              </UnstakeOrClaimContextProvider>
            }
          >
            <Route
              path="positions/:integrationId"
              element={<PositionDetails />}
            />
            <Route
              path="unstake/:integrationId"
              element={<UnstakeOrClaimCheck />}
            >
              <Route path="review" element={<UnstakeOrClaimReviewPage />} />
              <Route path="steps" element={<UnstakeOrClaimStepsPage />} />
              <Route path="complete" element={<UnstakeOrClaimCompletePage />} />
            </Route>

            <Route
              path="claim/:integrationId"
              element={<UnstakeOrClaimCheck />}
            >
              <Route path="review" element={<UnstakeOrClaimReviewPage />} />
              <Route path="steps" element={<UnstakeOrClaimStepsPage />} />
              <Route path="complete" element={<UnstakeOrClaimCompletePage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Box>
  );
};

export const SKApp = (props: SettingsContextType) => {
  return (
    <SettingsContextProvider {...props}>
      <Providers>
        <Widget />
      </Providers>
    </SettingsContextProvider>
  );
};

export const renderSKWidget = ({
  container,
  ...rest
}: ComponentProps<typeof SKApp> & {
  container: Parameters<typeof ReactDOM.createRoot>[0];
}) => {
  if (!rest.apiKey) throw new Error("API key is required");

  const root = ReactDOM.createRoot(container);
  root.render(<SKApp {...rest} />);
};

const shouldAnimate = (prevLocation: Location, nextLocation: Location) => {
  return (
    (nextLocation.pathname !== "/" && nextLocation.pathname !== "/positions") ||
    (prevLocation.pathname !== "/" &&
      prevLocation.pathname !== "/positions" &&
      (nextLocation.pathname === "/" || nextLocation.pathname === "/positions"))
  );
};
