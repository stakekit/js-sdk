import { Box, Text } from "../../../components";
import { useTranslation } from "react-i18next";
import { pressAnimation } from "../../../components/atoms/button/styles.css";
import classNames from "classnames";
import { tab } from "./styles.css";

export type TabsProps = {
  selectedTab: "earn" | "positions";
  onTabPress: (selected: "earn" | "positions") => void;
};

export const Tabs = ({ selectedTab, onTabPress }: TabsProps) => {
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
            size: "xsmall",
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
        <Text
          variant={{
            size: "xsmall",
            type: selectedTab === "positions" ? "regular" : "muted",
          }}
        >
          {t("details.tab_positions")}
        </Text>
      </Box>
    </Box>
  );
};
