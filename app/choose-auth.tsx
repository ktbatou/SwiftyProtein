import Button from "@components/Button";
import styles from "@routes/ChooseAuth/style";
import typography from "@styles/typography";
import { router } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import logoSource from "@images/molecule.png";
import UseBiometricsAuth from "src/hooks/useBiometricsAuth";
import { BiometricIcon, InlineCircleExclamationIcon } from "@components/icons";
import { useState } from "react";
import Modal from "@components/Modal";
import Loader from "@components/Loader";

export default function ChooseAuth() {
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [warningBiometricModalVisibile, setwarningBiometricModalVisibile] =
    useState(false);
  const [BiometricModalVisibile, setBiometricModalVisibile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const biometric = UseBiometricsAuth();

  async function checkBiometric() {
    const isDeviceHasBiometric = await biometric.hasHardware();
    if (isDeviceHasBiometric) {
      const isEnrolled = await biometric.isEnrolled();
      if (isEnrolled) {
        setBiometricModalVisibile(true);
      } else setwarningBiometricModalVisibile(true);
    } else {
      router.replace("sign-in");
    }
  }

  async function authenticate() {
    setIsLoading(true);
    const biometricAuthentication = await biometric.Auth();
    setIsLoading(false);

    if (biometricAuthentication.success) {
      setBiometricModalVisibile(false);
      const timeoutId = setTimeout(() => {
        router.replace("ligands-list");
      }, 0);

      return () => clearTimeout(timeoutId);
    } else {
      setBiometricModalVisibile(false);
      setIsLoading(false);
      setIsErrorModalVisible(true);
    }
  }

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
            onPress={() => checkBiometric()}
            containerStyle={styles.fullWidth}
          />
          <Button
            title="Sign Up"
            onPress={() => router.replace("/sign-up")}
            containerStyle={[styles.fullWidth, styles.mt20]}
          />
        </View>
      </View>

      <Modal
        title="Oops ! Error"
        subtitle={"An error occured, try again"}
        confirmButtonTitle="OK"
        icon={<InlineCircleExclamationIcon />}
        onClose={() => setIsErrorModalVisible(false)}
        visible={isErrorModalVisible}
        onConfirm={() => setIsErrorModalVisible(false)}
      />

      <Modal
        title="Biometric authentication"
        subtitle="Enable biometric authentication in your settings to log into your account."
        confirmButtonTitle="Ok"
        icon={<BiometricIcon />}
        onClose={() => setwarningBiometricModalVisibile(false)}
        visible={warningBiometricModalVisibile}
        onConfirm={() => setwarningBiometricModalVisibile(false)}
      />

      <Modal
        title="Biometric authentication"
        subtitle="Authenticate with biometric"
        confirmButtonTitle="Sign In"
        icon={<BiometricIcon />}
        onClose={() => setBiometricModalVisibile(false)}
        visible={BiometricModalVisibile}
        onConfirm={() => authenticate()}
      />
      <Loader isVisible={isLoading} />
    </SafeAreaView>
  );
}
