class UserService {
  public async login(email: string, password: string): Promise<boolean> {
    try {
      // Logic to handle login, e.g., storing a token
      if (email === "test@test.com" && password === "test") {
        return true;
      } 

      return false;
    } catch (error) {
      throw new Error(`Error making login with ${email}. Error: ${error}`);
    }
  }

  public async signup(name: string, email: string, password: string): Promise<boolean> {
    try {
      // Logic to handle signup, e.g., sending data to a backend
      if (name && email && password) {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error(`Error making login with ${name}, ${email}. Error: ${error}`);
    }
  }
}

export const userService = new UserService();
