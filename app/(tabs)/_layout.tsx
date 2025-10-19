import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";

import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";
import { storageUtil } from "@/utils/StorageUtil";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const router = useRouter();

  // Check for userEmail in storage to determine if user is logged in
  storageUtil.getItem("userEmail").then((value) => {
    if (!value) {
      router.replace("/login");
    }
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="forYou"
        options={{
          title: "",
          headerTitle: "For you",
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          headerTitle: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
