import { View, Text, Platform } from 'react-native';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import CustomMenuItems from './CustomMenuItems';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useAuth } from '@/context/authContext';

const ios = Platform.OS === 'ios';

const HomeHeader = () => {

  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
  }
  return (
    <View
      style={{ paddingTop: ios ? hp(10) : hp(8), paddingBottom: hp(2) }}
      className="flex-row justify-between px-5 bg-indigo-400 rounded-b-3xl shadow "
    >
      <View>
        <Text className="font-medium text-white" style={{ fontSize: hp(3) }}>
   
          Chats
        </Text>
      </View>
      <Menu>
      <MenuTrigger >
        <Image
        style={{height: hp(4.3), aspectRatio:1, borderRadius: 100 }}
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      </MenuTrigger>
      <MenuOptions  customStyles={{
        optionsContainer:{
          borderRadius: 10,
          borderCurve:"continuous",
          marginTop: 40,
          marginLeft:-30,
          backgroundColor: "#fff",
          shadowOpacity: 0.5,
          shadowOffset: { width: 0, height: 2 },
          width:160
        }
      }}>
        <CustomMenuItems 
          text="Profile"
          action={() => {}}
          value="profile"
          icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
        />
        <Divider />
        <CustomMenuItems
          text="Logout"
          action={handleLogout}
          value="settings"
          icon={<AntDesign name="logout" size={hp(2.5)} color="gray" />}
        />
      </MenuOptions>
    </Menu>
      
    </View>
   
  );
};

const Divider = () => <View className="p-[1px] bg-neutral-200 w-full" />;

export default HomeHeader;
