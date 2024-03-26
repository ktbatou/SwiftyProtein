import { router } from "expo-router";
import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

export default function useBackgroundLogout() {
  useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus) {
      if (nextAppState === "background") {
        router.replace("/choose-auth");
      }
    }

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);
}
