import useKeyboard from "@rnhooks/keyboard";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "react-native-paper";

const useSearchBar = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [visible] = useKeyboard();
  const { colors } = useTheme();

  useEffect(() => {
    if (!visible) {
      setIsSearchBarOpen(false);
    }
  }, [visible]);

  const backgroundColor = isSearchBarOpen ? colors.surface : colors.primary

  return { isSearchBarOpen, setIsSearchBarOpen, backgroundColor };
};

export default useSearchBar;
