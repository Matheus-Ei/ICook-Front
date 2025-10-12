import { StyleSheet } from "react-native";

import Themed from "@/components/Themed";

export default function TabOneScreen() {
  return (
    <Themed.View style={styles.container}>
      <Themed.Text style={styles.title}>Tab One</Themed.Text>

      <Themed.View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </Themed.View>
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
