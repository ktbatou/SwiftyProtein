import React from "react";
import { TColor, TModelisation, useAppContext } from "src/lib/AppContext";
import { View } from "react-native";
import Switcher from "@components/Switcher";
import styles from "./style";

export default function SwicthersPanel() {
  const {
    activeColor,
    setActiveColor,
    activeModelisation,
    setActiveModelisation,
  } = useAppContext();

  const switchColor = (color: TColor) => {
    setActiveColor(color);
  };

  const switchModelisation = (model: TModelisation) => {
    setActiveModelisation(model);
  };

  return (
    <View style={styles.container}>
      <Switcher
        options={[
          { label: "Jmol", value: "jmol" },
          { label: "Rasmol", value: "rasmol" },
        ]}
        initialValue={activeColor == "jmol" ? 0 : 1}
        onPress={switchColor}
      />
      <Switcher
        options={[
          { label: "Sphere", value: "SPHERE" },
          { label: "Cube", value: "CUBE" },
        ]}
        initialValue={activeModelisation == "SPHERE" ? 0 : 1}
        onPress={switchModelisation}
      />
    </View>
  );
}
