import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";

import { View } from "@/components/View";
import { Text } from "@/components/Text";
import { Card } from "@/components/Card";
import { Image } from "@/components/Image";
import { TextInput } from "@/components/TextInput";
import { userService } from "@/services/UserService";
import { recipeService } from "@/services/RecipeService";

import Colors from "@/constants/Colors";

export const UserProfileCard = ({ user, recipes, onUserUpdated, onRecipeDeleted }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState("");

  const handleSave = async () => {
    const updateData = {};

    if (newName !== user.name) updateData.name = newName;
    if (newEmail !== user.email) updateData.email = newEmail;
    if (newPassword.trim() !== "") updateData.password = newPassword;

    try {
      const updated = await userService.updateUser(updateData);

      if (updated) {
        onUserUpdated(updated);    
        setModalVisible(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedRecipeId(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedRecipeId) return;

    try {
      await recipeService.delete(selectedRecipeId);

      if (onRecipeDeleted) {
        onRecipeDeleted(selectedRecipeId);   // 🔥 atualiza lista no pai
      }
    } catch (e) {}

    setDeleteModal(false);
    setSelectedRecipeId(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Card style={styles.headerCard}>
        <View style={styles.headerContainer}>
          <Image
            source={require("@/assets/images/jacquin.jpeg")}
            style={styles.avatar}
          />

          <View style={styles.userInfo}>
            <Text text={user.name} style={{ text: styles.nameText }} />

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text label="Receitas" text={String(recipes.length)} />
              </View>
              <View style={styles.statBox}>
                <Text label="Seguidores" text={String(user.followersCount)} />
              </View>
              <View style={styles.statBox}>
                <Text label="Seguindo" text="650" />
              </View>
            </View>
          </View>
        </View>
      </Card>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text text="Editar Cozinheiro" style={styles.buttonText} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text text="Compartilhar Receitas" style={styles.buttonText} />
        </TouchableOpacity>
      </View>

      {recipes.map((recipe) => (
        <Card key={recipe.id} style={styles.recipeCard}>
          <Image
            source={{ uri: recipe.imageUrl || "https://via.placeholder.com/600" }}
            style={styles.recipeImage}
          />

          <View style={styles.recipeContent}>
            <Text text={recipe.title} style={styles.recipeTitle} />
            <Text text={recipe.description || ""} style={styles.recipePreview} />
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => openDeleteModal(recipe.id)}
          >
            <Text text="Excluir Receita" style={styles.deleteButtonText} />
          </TouchableOpacity>
        </Card>
      ))}

      {/* MODAL EDITAR */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            <Text label="Editar meu cozinheiro" text="" />

            <TextInput
              value={newName}
              onChangeText={setNewName}
              placeholder="Nome"
              style={styles.input}
            />

            <TextInput
              value={newEmail}
              onChangeText={setNewEmail}
              placeholder="Email"
              style={styles.input}
            />

            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Nova senha (opcional)"
              secureTextEntry
              style={styles.input}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text text="Salvar" style={styles.saveButtonText} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text text="Cancelar" style={styles.cancelButtonText} />
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* MODAL EXCLUIR */}
      <Modal visible={deleteModal} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            <Text
              text="Deseja realmente excluir esta receita?"
              style={{ text: styles.deleteTitle }}
            />

            <TouchableOpacity style={styles.confirmDeleteButton} onPress={confirmDelete}>
              <Text text="Excluir" style={styles.confirmDeleteText} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setDeleteModal(false)}>
              <Text text="Cancelar" style={styles.cancelButtonText} />
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.base200,
  },

  headerCard: { marginBottom: 20 },

  headerContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: Colors.neutral,
  },

  userInfo: { flex: 1 },

  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.baseContent,
  },

  statsRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statBox: {
    flex: 1,
    alignItems: "center",
  },

  buttonsRow: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent"
  },

  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: Colors.base100,
    borderWidth: 1,
    borderColor: Colors.neutral,
    justifyContent: "center",
  },

  buttonText: {
    textAlign: "center",
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },

  recipeCard: { marginBottom: 20, padding: 0 },

  recipeImage: { width: "100%", height: 180 },

  recipeContent: { padding: 12 },

  recipeTitle: { text: { fontSize: 16, fontWeight: "600" } },

  recipePreview: { text: { fontSize: 14, color: Colors.neutralContent } },

  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff0000",
    paddingVertical: 10,
    borderRadius: 10,
    margin: 12,
    alignItems: "center",
  },

  deleteButtonText: {
    fontWeight: "700",
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalBox: {
    width: "90%",
    backgroundColor: Colors.base100,
    padding: 20,
    borderRadius: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.neutral,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },

  saveButton: {
    marginTop: 15,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  saveButtonText: {
    fontWeight: "600",
  },

  cancelButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.base300,
    alignItems: "center",
  },

  cancelButtonText: {
    color: Colors.baseContent,
    fontWeight: "600",
  },

  deleteTitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  confirmDeleteButton: {
    backgroundColor: "#ff0000",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  confirmDeleteText: {
    fontWeight: "700",
  },
});
