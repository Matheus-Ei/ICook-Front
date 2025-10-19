import { Text } from "@/components/Text";
import { View } from "@/components/View";
import { StyleSheet } from "react-native";

export default function ForYouTab() {
  return (
    <View style={styles.container}>
      <Text text="Tab One Screen" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
