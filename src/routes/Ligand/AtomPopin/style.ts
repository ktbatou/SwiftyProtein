import colors from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 35,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bgTransparentBlack: {
    backgroundColor: "rgba(1, 0, 23, 0.30)",
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
  },
  rowContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    marginTop: 20,
  },
});

export default styles;
