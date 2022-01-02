import { useState } from "react";
import { useRequests } from "../../../../context/RequestsContext";

interface useRemoveProductModalProps {
  requestCloseModal: (productRemovedId?: string) => void;
  productToRemoveId?: string
}

const useRemoveProductModal = ({
  requestCloseModal,
  productToRemoveId
}: useRemoveProductModalProps) => {
  const [isRemovingProduct, setIsRemovingProduct] = useState(false);
  const {removeProduct} = useRequests()

  async function handleRemoveProductButtonPress() {
    setIsRemovingProduct(true);
    const hasTheProductBeenRemoved = await removeProduct(productToRemoveId as string)
    if(!hasTheProductBeenRemoved){
      alert('Não foi possível remover o produto')
      setIsRemovingProduct(false);
      requestCloseModal()
      return
    }
    requestCloseModal(productToRemoveId);
    setIsRemovingProduct(false);
  }

  return { isRemovingProduct, handleRemoveProductButtonPress };
};

export default useRemoveProductModal;
