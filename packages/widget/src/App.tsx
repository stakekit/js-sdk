import "./polyfills";
import "@rainbow-me/rainbowkit/styles.css";
import "./styles/theme/global.css";
import "./translation";
import ReactDOM from "react-dom/client";
import { ComponentProps } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useToggleTheme } from "./hooks";
import { container } from "./style.css";
import { CompletePage, StepsPage, ReviewPage, Layout, Details } from "./pages";
import { useAppState } from "./state";
import { Box } from "./components";
import { useWebViewConnectMachine } from "./hooks/use-webview-connect-machine";
import { useLocationTransitionAnimation } from "./hooks/use-location-transition-animation";
import { Positions } from "./pages/positions";
import { Providers } from "./providers";
import {
  SettingsContextProvider,
  SettingsContextType,
} from "./providers/settings";
import classNames from "classnames";

const Widget = () => {
  useToggleTheme();

  const { selectedStake, stakeAmount } = useAppState();

  const isDetailsComplete = selectedStake
    .chain(() => stakeAmount.map((a) => !a.isZero() && !a.isNaN()))
    .extractNullable();

  useWebViewConnectMachine();

  const { displayLocation, transitionClassName, onAnimationEnd } =
    useLocationTransitionAnimation();

  return (
    <Box
      background="background"
      className={classNames([container, transitionClassName])}
      onAnimationEnd={onAnimationEnd}
    >
      <Routes location={displayLocation}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Details />} />
          {isDetailsComplete ? (
            <>
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/steps" element={<StepsPage />} />
              <Route path="/complete" element={<CompletePage />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Box>
  );
};

export const SKApp = ({
  withPositions = true,
  ...rest
}: {
  withPositions?: boolean;
} & SettingsContextType) => {
  return (
    <SettingsContextProvider {...rest}>
      <Providers>
        <Widget />
        {withPositions && <Positions />}
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
