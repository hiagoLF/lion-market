import React, { useState } from "react";
import { View } from "react-native";
import { Header } from "../../components/HomeComponents/Header";
import { CreateProductFab } from "../../components/HomeComponents/CreateProductFab";
import Loading from "../../components/HomeComponents/Loading";
import ProductsList from "../../components/HomeComponents/ProductsList";
import RemoveProductModal from "../../components/HomeComponents/RemoveProductModal";
import useList from "../../hooks/useList";

export const HomeScreen: React.FC = () => {
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);

  const {
    productsList,
    handleProductsListEndReached,
    handleRefreshList,
    refreshingList,
    isLoadingData,
  } = useList();

  return (
    <View style={{ height: "100%" }}>
      <Header />

      {productsList.length !== 0 && (
        <ProductsList
          handleProductsListEndReached={handleProductsListEndReached}
          handleProductRemoveRequest={(productId) =>
            setIsDeleteProductModalOpen(true)
          }
          productsList={productsList}
          onRefresh={handleRefreshList}
          refreshing={refreshingList}
        />
      )}

      <CreateProductFab />

      {isLoadingData && (
        <Loading position={productsList.length === 0 ? "center" : "bottom"} />
      )}

      <RemoveProductModal
        isOpen={isDeleteProductModalOpen}
        requestCloseModal={() => setIsDeleteProductModalOpen(false)}
      />
    </View>
  );
};
