import colors from "@styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerContiner: {
    backgroundColor: colors.mainWhite,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  title: {
    color: colors.blackGray,
  },
});
