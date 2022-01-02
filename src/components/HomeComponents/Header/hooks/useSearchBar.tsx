import { useEffect, useState } from "react";
import { useTheme } from "react-native-paper";

type UseSearchBarProps = {
  onSearch: (text: string) => void;
};

const useSearchBar = ({ onSearch }: UseSearchBarProps) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);

  const { colors } = useTheme();

  function handleSearchBarChangeText(text: string) {
    setSearchBarValue(text);
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
    setTypingTimer(
      setTimeout(() => {
        onSearch(text);
      }, 1500)
    );
  }

  function handleSearchBarRequestClose() {
    if (typingTimer) clearTimeout(typingTimer);
    if (searchBarValue !== "") {
      handleSearchBarChangeText("");
    }
    handleSearchBarChangeText("");
    setIsSearchBarOpen(false);
  }

  const backgroundColor = isSearchBarOpen ? colors.surface : colors.primary;

  return {
    isSearchBarOpen,
    setIsSearchBarOpen,
    handleSearchBarRequestClose,
    backgroundColor,
    searchBarValue,
    handleSearchBarChangeText,
  };
};

export default useSearchBar;
