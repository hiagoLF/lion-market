import React, {
  ForwardedRef,
  ForwardRefRenderFunction,
  LegacyRef,
  useRef,
} from "react";
import { FlatList, FlatListProps } from "react-native";
import { Card, Paragraph, Title, useTheme } from "react-native-paper";
import Swipeout from "react-native-swipeout";
import { convertNumberToReal } from "../../../utils/format";
import styles from "./styles";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  created_at: string;
};

interface ProductsListProps {
  productsList: Product[];
  handleProductRemoveRequest: (productId: string) => void;
  handleProductEditRequest: (item: Product) => void;
  handleProductsListEndReached: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const ProductsList = React.forwardRef<FlatList, ProductsListProps>(
  (
    {
      productsList,
      handleProductRemoveRequest,
      handleProductEditRequest,
      handleProductsListEndReached,
      onRefresh,
      refreshing,
    },
    ref
  ) => {
    const { colors } = useTheme();

    return (
      <FlatList
        ref={ref}
        data={productsList}
        renderItem={({ item }) => (
          <Swipeout
            right={[
              {
                text: "Editar",
                backgroundColor: colors.primary,
                onPress: () => handleProductEditRequest(item),
              },
            ]}
            left={[
              {
                text: "Remover",
                type: "delete",
                onPress: () => handleProductRemoveRequest(item.id),
              },
            ]}
            style={styles.swiper}
          >
            <Card style={styles.card} mode="elevated">
              <Card.Cover
                source={{
                  uri: item.imageUrl,
                }}
              />
              <Card.Content>
                <Title style={styles.title}>{item.title}</Title>
                <Title style={styles.price}>R$ {convertNumberToReal(item.price)}</Title>
                <Paragraph style={styles.description}>
                  {item.description}
                </Paragraph>
              </Card.Content>
            </Card>
          </Swipeout>
        )}
        onRefresh={onRefresh}
        refreshing={refreshing}
        keyExtractor={(item) => String(item.id)}
        onEndReachedThreshold={0.5}
        onEndReached={handleProductsListEndReached}
      />
    );
  }
);

export default ProductsList;
