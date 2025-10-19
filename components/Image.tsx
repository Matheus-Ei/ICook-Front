import { Image as DefaultImage, StyleSheet } from "react-native";

type ImageProps = React.ComponentProps<typeof DefaultImage>;

export const Image = (props: ImageProps) => {
  const { style, ...otherProps } = props;

  return <DefaultImage style={[styles.image, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  image: {
  },
});
