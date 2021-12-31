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
}

const ProductsList: React.FC<ProductsListProps> = ({
  productsList,
  onProductLongPress,
  handleProductsListEndReached,
}) => {
  return (
    <FlatList
      data={productsList}
      renderItem={(info) => (
        <Card
          onLongPress={() => onProductLongPress(info.item.id)}
          style={styles.card}
          mode="elevated"
        >
          <Card.Cover
            source={{
              uri: info.item.imageUrl,
            }}
          />
          <Card.Content>
            <Title style={styles.title}>{info.item.title}</Title>
            <Title style={styles.price}>R$ {info.item.price}</Title>
            <Paragraph style={styles.description}>
              {info.item.description}
            </Paragraph>
          </Card.Content>
        </Card>
      )}
      keyExtractor={(item) => String(item.id)}
      onEndReachedThreshold={0}
      onEndReached={handleProductsListEndReached}
    />
  );
};

export default ProductsList;
