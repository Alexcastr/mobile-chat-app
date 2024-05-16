import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { useAuth } from '../../context/authContext';
import { User, UserRole } from '@/interfaces/user';
import { StatusBar } from 'expo-status-bar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Chatlist from '@/components/Chatlist';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '@/firebase-config';
const Home = () => {
  const {  user } = useAuth();
  // console.log("el user", user)

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if(user?.uid) getUsers();


  } ,[]);

  async function getUsers() {
    const q =  query(usersRef, where('rol', '==', user?.rol));
    const querySnapshot = await getDocs(q);
    let data: User[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() } as User); // Asignar tipo User aquí
    });
    // setUsers(data); // Actualizar el estado de users con los datos obtenidos
    // console.log('gou users', data);
    setUsers(data);
  }
  return (
    <View className="flex-1 bg-white">
     <StatusBar style="auto" />
      {users.length > 0 ? (
        <Chatlist users={users} />
      ): (
        <View className='flex items-center' style={{top: hp(30)}}>
          <ActivityIndicator size='large' />
        </View>
      )}

    </View>
  );
};

export default Home
