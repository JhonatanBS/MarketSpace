import { Box, VStack, Text, HStack } from "native-base";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";

type OptionsOfPaymentProps = {
  ticket: boolean;
  pix: boolean;
  bankDeposit: boolean;
  money: boolean;
  card: boolean;
}

export function IconOptionsOfPayment({ ticket, bankDeposit, card, money, pix}: OptionsOfPaymentProps) {
  return(
    <VStack flex={1}>

      { ticket ? 
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

      { pix ? 
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

      { money ? 
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

      { card ? 
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

      { bankDeposit ? 
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
          Boleto
        </Text>
      </HStack>
      :
        <></>
      }

    </VStack>
  )
}