import { createContext, useContext, useState } from "react";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  created_at: string;
};

type ProductListContextProps = {
  productsList: Product[];
  setProductsList: React.Dispatch<React.SetStateAction<Product[]>>
};

const ProductListContext = createContext({} as ProductListContextProps);

export const ProductListProvider: React.FC = ({ children }) => {
  const [productsList, setProductsList] = useState<Product[]>([]);

  return (
    <ProductListContext.Provider value={{ productsList, setProductsList }}>
      {children}
    </ProductListContext.Provider>
  );
};

export const useProductsList = () => useContext(ProductListContext);
