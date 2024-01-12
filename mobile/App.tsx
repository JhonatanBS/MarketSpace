import { Text, View , StatusBar } from 'react-native';

import { Karla_700Bold, Karla_400Regular, useFonts} from "@expo-google-fonts/karla";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <View>
      <StatusBar 
        translucent
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
        />
        <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}
