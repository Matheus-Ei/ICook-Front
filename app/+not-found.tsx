import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import Themed from "@/components/Themed";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Themed.View style={styles.container}>
        <Themed.Text style={styles.title}>This screen doesn't exist.</Themed.Text>

        <Link href="/" style={styles.link}>
          <Themed.Text style={styles.linkText}>Go to home screen!</Themed.Text>
        </Link>
      </Themed.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
