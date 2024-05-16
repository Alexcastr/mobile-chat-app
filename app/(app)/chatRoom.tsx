import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

const ChatRoom = () => {

  const item = useLocalSearchParams()
  console.log("got item", item)
  return (
    <View>
      <Text>ChatRoom</Text>
    </View>
  )
}

export default ChatRoom
