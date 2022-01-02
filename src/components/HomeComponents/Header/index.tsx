import React, { useState } from "react";
import { Appbar, Searchbar, useTheme } from "react-native-paper";
import useSearchBar from "./hooks/useSearchBar";

type HeaderProps = {
  onSearch: (text: string) => void;
};

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const {
    isSearchBarOpen,
    setIsSearchBarOpen,
    handleSearchBarRequestClose,
    backgroundColor,
    searchBarValue,
    handleSearchBarChangeText,
  } = useSearchBar({ onSearch });
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
          onIconPress={handleSearchBarRequestClose}
          autoFocus
          onChangeText={handleSearchBarChangeText}
          value={searchBarValue}
          autoComplete={false}
          icon="arrow-left"
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
