import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@routes/AuthSignUp/styles";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import logoSource from "@images/molecule.png";
import Button from "@components/Button";
import typography from "@styles/typography";
import FormInputTextController from "@components/containers/FormInputTextController";
import useSignUpForm from "@routes/AuthSignUp/hooks/useSignUpForm";
import FormInputPasswordController from "@components/containers/FormInputPasswordController";

export default function SignUp() {
  const { control: formControl, handleSubmit } = useSignUpForm();
  
  function submit() {}
  return (
    <SafeAreaView edges={{ top: "off" }} style={styles.flex1}>
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image source={logoSource} />
          <Text style={[typography.heading1Regular, styles.pinkText]}>
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
        <View style={{ width: "100%" }}>
          <Button
            title="confirm"
            onPress={handleSubmit(submit)}
            containerStyle={{ width: "100%" }}
          />
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Text
              style={[
                styles.blackGrayText,
                typography.bodyText2Regular,
                { marginTop: 10 },
              ]}
            >
              {"Already have an account ? "}
            </Text>
            <TouchableOpacity style={{ justifyContent: "flex-end" }}>
              <Text style={[styles.pinkText, typography.bodyText2Regular]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
