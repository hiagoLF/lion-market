import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createProductOnApi,
  editProductOnApi,
  findProductsFromApi,
  getProductsFromApi,
  loginUserOnApi,
  removeProductsFromApi,
  upLoadProductImageOnApi,
} from "../services/api/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

type LoginUser = (login: string, password: string) => Promise<boolean>;

type FindProducts = (
  page: number,
  query?: string
) => Promise<ProductsResponse | undefined>;

type RemoveProduct = (productId: string) => Promise<boolean>;

type CreateProductProps = { title: string; description: string; price: number };

type GetProduct = (productId: string) => Promise<Product | undefined>;

type CreateProduct = (
  data: CreateProductProps
) => Promise<CreateProductResponse | undefined>;

type CreateProductResponse = { id: string };

type EditProduct = (
  productId: string,
  dataToEdit: Partial<Product>
) => Promise<boolean>;

type ChangeProductImage = (
  productId: string,
  imageFormData: FormData
) => Promise<boolean>;

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  created_at: string;
};

type Pagination = {
  pagesNumber: number;
  currentPage: number;
};

type ProductsResponse = {
  data: Product[];
  pagination: Pagination;
};

type RequestsContextProps = {
  loginUser: LoginUser;
  findProducts: FindProducts;
  authenticationStatus: "checking" | "unauthenticated" | "authenticated";
  removeProduct: RemoveProduct;
  createProduct: CreateProduct;
  changeProductImage: ChangeProductImage;
  editProduct: EditProduct;
  getProduct: GetProduct;
};

async function storeToken(token: string | undefined) {
  try {
    await AsyncStorage.setItem("@api_access_token", token || "");
  } catch (e) {
    alert("Não foi possível armazenar informações de login no telefone");
  }
}

async function recoverToken() {
  try {
    const tokenOnAsyncStorage = await AsyncStorage.getItem("@api_access_token");
    if (!tokenOnAsyncStorage || tokenOnAsyncStorage === "") return undefined;
    return tokenOnAsyncStorage;
  } catch (e) {
    return undefined;
  }
}

const RequestsContext = createContext({} as RequestsContextProps);

export const RequestsProvider: React.FC = ({ children }) => {
  const [userToken, setUserToken] = useState<string | undefined>(undefined);
  const [authenticationStatus, setAuthenticationStatus] = useState<
    "checking" | "unauthenticated" | "authenticated"
  >("checking");
  const { reset } = useNavigation();

  function resetToLogin() {
    reset({
      routes: [{ name: "Login" as never }],
    });
    setAuthenticationStatus("unauthenticated");
    storeToken(undefined);
    setUserToken(undefined);
  }

  const loginUser: LoginUser = async (login, password) => {
    const loginResult = await loginUserOnApi(login, password);
    if (!loginResult) {
      return false;
    }
    setUserToken(loginResult.token);
    storeToken(loginResult.token);
    return true;
  };

  const findProducts: FindProducts = async (page, query) => {
    const response = await findProductsFromApi(
      page,
      userToken as string,
      query
    );
    if (!response) {
      resetToLogin();
      return undefined;
    }
    return response;
  };

  const removeProduct: RemoveProduct = async (productId) => {
    const response = await removeProductsFromApi(
      productId,
      userToken as string
    );
    if (!response) {
      return false;
    }
    return true;
  };

  const getProduct: GetProduct = async (productId) => {
    const response = await getProductsFromApi(
      productId,
      userToken as string
    );
    if (!response) {
      return undefined;
    }
    return response;
  };

  const createProduct: CreateProduct = async (data) => {
    const response = await createProductOnApi(data, userToken as string);
    if (!response) {
      return undefined;
    }
    return response;
  };

  const editProduct: EditProduct = async (productId, dataToEdit) => {
    const response = await editProductOnApi(
      productId,
      dataToEdit,
      userToken as string
    );
    if (!response) {
      return false;
    }
    return true;
  };

  const changeProductImage: ChangeProductImage = async (
    productId,
    formData
  ) => {
    const response = await upLoadProductImageOnApi(
      productId,
      formData,
      userToken as string
    );
    if (!response) {
      return false;
    }
    return true;
  };

  async function stablishAuthentication() {
    const storedToken = await recoverToken();
    if (!storedToken) {
      setAuthenticationStatus("unauthenticated");
      return;
    }
    setUserToken(storedToken);
    setAuthenticationStatus("authenticated");
  }

  useEffect(() => {
    stablishAuthentication();
  }, []);

  return (
    <RequestsContext.Provider
      value={{
        loginUser,
        findProducts,
        authenticationStatus,
        removeProduct,
        createProduct,
        changeProductImage,
        editProduct,
        getProduct
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};

export function useRequests() {
  return useContext(RequestsContext);
}
