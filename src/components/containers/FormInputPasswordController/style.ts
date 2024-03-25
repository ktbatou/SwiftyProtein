import colors from "@styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
  },
  inputError: {
    borderColor: colors.red,
  },
  errorContainer: {
    flexGrow: 1,
    flexDirection: "row",
  },
  errorText: {
    color: colors.red,
    paddingHorizontal: 20,
    marginTop: 10,
    flex: 1,
    flexWrap: "wrap",
  },
});
