import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { SignIn } from "@screens/SignIn";
import { useTheme } from "native-base";
import { House, SignOut, Tag } from "phosphor-react-native";
import { Platform } from "react-native";

type AuthRoutesProps = {
  home: undefined;
  myAds: undefined;
  logout: undefined;
}

export type AuthNavigatorRoutesProps = BottomTabNavigationProp<AuthRoutesProps>;

const { Screen, Navigator } = createBottomTabNavigator<AuthRoutesProps>();

export function AppRoutes() {
  const { colors , sizes } = useTheme();

  return(
    <Navigator screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.gray[200],
      tabBarInactiveTintColor: colors.gray[400],
      tabBarStyle: {
        backgroundColor: colors.gray[700],
        borderTopWidth: 0,
        height: Platform.OS === "android" ? "auto" : 96,
        paddingBottom: sizes[8],
        paddingTop: sizes[8]
      }
      }}>
      <Screen 
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <House color={color} size={26}/>
          )
        }}
      />

      <Screen 
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({color}) => (
            <Tag color={color} size={26}/>
          )
        }}
      />

      <Screen 
        name="logout"
        component={SignIn}
        options={{
          tabBarIcon: ({color}) => (
            <SignOut color={colors.red[400]} size={26}/>
          )
        }}
      />

    </Navigator>
  )
}