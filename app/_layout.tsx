import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import "../global.css"
import { AuthContextProvider, useAuth } from '../context/authContext';
import { MenuProvider } from 'react-native-popup-menu';
const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return;

    setAuthReady(true);

    const inApp = segments[0] === '(app)';

    if (isAuthenticated && !inApp) {
      router.replace('/home');
    } else if (isAuthenticated === false && authReady) {
      router.replace('/signIn');
    }
  }, [isAuthenticated, authReady]);

  return authReady ? <Slot /> : <Slot />;
};

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}
