import { View, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import { Image } from "expo-image";
import moleculeLogoSource from "../../../assets/icon.png";
import colors from "@styles/colors";

export default function SplashScreen() {
  return (
    <SafeAreaView edges={{ top: "off" }} style={styles.flex1}>
      <View style={styles.mainContainer}>
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          <Image
            source={moleculeLogoSource}
            style={{ height: 194, width: 246 }}
            contentFit="contain"
          />
          <Text style={styles.title}>{"Swifty Protein"}</Text>
        </View>
        <ActivityIndicator color={colors.lightPink} size={"large"} />
      </View>
    </SafeAreaView>
  );
}
