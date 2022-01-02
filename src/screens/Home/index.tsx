import React, { useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { Header } from "../../components/HomeComponents/Header";
import { CreateProductFab } from "../../components/HomeComponents/CreateProductFab";
import Loading from "../../components/HomeComponents/Loading";
import ProductsList from "../../components/HomeComponents/ProductsList";
import RemoveProductModal from "../../components/HomeComponents/RemoveProductModal";
import useList from "../../hooks/useList";

export const HomeScreen: React.FC = () => {
  const [productToRemoveId, setProductToRemoveId] = useState<
    undefined | string
  >(undefined);

  const listRef = useRef<FlatList>(null);
  const {
    productsList,
    handleProductsListEndReached,
    handleRefreshList,
    refreshingList,
    isLoadingData,
    handleSearchProduct,
    setProductsList
  } = useList();

  function handleSearchProductQueryTyping(text: string) {
    listRef.current?.scrollToIndex({
      animated: true,
      index: 0,
      viewPosition: 0,
    });
    handleSearchProduct(text);
  }

  function handleRequestCloseModal(productId?: string) {
    if (!!productId) {
      const newList = productsList.filter(
        (product) => product.id !== productId
      );
      setProductsList(newList)
    }
    setProductToRemoveId(undefined)
  }

  return (
    <View style={{ height: "100%" }}>
      <Header onSearch={handleSearchProductQueryTyping} />

      {productsList.length !== 0 && (
        <ProductsList
          handleProductsListEndReached={handleProductsListEndReached}
          handleProductRemoveRequest={(productId) =>
            setProductToRemoveId(productId)
          }
          productsList={productsList}
          onRefresh={handleRefreshList}
          refreshing={refreshingList}
          ref={listRef}
        />
      )}

      <CreateProductFab />

      {isLoadingData && (
        <Loading position={productsList.length === 0 ? "center" : "bottom"} />
      )}

      <RemoveProductModal
        productToRemoveId={productToRemoveId}
        requestCloseModal={handleRequestCloseModal}
      />
    </View>
  );
};
