import { Networks } from "@stakekit/common";
import BigNumber from "bignumber.js";

export const formatTokenBalance = (amount: BigNumber, decimals: number) => {
  return amount.decimalPlaces(decimals).toString();
};

export const apyToPercentage = (apy: number) => {
  return (apy * 100).toFixed(2);
};

const colorsTuple = ["#6B69D6", "#F1C40F", "#1ABC9C", "#E74C3C"];

export const getBackgroundColor = (stringInput: string) => {
  const char = stringInput.charCodeAt(0);

  return colorsTuple[char % colorsTuple.length] ?? colorsTuple[0];
};

export const isRNWebViewContext = () =>
  typeof window !== "undefined" && !!window.ReactNativeWebView;

export const waitForSec = (sec: number) =>
  new Promise((res) => setTimeout(res, sec * 1000));

export const isIframe = () =>
  typeof window !== "undefined" && window.self !== window.top;

export const isLedgerDappBrowserProvider = (() => {
  let state: boolean | null = null;

  return (): boolean => {
    if (typeof state === "boolean") return state;
    if (typeof window === "undefined") return false;

    try {
      const params = new URLSearchParams(window.self.location.search);
      const isEmbed = !!params.get("embed");

      state = isIframe() && isEmbed;
    } catch (error) {
      state = false;
    } finally {
      return !!state;
    }
  };
})();

export const getNetworkLogo = (network: Networks) =>
  `https://raw.githubusercontent.com/stakekit/assets/main/networks/${network}.svg`;
