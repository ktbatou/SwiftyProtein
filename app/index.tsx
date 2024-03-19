import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import useLoadFonts from 'src/hooks/useLoadFonts';
import * as ExpoSplashScreen from "expo-splash-screen";
import { useEffect, useState } from 'react';


ExpoSplashScreen.preventAutoHideAsync();

export default function App() {
  const text = "Open up App.js to start working on your app!"
  const [fontsLoaded] = useLoadFonts();
  const [currentText, setCurrentText] = useState(text)
  useEffect(() => {
    if (fontsLoaded) {
      ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
