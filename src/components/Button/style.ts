import colors from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.lightPink,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  bgOrange: {
    backgroundColor: colors.lightPink,
  },
  bgGray: {
    backgroundColor: colors.lightGray,
  },
  textWhite: {
    color: colors.mainWhite,
  },
});

export default styles;
