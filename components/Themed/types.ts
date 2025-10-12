import {
  TouchableOpacityProps as DefaultTouchableOpacityProps,
  Text as DefaultText,
  View as DefaultView,
  Image as DefaultImage,
  TextInput as DefaultTextInput,
} from "react-native";

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ImageProps = ThemeProps & DefaultImage["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];
export type TouchableOpacityProps = ThemeProps & DefaultTouchableOpacityProps;
