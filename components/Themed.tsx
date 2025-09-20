import {
  TouchableOpacity as DefaultTouchableOpacity,
  Text as DefaultText,
  View as DefaultView,
  Image as DefaultImage,
  TextInput as DefaultTextInput,
  TouchableOpacityProps as DefaultTouchableOpacityProps,
} from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ImageProps = ThemeProps & DefaultImage["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];
export type TouchableOpacityProps = ThemeProps & DefaultTouchableOpacityProps;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Image(props: ImageProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return <DefaultImage style={[{}, style]} {...otherProps} />;
}

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
