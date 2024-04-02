import React from "react";
import { View } from "react-native";
import styles from "./style";
import CircleButton from "@components/CircleButton";
import {
  DownArrowIcon,
  LeftArrowIcon,
  MinusIcon,
  PlusIcon,
  RightArrowIcon,
  UpArrowIcon,
} from "@components/icons";

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
      <View>
        <CircleButton
          onPress={onMoveLeft}
          icon={<LeftArrowIcon />}
          containerStyle={styles.mb20}
        />
        <CircleButton
          onPress={onMoveDown}
          icon={<DownArrowIcon />}
          containerStyle={styles.mb20}
        />
        <CircleButton onPress={onZoomOut} icon={<MinusIcon />} />
      </View>
      <View>
        <CircleButton
          onPress={onMoveRight}
          icon={<RightArrowIcon />}
          containerStyle={styles.mb20}
        />
        <CircleButton
          onPress={onMoveUp}
          icon={<UpArrowIcon />}
          containerStyle={styles.mb20}
        />
        <CircleButton onPress={onZoomIn} icon={<PlusIcon />} />
      </View>
    </View>
  );
}

export default ControlsPanel;
