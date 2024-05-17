import { View, Text, ScrollView } from 'react-native'
import MessageItem from './MessageItem'
import { User } from '@/interfaces/user'

interface Props {
  messages: any[]
  currentUser: User | null

}

const MessageList: React.FC<Props> = ({ messages, currentUser }) => {



  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message, index) => {
        return (
          <MessageItem
            key={index}
            message={message}
            currentUser={currentUser}
          />
        );
      })}
    </ScrollView>
  );
};

export default MessageList;
