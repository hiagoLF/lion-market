import React from "react";
import { View } from "react-native";
import { Button, Headline, Subheading, TextInput } from "react-native-paper";
import { useLogin } from "../../hooks/useLogin";
import styles from "./styles";

export const LoginScreen: React.FC = () => {
  const {
    login,
    password,
    setLogin,
    setPassword,
    handleLoginButtonPress,
    buttonDisabled,
    isSubmiting,
  } = useLogin();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Headline style={styles.headerHeadLine}>Lion Market</Headline>
          <Subheading>Seja bem vindo</Subheading>
        </View>

        <TextInput
          label="Login"
          mode="outlined"
          value={login}
          onChangeText={(text) => setLogin(text)}
          right={<TextInput.Icon name="account-circle" />}
          autoComplete={false}
          style={styles.inputs}
        />

        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={(text) => setPassword(text)}
          right={<TextInput.Icon name="lock" />}
          autoComplete={false}
          secureTextEntry={true}
          style={styles.inputs}
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
