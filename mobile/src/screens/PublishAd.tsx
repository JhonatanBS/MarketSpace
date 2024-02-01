import { IconOptionsOfPayment } from "@components/IconOptionsOfPayment";
import { ProductDTO } from "@dtos/ProductDTO";
import { useAuth } from "@hooks/useAuth";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { Box, Button, Center, HStack, Pressable, Text, VStack, Image } from "native-base";
import { ArrowLeft, Tag, User } from "phosphor-react-native";
import { useState } from "react";
import { Dimensions } from "react-native";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;



import Carousel, { Pagination } from 'react-native-snap-carousel';

export function PublicAd() {

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { user } = useAuth();
  const { params } = useRoute();

  const { accept_trade, price, name, payment_methods, is_new, imageProduct, description } = params as ProductDTO;

  console.log(payment_methods );

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



      <Carousel
        layout="default"
        data={imageProduct}
        keyExtractor={(item) => item}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView
        renderItem={({ item, index }) => (
          <Box
            flex={1}
            key={index}
          >
            <Image
              source={{ uri: item }}
              alt="Imagens do produto"
              w="full"
              h="full"
              resizeMode="cover"
            />
          </Box>
            
           
        )}
      />

      <Box
        px="24px"
        mt="22px"
        flex={1}
        bg="amber.100"
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

            {user.avatar ?
              <Image
                src={`${api.defaults.baseURL}/images/${user.avatar}`}
                h="full"
                w="full"
                rounded="full"
                alt="Foto do perfil"
              />
              :
              <User size={20} color="#647AC7" />}
          </Pressable>

          <Text
            color="gray.100"
            fontFamily="body"
            fontSize="sm"
            ml="8px"
          >
            {user.name}
          </Text>
        </HStack>

        <Center
          h="17px"
          w="50px"
          borderRadius="full"
          bg={is_new ? "blue.400" : "gray.500"}
          borderWidth={0}
          alignItems="center"
        >
          <Text
            color={is_new ? "gray.700" : "gray.200"}
            fontFamily="heading"
            fontSize="10px"
            textTransform="uppercase"
          >
            {is_new ? "Novo" : "Usado"}

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
            {name}
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
              {price}
            </Text>
          </Text>
        </HStack>

        <Text
          color="gray.200"
          fontFamily="body"
          fontSize="sm"
        >
          {description}
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
            {accept_trade ? "Sim" : "Não"}
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
          bg="gray.500"
          borderRadius="6px"
          startIcon={
            <ArrowLeft
              size={16}
              color="#3E3A40"
              weight="bold"
            />}
          _pressed={{
            backgroundColor: "blue.200"
          }}
          _text={{
            fontFamily: "heading",
            fontSize: "sm",
            color: "gray.200",
            marginLeft: "8px"
          }}
          onPress={handleNewNavigationEditAd}
        >
          Voltar e editar
        </Button>

        <Button
          h="42px"
          w="175px"
          bg="blue.400"
          borderRadius="6px"
          startIcon={
            <Tag
              size={16}
              color="#F7F7F8"
              weight="bold"
            />}
          _pressed={{
            backgroundColor: "blue.400"
          }}
          _text={{
            fontFamily: "heading",
            fontSize: "sm",
            color: "gray.700",
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