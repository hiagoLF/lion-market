import { api } from "./base";

export async function findProductsFromApi(productPage: number) {
  try {
    const response = await api.get(`/products/${productPage}`);
    if (!response) {
      throw new Error("Error");
    }
    return response.data;
  } catch {
    return undefined;
  }
}

export async function loginUserOnApi(login: string, password: string) {
  try {
    const response = await api.post("/login", {login, password});
    if (!response) {
      throw new Error();
    }
    return response.data;
  } catch {
    return undefined;
  }
}
