import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "./View";
import { Text } from "./Text";
import Colors from "@/constants/Colors";

export const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={Colors.primary} />
    <Text style={styles.loadingText} text="Loading..." />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.neutral,
  },
});

