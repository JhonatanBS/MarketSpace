import { FormControl, IInputProps, Input as NativeBaseInput } from "native-base";

type Props = IInputProps;

export function InputForm({...rest}: Props) {
  return(
    <FormControl>
      <NativeBaseInput 
        h="45px"
        bg="gray.700"
        px="16px"
        py="12px"
        color="gray.200"
        placeholderTextColor="gray.400"
        fontSize="md"
        fontFamily="body"
        borderWidth={0}
        borderRadius={6}
        _focus={{
          bg: "gray.700",
          borderWidth: 1,
          borderColor: "gray.300"
        }}
        {...rest}
      />
    </FormControl>
  )
}