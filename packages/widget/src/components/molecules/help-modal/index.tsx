import { useTranslation } from "react-i18next";
import { Box } from "../../atoms/box";
import { HelpIcon } from "../../atoms/icons";
import { SelectModal } from "../../atoms/select-modal";

import poweredBy from "../../../assets/images/powered-by.png";
import whatIsStaking from "../../../assets/images/what-is-staking.png";
import whatIsLiquidStaking from "../../../assets/images/what-is-liquid-staking.png";
import whatIsDeposit from "../../../assets/images/what-is-deposit.png";
import whatIsLending from "../../../assets/images/what-is-lending.png";
import fees from "../../../assets/images/fees.png";
import { Text } from "../../atoms/typography";
import { Trigger } from "@radix-ui/react-alert-dialog";
import { imageStyle, linkStyle } from "./style.css";
import { YieldType } from "@stakekit/api-hooks";

type ModalType = "main" | "fees" | YieldType;

type HelpModalProps = {
  type: ModalType;
};

export const HelpModal = ({ type }: HelpModalProps) => {
  const { t } = useTranslation();

  const getContent = (
    type: ModalType
  ): { title: string; description: string; image: string; link?: string } => {
    switch (type) {
      case "main": {
        return {
          title: t("help_modals.main.title"),
          description: t("help_modals.main.description"),
          image: poweredBy,
          link: "https://stakek.it",
        };
      }

      case "staking": {
        return {
          title: t("help_modals.staking.title"),
          description: t("help_modals.staking.description"),
          image: whatIsStaking,
        };
      }

      case "liquid-staking": {
        return {
          title: t("help_modals.liquid_staking.title"),
          description: t("help_modals.liquid_staking.description"),
          image: whatIsLiquidStaking,
        };
      }

      case "vault": {
        return {
          title: t("help_modals.deposit.title"),
          description: t("help_modals.deposit.description"),
          image: whatIsDeposit,
        };
      }

      case "lending": {
        return {
          title: t("help_modals.lending.title"),
          description: t("help_modals.lending.description"),
          image: whatIsLending,
        };
      }

      case "fees": {
        return {
          title: t("help_modals.fees.title"),
          description: t("help_modals.fees.description"),
          image: fees,
        };
      }
    }
  };

  const { description, image, title, link } = getContent(type);

  return (
    <SelectModal
      trigger={
        <Trigger>
          <Box display="flex" alignItems="center" justifyContent="center">
            <HelpIcon />
          </Box>
        </Trigger>
      }
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={{ tablet: "8", mobile: "4" }}
        paddingBottom={{ mobile: "8" }}
      >
        <Box as="img" src={image} className={imageStyle} />

        <Text>{title}</Text>

        <Box marginTop="2">
          <Text
            variant={{ size: "small", type: "muted", weight: "normal" }}
            textAlign="center"
          >
            {description}
          </Text>
        </Box>

        {link && (
          <Box
            as="a"
            href={link}
            target="_blank"
            marginTop="2"
            className={linkStyle}
          >
            <Text variant={{ size: "small", weight: "normal" }}>{link}</Text>
          </Box>
        )}
      </Box>
    </SelectModal>
  );
};
