import React from "react";
import { FlatList } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import styles from "./styles";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  created_at: string;
};

interface ProductsListProps {
  productsList: Product[];
  onProductLongPress: (productId: string) => void;
  handleProductsListEndReached: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const ProductsList: React.FC<ProductsListProps> = ({
  productsList,
  onProductLongPress,
  handleProductsListEndReached,
  onRefresh,
  refreshing
}) => {

  return (
    <FlatList
      data={productsList}
      renderItem={({ item }) => (
        <Card
          onLongPress={() => onProductLongPress(item.id)}
          style={styles.card}
          mode="elevated"
        >
          <Card.Cover
            source={{
              uri: item.imageUrl,
            }}
          />
          <Card.Content>
            <Title style={styles.title}>{item.title}</Title>
            <Title style={styles.price}>R$ {item.price}</Title>
            <Paragraph style={styles.description}>{item.description}</Paragraph>
          </Card.Content>
        </Card>
      )}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={(item) => String(item.id)}
      onEndReachedThreshold={0.5}
      onEndReached={handleProductsListEndReached}
    />
  );
};

export default ProductsList;
