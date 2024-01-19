import { IconOptionsOfPayment } from "@components/IconOptionsOfPayment";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Box, HStack, VStack, Pressable, View, Text, Center, Button } from "native-base";
import { ArrowLeft, PencilSimpleLine, Power, TrashSimple, User } from "phosphor-react-native";

export function DetailsMyAds() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNewNavigationMyAds() {
    navigation.navigate("myAds");
  }

  function handleNewNavigationEditMyAd() {
    navigation.navigate("editAd");
  }

  return (
    <VStack flex={1} safeArea mt="35px">
      <Box
        h="24px"
        w="full"
        px="24px"
        mb="12px"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Pressable onPress={handleNewNavigationMyAds}>
          <ArrowLeft size={24} color="#1A181B" />
        </Pressable>

        <Pressable onPress={handleNewNavigationEditMyAd}>
          <PencilSimpleLine size={24} color="#1A181B" />
        </Pressable>
      </Box>

      <Box
        h="280px"
        w="full"
        bg="gray.400"
      >
      </Box>

      <Box
        px="24px"
        mt="22px"
        flex={1}
      >
        <HStack mb="24px">
          <Pressable
            h="24px"
            w="24px"
            borderRadius={50}
            borderWidth={2}
            borderColor="blue.400"
            justifyContent="center"
            alignItems="center"
          >
            <User size={20} color="#647AC7" />
          </Pressable>

          <Text 
            color="gray.100" 
            fontFamily="body"
            fontSize="sm"
            ml="8px"
          >
            Maria Gomes
          </Text>
        </HStack>

        <Center
          h="17px"
          w="50px"
          borderRadius="full"
          bg="gray.500"
          borderWidth={0}
          alignItems="center"
        >
          <Text
            color="gray.200" 
            fontFamily="heading"
            fontSize="10px"
            textTransform="uppercase"
          >
            Usado
          </Text>
        </Center>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          my="8px"
        >
          <Text
            color="gray.100" 
            fontFamily="heading"
            fontSize="lg"
          >
            Luminária pendente
          </Text>

          <Text
            color="blue.400" 
            fontFamily="heading"
            fontSize="sm"
          > R$
            <Text
              color="blue.400" 
              fontFamily="heading"
              fontSize="lg"
            >
              {" 45,00"}
            </Text>
          </Text>
        </HStack>

        <Text
          color="gray.200" 
          fontFamily="body"
          fontSize="sm"
        >
          Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. 
        </Text>

        <HStack
          mt="24px"
          mb="16px"
        >
          <Text
            color="gray.200" 
            fontFamily="heading"
            fontSize="sm"
          >
            {"Aceita troca? "}
          </Text>

          <Text
            color="gray.200" 
            fontFamily="body"
            fontSize="sm"
          >
            Não
          </Text>
        </HStack>

        <Text
          color="gray.200" 
          fontFamily="heading"
          fontSize="sm"
          mb="8px"
        >
          Meios de pagamento:
        </Text>

        <IconOptionsOfPayment 
          ticket
          bankDeposit
          card={false}
          money={false}
          pix
        />

        <Button
         // mt="32px"
          h="42px"
          w="full"
          bg="blue.400"
          borderRadius="6px"
          startIcon={
            <Power 
            size={16} 
            color="#EDECEE"
            weight="bold"
            />}
          _pressed={{
            backgroundColor: "blue.200"
          }}
          _text={{
            fontFamily: "heading",
            fontSize: "sm",
            color: "gray.700",
            marginLeft: "8px"
          }}
          //onPress={newNavigationCreateAd}
        >
          Reativar anúncio
        </Button>

        <Button
          mt="8px"
          mb="30px"
          h="42px"
          w="full"
          bg="gray.500"
          borderRadius="6px"
          startIcon={
            <TrashSimple 
            size={16} 
            color="#5F5B62"
            weight="bold"
            />}
          _pressed={{
            backgroundColor: "gray.600"
          }}
          _text={{
            fontFamily: "heading",
            fontSize: "sm",
            color: "gray.200",
            marginLeft: "8px"
          }}
          //onPress={newNavigationCreateAd}
        >
          Excluir anúncio
        </Button>
    </Box>
  </VStack>
  )
}