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
import { InlineCircleExclamationIcon } from "@components/icons";
import useSignInMutation from "@routes/SignIn/services/useSignInMuation";
import { router } from "expo-router";

export default function SignIn() {
  const { control: formControl, handleSubmit } = useSignInForm();
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("Sign in failed");

  const {
    mutate: SignInMuatation,
    isSuccess,
    isPending,
    isError,
    error,
  } = useSignInMutation();

  function submit(data: IFormFields) {
    SignInMuatation(data);
  }

  useEffect(() => {
    if (isError) {
      setIsErrorModalVisible(true);
      setErrorMessage(`Failed with error code :  ${error.code}`);
    }
  }, [isError]);

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
            </View>
            <View style={[styles.fullWidth, styles.pt20]}>
              <Button
                title="confirm"
                onPress={handleSubmit(submit)}
                containerStyle={styles.fullWidth}
                loading={isPending}
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
                  onPress={() => router.push("/signUp")}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
