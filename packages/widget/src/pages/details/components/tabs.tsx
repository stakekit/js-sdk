import { Box, Text } from "../../../components";
import { useTranslation } from "react-i18next";
import { pressAnimation } from "../../../components/atoms/button/styles.css";
import classNames from "classnames";
import { rewardsDot, tab } from "./styles.css";

export type TabsProps = {
  selectedTab: "earn" | "positions";
  onTabPress: (selected: "earn" | "positions") => void;
  hasPendingRewards: boolean;
};

export const Tabs = ({
  selectedTab,
  onTabPress,
  hasPendingRewards,
}: TabsProps) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box
        className={classNames([pressAnimation, tab])}
        onClick={() => onTabPress("earn")}
        px="1"
        py="2"
      >
        <Text
          variant={{
            size: "small",
            type: selectedTab === "earn" ? "regular" : "muted",
          }}
        >
          {t("details.tab_earn")}
        </Text>
      </Box>

      <Box
        className={classNames([pressAnimation, tab])}
        onClick={() => onTabPress("positions")}
        px="1"
        py="2"
      >
        <Box position="relative">
          <Text
            variant={{
              size: "small",
              type: selectedTab === "positions" ? "regular" : "muted",
            }}
          >
            {t("details.tab_positions")}
          </Text>
          {hasPendingRewards && (
            <Box
              borderRadius="full"
              width="1"
              height="1"
              background="positionsClaimRewardsBackground"
              className={rewardsDot}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
