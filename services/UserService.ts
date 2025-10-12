import { requestUtil } from "@/utils/RequestUtil";

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

  public async signup(name: string, email: string, password: string): Promise<boolean> {
    try {
      await requestUtil.post("users", { name, email, password });
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  }
}

export const userService = new UserService();
