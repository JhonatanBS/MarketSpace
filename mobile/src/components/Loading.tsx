import { Center, Spinner } from "native-base";

import { THEME } from "../theme/index";

export function Loading() {
  return(
    <Center flex={1} backgroundColor={THEME.colors.gray[600]}>
      <Spinner 
        color={THEME.colors.blue.dark} 
        size="xl" 
      />
    </Center>
  )
}
