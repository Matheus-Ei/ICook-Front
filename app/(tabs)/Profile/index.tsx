import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { userService } from "@/services/UserService";
import { LoadingIndicator } from "@/components/Loader";
import { Message } from "@/components/Message";
import { UserProfileCard } from "./UserProfileCard";
import { View } from "@/components/View";
import Colors from "@/constants/Colors";

export interface User {
  name: string;
  email: string;
  followersCount: string;
}

export default function ProfileTab() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await userService.getUserProfile()

      if (response) {
        setUser(response);
      } else {
        throw new Error("Invalid data structure from API.");
      }

    } catch(err: any) {
        setError(err.message || "An unknown error occurred.");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const renderProfile = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (error) {
      return <Message text={error} type='error' isVisible={!!error} />;
    }

    if (user) {
      return <UserProfileCard user={user} />;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {renderProfile()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.base200,
    padding: 20,
  },
});

