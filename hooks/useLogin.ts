import { DatabaseService } from "@/services/Database";
import { useEffect, useState } from "react";

export type UserData = {
  email: string | null;
};

export const useLogin = () => {
  const [userData, setUserData] = useState<UserData>({ email: null });

  useEffect(() => {
    const fetchUserData = async () => {
      // const dbService = await DatabaseService.getInstance();
      // const users = await dbService.execute("SELECT email FROM users LIMIT 1");
      // if (users.length > 0) {
      // setUserData(users[0]);
      // }
    };

    fetchUserData();
  }, []);

  // Implement login logic here
  // For example, call an API to authenticate the user
  const makeLogin = async (email: string, password: string) => {
    setUserData({ email: null });

    if (email === "test@test.com" && password === "test") {
      setUserData({ email });

      const dbService = await DatabaseService.getInstance();

      // Saves the user data on sqlite local Db here
      await dbService.execute(
        "INSERT OR REPLACE INTO users (email) VALUES (?)",
        [email],
      );

      return { success: true, message: "Login successful" };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  };

  return { makeLogin, userData };
};
