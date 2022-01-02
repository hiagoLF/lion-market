import { api } from "./base";

export async function findProductsFromApi(
  productPage: number,
  token: string,
  query?: string
) {
  try {
    const response = await api.get(`/products/${productPage}?title=${query}`, {
      headers: { token: `Bearer ${token}` },
    });
    if (!response) {
      throw new Error("Error");
    }
    return response.data;
  } catch {
    return undefined;
  }
}

export async function removeProductsFromApi(
  productId: string,
  token: string,
){
  try {
    const response = await api.delete(`/product/${productId}`, {
      headers: { token: `Bearer ${token}` },
    });
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
    const response = await api.post("/login", { login, password });
    if (!response) {
      throw new Error();
    }
    return response.data;
  } catch {
    return undefined;
  }
}
