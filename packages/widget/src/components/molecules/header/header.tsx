import { Text } from "../../atoms/typography";
import { Box } from "../../atoms/box";
import { useLocation, useNavigate } from "react-router-dom";
import { CaretDownIcon, CaretLeftIcon, XIcon } from "../../atoms/icons";
import { useTranslation } from "react-i18next";
import { useLogout } from "../../../hooks";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  container,
  parentButton,
  parentContainer,
  titleStyle,
} from "./styles.css";
import classNames from "classnames";
import { HelpModal } from "../help-modal";
import { isMobile } from "../../../utils";
import { useSKWallet } from "../../../hooks/use-sk-wallet";

const mobile = isMobile();

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isConnected } = useSKWallet();

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
    <Box className={parentContainer} paddingTop="4" paddingBottom="1">
      {showBack ? (
        <Box
          as="button"
          hw="7"
          onClick={onLeftIconPress}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CaretLeftIcon />
        </Box>
      ) : (
        <Box hw="7">
          <HelpModal type="main" />
        </Box>
      )}

      <Box display="flex" justifyContent="center" alignItems="center">
        <ConnectButton.Custom>
          {({ account, chain, openAccountModal, openChainModal, mounted }) => {
            return (
              <Box
                className={classNames({ [parentButton]: !mounted })}
                aria-hidden={!mounted}
              >
                {(() => {
                  if (!isConnected || !chain || !account) {
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
      </Box>

      {!mobile && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box as="button" hw="6" onClick={onXPress}>
            <XIcon />
          </Box>
        </Box>
      )}
    </Box>
  );
};
