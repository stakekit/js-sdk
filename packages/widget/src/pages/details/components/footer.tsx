import { useTranslation } from "react-i18next";
import {
  ArrowsLeftRightIcon,
  Box,
  ClockClockWiseIcon,
  GifIcon,
  Text,
} from "../../../components";

type FooterProps = {
  description: string | null;
};

export const Footer = ({ description }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <Box
      background="backgroundMuted"
      px="6"
      py="6"
      gap="3"
      display="flex"
      flexDirection="column"
    >
      {description && (
        <Box display="flex" alignItems="center">
          <Box hw="4" marginRight="2">
            <ArrowsLeftRightIcon />
          </Box>
          <Text
            variant={{
              type: "muted",
              size: "xsmall",
            }}
          >
            {description}
          </Text>
        </Box>
      )}

      <Box display="flex" alignItems="center">
        <Box hw="4" marginRight="2">
          <ClockClockWiseIcon />
        </Box>
        <Text
          variant={{
            type: "muted",
            size: "xsmall",
          }}
        >
          {t("details.info_2")}
        </Text>
      </Box>

      <Box display="flex" alignItems="center">
        <Box hw="4" marginRight="2">
          <GifIcon />
        </Box>
        <Text
          variant={{
            type: "muted",
            size: "xsmall",
          }}
        >
          {t("details.info_3")}
        </Text>
      </Box>
    </Box>
  );
};
