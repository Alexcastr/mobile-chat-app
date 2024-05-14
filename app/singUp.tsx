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
import { Loading } from '@/components/Loading';
import { useAuth } from '@/context/authContext';


const SignUp = () => {

  const { register } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister() {
    if(!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert("sing up", "Please fill all the fields");
      return;
    }
    setLoading(true);
    let response = await register(emailRef.current, passwordRef.current, usernameRef.current);
    // console.log("response", response);
    setLoading(false);
    if(!response.success) {
      Alert.alert("sign up error", `${response.data}`);
      return;
    }

  }
  return (
    <CustomKeywordView>
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >
        <View className="items-center">
          <Image
            style={{ height: hp(20) }}
            resizeMode="contain"
            source={require('../assets/register.png')}
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
              <Octicons name="person" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (usernameRef.current = value)}
                placeholder="User name"
                style={{ fontSize: hp(2.2) }}
                className="flex-1 font-bold text-neutral-700"
                placeholderTextColor={'gray'}
              />
            </View>
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

            {/* Submit button  */}

            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(8)} />
            
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleRegister}
                  style={{ height: hp(6.5) }}
                  className="bg-indigo-500 rounded-xl justify-center items-center"
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    Sign Up
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
                Already have an account?
              </Text>
              <Pressable onPress={() => router.push('/signIn')}>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-indigo-500"
                >
                  Sing In
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeywordView>
  );
};

export default SignUp;
