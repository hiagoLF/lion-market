import React, { useState } from "react";
import { View } from "react-native";
import { Header } from "../../components/HomeComponents/Header";
import { CreateProductFab } from "../../components/HomeComponents/CreateProductFab";
import Loading from "../../components/HomeComponents/Loading";
import ProductsList from "../../components/HomeComponents/ProductsList";
import RemoveProductModal from "../../components/HomeComponents/RemoveProductModal";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  created_at: string;
};

export const HomeScreen: React.FC = () => {
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  async function handleProductsListEndReached() {}

  return (
    <View style={{ height: "100%" }}>
      <Header />

      <ProductsList
        handleProductsListEndReached={handleProductsListEndReached}
        onProductLongPress={(productId) => setIsDeleteProductModalOpen(true)}
        productsList={productsList}
      />

      <CreateProductFab />

      {isLoadingData && <Loading />}

      <RemoveProductModal
        isOpen={isDeleteProductModalOpen}
        requestCloseModal={() => setIsDeleteProductModalOpen(false)}
      />
    </View>
  );
};
