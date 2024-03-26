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
  rowContainer: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
  },
  logout: {
    marginRight: 10,
    alignSelf: "center",
  },
  inputConatiner: {
    width: "90%",
    alignSelf: "center",
  },

  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  fullWidth: {
    width: "100%",
  },
  grayText: {
    color: colors.lightGray,
  },
});
