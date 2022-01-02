import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import CurrencyInput from "react-native-currency-input";
import * as ImagePicker from "expo-image-picker";
import EmptyImg from "../../../assets/empty-img.png";
import { useRequests } from "../../context/RequestsContext";

export const CreateProductScreen: React.FC = () => {
  const { goBack } = useNavigation();
  const { colors, fonts } = useTheme();
  const { createProduct, changeProductImage } = useRequests();

  const [image, setImage] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | null>(0);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function uploadImage(productId: string) {
    const formData = new FormData();
    formData.append("productImage", {
      // @ts-ignore
      name: "postimage",
      type: "image/jpeg",
      uri: image,
    });
    const uploadResponse = changeProductImage(productId, formData);
    if (!uploadResponse) {
      alert("Não foi possível fazer upload desta imagem");
      return false;
    }
  }

  async function createNewProduct() {
    const response = await createProduct({
      title,
      description,
      price: price || 0,
    });
    console.warn("Recebido aqui >>> ", response);
    if (!response) {
      alert("Não foi possível criar este produto");
      return undefined;
    }
    await uploadImage(response.id);
  }

  async function handleSubmitProductButtonPress() {
    setIsSubmiting(true);
    const created = await createNewProduct();
    setIsSubmiting(false);
    if (!created) return;
    goBack();
  }

  return (
    <View style={{ height: "100%" }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Adicionar Produto" />
      </Appbar.Header>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              position: "relative",
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                // @ts-ignore
                source={
                  image
                    ? {
                        uri: image,
                      }
                    : EmptyImg
                }
                style={{
                  width: image ? "100%" : 200,
                  height: 200,
                }}
              />

              {image && (
                <TouchableOpacity
                  style={{ position: "absolute", right: 0, top: 0 }}
                  onPress={() => setImage(undefined)}
                >
                  <Avatar.Icon
                    size={40}
                    icon="close-circle"
                    color={colors.text}
                    style={{ backgroundColor: "rgba(0,0,0,0)" }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>

          {/* @ts-ignore */}
          <TextInput
            label="Nome"
            style={{ marginBottom: 10 }}
            right={<TextInput.Icon name="shopping-outline" />}
            mode="outlined"
            onChangeText={setTitle}
          />

          {/* @ts-ignore */}
          <TextInput
            label="Descrição"
            multiline
            style={{ marginBottom: 15 }}
            right={<TextInput.Icon name="card-text-outline" />}
            mode="outlined"
            onChangeText={setDescription}
          />

          <Title style={{ ...fonts.regular, fontSize: 15, marginLeft: 10 }}>
            Valor
          </Title>
          <CurrencyInput
            value={price}
            onChangeValue={setPrice}
            prefix="R$ "
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
            placeholder="Valor"
            style={{
              borderWidth: 1,
              borderRadius: 5,
              padding: 15,
              borderColor: colors.backdrop,
              ...fonts.regular,
            }}
          />

          {/* @ts-ignore */}
          <Button
            icon="plus"
            mode="text"
            style={{ marginTop: 20 }}
            onPress={handleSubmitProductButtonPress}
            loading={isSubmiting}
            disabled={
              !image ||
              title === "" ||
              description === "" ||
              price === 0 ||
              price === null ||
              isSubmiting
            }
          >
            Criar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
