import { Text } from "@/components/Text";
import { View } from "@/components/View";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />

      <View style={styles.container}>
        <Text style={{text: styles.title}} text="This screen doesn't exist." />

        <Link href="/Profile" style={styles.link}>
          <Text style={{text: styles.linkText}} text="Go to Home screen!" />
        </Link>
      </View>
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

export default NotFoundScreen;
