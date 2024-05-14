import { View } from 'react-native';
import LotttieView from 'lottie-react-native';

interface LoadingProps {
  size: number;
}

export const Loading: React.FC<LoadingProps> = ({ size }) => {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LotttieView
        style={{ flex: 1 }}
        source={require('../assets/loading.json')}
        autoPlay
        loop
      />
    </View>
  );
};
