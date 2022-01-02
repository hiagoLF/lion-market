import React, { createContext, useContext, useEffect, useState } from "react";
import { findProductsFromApi, loginUserOnApi, removeProductsFromApi } from "../services/api/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

type LoginUser = (login: string, password: string) => Promise<boolean>;

type FindProducts = (
  page: number,
  query?: string
) => Promise<ProductsResponse | undefined>;

type RemoveProduct = (productId: string) => Promise<boolean>;

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
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
      userToken as string,
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
      value={{ loginUser, findProducts, authenticationStatus, removeProduct }}
    >
      {children}
    </RequestsContext.Provider>
  );
};

export function useRequests() {
  return useContext(RequestsContext);
}
