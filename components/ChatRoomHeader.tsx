import { User } from '@/interfaces/user';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface ChatRoomHeaderProps {
  user: User;
  router: any;
}

const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({ user, router }) => {
  return (
    <Stack.Screen
      options={{
        title: '',
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={hp(4)} color="#333" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-4">
              <Image
                className="rounded-full"
                source={
                  user.profileUrl
                    ? { uri: user.profileUrl }
                    : require('@/assets/empty_avatar.webp')
                }
                style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
              />
              <Text
                style={{ fontSize: hp(2.5) }}
                className="text-neutral-700 font-medium"
              >
                {user?.username}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View className="flex-row items-center gap-4">
            <Ionicons name="call" size={hp(2.5)} color="#333" />
            <Ionicons name="videocam" size={hp(2.5)} color="#333" />
          </View>
        )
      }}
    />
  );
};

export default ChatRoomHeader;
