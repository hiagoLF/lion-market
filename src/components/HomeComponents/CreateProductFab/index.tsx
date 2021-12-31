import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FAB, useTheme } from "react-native-paper";
import style from "./styles";

export const CreateProductFab: React.FC = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  return (
    <FAB
      style={{ ...style.fab, backgroundColor: colors.primary }}
      small
      icon="plus"
      color={colors.surface}
      onPress={() => navigate("CreateProduct" as never)}
    />
  );
};
