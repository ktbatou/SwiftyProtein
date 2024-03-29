import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  option: {
    padding: 10,
    borderRadius: 20,
  },
  activeOption: {
    backgroundColor: "#007bff",
  },
  optionText: {
    color: "#000",
    textTransform: "capitalize",
  },
});

export default styles;
