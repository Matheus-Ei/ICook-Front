import { Text as DefaultText } from "react-native";

type TextProps = React.ComponentProps<typeof DefaultText>;

export const Text = (props: TextProps) =>{
  const { style, ...otherProps } = props;

  return <DefaultText style={[{}, style]} {...otherProps} />;
}
