import React, { createContext, useContext, useState } from "react";
import { findProductsFromApi, loginUserOnApi } from "../services/api/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

type LoginUser = (login: string, password: string) => Promise<boolean>;

type FindProducts = (page: number) => Promise<ProductsResponse | undefined>;

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
};

async function storeToken(token: string) {
  try {
    await AsyncStorage.setItem("@api_access_token", token);
  } catch (e) {
    alert("Não foi possível armazenar informações de login no telefone");
  }
}

const RequestsContext = createContext({} as RequestsContextProps);

export const RequestsProvider: React.FC = ({ children }) => {
  const [userToken, setUserToken] = useState<string | undefined>(undefined);
  const { reset } = useNavigation();

  function resetToLogin() {
    reset({
      routes: [{ name: "Login" as never }],
    });
  }

  const loginUser: LoginUser = async (login, password) => {
    const loginResult = await loginUserOnApi(login, password);
    if (!loginResult) {
      return false;
    }
    setUserToken(loginResult.token);
    return true;
  };

  const findProducts: FindProducts = async (page) => {
    const response = await findProductsFromApi(page, userToken as string);
    if (!response) {
      resetToLogin();
      return undefined;
    }
    return response;
  };

  return (
    <RequestsContext.Provider value={{ loginUser, findProducts }}>
      {children}
    </RequestsContext.Provider>
  );
};

export function useRequests() {
  return useContext(RequestsContext);
}
