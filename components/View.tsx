import { View as DefaultView } from "react-native";

type ViewProps = React.ComponentProps<typeof DefaultView>;

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;

  return <DefaultView style={[{}, style]} {...otherProps} />;
}
