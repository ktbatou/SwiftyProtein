import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import useBackgroundLogout from "src/hooks/useBackgrounfLogout";
import { AppProvider } from "src/lib/AppContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  useBackgroundLogout();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </AppProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
