import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Appbar, Badge, Button, TextInput } from "react-native-paper";

// import { Container } from './styles';

export const CreateProductScreen: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <View style={{ height: "100%" }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Adicionar Produto" />
      </Appbar.Header>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 10 }}>
          <TouchableOpacity onPress={() => alert('Trocando a imagem agora')}>
            <Image
              // @ts-ignore
              source={{
                uri: "https://dilavr.com.ua/image/catalog/empty-img.png",
                width: "100%",
                height: 200,
              }}
            />
          </TouchableOpacity>

          {/* @ts-ignore */}
          <TextInput
            label="Nome"
            style={{ marginBottom: 10 }}
            right={<TextInput.Icon name="shopping-outline" />}
          />

          {/* @ts-ignore */}
          <TextInput
            label="Descrição"
            multiline
            style={{ marginBottom: 10 }}
            right={<TextInput.Icon name="card-text-outline" />}
          />

          {/* @ts-ignore */}
          <TextInput
            label="Valor"
            style={{ marginBottom: 10 }}
            right={<TextInput.Icon name="cash-multiple" />}
          />

          <Button
            icon="plus"
            mode="text"
            onPress={() => console.log("Pressed")}
            style={{ marginTop: 20 }}
          >
            Criar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
