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

export async function removeProductsFromApi(productId: string, token: string) {
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

type CreateProductData = { title: string; description: string; price: number };

export async function createProductOnApi(
  data: CreateProductData,
  token: string
) {
  try {
    const response = await api.post(
      `/product`,
      { ...data },
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    if (!response) {
      throw new Error("Error");
    }
    return response.data;
  } catch {
    return undefined;
  }
}

export async function upLoadProductImageOnApi(
  productId: string,
  formData: FormData,
  token: string
) {
  console.warn("Requisição será feita >>> ", productId);
  console.warn("O form que será usado >>> ", formData);
  try {
    const response = await api.put(`/product/image/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `Bearer ${token}`,
      },
    });
    console.warn("ta vindo aqui >>> ", response);
    if (!response) {
      throw new Error("");
    }
    return response.data;
  } catch (err) {
    console.warn("Deu erro aqui >>> ", err);
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
