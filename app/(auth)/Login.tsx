import { StyleSheet } from "react-native";
import logo from "@/assets/images/icon.png";

import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Message } from "@/components/Message";
import { View } from "@/components/View";
import { Image } from "@/components/Image";
import { TextInput } from "@/components/TextInput";
import { TouchableOpacity } from "@/components/TouchableOpacity";
import { Text } from "@/components/Text";
import Colors from "@/constants/Colors";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const userData = useLogin();
  const router = useRouter();

  const handleLogin = async () => {
    const response = await userData.makeLogin(email, password);

    if (response.success) {
      router.replace("/ForYou");
      return;
    }

    setError(response.message || "Login failed");
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 300, height: 300 }} />


      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleLogin}>
        Login
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/Signup")}
        style={styles.signupLinkContainer}
      >
        Don't have an account? Sign Up
      </TouchableOpacity>

      <Message text={error} type={"error"} isVisible={!!error} />
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
    height: 45,
  },

  signupLinkContainer: {
    marginTop: 10,
    backgroundColor: "transparent",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.baseContent,
  },

  boldSignupLink: {
    marginLeft: 5,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
