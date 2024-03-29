import * as LocalAuthentication from "expo-local-authentication";

export default function UseBiometricsAuth() {
  async function isEnrolled() {
    return await LocalAuthentication.isEnrolledAsync();
  }

  async function Auth() {
    return await LocalAuthentication.authenticateAsync();
  }

  async function hasHardware() {
    return await LocalAuthentication.hasHardwareAsync();
  }
  return { isEnrolled, Auth, hasHardware };
}
