import { requestUtil, ReturnType } from "@/utils/RequestUtil";

class RecipeService {
  async getAll() {
    return await requestUtil.get<any[]>("recipes");
  }

  async delete(id: number) {
    return await requestUtil.delete(`recipes/${id}`);
  }
}

export const recipeService = new RecipeService();
