import { Checkbox, Text } from "native-base";

type PropsCheckBox = {
  title: string;
}

export function CheckBoxPayment({title}: PropsCheckBox) {
  return(
    <Checkbox
     colorScheme="blue"
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