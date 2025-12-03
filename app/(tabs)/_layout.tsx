import React from "react";
import { Tabs, useRouter } from "expo-router";

import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";
import { storageUtil } from "@/utils/StorageUtil";
import { TabBarIcon } from "./TabBarIcon";


const TabLayout = () => {
  const router = useRouter();

  // Check for userEmail in storage to determine if user is logged in
  storageUtil.getItem("userEmail").then((value) => {
    if (!value) {
      router.replace("/Login");
    }
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="ForYou/index"
        options={{
          title: "",
          headerTitle: "For you",
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Feed/index"
        options={{
          title: "",
          headerTitle: "Feed",
          tabBarIcon: ({ color }) => <TabBarIcon name="video-camera" color={color} />,
        }}
      />

      <Tabs.Screen
        name="Profile/index"
        options={{
          title: "",
          headerTitle: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color}/>,
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
