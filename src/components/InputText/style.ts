import colors from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 0,
    borderRadius: 5,
  },
  inputContainer: {
    height: 50,
    width: "100%",
    paddingHorizontal: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.lightPink,
    alignItems: "center",
    backgroundColor: "transparnet",
  },

  ml20: {
    marginLeft: 20,
  },
  mr6: {
    marginRight: 6,
  },
  textBlackGray: {
    color: colors.blackGray,
  },
});

export default styles;
