import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import useBackgroundLogout from "src/hooks/useBackgrounfLogout";

const queryClient = new QueryClient();

export default function RootLayout() {
  useBackgroundLogout();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
