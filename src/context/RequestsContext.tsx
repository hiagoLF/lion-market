import React, { createContext, useContext, useState } from "react";
import { View } from "react-native";
import { loginUserOnApi } from "../services/api/requests";

type LoginUser = (login: string, password: string) => Promise<boolean>;

type RequestsContextProps = {
  loginUser: LoginUser;
};

const RequestsContext = createContext({} as RequestsContextProps);

export const RequestsProvider: React.FC = ({ children }) => {
  const [userToken, setUserToken] = useState(undefined);

  const loginUser: LoginUser = async (login, password) => {
    const loginResult = await loginUserOnApi(login, password)
    if(!loginResult) return false
    setUserToken(loginResult.token)
    console.warn('Novo Token >>> ', loginResult.token)
    return true
  };

  return (
    <RequestsContext.Provider value={{ loginUser }}>
      {children}
    </RequestsContext.Provider>
  );
};

export function useRequests() {
  return useContext(RequestsContext);
}
