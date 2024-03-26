import useLoadFonts from "src/hooks/useLoadFonts";
import { useEffect, useState } from "react";
import * as ExpoSplashScreen from "expo-splash-screen";
import SplashScreen from "@components/splashScreen";
import { Redirect } from "expo-router";

ExpoSplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useLoadFonts();
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setSplashVisible(false);
    }, 3500);
    return () => clearTimeout(splashTimeout);
  });

  if (splashVisible) {
    return <SplashScreen />;
  } else {
    return <Redirect href={"/choose-auth"} />;
  }
}
