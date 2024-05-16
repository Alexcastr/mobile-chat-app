import { User } from '@/interfaces/user';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

// For use the cache images we need to import the Image from expo-image
import { Image } from 'expo-image';
import { blurhash } from '@/utils/common';



interface Props {
  item: User;
  index: number;
  router: any;
  noBorder: boolean;
}
const ChatItem: React.FC<Props> = ({ item, index, router, noBorder }) => {

  const source = item.profileUrl ? { uri: item.profileUrl } : require('@/assets/empty_avatar.webp');

  function openChatRoom() {
    router.push({pathname: "/chatRoom", params: item});
  }
  return (
    <TouchableOpacity
    onPress={openChatRoom}
      className={`mt-4 flex-row justify-between mx-6 gap-3 items-center mb-4 pb-2${
        noBorder ? '' : ' border-b  border-b-neutral-200'
      }`}
    >
      <Image
        className="rounded-full"
        source={source}
        style={{ height: hp(6), width: hp(6), borderRadius:100 }}
        placeholder={blurhash}
        transition={500}
      />

      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            className="font-semibold text-neutral-800"
            style={{ fontSize: hp(1.8) }}
          >
           {item?.username}
          </Text>
          <Text
            
            className="font-medium text-neutral-800"
            style={{ fontSize: hp(1.6) }}
            
          >
            Time
          </Text>
        </View>
        <Text
          className="font-medium text-neutral-800"
          style={{ fontSize: hp(1.6) }}
        >
          Last messages
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
