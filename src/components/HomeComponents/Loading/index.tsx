import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import styles from './styles'

const Loading: React.FC = () => {
  return (
    <View
      style={styles.loadingContainer}
    >
      <ActivityIndicator animating={true} />
    </View>
  );
};

export default Loading;
