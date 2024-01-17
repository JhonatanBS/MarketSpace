import { Button, IPressableProps, Pressable, Text } from "native-base";
import { XCircle } from "phosphor-react-native";

type Props = IPressableProps & {
  title: string;
  selected: boolean;
}

export function ButtonNewOrUsed({title, selected, ...rest}: Props) {
  return (
    <Pressable
      h="28px"
      w="73px"
      borderRadius="full"
      bg={ selected ? "blue.400" : "gray.500"}
      borderWidth={0}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      pl={ selected ? "16px" : "16px"}
      pr={ selected ? "7.5px" : "16px"}
      {...rest}
    >
      <Text
        fontFamily= "heading"
        fontSize= "xs"
        color={selected ? "gray.700" : "gray.300"}
        textTransform="uppercase"
        mr={ selected ? "2px" : "0px"}
      >
        {title}
      </Text>

      { selected ?
        <XCircle size={13} weight="fill" color="#EDECEE"/> 
        : 
        <></>
      }
    </Pressable>
    
  )
}
