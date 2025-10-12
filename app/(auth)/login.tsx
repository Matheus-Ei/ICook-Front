import { StyleSheet } from "react-native";
import logo from "@/assets/images/icon.png";

import Themed from "@/components/Themed";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = useLogin();
  const router = useRouter();

  const handleLogin = async () => {
    const response = await userData.makeLogin(email, password);

    if (response.success) {
      router.replace("/forYou");
    }
  };

  return (
    <Themed.View style={styles.container}>
      <Themed.Image source={logo} style={{ width: 300, height: 300 }} />

      <Themed.TextInput 
        style={styles.input}
        placeholder="Email" 
        onChangeText={setEmail} 
      />

      <Themed.TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        onChangeText={setPassword} 
      />

      <Themed.TouchableOpacity onPress={handleLogin}>
        <Themed.Text>Login</Themed.Text>
      </Themed.TouchableOpacity>

      <Themed.TouchableOpacity onPress={() => router.push("/signup")} style={styles.signupLinkContainer}>
        <Themed.Text>
          Don't have an account?
          <Themed.Text style={styles.boldSignupLink}>Sign up</Themed.Text>
        </Themed.Text>
      </Themed.TouchableOpacity>
    </Themed.View>
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
  },

  boldSignupLink: { 
    marginLeft: 5,
    fontWeight: "bold", 
    textDecorationLine: 'underline' 
  }
});
