import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { CircleUserRound } from 'lucide-react-native';
import { ReactNode } from 'react';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: ReactNode;
};

const ColorOptions = [
  'bg-pink-500',
  'bg-purple-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
];

const getRandomColor = () => ColorOptions[Math.floor(Math.random() * ColorOptions.length)];

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  const router = useRouter();
  return (
    <ScrollView>
      <View className="flex flex-col gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} className={styles.container}>
            <Pressable
              key={index}
              className={`transition-transform active:scale-[0.98] ${styles.video}`}
              onPress={() => {
                router.push(`/video/${index + 1}`);
              }}>
              <View className={styles.video}>
                <Image
                  source={require('@assets/thumbnail.jpg')}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              </View>
            </Pressable>
            <View className="flex flex-row items-start gap-3">
              <View className={`rounded-full ${getRandomColor()} p-1`}>
                <CircleUserRound color="white" height={35} width={35} />
              </View>
              <View className="grid gap-2">
                <Text>Lærerig Video #{index + 1}</Text>
                <Text className="text-gray-600">{Math.floor(Math.random() * 18) + 3} Minutter</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = {
  container: 'grid gap-3 cursor-pointer scale-100 hover:scale-[1.02] transition-transform',
  video:
    'aspect-video h-auto w-full overflow-hidden rounded-3xl bg-slate-500 flex items-center justify-center',
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
