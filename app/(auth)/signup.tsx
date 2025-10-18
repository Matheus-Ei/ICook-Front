import { StyleSheet } from "react-native";
import logo from "@/assets/images/icon.png";

import Themed from "@/components/Themed";
import { useRouter } from "expo-router";
import { useState } from "react";
import { userService } from "@/services/UserService";
import { Message } from "@/components/Message";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignup = async () => {
    try {
      await userService.signup(name, email, password);
      router.replace("/login");
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
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

      <Message text={error} type={"error"} isVisible={!!error} />
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
