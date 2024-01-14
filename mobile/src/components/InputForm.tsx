import { FormControl, IInputProps, Input as NativeBaseInput } from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export function InputForm({errorMessage = null, isInvalid, ...rest}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return(
    <FormControl isInvalid={invalid}>
      <NativeBaseInput 
        h="45px"
        bg="gray.700"
        px="16px"
        py="12px"
        mb={ errorMessage === null ? "16px" : "0px"}
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
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500"
        }}
        {...rest}
      />

      <FormControl.ErrorMessage _text={{color: "red.400", marginBottom: "8px"}}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}