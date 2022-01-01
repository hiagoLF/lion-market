import "./mock/server";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/Home";
import { Provider as PaperProvider } from "react-native-paper";
import { CreateProductScreen } from "./screens/CreateProduct";
import { LoginScreen } from "./screens/Login";
import { RequestsProvider } from "./context/RequestsContext";

const Stack = createNativeStackNavigator();

export const LionMarktApp: React.FC = () => {
  return (
    <PaperProvider>
      <RequestsProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="CreateProduct"
              component={CreateProductScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RequestsProvider>
    </PaperProvider>
  );
};
