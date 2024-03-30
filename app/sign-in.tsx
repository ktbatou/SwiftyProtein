import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@routes/SignIn/styles";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import logoSource from "@images/molecule.png";
import Button from "@components/Button";
import typography from "@styles/typography";
import FormInputTextController from "@components/containers/FormInputTextController";
import useSignInForm, { IFormFields } from "@routes/SignIn/hooks/useSignInForm";
import FormInputPasswordController from "@components/containers/FormInputPasswordController";
import { useEffect, useState } from "react";
import Modal from "@components/Modal";
import {
  BiometricIcon,
  CircleCheckIcon,
  InlineCircleExclamationIcon,
} from "@components/icons";
import useSignInMutation from "@routes/SignIn/services/useSignInMuation";
import { router } from "expo-router";
import Loader from "@components/Loader";
import UseBiometricsAuth from "src/hooks/useBiometricsAuth";

export default function SignIn() {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("Sign in failed");
  const [isLoading, setIsLoading] = useState(false);
  const [warningBiometricModalVisibile, setwarningBiometricModalVisibile] =
    useState(false);
  const [BiometricModalVisibile, setBiometricModalVisibile] = useState(false);
  const [isDeviceHasBiometric, setIsDeviceHasBiometric] = useState(false);

  const { control: formControl, handleSubmit, formState } = useSignInForm();
  const biometric = UseBiometricsAuth();

  const {
    mutate: signInMuatation,
    isSuccess,
    isPending,
    isError,
    error,
  } = useSignInMutation();

  function submit(data: IFormFields) {
    signInMuatation(data);
  }

  async function checkBiometric() {
    const isEnrolled = await biometric.isEnrolled();
    if (!isEnrolled) {
      setwarningBiometricModalVisibile(true);
    } else {
      setBiometricModalVisibile(true);
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

  useEffect(() => {
    if (isError) {
      setIsErrorModalVisible(true);
      setErrorMessage(`Failed with error code :  ${error.code}`);
    } else if (isSuccess) {
      setIsSuccessModalVisible(true);
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    const checkDeviceHasBiometric = async () => {
      const isDeviceHasBiometric = await biometric.hasHardware();
      if (isDeviceHasBiometric) {
        setIsDeviceHasBiometric(true);
      }
    };
    checkDeviceHasBiometric();
  }, []);

  return (
    <SafeAreaView edges={{ top: "off" }} style={styles.flex1}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.flex1}
          contentContainerStyle={styles.flexGrow1}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContainer}>
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
            <View>
              <Text
                style={[
                  styles.inputTitle,
                  styles.blackGrayText,
                  typography.bodyText1Regular,
                ]}
              >
                Email
              </Text>
              <FormInputTextController
                control={formControl}
                name="email"
                placeholder="Email"
              />
              <Text
                style={[
                  styles.inputTitle,
                  styles.blackGrayText,
                  styles.mt10,
                  typography.bodyText1Regular,
                ]}
              >
                Password
              </Text>
              <FormInputPasswordController
                control={formControl}
                name="password"
                placeholder="Password"
              />
              {isDeviceHasBiometric && (
                <View style={styles.biometricContainer}>
                  <TouchableOpacity
                    style={styles.centerAlign}
                    onPress={() => checkBiometric()}
                  >
                    <BiometricIcon />
                  </TouchableOpacity>
                  <Text
                    style={[typography.bodyText1Regular, styles.blackGrayText]}
                  >
                    Sign in with biometrics
                  </Text>
                </View>
              )}
            </View>
            <View style={[styles.fullWidth, styles.pt20]}>
              <Button
                title="Confirm"
                onPress={handleSubmit(submit)}
                containerStyle={styles.fullWidth}
                loading={isPending}
                disabled={!formState.isValid}
              />
              <View style={styles.rowContainer}>
                <Text
                  style={[
                    styles.blackGrayText,
                    typography.bodyText2Regular,
                    { marginTop: 10 },
                  ]}
                >
                  {" You don’t have an account ? "}
                </Text>
                <TouchableOpacity
                  style={styles.flexEnd}
                  onPress={() => router.push("/sign-up")}
                >
                  <Text style={[styles.pinkText, typography.bodyText2Regular]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Modal
            title="Sign In Error"
            subtitle={ErrorMessage}
            confirmButtonTitle="OK"
            icon={<InlineCircleExclamationIcon />}
            onClose={() => setIsErrorModalVisible(false)}
            visible={isErrorModalVisible}
            onConfirm={() => setIsErrorModalVisible(false)}
          />

          <Modal
            title="Logged In"
            subtitle="You have successfully logged in"
            confirmButtonTitle="Continue"
            icon={<CircleCheckIcon />}
            onClose={() => setIsSuccessModalVisible(false)}
            visible={isSuccessModalVisible}
            onConfirm={() => {
              setIsSuccessModalVisible(false);

              const timeoutId = setTimeout(() => {
                router.replace("ligands-list");
              }, 1);

              return () => clearTimeout(timeoutId);
            }}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
