import { useTranslation } from "react-i18next";
import { Box, Button, Heading, Spinner, Text, XIcon } from "../../components";
import { PageContainer } from "../components";
import { useSteps } from "./use-steps";
import { CheckSteps } from "../../components/atoms/icons/check-steps";
import {
  halfOpacityAfter,
  stepsAfter,
  stepsAfterMuted,
  stepsBefore,
  stepsBeforeMuted,
} from "./styles.css";
import cls from "classnames";

export const StepsPage = () => {
  const { state, onClick } = useSteps();

  const { t } = useTranslation();

  return (
    <PageContainer>
      <Box marginBottom="2">
        <Heading variant={{ level: "h4" }}>{t("steps.title")}</Heading>
      </Box>

      <Box flex={1}>
        <Box
          background="backgroundMuted"
          flexDirection="column"
          display="flex"
          px="4"
          py="4"
          borderRadius="xl"
        >
          <Box display="flex">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginRight="3"
              className={cls({
                [stepsAfter]: true,
                [halfOpacityAfter]: !state.sign.isSuccess,
                [stepsAfterMuted]: !state.sign.isSuccess,
              })}
            >
              <Box
                background="text"
                borderRadius="half"
                hw="10"
                borderWidth={3}
                borderColor="text"
                borderStyle="solid"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {state.sign.isLoading ? (
                  <Spinner variant={{ color: "inverted" }} />
                ) : state.sign.isError ? (
                  <XIcon color="background" />
                ) : (
                  <CheckSteps hw={18} />
                )}
              </Box>
            </Box>

            <Box
              flexDirection="column"
              display="flex"
              alignItems="flex-start"
              gap="1"
            >
              <Text variant={{ size: "small" }}>{t("steps.approve")}</Text>
              {state.sign.isError ? (
                <Text variant={{ type: "danger", size: "small" }}>
                  {t("shared.something_went_wrong")}
                </Text>
              ) : (
                <Text
                  variant={{ type: "muted", size: "small", weight: "normal" }}
                >
                  {t("steps.approve_desc")}
                </Text>
              )}
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            opacity={state.sign.isSuccess ? 1 : 0.5}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginRight="3"
              className={cls({
                [stepsAfter]: true,
                [stepsBefore]: true,
                [stepsAfterMuted]: !state.sign.isSuccess,
                [stepsBeforeMuted]: !state.sign.isSuccess,
              })}
            >
              <Box
                background={state.sign.isSuccess ? "text" : "white"}
                borderColor={state.sign.isSuccess ? "text" : "textMuted"}
                borderRadius="half"
                hw="10"
                borderWidth={3}
                borderStyle="solid"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {state.sign.isSuccess && <CheckSteps hw={18} />}
              </Box>
            </Box>

            <Box
              flexDirection="column"
              display="flex"
              alignItems="flex-start"
              gap="1"
            >
              <Text variant={{ size: "small" }}>{t("steps.submitted")}</Text>
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            opacity={
              state.checkTxStatus.isLoading ||
              state.checkTxStatus.isSuccess ||
              state.checkTxStatus.isError
                ? 1
                : 0.5
            }
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginRight="3"
              className={cls({
                [stepsAfter]: true,
                [stepsBefore]: true,
                [stepsAfterMuted]: !state.checkTxStatus.isSuccess,
                [halfOpacityAfter]:
                  state.checkTxStatus.isLoading || state.checkTxStatus.isError,
                [stepsBeforeMuted]: !state.sign.isSuccess,
              })}
            >
              <Box
                background={
                  state.checkTxStatus.isLoading ||
                  state.checkTxStatus.isSuccess ||
                  state.checkTxStatus.isError
                    ? "text"
                    : "white"
                }
                borderColor={
                  state.checkTxStatus.isLoading ||
                  state.checkTxStatus.isSuccess ||
                  state.checkTxStatus.isError
                    ? "text"
                    : "textMuted"
                }
                borderRadius="half"
                borderWidth={3}
                borderStyle="solid"
                hw="10"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {state.checkTxStatus.isLoading ? (
                  <Spinner variant={{ color: "inverted" }} />
                ) : state.checkTxStatus.isError ? (
                  <XIcon color="white" />
                ) : (
                  <CheckSteps hw={18} />
                )}
              </Box>
            </Box>

            <Box
              flexDirection="column"
              display="flex"
              alignItems="flex-start"
              gap="1"
            >
              <Text variant={{ size: "small" }}>{t("steps.pending")}</Text>
              {state.checkTxStatus.isError && (
                <Text variant={{ type: "danger", size: "small" }}>
                  {t("shared.something_went_wrong")}
                </Text>
              )}
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            opacity={state.checkTxStatus.isSuccess ? 1 : 0.5}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginRight="3"
              paddingBottom="2"
              className={cls({
                [stepsBefore]: true,
                [stepsBeforeMuted]: !state.checkTxStatus.isSuccess,
              })}
            >
              <Box
                background={state.checkTxStatus.isSuccess ? "text" : "white"}
                borderColor={
                  state.checkTxStatus.isSuccess ? "text" : "textMuted"
                }
                borderWidth={3}
                borderStyle="solid"
                borderRadius="half"
                hw="10"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <CheckSteps hw={18} />
              </Box>
            </Box>

            <Box
              flexDirection="column"
              display="flex"
              alignItems="flex-start"
              gap="1"
            >
              <Text variant={{ size: "small" }}>{t("steps.completed")}</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      {!state.checkTxStatus.isLoading && state.checkTxStatus.isError && (
        <Box my="4">
          <Button onClick={state.checkTxStatus.retry}>
            {t("shared.retry")}
          </Button>
        </Box>
      )}

      {!state.sign.isLoading && state.sign.isError && (
        <Box my="4">
          <Button onClick={state.sign.retry}>{t("shared.retry")}</Button>
        </Box>
      )}

      <Box display="flex" alignItems="flex-end">
        <Button onClick={onClick} variant={{ color: "secondary" }}>
          {t("shared.cancel")}
        </Button>
      </Box>
    </PageContainer>
  );
};
