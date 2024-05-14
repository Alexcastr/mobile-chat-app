import { useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomKeywordView from '@/components/CustomKeywordView';
import { Loading } from '../components/Loading';
import { useAuth } from '@/context/authContext';

const Signin = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleLogin() {
    if(!emailRef.current || !passwordRef.current ) {
      Alert.alert("sing in", "Please fill all the fields");
      return;
    }
    // login process

    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    
    setLoading(false);
   if(!response.success) {
     Alert.alert("sign in error", `${response.data}`);
     return;
   }

  }
  const router = useRouter();
  return (
    <CustomKeywordView>
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >
        <View className="items-center">
          <Image
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={require('../assets/login.png')}
          />
        </View>
        <View className="gap-10">
          <Text
            className="font-bold tracking-wider text-center text-neutral-800"
            style={{ fontSize: hp(4) }}
          ></Text>
          {/* inputs  */}
          <View className="gap-4">
            <View
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
              style={{ height: hp(7) }}
            >
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                placeholder="Email address"
                style={{ fontSize: hp(2.2) }}
                className="flex-1 font-bold text-neutral-700"
                placeholderTextColor={'gray'}
                keyboardType="email-address"
              />
            </View>
            <View className="gap-3">
              <View
                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
                style={{ height: hp(7) }}
              >
                <Octicons name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  placeholder="Password"
                  style={{ fontSize: hp(2.2) }}
                  className="flex-1 font-bold text-neutral-700"
                  placeholderTextColor={'gray'}
                  secureTextEntry={true}
                />
              </View>
              <Text
                className="text-right font-semibold text-neutral-500"
                style={{ fontSize: hp(1.8) }}
              >
                Forgot password?
              </Text>
            </View>
            {/* Submit button  */}

            <View>
              {loading ? (
                <View className='flex-row justify-center'>
                  <Loading size={hp(8)} />
           
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{ height: hp(6.5) }}
                  className="bg-indigo-500 rounded-xl justify-center items-center"
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    Sign in
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* sing up text  */}

            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Do not have an account?{' '}
              </Text>
              <Pressable onPress={() => router.push('/singUp')}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500"
                >
                  Sing up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeywordView>
  );
};

export default Signin;
