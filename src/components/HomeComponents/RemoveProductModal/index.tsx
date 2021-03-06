import React, { useState } from "react";
import { View } from "react-native";
import { Avatar, Button, Modal, Portal, Subheading } from "react-native-paper";
import useRemoveProductModal from "./hooks/useRemoveProductModal";
import styles from "./styles";

interface RemoveProductModal {
  requestCloseModal: (productId?: string) => void;
  productToRemoveId?: string;
}

const RemoveProductModal: React.FC<RemoveProductModal> = ({
  requestCloseModal,
  productToRemoveId,
}) => {
  const { isRemovingProduct, handleRemoveProductButtonPress } =
    useRemoveProductModal({ requestCloseModal, productToRemoveId });

  return (
    <Portal>
      <Modal
        visible={!!productToRemoveId}
        dismissable={!isRemovingProduct}
        onDismiss={requestCloseModal}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.headerContainer}>
          <Avatar.Icon size={24} icon="delete" style={styles.headerIcon} />
          <Subheading>
            {isRemovingProduct
              ? "Removendo..."
              : "Deseja remover este produto?"}
          </Subheading>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            mode="outlined"
            onPress={requestCloseModal}
            disabled={isRemovingProduct}
            labelStyle={styles.buttonLabel}
            style={styles.cancelButton}
          >
            Cancelar
          </Button>

          <Button
            mode="contained"
            loading={isRemovingProduct}
            disabled={isRemovingProduct}
            onPress={handleRemoveProductButtonPress}
            labelStyle={styles.buttonLabel}
          >
            Confirmar
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default RemoveProductModal;
