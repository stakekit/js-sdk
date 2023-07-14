import { Box, Divider, Heading, Text } from "../../components";
import { TokenIcon } from "../../components/atoms/token-icon";
import {
  divider,
  mainContainer,
  tableGrid,
  topTableContainer,
} from "./styles.css";
import { usePositions } from "./use-positions";
import { useTranslation } from "react-i18next";
import { apyToPercentage } from "../../utils";
import BigNumber from "bignumber.js";
import { Fragment } from "react";

export const Positions = () => {
  const { tableData, dataMap } = usePositions();

  const { t } = useTranslation();

  if (!tableData?.length || !dataMap?.size) return null;

  return (
    <Box px="8" id="sk-positions">
      <Box
        display={{ mobile: "none", tablet: "block" }}
        background="positionsSectionBackgroundColor"
        mx="8"
        my="4"
        px="4"
        py="4"
        marginLeft="auto"
        marginRight="auto"
        className={mainContainer}
      >
        <Box marginBottom="8">
          <Heading variant={{ level: "h3" }}>{t("positions.title")}</Heading>
        </Box>

        <Box className={topTableContainer}>
          <Box className={tableGrid}>
            <Text variant={{ type: "muted", size: "small" }}>Token</Text>
            <Text variant={{ type: "muted", size: "small" }}>Staked</Text>
            <Text variant={{ type: "muted", size: "small" }}>APR</Text>
          </Box>

          <Divider className={divider} />

          {tableData.map((val, index) => {
            const opData = dataMap.get(val.integrationId);

            if (!opData || !val.balances.length) return null;

            return (
              <Fragment key={index}>
                <Box className={tableGrid}>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <TokenIcon metadata={opData.metadata} token={val.token} />

                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Text variant={{ size: "small" }}>
                        {opData.metadata.name}
                      </Text>
                      <Text variant={{ size: "small", type: "muted" }}>
                        {t("positions.via", {
                          providerName: opData.metadata.provider?.name,
                        })}
                      </Text>
                    </Box>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Text variant={{ size: "small" }}>
                      {new BigNumber(val.amount).toFixed(2).toString()}{" "}
                      {val.token.symbol}
                    </Text>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Text variant={{ size: "small" }}>
                      {apyToPercentage(opData.apy)}%
                    </Text>
                  </Box>
                </Box>

                {tableData.length - 1 !== index && (
                  <Divider className={divider} />
                )}
              </Fragment>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
