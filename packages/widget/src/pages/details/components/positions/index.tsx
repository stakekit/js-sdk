import { Virtuoso } from "react-virtuoso";
import { Box, Spinner, Text } from "../../../../components";
import { usePositions } from "./use-positions";
import { ListItem } from "../../../../components/atoms/list/list-item";
import { apyToPercentage } from "../../../../utils";
import { TokenIcon } from "../../../../components/atoms/token-icon";
import { useTranslation } from "react-i18next";
import { messageContainer, virtuosoContainer } from "./style.css";
import BigNumber from "bignumber.js";
import { useSKWallet } from "../../../../hooks/use-sk-wallet";

export const Positions = () => {
  const { dataMap, tableData, isLoading } = usePositions();

  const { isConnected } = useSKWallet();

  const { t } = useTranslation();

  console.log({
    tableData,
    dataMap,
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop="2"
      flex={1}
    >
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

      {tableData?.length && dataMap?.size && (
        <Virtuoso
          className={virtuosoContainer}
          data={tableData}
          itemContent={(_index, item) => {
            const opData = dataMap.get(item.integrationId);

            if (!opData || !item.balances.length) return null;

            const amount = new BigNumber(item.amount);

            return (
              <Box my="2">
                <ListItem>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <TokenIcon metadata={opData.metadata} token={item.token} />

                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Text variant={{ size: "small" }}>
                        {item.token.symbol}
                      </Text>
                      <Text
                        variant={{
                          size: "xsmall",
                          type: "muted",
                          weight: "normal",
                        }}
                      >
                        {t("positions.via", {
                          providerName: opData.metadata.provider?.name,
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
                      {apyToPercentage(opData.apy)}%
                    </Text>
                    {item.amount && (
                      <Text
                        variant={{
                          size: "xsmall",
                          weight: "normal",
                          type: "muted",
                        }}
                      >
                        {amount.isEqualTo(0) ? 0 : amount.toFixed(6).toString()}{" "}
                        {item.token.symbol}
                      </Text>
                    )}
                  </Box>
                </ListItem>
              </Box>
            );
          }}
        />
      )}
    </Box>
  );
};
