import colors from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputError: {
    borderWidth: 1,
    borderColor: colors.red,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    paddingHorizontal: 15,
  },
  errorText: {
    color: colors.red,
    paddingHorizontal: 6,
  },
});

export default styles;
