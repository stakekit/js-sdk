import { Button } from "../../components/atoms/button";
import { Text } from "../../components/atoms/typography";
import { Box } from "../../components/atoms/box";
import { Divider } from "../../components/atoms/divider";
import { PageContainer } from "../components";
import { useTranslation } from "react-i18next";
import { NumberInput, Spinner } from "../../components";
import { useDetails } from "./use-details";
import { Footer } from "./components/footer";
import { RewardTokenDetails } from "../../components/molecules/reward-token-details";
import { SelectOpportunity } from "./components/select-opportunity";
import { SelectValidator } from "./components/select-validator";
import { pressAnimation } from "../../components/atoms/button/styles.css";
import { HelpModal } from "../../components/molecules/help-modal";

export const Details = () => {
  const {
    availableTokens,
    formattedPrice,
    selectedStakeData,
    onItemSelect,
    selectedStake,
    onStakeAmountChange,
    estimatedRewards,
    symbol,
    yieldType,
    onMaxClick,
    stakeAmount,
    isBellowLimit,
    isOverLimit,
    accountBalanceIsFetching,
    buttonDisabled,
    onClick,
    buttonText,
    footerItems,
    onSearch,
    validators,
    onValidatorSelect,
    selectedValidator,
    isError,
    rewardToken,
    onSelectOpportunityClose,
    onStakeEnterIsLoading,
    selectedStakeYieldType,
    isFetching,
  } = useDetails();

  const { t } = useTranslation();

  const earnYearly = estimatedRewards.mapOrDefault(
    (e) => `${e.yearly} ${symbol}`,
    ""
  );
  const earnMonthly = estimatedRewards.mapOrDefault(
    (e) => `${e.monthly} ${symbol}`,
    ""
  );
  const earnPercentage = estimatedRewards.mapOrDefault(
    (e) => `${e.percentage}%`,
    ""
  );

  const title = yieldType;

  return (
    <>
      <PageContainer>
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Text variant={{ size: "xsmall" }}>{title}</Text>
              {isFetching && (
                <Box display="flex" marginLeft="2">
                  <Spinner />
                </Box>
              )}
            </Box>

            {selectedStakeYieldType && (
              <HelpModal type={selectedStakeYieldType} />
            )}
          </Box>

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
              <Box minWidth="0" display="flex" marginRight="2" flex={1}>
                <NumberInput
                  onChange={onStakeAmountChange}
                  value={stakeAmount}
                />
              </Box>

              <Box display="flex" justifyContent="center" alignItems="center">
                <SelectOpportunity
                  onItemSelect={onItemSelect}
                  onSearch={onSearch}
                  selectedStake={selectedStake}
                  selectedStakeData={selectedStakeData}
                  onSelectOpportunityClose={onSelectOpportunityClose}
                />
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
                  variant={{ size: "xsmall", type: "muted", weight: "normal" }}
                >
                  {formattedPrice}
                </Text>
              </Box>

              <Box display="flex" justifyContent="flex-end" alignItems="center">
                {accountBalanceIsFetching ? (
                  <Spinner />
                ) : (
                  <Text
                    variant={{
                      size: "xsmall",
                      type: isBellowLimit || isOverLimit ? "danger" : "muted",
                      weight: "normal",
                    }}
                  >
                    {availableTokens
                      ? `${availableTokens} ${t("shared.available")}`
                      : ""}
                  </Text>
                )}
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
                      size: "xsmall",
                      weight: "semibold",
                      type: "accent",
                    }}
                  >
                    {t("shared.max")}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>

          <SelectValidator
            onValidatorSelect={onValidatorSelect}
            selectedValidator={selectedValidator}
            validators={validators}
          />

          <Box display="flex" flexDirection="column" gap="1">
            <RewardTokenDetails rewardToken={rewardToken} />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginTop="3"
              data-testid="estimated-reward__percent"
            >
              <Text variant={{ size: "small" }}>
                {t("details.estimated_reward")}
              </Text>
              <Text variant={{ size: "small" }}>{earnPercentage}</Text>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              data-testid="estimated-reward__yearly"
            >
              <Text
                variant={{ size: "xsmall", type: "muted", weight: "normal" }}
              >
                {t("shared.yearly")}
              </Text>
              <Text
                variant={{ size: "xsmall", type: "muted", weight: "normal" }}
              >
                {earnYearly}
              </Text>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              data-testid="estimated-reward__monthly"
            >
              <Text
                variant={{ size: "xsmall", type: "muted", weight: "normal" }}
              >
                {t("shared.monthly")}
              </Text>
              <Text
                variant={{ size: "xsmall", type: "muted", weight: "normal" }}
              >
                {earnMonthly}
              </Text>
            </Box>
          </Box>
        </Box>

        <Divider my="4" />

        {isError && (
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
          flex={1}
          display="flex"
          justifyContent="flex-end"
          flexDirection="column"
        >
          <Button
            disabled={buttonDisabled}
            isLoading={onStakeEnterIsLoading}
            onClick={onClick}
            variant={{
              color:
                buttonDisabled || onStakeEnterIsLoading
                  ? "disabled"
                  : "primary",
              animation: "press",
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </PageContainer>

      <Footer {...footerItems} />
    </>
  );
};
