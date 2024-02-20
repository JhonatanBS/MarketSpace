    import { Box, VStack, Text, HStack } from "native-base";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";

type MethodsPaymentProps = {
  methods: string[];
}

export function IconOptionsOfPayment({ methods }: MethodsPaymentProps) {
  return(
    <VStack flex={1} mb="130px">

      { methods.includes("boleto") ? 
        <HStack
        width="full"
        h="18px"
        mb="4px"
      >
        <Barcode size={18} color="#1A181B"/>

        <Text
          fontFamily="body"
          fontSize="sm"
          color="gray.200"
          ml="8px"
        >
          Boleto
        </Text>
      </HStack>
      :
        <></>
      }

      { methods.includes("pix") ? 
        <HStack
        width="full"
        h="18px"
        mb="4px"
      >
        <QrCode size={18} color="#1A181B"/>

        <Text
          fontFamily="body"
          fontSize="sm"
          color="gray.200"
          ml="8px"
        >
          Pix
        </Text>
      </HStack>
      :
        <></>
      }

      { methods.includes("cash") ? 
        <HStack
        width="full"
        h="18px"
        mb="4px"
      >
        <Money size={18} color="#1A181B"/>

        <Text
          fontFamily="body"
          fontSize="sm"
          color="gray.200"
          ml="8px"
        >
          Dinheiro
        </Text>
      </HStack>
      :
        <></>
      }

      { methods.includes("card") ? 
        <HStack
        width="full"
        h="18px"
        mb="4px"
      >
        <CreditCard size={18} color="#1A181B"/>

        <Text
          fontFamily="body"
          fontSize="sm"
          color="gray.200"
          ml="8px"
        >
          Cartão de Crédito
        </Text>
      </HStack>
      :
        <></>
      }

      { methods.includes("deposit") ? 
        <HStack
        width="full"
        h="18px"
        mb="4px"
      >
        <Bank size={18} color="#1A181B"/>

        <Text
          fontFamily="body"
          fontSize="sm"
          color="gray.200"
          ml="8px"
        >
          Depósito Bancário
        </Text>
      </HStack>
      :
        <></>
      }

    </VStack>
  )
}