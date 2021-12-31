import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import styles from './styles'

interface LoadingProps {
  position: 'center' | 'bottom'
}

const Loading: React.FC<LoadingProps> = ({position}) => {
  return (
    <View
      style={{...styles.loadingContainer, bottom: position === 'center' ? '40%' : 0}}
    >
      <ActivityIndicator animating={true} size={40}/>
    </View>
  );
};

export default Loading;
