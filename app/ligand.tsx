import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import colors from "@styles/colors";
import LigandPreview from "@routes/Ligand/LigandPreview";
import Header from "@components/Header";
import { useAppContext } from "src/lib/AppContext";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

interface ILigandSearchParams extends Record<string, string> {
  ligand: string;
}

const Ligand = () => {
  const { top } = useSafeAreaInsets();
  const { ligand } = useLocalSearchParams<ILigandSearchParams>();
  const { viewShotRef } = useAppContext();

  const captureSaveAndShare = async () => {
    if (viewShotRef.current) {
      try {
        const uri: string = await viewShotRef.current.capture();
        const fileName = `${ligand}.jpg`;
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

        await FileSystem.copyAsync({
          from: uri,
          to: fileUri,
        });

        const fileExists = await FileSystem.getInfoAsync(uri);
        if (fileExists.exists) {
          await Sharing.shareAsync(fileUri, {
            mimeType: "image/jpeg", // Android requires mimeType to be set for sharing
            dialogTitle: `Share ${ligand}`,
            UTI: "public.jpeg", // iOS requires UTI (Uniform Type Identifier) for sharing
          });
        } else {
          alert("File does not exist");
          console.error("File does not exist");
        }
      } catch (error) {
        alert("Capture, Save, or Share failed");
        console.error("Capture, Save, or Share failed", error);
      }
    }
  };

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
        <Header ligand={ligand || ""} onShare={captureSaveAndShare} />
        <LigandPreview />
      </View>
    </SafeAreaView>
  );
};

export default Ligand;
