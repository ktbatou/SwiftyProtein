import useLoadFonts from "src/hooks/useLoadFonts";
import { useEffect, useState } from "react";
import * as ExpoSplashScreen from "expo-splash-screen";
import SplashScreen from "@components/splashScreen";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

ExpoSplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useLoadFonts();
  const [splashVisible, setSplashVisible] = useState(true);
  const [isFirstLaunch, setFirstLaunch] = useState(false);

  const checkFirstLaunch = async () => {
    const _first_launch = await AsyncStorage.getItem("FIRST_LAUNCH");

    if (!_first_launch) {
      AsyncStorage.setItem("FIRST_LAUNCH", "Done");
      setFirstLaunch(true);
    } else {
      setFirstLaunch(false);
    }
  };

  useEffect(() => {
    if (fontsLoaded || fontError) {
      ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setSplashVisible(false);
    }, 3500);
    return () => clearTimeout(splashTimeout);
  });

  if (splashVisible) {
    return <SplashScreen />;
  } else {
    if (isFirstLaunch) {
      return <Redirect href={"/sign-up"} />;
    } else {
      return <Redirect href={"/choose-auth"} />;
    }
  }
}
