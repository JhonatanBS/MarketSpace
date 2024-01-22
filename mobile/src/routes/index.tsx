import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Box, useTheme } from "native-base";

import { AuthContext } from "@contexts/AuthContext";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useContext } from "react";

export function Routes() {
  const { colors } = useTheme();

  const dataContext = useContext(AuthContext);

  console.log(dataContext)

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[600]

  return(
    <Box flex={1} bg="gray.600"> 
      <NavigationContainer theme={theme}>
        <AppRoutes />
      </NavigationContainer>
    </Box>
  )
}