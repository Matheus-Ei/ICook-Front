import { Text as DefaultText, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { View } from "./View";
import Colors from "@/constants/Colors";

type TextProps = {
  text?: string;
  label?: string;
  style?: any; // mantém compatibilidade
};

export const Text = ({ style = {}, text, label }: TextProps) => {
  return (
    <View style={[styles.container, style.container]}>
      {label && (
        <DefaultText style={[styles.label, style.label]}>
          {label}
        </DefaultText>
      )}

      {/* Agora funciona com qualquer alinhamento, qualquer estilo */}
      {text && (
        <DefaultText style={[styles.text, style]}>
          {text}
        </DefaultText>
      )}
    </View>
  );
};

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
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    marginBottom: 15,
  },
});
