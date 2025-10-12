import { TouchableOpacity as DefaultTouchableOpacity } from "react-native";
import { useThemeColor } from "./useThemeColor";
import { TouchableOpacityProps } from "./types";

export function TouchableOpacity(props: TouchableOpacityProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint",
  );

  return (
    <DefaultTouchableOpacity
      style={[
        {
          width: 80,
          height: 30,
          backgroundColor,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
