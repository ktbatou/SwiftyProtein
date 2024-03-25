import useLoadFonts from "src/hooks/useLoadFonts";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import SplashScreen from "@components/splashScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignIn from "./signIn";

const queryClient = new QueryClient();

ExpoSplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useLoadFonts();

  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      ExpoSplashScreen.hideAsync();

      const splashTimeout = setTimeout(() => {
        setSplashVisible(false);
      }, 3500);
      return () => clearTimeout(splashTimeout);
    }
  }, [fontsLoaded]);

  if (splashVisible) {
    return <SplashScreen />;
  } else
    return (
      <QueryClientProvider client={queryClient}>
        <SignIn />
      </QueryClientProvider>
    );
}
