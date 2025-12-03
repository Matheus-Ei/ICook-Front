import { Text } from "@/components/Text";
import { View } from "@/components/View";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

export const ModalScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} text="Modal" />

      <View style={styles.separator} />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
