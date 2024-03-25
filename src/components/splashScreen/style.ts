import colors from "@styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  flex1: {
    flex: 1,
    width: "100%",
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    backgroundColor: colors.mainWhite,
  },
  title: {
    color: colors.lightPink,
  },
});
