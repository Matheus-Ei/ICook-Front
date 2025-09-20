import "setimmediate";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "expo-router";
import { View } from "@/components/Themed";

export default function IndexScreen() {
  const userData = useLogin();
  const userEmail = userData.userData.email;

  if (userEmail == null) {
    useRouter().replace("/login");
  }
}
