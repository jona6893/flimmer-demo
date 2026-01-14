import { Bell, Bot } from 'lucide-react-native/icons';
import { Text, View } from 'react-native';

function Abonner() {
  return (
    <View className="flex h-16 w-full flex-row items-center justify-between rounded-3xl border border-emerald-300 bg-emerald-50 p-2">
      <View className="flex flex-row items-center gap-2">
        <View className="rounded-full bg-blue-600 p-2">
          <Bot size={24} color="white" />
        </View>
        <Text>99 Arter</Text>
      </View>
      <View className="flex-row items-center gap-2 rounded-full bg-orange-400 px-4 py-2">
        <Bell size={18} />
        <Text className="font-bold">Abonnér</Text>
      </View>
    </View>
  );
}

export default Abonner;
