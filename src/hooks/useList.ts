import React, { useEffect, useState } from "react";
import { useRequests } from "../context/RequestsContext";
import { findProductsFromApi } from "../services/api/requests";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  created_at: string;
};

const useList = () => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [productsPage, setProductsPage] = useState<number | "last">(0);
  const [refreshingList, setRefreshingList] = useState(false);
  const [searchProductTitleQuery, setSearchProductTitleQuery] = useState<string | undefined>(undefined)
  const { findProducts } = useRequests();

  async function handleRefreshList() {
    setRefreshingList(true);
    setProductsList([]);
    await increaseProducts(1);
    setRefreshingList(false);
  }

  async function handleProductsListEndReached() {
    if (productsPage === "last") return;
    increaseProducts(productsPage + 1);
  }

  async function increaseProducts(page: number) {
    if (isLoadingData) return;
    setIsLoadingData(true);
    const response = await findProducts(page, searchProductTitleQuery);
    if (!response) {
      setIsLoadingData(false);
      alert("Não foi possível carregar os dados");
      return;
    }
    if (page === 1) {
      setProductsList(response.data);
    } else {
      setProductsList((prev) => [...prev, ...response.data]);
    }

    if (response.pagination.currentPage === response.pagination.pagesNumber) {
      setProductsPage("last");
    } else {
      setProductsPage(response.pagination.currentPage);
    }

    setIsLoadingData(false);
  }

  function handleSearchProduct(text: string) {
    setSearchProductTitleQuery(text)
  }

  useEffect(() => {
    if(searchProductTitleQuery !== undefined) {
      increaseProducts(1)
    }
  }, [searchProductTitleQuery])

  useEffect(() => {
    if (productsList.length !== 0) return;
    increaseProducts(1);
  }, []);

  return {
    productsList,
    handleProductsListEndReached,
    handleRefreshList,
    refreshingList,
    isLoadingData,
    handleSearchProduct,
    setProductsList
  };
};

export default useList;
