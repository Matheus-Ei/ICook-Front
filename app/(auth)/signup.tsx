import { StyleSheet } from "react-native";
import logo from "@/assets/images/icon.png";

import Themed from "@/components/Themed";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "expo-router";
import { useState } from "react";
import { userService } from "@/services/UserService";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignup = async () => {
    const response = await userService.signup(name, email, password);

    if (response === true) {
      router.replace("/login");
    }
  };

  return (
    <Themed.View style={styles.container}>
      <Themed.Image source={logo} style={{ width: 300, height: 300 }} />

      <Themed.TextInput 
        style={styles.input}
        placeholder="Name" 
        onChangeText={setName} 
      />

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

      <Themed.TouchableOpacity onPress={handleSignup}>
        <Themed.Text>Signup</Themed.Text>
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
});
