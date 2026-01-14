import { View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Check } from 'lucide-react-native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SIZE = 100;
const STROKE_WIDTH = 8;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function UploadScreen() {
  const router = useRouter();
  const progress = useSharedValue(0);
  const checkScale = useSharedValue(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 2000,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });

    const timer = setTimeout(() => {
      setIsComplete(true);
      checkScale.value = withSpring(1, {
        damping: 30,
        stiffness: 300,
      });
    }, 2000);

    const dismissTimer = setTimeout(() => {
      router.dismiss(2);
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearTimeout(dismissTimer);
    };
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }));
  const checkmarkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  return (
    <Pressable
      className="h-20 flex-1 items-center justify-center bg-transparent"
      onPress={() => router.dismiss(2)}>
      <View className="grid h-48 w-11/12 items-center justify-center gap-4 rounded-2xl bg-white p-4 shadow-lg shadow-black/25">
        <Text>Stærkt gået😄</Text>
        <View className="mb-4 items-center justify-center">
          <Svg width={SIZE} height={SIZE}>
            <Circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke="#E5E7EB"
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />
            <AnimatedCircle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke="#22C55E"
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              animatedProps={animatedProps}
              transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
            />
          </Svg>
          <Animated.View className="absolute items-center justify-center" style={checkmarkStyle}>
            {isComplete && <Check color="#22C55E" strokeWidth={4} size={40} />}
          </Animated.View>
        </View>
      </View>
    </Pressable>
  );
}
