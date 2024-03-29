import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { useTheme } from "native-base";

import { House, SignOut, Tag } from "phosphor-react-native";

import { Home } from "@screens/Home";
import { MyAds } from "@screens/MyAds";
import { Loading } from "@components/Loading";

import { Platform } from "react-native";
import { CreateAd } from "@screens/CreateAd";
import { DetailsMyAds } from "@screens/DetailsMyAds";
import { EditAd } from "@screens/EditAd";
import { PublicAd } from "@screens/PublishAd";
import { useAuth } from "@hooks/useAuth";
import { Logout } from "@screens/Logout";
import { ProductDTO } from "@dtos/ProductDTO";
import { IdDTO } from "@dtos/IdDTO";
import { ShowOneAdUser } from "@screens/ShowOneAdUser";

type AuthRoutesProps = {
  home: undefined;
  myAds: undefined;
  logout: undefined;
  createAd: undefined;
  editAd: ProductDTO;
  detailsMyAds: IdDTO;
  publishAd: ProductDTO;
  showOneAdUser: IdDTO;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AuthRoutesProps>;

const { Screen, Navigator } = createBottomTabNavigator<AuthRoutesProps>();

export function AppRoutes() {
  const { colors , sizes } = useTheme();

  const { signOut } = useAuth();

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
        paddingTop: sizes[8],
      },
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
        component={Logout}
        options={{
          tabBarIcon: ({color}) => (
            <SignOut color={colors.red[400]} size={26}/>
          )
        }}
      />

      <Screen 
        name="createAd"
        component={CreateAd}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: "none"}
        }}
      />

      <Screen 
        name="publishAd"
        component={PublicAd}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: "none"}
        }}
      />

      <Screen 
        name="editAd"
        component={EditAd}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: "none"}
        }}
      />

      <Screen 
        name="detailsMyAds"
        component={DetailsMyAds}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: "none"}
        }}
      />

<Screen 
        name="showOneAdUser"
        component={ShowOneAdUser}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: "none"}
        }}
      />

    </Navigator>
  )
}