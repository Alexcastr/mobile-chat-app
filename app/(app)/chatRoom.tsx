import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Alert
} from 'react-native';
import ChatRoomHeader from '@/components/ChatRoomHeader';
import MessageList from '@/components/MessageList';
import { User } from '@/interfaces/user';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '@/context/authContext';
import { getRoomId } from '@/utils/common';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '@/firebase-config';

const ChatRoom = () => {
  const item: any = useLocalSearchParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState<any>([]);
  const router = useRouter();
  const textRef = useRef<string>('');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    createRoomIfNotExists();
    let roomId = getRoomId(user?.uid, item.id);
    const docRef = doc(db, 'rooms', roomId);
    const messageRef = collection(docRef, 'messages');
    const q = query(messageRef, orderBy('createdAt', 'asc'));

    let unsub = onSnapshot(q, (snapshot)=>{
      let allMessages = snapshot.docs.map((doc) => doc.data());
      setMessages([...allMessages]);
    });

    return unsub;
  }, []);

  async function createRoomIfNotExists() {
    //roomid
    const roomId = getRoomId(user?.uid, item.id);
    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    });
  }

  async function handleSendMessage() {
    //roomid
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.uid, item.id);
      const docRef = doc(db, 'rooms', roomId);
      const messageRef = collection(docRef, 'messages');
      textRef.current = '';
     if(inputRef.current) inputRef?.current.clear();

      const newDoc = await addDoc(messageRef, {
        userId: user?.uid,
        text: message,
        profileUrl: user?.profileUrl,
        sendName: user?.username,
        createdAt: Timestamp.fromDate(new Date())
      });

      console.log('Document written with ID: ', newDoc.id);

      // console.log('Document written with ID: ', newDoc.id);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  }


  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View className=" border-b border-neutral-300" />
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessageList messages={messages} currentUser={user} />
        </View>
        <View style={{ marginBottom: hp(2.7) }} className="pt-2">
          <View className="flex-row justify-between bg-white border border-neutral-300 rounded-full pl-5 p-2 mx-3">
            <TextInput
              ref={inputRef}
              onChangeText={(value) => (textRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="flex-1 mr-2"
              placeholder="type message..."
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              className="bg-neutral-200 p-2 mr-[1px] rounded-full"
            >
              <Feather name="send" size={hp(2.7)} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatRoom;
