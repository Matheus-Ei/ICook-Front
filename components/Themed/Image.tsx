import { Image as DefaultImage } from "react-native";
import { ImageProps } from "./types";

export function Image(props: ImageProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;

  return <DefaultImage style={[{}, style]} {...otherProps} />;
}
