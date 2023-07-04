import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Box } from "../box";
import { defaultColor, fallbackContainer } from "./styles.css";
import { getBackgroundColor } from "../../../utils";
import { Text } from "../typography";
import { Atoms } from "../../../styles";
import { TextVariants } from "../typography/styles.css";

export const ImageFallback = ({
  name,
  tokenLogoHw,
  textVariant,
}: {
  name: string;
  tokenLogoHw?: Atoms["hw"];
  textVariant?: TextVariants;
}) => {
  return (
    <Box
      className={fallbackContainer}
      borderRadius="half"
      style={assignInlineVars({
        [defaultColor]: getBackgroundColor(name),
      })}
      hw={tokenLogoHw ?? "9"}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        variant={
          textVariant ?? {
            size: "small",
            type: "white",
            weight: "bold",
          }
        }
      >
        {name.charAt(0)}
      </Text>
    </Box>
  );
};
