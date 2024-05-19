import  { useEffect, useState } from 'react';
import { User } from '@/interfaces/user';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

// For use the cache images we need to import the Image from expo-image
import { Image } from 'expo-image';
import { blurhash, getRoomId } from '@/utils/common';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useAuth } from '@/context/authContext';



interface Props {
  item: User;
  index: number;
  router: any;
  noBorder: boolean;
}
const ChatItem: React.FC<Props> = ({ item, index, router, noBorder }) => {

  const [lastMessage, setLastMessage] = useState<any>(undefined);
  const user = useAuth()
  const source = item.profileUrl ? { uri: item.profileUrl } : require('@/assets/empty_avatar.webp');
  useEffect(() => {
 
    let roomId = getRoomId(user?.user?.uid, item.uid);
    const docRef = doc(db, 'rooms', roomId);
    const messageRef = collection(docRef, 'messages');
    const q = query(messageRef, orderBy('createdAt', 'desc'));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0]? allMessages[0] : null);
    });

    return unsub;
  }, []);

  // console.log("lastMessage", lastMessage)
  function renderTime() {
    return "Time"
  }

  function renderLastMessage() {
    if (typeof lastMessage === 'undefined') 'Loading...';
    if (lastMessage) {
      if (user.user?.uid === lastMessage.uid) return `You: ${lastMessage.text}`;
      return lastMessage.text;
    } else {
      return 'Say hi 🖐️';
    }
  }
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
            {renderTime()}
          </Text>
        </View>
        <Text
          className="font-medium text-neutral-800"
          style={{ fontSize: hp(1.6) }}
        >
      {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
