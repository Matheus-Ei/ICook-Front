import Colors from "@/constants/Colors";
import { TouchableOpacity as DefaultTouchableOpacity, StyleSheet } from "react-native";

type TouchableOpacityProps = React.ComponentProps<typeof DefaultTouchableOpacity>;

export const TouchableOpacity = (props: TouchableOpacityProps) => {
  const { style, ...otherProps } = props;

  return (
    <DefaultTouchableOpacity
      style={[styles.touchableOpacity, style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    width: 80,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    color: Colors.primaryContent,
    backgroundColor: Colors.primary,
  },
});
