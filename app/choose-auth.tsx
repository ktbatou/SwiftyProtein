import Button from "@components/Button";
import styles from "@routes/ChooseAuth/style";
import typography from "@styles/typography";
import { router } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import logoSource from "@images/molecule.png";

export default function ChooseAuth() {
  return (
    <SafeAreaView edges={{ top: "off" }} style={styles.flex1}>
      <View style={styles.contentContainer}>
        <View>
          <Image
            source={logoSource}
            style={styles.image}
            contentFit="contain"
          />
          <Text
            style={[
              typography.heading1Regular,
              styles.pinkText,
              styles.titleStyle,
            ]}
          >
            Swifty Protein
          </Text>
        </View>
        <View style={styles.fullWidth}>
          <Button
            title="Sign In"
            onPress={() => router.replace("/sign-in")}
            containerStyle={styles.fullWidth}
          />
          <Button
            title="Sign Up"
            onPress={() => router.replace("/sign-up")}
            containerStyle={[styles.fullWidth, styles.mt20]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
