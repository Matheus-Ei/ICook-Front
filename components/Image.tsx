import { Image as DefaultImage } from "react-native";

type ImageProps = React.ComponentProps<typeof DefaultImage>;

export const Image = (props: ImageProps) => {
  const { style, ...otherProps } = props;

  return <DefaultImage style={[{}, style]} {...otherProps} />;
}
