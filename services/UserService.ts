import { User } from "@/app/(tabs)/Profile";
import { requestUtil, ReturnType } from "@/utils/RequestUtil";

class UserService {
  public async login(email: string, password: string): Promise<boolean> {
    try {
      await requestUtil.post("users/auth", { email, password });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }

  public async signup(
    name: string,
    email: string,
    password: string,
  ) {
    return await requestUtil.post("users", { name, email, password });
  }

  public async getUserProfile(): ReturnType<User> {
    return await requestUtil.get<User>("users");
  } 
}

export const userService = new UserService();
