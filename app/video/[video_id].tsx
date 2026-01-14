import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Bookmark, Camera, CircleQuestionMark, CircleUserRound, Gem } from 'lucide-react-native';
import Abonner from './Abonner';
import { SwipeableCard } from '../../components/SwipeableCard';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function VideoScreen() {
  const [showCard, setShowCard] = useState(false);

  const ColorOptions = [
    'bg-pink-500',
    'bg-purple-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
  ];

  const getRandomColor = () => ColorOptions[Math.floor(Math.random() * ColorOptions.length)];

  const handleSwipeLeft = () => {
    console.log('Swiped left - Nej');
    // Delay hiding to let exit animation complete
    setTimeout(() => setShowCard(false), 300);
  };

  const handleSwipeRight = () => {
    console.log('Swiped right - Ja');
    // Delay hiding to let exit animation complete
    setTimeout(() => setShowCard(false), 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-start gap-4 bg-white px-4 pb-4 pt-6">
      <View className="flex aspect-video h-auto w-full items-center justify-center overflow-hidden rounded-3xl bg-slate-500">
        <Image
          source={require('@assets/end_video.jpg')}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>
      <View className="flex w-full flex-row justify-between gap-3 px-2">
        <Text className="text-xl font-bold">Hættemåger</Text>
        <View className="flex flex-row items-center gap-2">
          <Bookmark />
          <View className={`rounded-full ${getRandomColor()} p-1`}>
            <CircleUserRound color="white" height={25} width={25} />
          </View>
        </View>
      </View>
      <Abonner />
      <View className="flex aspect-square h-auto w-full flex-col items-center gap-10 rounded-3xl bg-lime-400 p-4">
        <View className="flex-col items-center justify-start">
          <Text className="p-4 text-center text-4xl font-bold text-white">Tegn Hættemåger</Text>
          <View className="flex flex-row items-center justify-center gap-2 rounded-full border border-gray-500 bg-gray-500/50 p-2">
            <Text className="text-lg font-bold text-white">+1500</Text>
            <Gem color="purple" />
          </View>
        </View>
        <View className="flex flex-col gap-4">
          <View className="mt-4 flex flex-row items-center justify-center gap-2 rounded-full bg-white p-4 shadow">
            <CircleQuestionMark color="green" />
            <Text className="font-blod text-center text-green-500">SÅDAN GØR DU</Text>
          </View>
          <View className="mt-4 flex flex-row items-center justify-center gap-2 rounded-full bg-white p-4 shadow">
            <Camera color="green" />
            <Text className="font-blod text-center text-green-500">DEL BILLEDE</Text>
          </View>
        </View>
      </View>

      {/* Swipeable Modal Card */}
      {showCard && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(300)}
          className="absolute inset-0 items-center justify-center bg-black/50">
          <SwipeableCard onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight}>
            <View className="position-relative items-center py-8 pt-12">
              <View className="absolute left-10 top-0 scale-90 overflow-hidden rounded-xl">
                <Image
                  source={require('@assets/images/bird2.jpg')}
                  className="h-32 w-32 rounded-xl"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 bg-black/20 " />
              </View>
              <View className="absolute right-10 top-0 scale-90 overflow-hidden rounded-xl">
                <Image
                  source={require('@assets/images/bird.jpg')}
                  className="h-32 w-32"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 bg-black/20 " />
              </View>
              <Image
                source={require('@assets/images/bird3.jpg')}
                className="absolute top-0 h-32 w-32 rounded-xl shadow-xl"
                resizeMode="cover"
              />
              <View className="mt-28 items-center justify-center px-6">
                <Text className="text-xl font-bold">Tegn din egen hættemåge</Text>
                <Text className="text-center text-gray-500">Del din tegning med andre bruger</Text>
              </View>
            </View>
          </SwipeableCard>
        </Animated.View>
      )}
    </View>
  );
}
