import React from "react";
import { Appbar, Searchbar, useTheme } from "react-native-paper";
import useSearchBar from "./hooks/useSearchBar";

export const Header: React.FC = () => {
  const { isSearchBarOpen, setIsSearchBarOpen, backgroundColor } =
    useSearchBar();
  const { colors } = useTheme();

  return (
    <Appbar.Header
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {isSearchBarOpen ? (
        <Searchbar
          placeholder="Search"
          onIconPress={() => setIsSearchBarOpen(false)}
          autoFocus
          onChangeText={(text) => console.warn(text)}
          value=""
          autoComplete={false}
        />
      ) : (
        <>
          <Appbar.Content title="Lion Market" />
          <Appbar.Action
            icon="magnify"
            onPress={() => setIsSearchBarOpen(true)}
            color={colors.surface}
          />
        </>
      )}
    </Appbar.Header>
  );
};
