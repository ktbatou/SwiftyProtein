import colors from "@styles/colors";
import { StyleProp, ViewStyle } from "react-native";
import SwitchSelector from "react-native-switch-selector";

export interface ISwitcherOption {
  label: string;
  value: string;
}

interface ISwitcher {
  onPress: (value: any) => void;
  initialValue: number;
  options: ISwitcherOption[];
  style?:StyleProp<ViewStyle>;
}

export default function Switcher(params: ISwitcher) {
  const { onPress, options, initialValue = 0, style} = params;
  return (
    <SwitchSelector
      initial={initialValue}
      onPress={(value: any) => onPress(value)}
      textColor={colors.blackGray}
      selectedColor={colors.mainWhite}
      buttonColor={colors.lightPink}
      borderColor={colors.lightPink}
      hasPadding
      style={style}
      options={options}
    />
  );
}