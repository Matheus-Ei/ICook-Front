import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { userService } from "@/services/UserService";
import { recipeService } from "@/services/RecipeService";
import { Loader } from "@/components/Loader";
import { Message } from "@/components/Message";

import { UserProfileCard } from "./UserProfileCard";
import { View } from "@/components/View";
import Colors from "@/constants/Colors";

export interface User {
  name: string;
  email: string;
  followersCount: number;
}

const ProfileTab = () => {
  const [user, setUser] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const userResponse = await userService.getUserProfile();
      const recipesResponse = await recipeService.getAll();

      if (userResponse) setUser(userResponse);
      if (recipesResponse) setRecipes(recipesResponse);
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderProfile = () => {
    if (isLoading) {
      return <Loader />;
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
      {user && (
        <UserProfileCard
          user={user}
          recipes={recipes}
          onUserUpdated={setUser}
          onRecipeDeleted={(id) =>
            setRecipes((prev) => prev.filter((r) => r.id !== id))
          }
        />
      )}
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

export default ProfileTab;
