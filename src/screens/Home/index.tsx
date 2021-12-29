import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Appbar,
  Card,
  Paragraph,
  Subheading,
  Title,
  Text,
  useTheme,
  Portal,
  Modal,
  Headline,
  Caption,
  Button,
  Avatar,
  Snackbar,
} from "react-native-paper";
import { FAB } from "react-native-paper";

const product = {
  title: 'Smart TV 42" Philco Roku LED Full HD',
  description:
    'TV PHILCO ROKU com 42" e resolução Full HD em LED. A tecnologia FAST SMART entrega velocidade de navegação entre aplicativos muito grande, com sistema ROKU o mais utilizado nos EUA, com visual intuitivo e sofisticado',
  price: "1.799,99",
  image:
    "https://images-americanas.b2w.io/produtos/01/00/img/3280822/5/3280822569_1SZ.jpg",
};

const products = new Array(10).fill(product);

export const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  const [isRemovingProduct, setIsRemovingProduct] = useState(false);
  const { navigate } = useNavigation();

  async function handleRemoveProductButtonPress() {
    console.log("removerndo");
    setIsRemovingProduct(true);
    await new Promise((resolve) => setTimeout(() => resolve(""), 3000));
    setIsRemovingProduct(false);
    setIsDeleteProductModalOpen(false);
  }

  function handleCloseModalRequest() {}

  return (
    <View style={{ height: "100%" }}>
      <Appbar.Header>
        <Appbar.Content title="Lion Market" />
        <Appbar.Action icon="magnify" onPress={() => alert("pesquisa")} />
      </Appbar.Header>

      <ScrollView style={{ flex: 1 }}>
        {products.map((product, key) => (
          <Card
            onLongPress={() => setIsDeleteProductModalOpen(true)}
            key={key}
            style={{ margin: 5 }}
            mode="elevated"
          >
            <Card.Cover
              source={{
                uri: product.image,
              }}
            />
            <Card.Content>
              <Title style={{ fontSize: 15 }}>{product.title}</Title>
              <Title style={{ fontSize: 20 }}>R$ {product.price}</Title>
              <Paragraph style={{ fontSize: 11, lineHeight: 13 }}>
                {product.description}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <FAB
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: colors.primary,
        }}
        small
        icon="plus"
        color={colors.surface}
        onPress={() => navigate("CreateProduct" as never)}
      />

      <Portal>
        <Modal
          visible={isDeleteProductModalOpen}
          dismissable={!isRemovingProduct}
          onDismiss={() => setIsDeleteProductModalOpen(false)}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 20,
            margin: 10,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Avatar.Icon size={24} icon="delete" style={{ marginBottom: 7 }} />
            <Subheading>
              {isRemovingProduct
                ? "Removendo..."
                : "Deseja remover este produto?"}
            </Subheading>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <Button
              mode="outlined"
              onPress={() => setIsDeleteProductModalOpen(false)}
              disabled={isRemovingProduct}
              labelStyle={{ fontSize: 12 }}
              style={{ marginRight: 7 }}
            >
              Cancelar
            </Button>

            <Button
              mode="contained"
              loading={isRemovingProduct}
              disabled={isRemovingProduct}
              onPress={handleRemoveProductButtonPress}
              labelStyle={{ fontSize: 12 }}
            >
              Confirmar
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};
