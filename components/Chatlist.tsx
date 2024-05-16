import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { User } from '@/interfaces/user';
import ChatItem from './ChatItem';
import { useRouter } from 'expo-router';


interface Props {
  users: User[];
}

const Chatlist: React.FC<Props> = ({ users }) => {

  const router = useRouter();
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1 }}
        keyExtractor={() => Math.random().toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            router={router}
            noBorder={index + 1 == users.length}
            item={item}
            index={index}
          />
        )}
      />
    </View>
  );
}

export default Chatlist;
