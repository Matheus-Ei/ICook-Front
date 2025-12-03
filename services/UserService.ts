import { User } from "@/app/(tabs)/Profile";
import { requestUtil, ReturnType, ResponseType } from "@/utils/RequestUtil";

class UserService {
  login(email: string, password: string): Promise<boolean> {
    return requestUtil
      .post("users/auth", { email, password })
      .then(() => true)
      .catch(() => false);
  }

  signup(name: string, email: string, password: string) {
    return requestUtil.post("users", { name, email, password });
  }

  getUserProfile(): ReturnType<User> {
    return requestUtil.get<User>("users");
  }

  // 🔥 AGORA ESTÁ CERTO → PUT /users
  updateUser(data: Partial<User>): ReturnType<User> {
    return requestUtil
      .put<ResponseType<User>>("users", data)
      .then((r) => r?.resource as User);
  }
}

export const userService = new UserService();
