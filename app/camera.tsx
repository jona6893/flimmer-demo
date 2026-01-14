import { View, Pressable, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { X, Zap, ZapOff, SwitchCamera, Circle, ImageIcon, Share } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function Camera() {
  const router = useRouter();
  const [photoTaken, setPhotoTaken] = useState(false);
  const flashOpacity = useSharedValue(0);

  const handleTakePhoto = () => {
    setPhotoTaken(true);
    flashOpacity.value = withSequence(
      withTiming(1, { duration: 50 }),
      withTiming(0, { duration: 300 })
    );
  };

  const handleConfirm = () => {
    console.log('Photo confirmed!');
    router.push('/uploadScreen');
  };

  const flashStyle = useAnimatedStyle(() => ({
    opacity: flashOpacity.value,
  }));
  return (
    <View className="flex-1 bg-black">
      <Image
        source={require('@assets/images/image1.jpg')}
        className="absolute inset-0 h-full w-full"
        resizeMode="cover"
      />

      <Animated.View
        pointerEvents="none"
        style={[flashStyle]}
        className="absolute inset-0 bg-white"
      />

      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="flex-row items-center justify-between px-4">
          <Pressable onPress={() => router.back()} className="rounded-full bg-black/40 p-3">
            <X color="white" size={24} />
          </Pressable>

          <View className="rounded-full bg-black/40 p-3">
            <ZapOff color="white" size={24} />
          </View>
        </View>

        <View className="flex-1 items-center justify-center"></View>

        <View className="px-4 pb-8">
          {!photoTaken ? (
            <View className="flex-row items-center justify-between">
              <View className="rounded-full bg-black/40 p-4">
                <ImageIcon color="white" size={28} />
              </View>

              <Pressable
                onPress={handleTakePhoto}
                className="rounded-full border-4 border-white bg-white/20 p-1">
                <Circle color="white" fill="white" size={64} />
              </Pressable>

              <View className="rounded-full bg-black/40 p-4">
                <SwitchCamera color="white" size={28} />
              </View>
            </View>
          ) : (
            <View className="flex-row items-center justify-center gap-12">
              <Pressable
                onPress={handleConfirm}
                className="flex flex-row items-center gap-2 rounded-full bg-green-500 p-5">
                <Share color="white" size={30} />
                <Text className="text-2xl font-bold text-white">Del Billede</Text>
              </Pressable>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
