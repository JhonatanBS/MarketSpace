import { Center, Spinner, useTheme } from "native-base";

export function Loading() {
  const { colors } = useTheme();
  return(
    <Center flex={1} backgroundColor={colors.gray[600]}>
      <Spinner 
        color={colors.blue[800]} 
        size="xl" 
      />
    </Center>
  )
}
