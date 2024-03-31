import styles from "./style";
import { BackArrowIcon, ShareIcon } from "@components/icons";
import typography from "@styles/typography";
import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

interface IHeader {
  ligand: string;
  onShare: () => void;
  headerContainerStyle?: StyleProp<ViewStyle>;
}

export default function Header(params: IHeader) {
  const { ligand, onShare, headerContainerStyle } = params;
  return (
    <View style={[styles.headerContiner, headerContainerStyle]}>
      <TouchableOpacity onPress={() => router.back()}>
        <BackArrowIcon />
      </TouchableOpacity>
      <Text
        style={[typography.heading1Regular, styles.blackText]}
      >{`Protein: ${ligand}`}</Text>
      <TouchableOpacity>
        <ShareIcon />
      </TouchableOpacity>
    </View>
  );
}
