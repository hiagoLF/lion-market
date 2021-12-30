import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, View } from "react-native";
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
  Banner,
  Searchbar,
  ActivityIndicator,
} from "react-native-paper";
import { FAB } from "react-native-paper";
import useKeyboard from "@rnhooks/keyboard";

const product = {
  title: 'Smart TV 42" Philco Roku LED Full HD',
  description:
    'TV PHILCO ROKU com 42" e resolução Full HD em LED. A tecnologia FAST SMART entrega velocidade de navegação entre aplicativos muito grande, com sistema ROKU o mais utilizado nos EUA, com visual intuitivo e sofisticado',
  price: "1.799,99",
  image:
    "https://images-americanas.b2w.io/produtos/01/00/img/3280822/5/3280822569_1SZ.jpg",
};

const products = new Array(5).fill(product);

export const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  const [isRemovingProduct, setIsRemovingProduct] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [visible] = useKeyboard();
  const [productsList, setProductsList] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  async function handleRemoveProductButtonPress() {
    setIsRemovingProduct(true);
    await new Promise((resolve) => setTimeout(() => resolve(""), 3000));
    setIsRemovingProduct(false);
    setIsDeleteProductModalOpen(false);
  }

  async function handleProductsListEndReached() {
    if (loadingData) return;
    setLoadingData(true);
    await new Promise((resolve) => setTimeout(() => resolve(""), 3000));
    setProductsList((prev) => [...prev, ...products]);
    setLoadingData(false);
  }

  useEffect(() => {
    if (!visible) {
      setIsSearchBarOpen(false);
    }
  }, [visible]);

  useEffect(() => {
    setProductsList(products);
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <Appbar.Header
        style={{
          backgroundColor: isSearchBarOpen ? colors.surface : colors.primary,
        }}
      >
        {isSearchBarOpen ? (
          <Searchbar
            placeholder="Search"
            onIconPress={() => setIsSearchBarOpen(false)}
            autoFocus
            onChangeText={() => {}}
            value=""
            autoComplete={false}
          />
        ) : (
          <>
            <Appbar.Content title="Lion Market" />
            <Appbar.Action
              icon="magnify"
              onPress={() => setIsSearchBarOpen(true)}
            />
          </>
        )}
      </Appbar.Header>
      <FlatList
        data={productsList}
        renderItem={(item) => (
          <Card
            onLongPress={() => setIsDeleteProductModalOpen(true)}
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
        )}
        keyExtractor={(item, index) => String(index)}
        onEndReachedThreshold={0}
        onEndReached={handleProductsListEndReached}
      />

      {loadingData && (
        <View style={{ marginVertical: 10, position: "absolute", bottom: 0, width: '100%' }}>
          <ActivityIndicator animating={true} />
        </View>
      )}

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
