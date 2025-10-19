import { View } from "@/components/View";
import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet } from "react-native";

interface CardProps {
  children?: React.ReactNode;
}

export const Card = ({ children }: CardProps) => (
  <View style={styles.card}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: Colors.neutral,
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
});

