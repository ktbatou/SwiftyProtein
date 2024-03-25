import colors from "@styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  alignCenter: {
    alignItems: "center",
  },
  mb25: {
    marginBottom: 25,
  },
  mb30: {
    marginBottom: 30,
  },
  wFull: {
    width: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(1, 0, 23, 0.30)",
  },
  modalContainer: {
    width: "100%",
    alignItems: "center",
    height: 350,
    paddingHorizontal: 27,
    paddingTop: 34,
    paddingBottom: 20,
    backgroundColor: "#EFEFEF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  modalContent: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  buttonContainter: {
    width: "100%",
    marginBottom: 26,
  },
  modalTitle: {
    color: colors.blackGray,
    textAlign: "center",
    marginBottom: 14,
  },
  modalSubtitle: {
    paddingHorizontal: 30,
    color: colors.blackGray,
    textAlign: "center",
    marginBottom: 35,
  },
});

export default styles;
