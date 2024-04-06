import styles from "./style";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { ReactElement } from "react";

interface ICircleButton {
  onPress: () => void;
  icon: ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function CircleButton(props: ICircleButton) {
  const { onPress, icon, containerStyle } = props;

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.buttonConatiner, containerStyle]}
    >
      {icon}
    </TouchableOpacity>
  );
}
