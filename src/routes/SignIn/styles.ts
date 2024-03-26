import colors from "@styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },

  mainContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.mainWhite,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titleStyle: {
    marginTop: 15,
    alignSelf: "center",
  },
  inputTitle: {
    marginLeft: 30,
    marginVertical: 10,
  },
  image: {
    height: 177,
    width: 222,
  },
  rowContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },

  flexEnd: {
    justifyContent: "flex-end",
  },
  fullWidth: {
    width: "100%",
  },
  blackGrayText: {
    color: colors.blackGray,
  },
  pinkText: {
    color: colors.lightPink,
  },
  mt10: {
    marginTop: 10,
  },
  pt20: {
    paddingTop: 20,
  },
});
