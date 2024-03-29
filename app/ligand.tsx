import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import colors from "@styles/colors";
import LigandPreview from "@routes/Ligand/LigandPreview";

interface ILigandSearchParams extends Record<string, string> {
  ligand: string;
}

const Ligand = () => {
  const { top } = useSafeAreaInsets();
  const { ligand } = useLocalSearchParams<ILigandSearchParams>();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={{ top: "off" }}>
      <View
        style={[
          {
            flex: 1,
            width: "100%",
            backgroundColor: colors.mainWhite,
            paddingHorizontal: 20,
          },
          { paddingTop: top },
        ]}
      >
        <LigandPreview ligand={ligand || "ligand"} />
      </View>
    </SafeAreaView>
  );
};

export default Ligand;
