import { StatusBar } from 'react-native';

import { NativeBaseProvider } from "native-base";

import { Karla_700Bold, Karla_400Regular, useFonts} from "@expo-google-fonts/karla";

import { THEME } from './src/theme';

import { Loading } from "@components/Loading";

import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        translucent
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        />
        <AuthContextProvider>
          { fontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
        
    </NativeBaseProvider>
  );
}
