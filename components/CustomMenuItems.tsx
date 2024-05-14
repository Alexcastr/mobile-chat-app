import { View, Text } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface CustomMenuItemsProps {
  text: string;
  action: (value: string) => void;
  value: string;
  icon: string | JSX.Element;
}
const CustomMenuItems: React.FC<CustomMenuItemsProps> = ({
  text,
  action,
  value,
  icon
}) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="px-4 py-1 flex-row justify-between items-center">
        <Text className='font-semibold text-neutral-600' style={{fontSize: hp(1.7)}}>{text}</Text>
        {icon}
      </View>
    </MenuOption>
  );
};

export default CustomMenuItems;
