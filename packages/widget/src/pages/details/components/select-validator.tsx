import { Maybe } from "purify-ts";
import {
  Box,
  CaretDownIcon,
  Divider,
  SelectModal,
  SelectModalItem,
  SelectModalItemContainer,
  Text,
} from "../../../components";
import { Trigger } from "@radix-ui/react-alert-dialog";
import { Image } from "../../../components/atoms/image";
import { useTranslation } from "react-i18next";
import { apyToPercentage } from "../../../utils";
import { breakWord, modalItemNameContainer, tokenLogo } from "../style.css";
import { Virtuoso } from "react-virtuoso";
import { ValidatorDto } from "@stakekit/api-hooks";
import { triggerStyles, validatorVirtuosoContainer } from "./styles.css";
import { ImageFallback } from "../../../components/atoms/image-fallback";

export const SelectValidator = ({
  validators,
  selectedValidator,
  onValidatorSelect,
}: {
  validators: ValidatorDto[] | undefined;
  selectedValidator: Maybe<ValidatorDto>;
  onValidatorSelect: (item: ValidatorDto) => void;
}) => {
  const { t } = useTranslation();

  return Maybe.fromNullable(validators)
    .chain((v) => selectedValidator.map((sv) => ({ v, sv })))
    .map(({ sv, v }) => {
      return (
        <SelectModal
          title={t("details.validator_search_title")}
          trigger={
            <Trigger disabled={!v.length} className={triggerStyles}>
              <Box display="flex">
                <Box flex={1}>
                  <Box
                    marginRight="2"
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                    marginTop="3"
                  >
                    <Image
                      hw="5"
                      marginRight="2"
                      src={sv.image}
                      className={tokenLogo}
                      fallback={
                        <Box marginRight="1">
                          <ImageFallback
                            name={sv.name}
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
                    <Text
                      className={breakWord}
                      variant={{ weight: "bold", size: "small" }}
                    >
                      {t("details.staked_via", {
                        validator: sv.name,
                      })}
                    </Text>
                    {!!v.length && (
                      <Box marginLeft="2">
                        <CaretDownIcon />
                      </Box>
                    )}
                  </Box>
                  <Box marginTop="4">
                    <Divider />
                  </Box>
                </Box>
              </Box>
            </Trigger>
          }
        >
          <Virtuoso
            className={validatorVirtuosoContainer}
            data={v}
            itemContent={(_index, item) => {
              return (
                <SelectModalItemContainer>
                  <SelectModalItem onItemClick={() => onValidatorSelect(item)}>
                    <Image
                      hw="9"
                      src={item.image}
                      className={tokenLogo}
                      fallback={
                        <ImageFallback
                          name={item.name}
                          tokenLogoHw="9"
                          textVariant={{
                            size: "small",
                            type: "white",
                            weight: "bold",
                          }}
                        />
                      }
                    />

                    <Box
                      display="flex"
                      flexDirection="column"
                      flex={1}
                      marginLeft="2"
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box className={modalItemNameContainer}>
                          <Text
                            variant={{
                              size: "small",
                              weight: "bold",
                            }}
                          >
                            {item.name}
                          </Text>
                        </Box>

                        {item.apr && (
                          <Box>
                            <Text variant={{ size: "small" }}>
                              {apyToPercentage(item.apr)}%
                            </Text>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </SelectModalItem>
                </SelectModalItemContainer>
              );
            }}
          />
        </SelectModal>
      );
    })
    .extractNullable();
};
