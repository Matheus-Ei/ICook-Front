import { StyleSheet } from "react-native";
import logo from "@/assets/images/icon.png";

import { useRouter } from "expo-router";
import { useState } from "react";
import { userService } from "@/services/UserService";
import { Message } from "@/components/Message";
import { View } from "@/components/View";
import { Image } from "@/components/Image";
import { TextInput } from "@/components/TextInput";
import { TouchableOpacity } from "@/components/TouchableOpacity";
import { Text } from "@/components/Text";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignup = async () => {
    try {
      await userService.signup(name, email, password);
      router.replace("/Login");
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 300, height: 300 }} />

      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
      />

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

      <TouchableOpacity onPress={handleSignup}>Sign Up</TouchableOpacity>

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
});

export default SignupScreen;
