import colors from "@styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.mainWhite,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
  },
  titleStyle: {
    marginTop: 15,
    alignSelf: "center",
  },
  image: {
    height: 177,
    width: 222,
  },

  pinkText: {
    color: colors.lightPink,
  },
  mt20: {
    marginTop: 20,
  },
  fullWidth: {
    width: "100%",
  },
});
