import useKeyboard from "@rnhooks/keyboard";
import React, { useEffect, useState } from "react";
import { Appbar, Searchbar, useTheme } from "react-native-paper";
import useSearchBar from "./hooks/useSearchBar";

export const Header: React.FC = () => {
  const { isSearchBarOpen, setIsSearchBarOpen, backgroundColor } =
    useSearchBar();

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
          onChangeText={() => {}}
          value=""
          autoComplete={false}
        />
      ) : (
        <>
          <Appbar.Content title="Lion Market" />
          <Appbar.Action
            icon="magnify"
            onPress={() => setIsSearchBarOpen(true)}
          />
        </>
      )}
    </Appbar.Header>
  );
};
