import { Virtuoso } from "react-virtuoso";
import { Box, Spinner, Text } from "../../../../components";
import { usePositions } from "./use-positions";
import { ListItem } from "../../../../components/atoms/list/list-item";
import { apyToPercentage, formatTokenBalance } from "../../../../utils";
import { TokenIcon } from "../../../../components/atoms/token-icon";
import { useTranslation } from "react-i18next";
import {
  claimRewardsContainer,
  messageContainer,
  virtuosoContainer,
} from "./style.css";
import BigNumber from "bignumber.js";
import { useSKWallet } from "../../../../hooks/use-sk-wallet";
import { SKLink } from "../../../../components/atoms/link";

export const Positions = () => {
  const { tableData, isLoading } = usePositions();

  const { isConnected } = useSKWallet();

  const { t } = useTranslation();

  return (
    <Box display="flex" justifyContent="center" flex={1}>
      {isLoading && (
        <Box className={messageContainer}>
          <Box display="flex">
            <Spinner />
          </Box>
        </Box>
      )}

      {!isConnected ? (
        <Box className={messageContainer}>
          <Text variant={{ weight: "medium", size: "small" }}>
            {t("positions.connect_wallet")}
          </Text>
        </Box>
      ) : !tableData?.length && !isLoading ? (
        <Box className={messageContainer}>
          <Text variant={{ weight: "medium", size: "small" }}>
            {t("positions.no_current_positions")}
          </Text>
        </Box>
      ) : null}

      {!!tableData?.length && (
        <Virtuoso
          className={virtuosoContainer}
          style={{ height: "auto" }}
          data={tableData}
          itemContent={(_index, item) => {
            const amount = new BigNumber(item.balanceData.amount);

            const hasRewards = item.balanceData.pendingActions.some(
              (a) => a.type === "CLAIM_REWARDS"
            );

            return (
              <SKLink
                relative="path"
                to={`../positions/${item.metaData.integrationId}`}
              >
                <Box my="2">
                  <ListItem>
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <TokenIcon
                        metadata={item.integrationData.metadata}
                        token={item.balanceData.token}
                      />

                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="flex-start"
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          gap="1"
                        >
                          <Text variant={{ size: "small" }}>
                            {item.balanceData.token.symbol}
                          </Text>

                          {hasRewards && (
                            <Box className={claimRewardsContainer}>
                              <Text variant={{ size: "xsmall", type: "white" }}>
                                {t("positions.claim_rewards")}
                              </Text>
                            </Box>
                          )}
                        </Box>
                        <Text
                          variant={{
                            size: "small",
                            type: "muted",
                            weight: "normal",
                          }}
                        >
                          {t("positions.via", {
                            providerName:
                              item.integrationData.metadata.provider?.name,
                          })}
                        </Text>
                      </Box>
                    </Box>

                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="flex-end"
                      flexDirection="column"
                    >
                      <Text variant={{ size: "small", weight: "normal" }}>
                        {apyToPercentage(item.integrationData.apy)}%
                      </Text>
                      {item.balanceData.amount && (
                        <Text
                          variant={{
                            size: "small",
                            weight: "normal",
                            type: "muted",
                          }}
                        >
                          {formatTokenBalance(amount, 6)}{" "}
                          {item.balanceData.token.symbol}
                        </Text>
                      )}
                    </Box>
                  </ListItem>
                </Box>
              </SKLink>
            );
          }}
        />
      )}
    </Box>
  );
};
