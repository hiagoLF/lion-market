import { api } from "./base";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  created_at: string;
};

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

export async function getProductsFromApi(
  productId: string,
  token: string,
) {
  try {
    const response = await api.get(`/product/${productId}`, {
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

export async function editProductOnApi( productId: string , dataToEdit: Partial<Product>, token: string) {
  try {
    const response = await api.patch(
      `/product/${productId}`,
      dataToEdit,
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
  // Durante o desenvolvimento
  const fakeServerFormData = {
    productImage: "Image",
  };

  try {
    const response = await api.put(
      `/product/image/${productId}`,
      fakeServerFormData,
      {
        headers: {
          // "Content-Type": "multipart/form-data",
          token: `Bearer ${token}`,
        },
      }
    );
    if (!response) {
      throw new Error("");
    }
    return response.data;
  } catch (err) {
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
