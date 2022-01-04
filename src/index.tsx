import { makeFakeServer } from "./mock/server";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { RequestsProvider } from "./context/RequestsContext";
import Routes from "./routes";
import { ProductListProvider } from "./context/ProductListContext";
import configDefinitions from '../lion-market-config.json'

if(configDefinitions.fakeApi){
  makeFakeServer()
}

export const LionMarktApp: React.FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <ProductListProvider>
          <RequestsProvider>
            <Routes />
          </RequestsProvider>
        </ProductListProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};
