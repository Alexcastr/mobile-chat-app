import { Stack } from 'expo-router';
import HomeHeader from '@/components/HomeHeader';

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{ header: () => <HomeHeader /> }}
      ></Stack.Screen>
    </Stack>
  );
};

export default _layout;
