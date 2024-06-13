import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/contexts/AuthContext";
import Toast from "react-native-toast-message";
import { useNavigation } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const navigation = useNavigation();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // Set the initial page using useNavigate
      navigation.navigate("onboarding/index");
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "light" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="onboarding/index" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding/second" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding/third" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding/fourth" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding/fifth" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding/last" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="store/index" options={{ headerShown: false }} />
            <Stack.Screen name="item/index" options={{ headerShown: false }} />
            {/* <Stack.Screen name="Rating/order" options={{ headerShown: false }} /> */}
            <Stack.Screen
              name="rating/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="register/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="login/index" options={{ headerShown: false }} />
            <Stack.Screen
              name="orderconfirmation/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="interactive-map/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </AuthProvider>
      <Toast />
    </>
  );
}
