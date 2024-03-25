import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@routes/SignIn/styles";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import logoSource from "@images/molecule.png";
import Button from "@components/Button";
import typography from "@styles/typography";
import FormInputTextController from "@components/containers/FormInputTextController";
import useSignInForm from "@routes/SignIn/hooks/useSignInForm";
import FormInputPasswordController from "@components/containers/FormInputPasswordController";
import { useState } from "react";
import Modal from "@components/Modal";
import { BiomitricIcon } from "@components/icons";

export default function SignIn() {
  const { control: formControl, handleSubmit } = useSignInForm();
  const [isVisibile, setIsVisible] = useState(false);

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
        </View>
        <View style={{ width: "100%" }}>
          <Button
            title="confirm"
            onPress={()=>{setIsVisible(true)}}
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
              {" You don’t have an account ? "}
            </Text>
            <TouchableOpacity style={{ justifyContent: "flex-end" }}>
              <Text style={[styles.pinkText, typography.bodyText2Regular]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        title="Biometric authentication"
        subtitle='Enable biometric authentication in your settings to log into your account.'
        confirmButtonTitle="Confirm"
        icon={<BiomitricIcon />}
        onClose={() => setIsVisible(false)}
        visible={isVisibile}
        onConfirm={() => setIsVisible(false)}
      />
    </SafeAreaView>
  );
}
