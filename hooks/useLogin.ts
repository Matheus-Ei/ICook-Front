import { userService } from "@/services/UserService";
import { storageUtil } from "@/utils/StorageUtil";
import { useState } from "react";

export type UserData = {
  email: string | null;
};

export const useLogin = () => {
  const [userData, setUserData] = useState<UserData>({ email: null });

  const makeLogin = async (email: string, password: string) => {
    setUserData({ email: null });

    const response = await userService.login(email, password);
    if (response === true) {
      setUserData({ email });

      storageUtil.setItem("userEmail", email);

      return { success: true, message: "Login successful" };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  };

  return { makeLogin, userData };
};
