import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

interface SwitchProps {
  options: string[];
  activeOption: string;
  switchOption: (option: string) => void;
}

const Switch: React.FC<SwitchProps> = ({
  options,
  activeOption,
  switchOption,
}) => {
  return (
    <View style={styles.switchContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            activeOption === option ? styles.activeOption : {},
          ]}
          onPress={() => switchOption(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Switch;
