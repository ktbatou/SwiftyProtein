import React from "react";
import { Text, View } from "react-native";
import styles from "./style";

interface IControlsPanelProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveRight: () => void;
  onMoveLeft: () => void;
}

function ControlsPanel(props: IControlsPanelProps) {
  const { onMoveDown, onMoveLeft, onMoveRight, onMoveUp, onZoomIn, onZoomOut } =
    props;

  return (
    <View style={styles.container}>
      <Text>+</Text>
      <Text>-</Text>
    </View>
  );
}

export default ControlsPanel;
