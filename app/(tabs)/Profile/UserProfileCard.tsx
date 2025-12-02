import React from "react";
import { StyleSheet, ScrollView } from "react-native";

import { View } from "@/components/View";
import { Text } from "@/components/Text";
import { Card } from "@/components/Card";
import { Image } from "@/components/Image";
import { TouchableOpacity } from "@/components/TouchableOpacity";

import Colors from "@/constants/Colors";

interface User {
  name: string;
  email: string;
  followersCount: string;
}

interface UserProfileCardProps {
  user: User;
}

const recipes = [
  {
    id: "1",
    title: "Lasanha 4 Queijos",
    preview: "Camadas de massa fresca com muito queijo gratinado.",
    imageUrl: "https://via.placeholder.com/600x400?text=Lasanha",
  },
  {
    id: "2",
    title: "Risoto de Cogumelos",
    preview: "Risoto cremoso com mix de cogumelos salteados.",
    imageUrl: "https://via.placeholder.com/600x400?text=Risoto",
  },
  {
    id: "3",
    title: "Brownie de Chocolate",
    preview: "Brownie com gotas de chocolate.",
    imageUrl: "https://via.placeholder.com/600x400?text=Brownie",
  },
];

export const UserProfileCard = ({ user }: UserProfileCardProps) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Card style={styles.headerCard}>
        <View style={styles.headerContainer}>
          <Image
            source={require("@/assets/images/jacquin.jpeg")}
            style={styles.avatar}
          />

          <View style={styles.userInfo}>
            <Text
              text={user.name}
              style={{ text: styles.nameText }}
            />

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text label="Receitas" text="17" />
              </View>

              <View style={styles.statBox}>
                <Text label="Seguidores" text={user.followersCount} />
              </View>

              <View style={styles.statBox}>
                <Text label="Seguindo" text="650" />
              </View>
            </View>
          </View>
        </View>
      </Card>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button}>
          <Text text="Editar Cozinheiro" style={styles.buttonText} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text text="Compartilhar Receitas" style={styles.buttonText} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {recipes.map((recipe) => (
        <Card key={recipe.id} style={styles.recipeCard}>
          <Image
            source={{ uri: recipe.imageUrl }}
            style={styles.recipeImage}
          />

          <View style={styles.recipeContent}>
            <Text text={recipe.title} style={styles.recipeTitle} />
            <Text text={recipe.preview} style={styles.recipePreview} />
          </View>
        </Card>
      ))}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.base200,
  },

  headerCard: {
    marginBottom: 20,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.neutral,
  },

  userInfo: {
    flex: 1,
  },

  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.baseContent,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  statBox: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 4,
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "transparent",
  },

  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.base100,
    borderWidth: 1,
    borderColor: Colors.neutral,
  },

  buttonText: {
    container: {
      marginBottom: 0,
    },
    text: {
      fontSize: 14,
      fontWeight: "600",
      textAlign: "center",
      color: Colors.baseContent,
    },
  },

  divider: {
    height: 1,
    backgroundColor: Colors.neutral,
    marginVertical: 20,
  },

  recipeCard: {
    marginBottom: 20,
    padding: 0,
    overflow: "hidden",
  },

  recipeImage: {
    width: "100%",
    height: 180,
  },

  recipeContent: {
    padding: 12,
    gap: 4,
  },

  recipeTitle: {
    text: {
      fontSize: 16,
      fontWeight: "600",
      color: Colors.baseContent,
    },
  },

  recipePreview: {
    text: {
      fontSize: 14,
      color: Colors.neutralContent,
    },
  },
});







//import { Card } from "@/components/Card";
//import { Text } from "@/components/Text";

//interface User {
  //name: string;
  //email: string;
  //followersCount: string;
//}

//interface UserProfileCardProps {
  //user: User;
//}

//export const UserProfileCard = ({ user }: UserProfileCardProps) => (
  //<Card>
    //<Text label="Name" text={user.name} />

    //<Text label="Email" text={user.email} />

    //<Text label="Followers" text={user.followersCount} />
  //</Card>
//);
