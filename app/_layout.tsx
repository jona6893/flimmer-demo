import { Stack, useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import '../global.css';
import { Pressable, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native/icons';

export default function RootLayout() {
  const router = useRouter();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
          <Stack.Screen
            name="video/[video_id]"
            options={{
              title: 'Flimmer',
              headerShadowVisible: false,
              headerLeft: () => (
                <Pressable onPress={() => router.back()}>
                  <View className=" rounded-full bg-white p-2 px-4 shadow-sm shadow-black/25">
                    <ArrowLeft />
                  </View>
                </Pressable>
              ),
            }}
          />
          <Stack.Screen
            name="camera"
            options={{
              title: 'Kamera',
              headerShown: false,
              animation: 'slide_from_bottom',
              presentation: 'card',
              gestureEnabled: true,
              gestureDirection: 'vertical',
              fullScreenGestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="uploadScreen"
            options={{
              title: 'Upload',
              headerShown: false,
              animation: 'fade',
              presentation: 'transparentModal',
              gestureEnabled: true,
              gestureDirection: 'vertical',
              fullScreenGestureEnabled: true,
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
