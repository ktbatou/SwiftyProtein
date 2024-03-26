import { lightColors } from "@rneui/base";
import colors from "@styles/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.mainWhite,
    paddingHorizontal: 20,
  },
  ligandContainer: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 5,
  },
  ligandsListContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  ligandText: {
    color: colors.lightGray,
    fontSize: 18,
    alignSelf: "center",
    marginLeft: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  mt10: {
    marginTop: 10,
  },
  fullWidth: {
    width: "100%",
  },
  grayText: {
    color: colors.lightGray,
  },
});
