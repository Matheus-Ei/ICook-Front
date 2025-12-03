import Colors from "@/constants/Colors";
import { View as DefaultView, StyleSheet } from "react-native";

type ViewProps = React.ComponentProps<typeof DefaultView>;

export const View = (props: ViewProps) => {
  const { style, ...otherProps } = props;

  return <DefaultView style={[styles.view, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: Colors.base100,
  },
});
