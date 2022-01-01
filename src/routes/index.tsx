import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { useRequests } from "../context/RequestsContext";
import { CreateProductScreen } from "../screens/CreateProduct";
import { HomeScreen } from "../screens/Home";
import { LoginScreen } from "../screens/Login";

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  const { authenticationStatus } = useRequests();

  return authenticationStatus !== "checking" ? (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        authenticationStatus === "authenticated" ? "Home" : "Login"
      }
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateProduct" component={CreateProductScreen} />
    </Stack.Navigator>
  ) : (
    <ActivityIndicator />
  );
};

export default Routes;
