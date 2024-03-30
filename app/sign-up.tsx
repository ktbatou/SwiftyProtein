import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@routes/SignUp/styles";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import logoSource from "@images/molecule.png";
import Button from "@components/Button";
import typography from "@styles/typography";
import FormInputTextController from "@components/containers/FormInputTextController";
import useSignUpForm, { IFormFields } from "@routes/SignUp/hooks/useSignUpForm";
import FormInputPasswordController from "@components/containers/FormInputPasswordController";
import useSignUpMutation from "@routes/SignUp/services/useSignUpMutation";
import { useEffect, useState } from "react";
import {
  CircleCheckIcon,
  InlineCircleExclamationIcon,
} from "@components/icons";
import Modal from "@components/Modal";
import { router } from "expo-router";
import UseBiometricsAuth from "src/hooks/useBiometricsAuth";
import Loader from "@components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp() {
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("Sign Up failed");
  const [warningBiometricModalVisibile, setwarningBiometricModalVisibile] =
    useState(false);
  const [BiometricModalVisibile, setBiometricModalVisibile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAppFirstLaunch, setIsAppFirstLaunch] = useState(false);

  const { control: formControl, handleSubmit } = useSignUpForm();
  const biometric = UseBiometricsAuth();

  const {
    mutate: signUpMuatation,
    isSuccess,
    isPending,
    isError,
    error,
  } = useSignUpMutation();

  function submit(data: IFormFields) {
    signUpMuatation(data);
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
    const checkFirstLaunch = async () => {
      const _first_launch = await AsyncStorage.getItem("ALREADY_LAUNCH");

      if (!_first_launch) {
        AsyncStorage.setItem("ALREADY_LAUNCH", "TRUE");
        setIsAppFirstLaunch(true);
      } else {
        setIsAppFirstLaunch(false);
      }
    };
    checkFirstLaunch();
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
              <Text
                style={[
                  styles.inputTitle,
                  styles.blackGrayText,
                  styles.mt10,
                  typography.bodyText1Regular,
                ]}
              >
                Confirm password
              </Text>
              <FormInputPasswordController
                control={formControl}
                name="confirmPassword"
                placeholder="Confirm password"
              />
            </View>
            <View style={[styles.fullWidth, styles.pt20]}>
              <Button
                title="Confirm"
                onPress={handleSubmit(submit)}
                containerStyle={styles.fullWidth}
                loading={isPending}
              />
              {!isAppFirstLaunch && (
                <View style={styles.rowContainer}>
                  <Text
                    style={[
                      styles.blackGrayText,
                      typography.bodyText2Regular,
                      { marginTop: 10 },
                    ]}
                  >
                    {"Already have an account ? "}
                  </Text>
                  <TouchableOpacity
                    style={styles.flexEnd}
                    onPress={() => router.replace("sign-in")}
                  >
                    <Text
                      style={[styles.pinkText, typography.bodyText2Regular]}
                    >
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          <Modal
            title="Oops ! Error"
            subtitle={
              ErrorMessage ? ErrorMessage : "An error occured, try again"
            }
            confirmButtonTitle="OK"
            icon={<InlineCircleExclamationIcon />}
            onClose={() => setIsErrorModalVisible(false)}
            visible={isErrorModalVisible}
            onConfirm={() => setIsErrorModalVisible(false)}
          />

          <Modal
            title="Great !"
            subtitle="Your account has been created successfully"
            confirmButtonTitle="Continue"
            icon={<CircleCheckIcon />}
            onClose={() => setIsSuccessModalVisible(false)}
            visible={isSuccessModalVisible}
            onConfirm={() => {
              setIsSuccessModalVisible(false);

              const timeoutId = setTimeout(() => {
                router.replace("sign-in");
              }, 1);

              return () => clearTimeout(timeoutId);
            }}
          />

          <Loader isVisible={isLoading} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
