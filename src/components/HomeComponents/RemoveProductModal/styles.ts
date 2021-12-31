import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: "white",
    padding: 20,
    margin: 10,
  },
  headerContainer: { justifyContent: "center", alignItems: "center" },
  headerIcon: { marginBottom: 7 },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonLabel: { fontSize: 12 },
  cancelButton: { marginRight: 7 },
});
