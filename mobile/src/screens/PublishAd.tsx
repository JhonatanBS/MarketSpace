import { IconOptionsOfPayment } from "@components/IconOptionsOfPayment";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Box, Button, Center, HStack, Pressable, Text, VStack } from "native-base";
import { ArrowLeft, Tag, User } from "phosphor-react-native";

export function PublicAd() {
  
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNewNavigationMyAds() {
    navigation.navigate("myAds")
  }

  function handleNewNavigationEditAd() {
    navigation.navigate("editAd")
  }

  return (
    <VStack flex={1}>
      <Center
        h="120px"
        w="full"
        bg="blue.400"
        pt="40px"
      >
        <Text
          fontFamily="heading"
          fontSize="md"
          color="gray.700"
        >
          Pré visualização do anúncio
        </Text>

        <Text
          fontFamily="body"
          fontSize="sm"
          color="gray.700"
        >
          É assim que seu produto vai aparecer!
        </Text>
      </Center>

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
      </Box>

      <Box
        flexDirection="row"
        h="90px"
        w="full"
        bg="gray.700"
        px="24px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          h="42px"
          w="175px"
          bg="blue.400"
          borderRadius="6px"
          startIcon={
            <ArrowLeft
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
        onPress={handleNewNavigationEditAd}
        >
          Voltar e editar
        </Button>

        <Button
          h="42px"
          w="175px"
          bg="gray.500"
          borderRadius="6px"
          startIcon={
            <Tag
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
          onPress={handleNewNavigationMyAds}
        >
          Publicar
        </Button>
      </Box>
    </VStack>
  )
}