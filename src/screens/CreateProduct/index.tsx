import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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
import { useProductsList } from "../../context/ProductListContext";
import loadingImage from "../../../assets/images/loading.png";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  created_at: string;
};

type RootStackParamList = {
  CreateProduct?: { mode?: "create" | "edit"; editProductParams?: Product };
};

export const CreateProductScreen: React.FC = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute<RouteProp<RootStackParamList, "CreateProduct">>();

  const { colors, fonts } = useTheme();
  const { createProduct, changeProductImage, editProduct, getProduct } =
    useRequests();

  const { productsList, setProductsList } = useProductsList();

  const [image, setImage] = useState<string | undefined>(
    params?.editProductParams?.imageUrl || undefined
  );
  const [title, setTitle] = useState(params?.editProductParams?.title || "");
  const [description, setDescription] = useState(
    params?.editProductParams?.description || ""
  );
  const [price, setPrice] = useState<number | null>(
    params?.editProductParams?.price || 0
  );

  const [isSubmiting, setIsSubmiting] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
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
    const uploadResponse = await changeProductImage(productId, formData);
    if (!uploadResponse) {
      alert("Não foi possível fazer upload desta imagem");
      return false;
    }
    return true;
  }

  async function createNewProduct() {
    const response = await createProduct({
      title,
      description,
      price: price || 0,
    });
    if (!response) {
      alert("Não foi possível criar este produto");
      return undefined;
    }
    await uploadImage(response.id);
    return true;
  }

  async function handleSubmitProductButtonPress() {
    setIsSubmiting(true);
    const created = await createNewProduct();
    setIsSubmiting(false);
    if (!created) return;
    goBack();
  }

  function editProductOnCurrentList(product: Product) {
    const newList = [...productsList];
    const index = newList.findIndex((current) => current.id === product.id);
    if (index === -1) return;
    newList[index] = product;
    setProductsList(newList);
  }

  async function handleEditProductButtonPress() {
    setIsSubmiting(true);
    let dataToEdit: Partial<Product> = {};
    let imageToEdit = false;
    if (params?.editProductParams?.title !== title) dataToEdit.title = title;
    if (params?.editProductParams?.price !== price)
      dataToEdit.price = price as number;
    if (params?.editProductParams?.imageUrl !== image) imageToEdit = true;
    if (params?.editProductParams?.description !== description)
      dataToEdit.description = description;
    if (dataToEdit === {}) {
      goBack();
      return;
    }
    if (Object.keys(dataToEdit).length > 0) {
      await editProduct(params?.editProductParams?.id as string, dataToEdit);
    }
    if (imageToEdit) {
      await uploadImage(params?.editProductParams?.id as string);
    }
    const editedProduct = await getProduct(
      params?.editProductParams?.id as string
    );
    console.warn("editado >>> ", editProduct);
    if (editedProduct) {
      editProductOnCurrentList(editedProduct);
    }
    alert("Dados atualizados");
    setIsSubmiting(false);
    goBack();
  }

  return (
    <View style={{ height: "100%" }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content
          title={
            params?.mode === "edit" ? "Editar Produto" : "Adicionar Produto"
          }
        />
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
                loadingIndicatorSource={loadingImage}
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
            value={title}
          />

          {/* @ts-ignore */}
          <TextInput
            label="Descrição"
            multiline
            style={{ marginBottom: 15 }}
            right={<TextInput.Icon name="card-text-outline" />}
            mode="outlined"
            onChangeText={setDescription}
            value={description}
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
            icon={params?.mode === "edit" ? "briefcase-edit-outline" : "plus"}
            mode="text"
            style={{ marginTop: 20 }}
            onPress={
              params?.mode === "edit"
                ? handleEditProductButtonPress
                : handleSubmitProductButtonPress
            }
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
            {params?.mode === "edit" ? "Editar" : "Criar"}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
