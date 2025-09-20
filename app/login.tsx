import { StyleSheet } from "react-native";
import logo from "@/assets/images/icon.png";

import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
} from "@/components/Themed";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const userData = useLogin();
  const router = useRouter();

  const handleLogin = async () => {
    const response = await userData.makeLogin("test@test.com", "test");

    if (response.success) {
      router.replace("/");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 300, height: 300 }} />

      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  input: {
    width: "80%",
    height: 40,
  },
});
