import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useRequests } from "../context/RequestsContext";

export const useLogin = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisable] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { reset } = useNavigation();

  const { loginUser } = useRequests();

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
    const isLoginSuccessful = await loginUser(login, password);
    setIsSubmiting(false);
    if (!isLoginSuccessful) {
      alert("Login Falhou");
      return;
    }
    setLogin("");
    setPassword("");
    reset({
      routes: [{ name: "Home" as never }],
    });
  }

  return {login, password, setLogin, setPassword, handleLoginButtonPress, buttonDisabled, isSubmiting}
};
