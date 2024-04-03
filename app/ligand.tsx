import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import LigandPreview from "@routes/Ligand/LigandPreview";
import Header from "@components/Header";
import { useAppContext } from "src/lib/AppContext";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import styles from "@routes/Ligand/style";
import * as MediaLibrary from "expo-media-library";

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
        const uri = await viewShotRef.current.capture();
        const fileName = `${ligand}.jpg`;
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

        await FileSystem.copyAsync({ from: uri, to: fileUri });

        // Save to gallery
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
          const asset = await MediaLibrary.createAssetAsync(fileUri);
          await MediaLibrary.createAlbumAsync("Ligands", asset, false);
        }

        // Share
        await Sharing.shareAsync(fileUri, {
          mimeType: "image/jpeg",
          dialogTitle: `Share ${ligand}`,
          UTI: "public.jpeg",
        });
      } catch (error) {
        console.error("Capture, Save, or Share failed", error);
        alert("Capture, Save, or Share failed");
      }
    }
  };

  return (
    <SafeAreaView style={styles.flex1} edges={{ top: "off" }}>
      <View style={[styles.outerContainer, { paddingTop: top }]}>
        <Header ligand={ligand || ""} onShare={captureSaveAndShare} />
        <LigandPreview />
      </View>
    </SafeAreaView>
  );
};

export default Ligand;
