import { Text } from "../../atoms/typography";
import { Box } from "../../atoms/box";
import { useLocation, useNavigate } from "react-router-dom";
import { CaretDownIcon, CaretLeftIcon, XIcon } from "../../atoms/icons";
import { useTranslation } from "react-i18next";
import { useLogout } from "../../../hooks";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { container, parentButton, titleStyle } from "./styles.css";
import classNames from "classnames";
import { HelpModal } from "../help-modal";
import { isMobile } from "../../../utils";

const mobile = isMobile();

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const showBack = location.pathname !== "/";

  const onLeftIconPress = () => {
    showBack ? navigate(-1) : console.log("Support click");
  };

  const logout = useLogout();

  const onXPress = () => {
    if (isMobile()) return;

    logout();
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="row"
      py="4"
    >
      {showBack ? (
        <Box as="button" hw="7" onClick={onLeftIconPress}>
          <CaretLeftIcon />
        </Box>
      ) : (
        <HelpModal type="main" />
      )}

      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openChainModal, mounted }) => {
          const connected = mounted && account && chain;

          return (
            <Box
              className={classNames({ [parentButton]: !mounted })}
              aria-hidden={!mounted}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Text variant={{ size: "small" }}>
                      {t("shared.stake_kit")}
                    </Text>
                  );
                }

                return (
                  <Box
                    borderRadius="2xl"
                    background="backgroundMuted"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    className={container}
                  >
                    {(() => {
                      if (chain.unsupported) {
                        return (
                          <Box
                            px="2"
                            py="2"
                            as="button"
                            onClick={openChainModal}
                          >
                            <Text variant={{ size: "small", type: "danger" }}>
                              {t("shared.unsupported_network")}
                            </Text>
                          </Box>
                        );
                      }

                      return (
                        <>
                          <Box
                            as="button"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            paddingLeft="2"
                            py="2"
                            onClick={openChainModal}
                          >
                            {chain?.iconUrl && (
                              <Box as="img" hw="6" src={chain.iconUrl} />
                            )}
                          </Box>
                          <Box
                            as="button"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            px="2"
                            py="2"
                            onClick={openAccountModal}
                          >
                            {account.ensAvatar ? (
                              <Box
                                as="img"
                                src={account.ensAvatar}
                                hw="6"
                                borderRadius="half"
                              />
                            ) : (
                              <Text
                                className={titleStyle}
                                variant={{ size: "small" }}
                              >
                                {account.ensName ?? account.displayName}
                              </Text>
                            )}

                            <Box marginLeft="2">
                              <CaretDownIcon />
                            </Box>
                          </Box>
                        </>
                      );
                    })()}
                  </Box>
                );
              })()}
            </Box>
          );
        }}
      </ConnectButton.Custom>

      <Box>
        {!mobile && (
          <Box as="button" hw="6" onClick={onXPress}>
            <XIcon />
          </Box>
        )}
      </Box>
    </Box>
  );
};
