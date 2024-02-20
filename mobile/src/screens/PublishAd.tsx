import { Dimensions } from "react-native";

import { ProductDTO } from "@dtos/ProductDTO";

import { api } from "@services/api";

import { useAuth } from "@hooks/useAuth";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { IconOptionsOfPayment } from "@components/IconOptionsOfPayment";

import { Box, Button, Center, HStack, Pressable, Text, VStack, Image, ScrollView, useToast } from "native-base";
import { ArrowLeft, Tag, User } from "phosphor-react-native";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { AppError } from "@utils/AppError";
import { useState } from "react";

export function PublicAd() {
  const [dotCurrent, setDotCurrent] = useState(0);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { user } = useAuth();
  const { params } = useRoute();

  const toast = useToast();

  const {
    accept_trade,
    price,
    name,
    payment_methods,
    is_new,
    product_images,
    description
  } = params as ProductDTO;

  function handleNewNavigationMyAds() {
    navigation.navigate("home");
  }

  function handleNewNavigationEditAd() {
    navigation.navigate("createAd");
  }

  async function createAd() {
    try {

      const { data } = await api.post("/products", {
        name,
        description,
        is_new,
        price,
        accept_trade,
        payment_methods: payment_methods[0]
      });

      const uploadImagesProduct = new FormData();

      const uploadAllFile = product_images.map((file, index) => {
        let fileExtension = file.split(".").pop();

        let photoFile = {
          name: `${data.name}.${fileExtension}`,
          uri: file,
          type: `image/${fileExtension}`
        } as any;

        uploadImagesProduct.append("images", photoFile);

        return file;
      });

      uploadImagesProduct.append("product_id", data.id);

      await api.post("/products/images", uploadImagesProduct, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      toast.show({
        title: "Produto cadastrado com sucesso",
        placement: "top",
        bgColor: "green.500"
      });

    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Não foi possível avançar. Tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.400"
      });
    }
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
      >
        <Carousel
          layout="default"
          data={product_images}
          keyExtractor={(item) => item}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          useScrollView
          onSnapToItem={(index) => setDotCurrent(index)}
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

        <Pagination
          dotsLength={product_images?.length}
          activeDotIndex={dotCurrent}
          containerStyle={
            {
              backgroundColor: "transparent",
              position: "absolute",
              bottom: -20,
              left: SLIDER_WIDTH * 0.30,
              justifyContent: "center",
              alignItems: "center"
            }
          }
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: "#000000"
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
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
              {price.toFixed(2)}
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
            methods={payment_methods[0]}
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
          onPress={() => { handleNewNavigationMyAds(), createAd() }}
        >
          Publicar
        </Button>
      </Box>
    </VStack>
  )
}