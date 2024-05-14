import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext';

const Home = () => {

  const {logout, user} = useAuth()

  console.log("user from home", user)

  const handleLogout = async () => {
   await logout()
  
  }
  return (
    <View className='flex-1 bg-white'>
      <Text>Home</Text>
      {/* <Button title="Sign out" onPress={handleLogout} /> */}
      <Pressable onPress={handleLogout}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  )
}

export default Home
