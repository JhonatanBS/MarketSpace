import { Pressable, Text, IPressableProps, Box } from "native-base";
import { Check } from "phosphor-react-native";

type PropsCheckBox = IPressableProps & {
  type: boolean;
  title: string;
}

export function CheckBoxPayment({ type, title, ...rest }: PropsCheckBox) {
  return (
    <Box 
      h="18px" 
      w="full"
      flexDirection="row"
      mb="14px"
    >
      <Pressable
        h="18px"
        w="18px"
        justifyContent="center"
        alignItems="center"
        bg={type ? "blue.400" : "transparent"}
        borderWidth={ type ? 0 : 2}
        borderColor={ type ? "" : "gray.400"}
        rounded={2}
        
        mb="11px"
        {...rest}
      >
        {type ?
          <Check size={12} color="#FFFFFF" weight="bold"/>
          :
          <></>
        }
      </Pressable>
      <Text
        fontFamily="body"
        fontSize="md"
        color="gray.200"
        ml="8px"
      >
        { title }
      </Text>
    </Box>
  )
}