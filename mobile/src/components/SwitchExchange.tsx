import { Box, Pressable, IPressableProps } from "native-base";

type PropsSwitch = IPressableProps & {
  type: boolean;
}

export function SwitchExchange( { type , ...rest}: PropsSwitch ) {
  return(
    <Pressable
      h="28px"
      w="50px"
      borderRadius="full"
      bg={ type ? "blue.400" : "gray.500"}
      borderWidth={0}
      justifyContent="center"
      px="2px"
      alignItems={type ? "flex-end" : "flex-start"}
      {...rest}
    >
      <Box
        h="24px"
        w="24px"
        borderRadius="full"
        bg="gray.700"
        borderWidth={0}
      >
        
      </Box>
    </Pressable>
  )
}