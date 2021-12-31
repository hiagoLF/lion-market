import React, { useState } from "react";
import { View } from "react-native";

// import { Container } from './styles';

interface useRemoveProductModalProps {
  requestCloseModal: () => void;
}

const useRemoveProductModal = ({
  requestCloseModal,
}: useRemoveProductModalProps) => {
  const [isRemovingProduct, setIsRemovingProduct] = useState(false);

  async function handleRemoveProductButtonPress() {
    setIsRemovingProduct(true);
    await new Promise((resolve) => setTimeout(() => resolve(""), 3000));
    setIsRemovingProduct(false);
    requestCloseModal();
  }

  return { isRemovingProduct, handleRemoveProductButtonPress };
};

export default useRemoveProductModal;
