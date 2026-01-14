import { ReactNode, useEffect } from 'react';
import { Text, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

interface SwipeableCardProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  children?: ReactNode;
}

export const SwipeableCard = ({ onSwipeLeft, onSwipeRight, children }: SwipeableCardProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);
  const router = useRouter();

  useEffect(() => {
    scale.value = withTiming(1, {
      duration: 400,
      easing: Easing.bezier(0.39, 0.575, 0.565, 1.0),
    });
    opacity.value = withTiming(1, { duration: 200 });
  }, [opacity, scale]);

  const handleSwipeRight = () => {
    if (onSwipeRight) onSwipeRight();
    router.push('/camera');
  };

  const handleSwipeLeft = () => {
    if (onSwipeLeft) onSwipeLeft();
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 300 });
        translateY.value = withTiming(-50, { duration: 300 });
        opacity.value = withTiming(0, { duration: 250 }, () => {
          runOnJS(handleSwipeRight)();
        });
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 300 });
        translateY.value = withTiming(-50, { duration: 300 });
        opacity.value = withTiming(0, { duration: 250 }, () => {
          runOnJS(handleSwipeLeft)();
        });
      } else {

        translateX.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${interpolate(translateX.value, [-SCREEN_WIDTH, 0, SCREEN_WIDTH], [-20, 0, 20])}deg` },
    ],
  }));

  const leftLabelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0]),
  }));

  const rightLabelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1]),
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        className="w-11/12 min-h-[200px] bg-white rounded-3xl p-5 shadow-lg shadow-black/25"
        style={cardStyle}
      >
        <Animated.View
          className="absolute top-5 right-5 z-10 px-3 py-2 rounded-lg border-[3px] border-red-500 bg-white"
          style={leftLabelStyle}
        >
          <Text className="text-xl font-bold text-red-500">Måske Senere</Text>
        </Animated.View>
        <Animated.View
          className="absolute top-5 left-5 z-10 px-3 py-2 rounded-lg border-[3px] border-green-500 bg-white"
          style={rightLabelStyle}
        >
          <Text className="text-xl font-bold text-green-500">Lad os Gøre Det!</Text>
        </Animated.View>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};