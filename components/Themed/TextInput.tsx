import { TextInput as DefaultTextInput } from "react-native";
import { useThemeColor } from "./useThemeColor";
import { TextInputProps } from "./types";

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text",
  );

  return (
    <DefaultTextInput
      style={[
        {
          color,
          backgroundColor,
          borderRadius: 4,
          borderColor,
          outline: "none",
          borderWidth: 1,
          paddingHorizontal: 10,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
