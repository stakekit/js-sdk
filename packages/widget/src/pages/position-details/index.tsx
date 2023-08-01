import {
  Box,
  Button,
  Divider,
  Heading,
  NumberInput,
  Spinner,
  Text,
} from "../../components";
import { TokenIcon } from "../../components/atoms/token-icon";
import { PageContainer } from "../components";
import { usePositionDetails } from "./use-position-details";
import { Image } from "../../components/atoms/image";
import { ImageFallback } from "../../components/atoms/image-fallback";
import { Trans, useTranslation } from "react-i18next";
import { HelpModal } from "../../components/molecules/help-modal";
import { apyToPercentage, formatTokenBalance } from "../../utils";
import BigNumber from "bignumber.js";
import { pressAnimation } from "../../components/atoms/button/styles.css";

export const PositionDetails = () => {
  const positionDetails = usePositionDetails();

  const {
    isLoading,
    position,
    balance,
    stakeType,
    stakedPrice,
    rewardsBalance,
    rewardsPrice,
    claimAvailableRewards,
    unstakeText,
    hasUnstakeAction,
    onUnstakeAmountChange,
    unstakeAmount,
    unstakeFormattedAmount,
    canChangeAmount,
    onMaxClick,
    onUnstakeClick,
    onStakeExitIsLoading,
    error,
    unstakeDisabled,
    onClaimClick,
    onClaimIsLoading,
  } = positionDetails;

  const { t } = useTranslation();

  return (
    <PageContainer>
      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Spinner />
        </Box>
      )}

      {!isLoading &&
        position
          .chain((p) => balance.map((b) => ({ b, p })))
          .chain((val) => stakeType.map((st) => ({ ...val, st })))
          .chain((val) => stakedPrice.map((sp) => ({ ...val, sp })))
          .map(({ p, b, st, sp }) => (
            <Box flex={1} display="flex" flexDirection="column">
              <Box display="flex" justifyContent="center" alignItems="center">
                <TokenIcon
                  metadata={p.integrationData.metadata}
                  token={p.integrationData.token}
                  tokenLogoHw="14"
                />
              </Box>
              <Box
                marginTop="3"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Heading variant={{ level: "h4" }}>
                  {p.integrationData.metadata.name}
                </Heading>
                <Text variant={{ type: "muted" }}>
                  {p.integrationData.token.symbol}
                </Text>
              </Box>

              <Box display="flex" flexDirection="column" marginTop="6">
                <Divider />

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    my="1"
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Image
                      hw="8"
                      marginRight="1"
                      src={p.integrationData.metadata.provider?.logoURI}
                      fallback={
                        <Box marginRight="1">
                          <ImageFallback
                            name={
                              p.integrationData.metadata.provider?.name ?? ""
                            }
                            tokenLogoHw="5"
                            textVariant={{
                              size: "small",
                              type: "white",
                              weight: "bold",
                            }}
                          />
                        </Box>
                      }
                    />
                    <Text variant={{ size: "small" }}>
                      {st}{" "}
                      {t("position_details.via", {
                        providerName: p.integrationData.metadata.provider?.name,
                      })}
                    </Text>
                  </Box>

                  <HelpModal type={p.integrationData.config.type} />
                </Box>

                <Divider />
              </Box>

              <Box py="3" gap="1" display="flex" flexDirection="column">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text variant={{ weight: "normal" }}>APR</Text>
                  <Text variant={{ type: "muted", weight: "normal" }}>
                    {apyToPercentage(p.integrationData.apy)}%
                  </Text>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text variant={{ weight: "normal" }}>{st}</Text>
                  <Text variant={{ type: "muted", weight: "normal" }}>
                    {formatTokenBalance(new BigNumber(b.amount ?? 0), 6)}{" "}
                    {b.token.symbol} (${formatTokenBalance(sp, 2)})
                  </Text>
                </Box>

                {rewardsBalance
                  .chain((rb) => rewardsPrice.map((rp) => ({ rb, rp })))
                  .map(({ rb, rp }) => (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text variant={{ weight: "normal" }}>
                        {t("position_details.rewards")}
                      </Text>
                      <Text variant={{ type: "muted", weight: "normal" }}>
                        {formatTokenBalance(new BigNumber(rb.amount ?? 0), 6)}{" "}
                        {rb.token.symbol} (${formatTokenBalance(rp, 2)})
                      </Text>
                    </Box>
                  ))
                  .extractNullable()}
              </Box>

              {error && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  marginBottom="6"
                >
                  <Text variant={{ type: "danger" }}>
                    {t("shared.something_went_wrong")}
                  </Text>
                </Box>
              )}

              <Box
                display="flex"
                flex={1}
                justifyContent="flex-end"
                flexDirection="column"
                marginTop="10"
              >
                {rewardsBalance
                  .chain((rb) =>
                    claimAvailableRewards.map((claim) => ({ rb, claim }))
                  )
                  .map(({ rb }) => (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      px="3"
                      py="3"
                      borderRadius="2xl"
                      borderColor="backgroundMuted"
                      borderWidth={1}
                      borderStyle="solid"
                    >
                      <Box flex={2}>
                        <Text variant={{ weight: "normal" }}>
                          <Trans
                            i18nKey="position_details.available_to_claim"
                            values={{
                              amount: formatTokenBalance(
                                new BigNumber(rb.amount ?? 0),
                                6
                              ),
                              symbol: rb.token.symbol,
                            }}
                            components={{
                              bold: (
                                <Box
                                  as="span"
                                  fontWeight="bold"
                                  display="block"
                                />
                              ),
                            }}
                          />
                        </Text>
                      </Box>

                      {onClaimIsLoading && (
                        <Box marginRight="2" display="flex">
                          <Spinner />
                        </Box>
                      )}
                      <Box flex={1} maxWidth="24">
                        <Button
                          onClick={onClaimClick}
                          variant={{ size: "small" }}
                          disabled={onClaimIsLoading}
                        >
                          {t("position_details.claim")}
                        </Button>
                      </Box>
                    </Box>
                  ))
                  .extractNullable()}
                {hasUnstakeAction
                  .chain(() => balance.map((b) => ({ b })))
                  .chain((val) => unstakeText.map((ut) => ({ ...val, ut })))
                  .chain((val) =>
                    canChangeAmount.map((cca) => ({ ...val, cca }))
                  )
                  .map(({ b, ut, cca }) => (
                    <Box
                      background="stakeSectionBackground"
                      borderRadius="xl"
                      marginTop="2"
                      py="4"
                      px="4"
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box
                          minWidth="0"
                          display="flex"
                          marginRight="2"
                          flex={1}
                        >
                          <NumberInput
                            onChange={onUnstakeAmountChange}
                            value={unstakeAmount}
                            disabled={!cca}
                          />
                        </Box>

                        {onStakeExitIsLoading && (
                          <Box marginRight="2" display="flex">
                            <Spinner />
                          </Box>
                        )}

                        <Box
                          flex={1}
                          maxWidth="24"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Button
                            onClick={onUnstakeClick}
                            disabled={unstakeDisabled}
                            variant={{
                              size: "small",
                              color: unstakeDisabled ? "disabled" : "primary",
                            }}
                          >
                            {ut}
                          </Button>
                        </Box>
                      </Box>

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        marginTop="2"
                        flexWrap="wrap"
                      >
                        <Box flex={1}>
                          <Text
                            variant={{
                              size: "small",
                              type: "muted",
                              weight: "normal",
                            }}
                          >
                            {unstakeFormattedAmount}
                          </Text>
                        </Box>

                        <Box
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                        >
                          <Text
                            variant={{
                              size: "small",
                              weight: "normal",
                            }}
                          >
                            {`${formatTokenBalance(
                              new BigNumber(b.amount ?? 0),
                              6
                            )} ${b.token.symbol} ${t(
                              "position_details.available"
                            )}`}
                          </Text>
                          {cca && (
                            <Box
                              as="button"
                              borderRadius="xl"
                              background="background"
                              px="2"
                              py="1"
                              marginLeft="2"
                              onClick={onMaxClick}
                              className={pressAnimation}
                            >
                              <Text
                                variant={{
                                  size: "small",
                                  weight: "semibold",
                                  type: "accent",
                                }}
                              >
                                {t("shared.max")}
                              </Text>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))
                  .extractNullable()}
              </Box>
            </Box>
          ))
          .extractNullable()}
    </PageContainer>
  );
};
