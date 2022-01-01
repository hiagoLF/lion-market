import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { Button, Headline, Subheading, TextInput } from "react-native-paper";

export const LoginScreen: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisable] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { reset } = useNavigation();

  useEffect(() => {
    if (login.length <= 4 || password.length <= 4) {
      if (!buttonDisabled) setButtonDisable(true);
      return;
    }
    setButtonDisable(false);
  }, [login, password]);

  async function handleLoginButtonPress() {
    Keyboard.dismiss();
    setIsSubmiting(true);
    await new Promise((resolve) => setTimeout(() => resolve(""), 2000));
    setIsSubmiting(false);
    setLogin("");
    setPassword("");
    reset({
      routes: [{ name: "Home" as never }],
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Headline style={{ fontStyle: "italic", fontWeight: "bold" }}>
            Lion Market
          </Headline>
          <Subheading>Seja bem vindo</Subheading>
        </View>

        <TextInput
          label="Login"
          mode="outlined"
          value={login}
          onChangeText={(text) => setLogin(text)}
          right={<TextInput.Icon name="account-circle" />}
          autoComplete={false}
          style={{ marginBottom: 10 }}
        />

        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={(text) => setPassword(text)}
          right={<TextInput.Icon name="lock" />}
          autoComplete={false}
          secureTextEntry={true}
          style={{ marginBottom: 10 }}
        />

        <Button
          icon="login"
          mode="contained"
          onPress={handleLoginButtonPress}
          disabled={buttonDisabled || isSubmiting}
          loading={isSubmiting}
        >
          Login
        </Button>
      </View>
    </View>
  );
};
