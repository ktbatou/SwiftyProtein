import React from "react";
import Switch from "@components/Switch";
import { TColor, TModelisation, useAppContext } from "src/lib/AppContext";
import { View } from "react-native";

export default function Options() {
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
    <View>
      <Switch
        options={["jmol", "rasmol"]}
        activeOption={activeColor}
        switchOption={switchColor as any}
      />
      <Switch
        options={["SPHERE", "CUBE"]}
        activeOption={activeModelisation}
        switchOption={switchModelisation as any}
      />
    </View>
  );
}
