import colors from "@styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.mainWhite,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputTitle: { marginLeft: 30, marginVertical: 10 },
  logoContainer: {},
  blackGrayText: {
    color: colors.blackGray,
  },
  pinkText: {
    color: colors.lightPink,
  },
  mt10: {
    marginTop: 10,
  },
});
