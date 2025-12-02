import { Text as DefaultText, StyleSheet } from "react-native";
import { View } from "./View";
import Colors from "@/constants/Colors";

type TextProps = {
  text: string;
  style?: any;
  label?: string;
}

export const Text = ({style, text, label}: TextProps) =>{
  return (
    <View style={[styles.container, style?.container]}>
      {label && <DefaultText style={[styles.label, style?.label]} children={label} />}

      <DefaultText style={[styles.text, style?.text]} children={text} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: Colors.baseContent,
  },

  label: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 2,
  },

  container: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginBottom: 15,
  },
});
