import { User } from '@/interfaces/user';
import { View, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface Props {
  message: any;
  currentUser: User | null;
}

const MessageItem: React.FC<Props> = ({ message, currentUser }) => {

  console.log("message", message, "currentUser", currentUser)
  if (currentUser?.username != message?.sendName) {
    // Mensaje del usuario actual
    return (
      <View className="flex-row justify-end mb-3 mr-3">
        <View style={{ width: hp(80) }}>
          <View className="flex self-end p-3 rounded-2xl bg-white border-neutral-200">
            <Text style={{ fontSize: hp(1.9) }} className="text-black">
              {message.text}
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    // Mensaje de otro usuario
    console.log("entre al else")
    return (
      <View style={{ width: wp(80) }} className="ml-3 mb-3">
        <View className="flex self-start p-3 px-4 rounded-2xl bg-indigo-100 border border-indigo-300">
          <Text style={{ fontSize: hp(1.9) }}>{message.text}</Text>
        </View>
      </View>
    );
  }
};

export default MessageItem;
