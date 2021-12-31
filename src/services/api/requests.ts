import axios from "axios";

export async function findProductsFromApi(productPage: number) {
  try {
    const response = await axios.get(`/api/products/${productPage}`);
    if (!response) {
      throw new Error("Error");
    }
    return response.data;
  } catch {
    return undefined;
  }
}
