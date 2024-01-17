import { Checkbox, Text } from "native-base";
import { Animated } from "react-native";

type PropsCheckBox = {
  title: string;
}

export function CheckBoxPayment({title}: PropsCheckBox) {
  return(
    <Checkbox
     colorScheme="primary"
     value={title}
     mb="11px"
    >
      <Text
        fontFamily="body"
        fontSize="md"
        color="gray.200"
      >
        { title }
      </Text>
    </Checkbox>
  )
}