import { Box, Pressable, IPressableProps } from "native-base";

type TypeProductProps = IPressableProps & {
  type: boolean;
}

export function TypeProduct({ type , ...rest}: TypeProductProps) {
  return(
    <Pressable
      h="20px"
      w="20px"
      borderRadius="full"
      borderWidth={2}
      borderColor={ type ? "blue.400" : "gray.400"}
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      { type ? 
      <Box
        h="13px"
        w="13px"
        borderRadius="full"
        bg="blue.400"
      >

      </Box>
      : 
      <></>
    }
    </Pressable>
  )
}