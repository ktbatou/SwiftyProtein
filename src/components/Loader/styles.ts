import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
