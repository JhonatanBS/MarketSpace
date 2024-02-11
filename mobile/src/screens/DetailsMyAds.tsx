import { IconOptionsOfPayment } from "@components/IconOptionsOfPayment";
import { Loading } from "@components/Loading";
import { DetailsProductDTO } from "@dtos/DetailsProductDTO";
import { IdDTO } from "@dtos/IdDTO";
import { useAuth } from "@hooks/useAuth";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";

import { Box, HStack, VStack, Pressable, Image, Text, Center, Button, ScrollView } from "native-base";
import { ArrowLeft, PencilSimpleLine, Power, TrashSimple, User } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

type IsActiveProps = {
  is_active: boolean;
}

export function DetailsMyAds() {
  const [isLoading, setIsLoading] = useState(false);

  const [currentProduct, setCurrentProduct] = useState<DetailsProductDTO>({} as DetailsProductDTO);
  const [methodsPayment, setMethodsPayment] = useState<string[]>([]);
  const [actived, setActived] = useState<IsActiveProps>({ is_active: false });

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { params } = useRoute();

  const { id } = params as IdDTO;

  const { user } = useAuth();

  function handleNewNavigationMyAds() {
    navigation.navigate("myAds");
  }

  function handleNewNavigationEditMyAd() {
    //navigation.navigate("editAd");
  }

  async function handleMethodsPayment(data: DetailsProductDTO) {

    const { payment_methods, is_active } = data;

    const newMethodsPayment = payment_methods.map((item, index) => {
      return item.key;
    });

    setActived({ is_active });

    return newMethodsPayment;
  }

  async function handleGetOneProduct() {
    try {

      setIsLoading(true);
      const { data } = await api.get(`/products/${id}`);

      setCurrentProduct(data);

      const allMethodsPayment = await handleMethodsPayment(data);

      setMethodsPayment(allMethodsPayment);

    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleIsActiveOrDeactive(active: IsActiveProps) {
    try {
      await api.patch(`/products/${id}`, active);

      setActived({ is_active: !active.is_active });
    } catch (error) {
      throw error;
    }
  }

  async function handleRemoveMyAd() {
    try {
      setIsLoading(true);
      await api.delete(`/products/${id}`);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    handleGetOneProduct();
  }, [id]));

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} safeArea mt="10px">
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

      <Carousel
        layout="default"
        data={currentProduct.product_images}
        keyExtractor={(item) => item.id}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView
        renderItem={({ item, index }) => (
          <Box
            flex={1}
            key={index}
          >
            <Image
              src={`${api.defaults.baseURL}/images/${item.path}`}
              alt="Imagens do produto"
              w="full"
              h="full"
              resizeMode="stretch"
              opacity={0.8}
            />

            {actived.is_active ?
              <></>
              :
              <Center
                flex={1}
                position="absolute"
              >
                <Text
                  color="gray.700"
                  fontFamily="heading"
                  fontSize="sm"
                  textTransform="uppercase"

                >
                  anúncio desativado
                </Text>
              </Center>
            }
          </Box>
        )}
      />

      <Box
        px="24px"
        mt="22px"
        h="431px"
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
                h="full"
                w="full"
                rounded="full"
                alt="Foto do perfil"
                src={`${api.defaults.baseURL}/images/${user.avatar}`}
              />
              :
              <User size={20} color="#647AC7" />
            }
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
            {currentProduct.is_new ? "Novo" : "Usado"}
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
            {currentProduct.name}
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
              {` ${currentProduct.price?.toFixed(2).toString().replace(".", ",")}`}
            </Text>
          </Text>
        </HStack>

        <Text
          color="gray.200"
          fontFamily="body"
          fontSize="sm"
        >
          {currentProduct.description}
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
            {currentProduct.accept_trade ? "Sim" : "Não"}
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

        {isLoading ?
          <Loading />
          :
          <ScrollView showsVerticalScrollIndicator={false}>
            <IconOptionsOfPayment
              methods={methodsPayment}
            />
          </ScrollView>

        }

        <Button
          mt="10px"
          h="42px"
          w="full"
          bg={actived.is_active ? "gray.100" : "blue.400"}
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
          onPress={() => handleIsActiveOrDeactive(actived)}
        >
          {actived.is_active ? "Desativar anúncio" : "Reativar anúncio"}
        </Button>

        <Button
          mt="8px"
          mb="15px"
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
          onPress={() => { handleRemoveMyAd(), handleNewNavigationMyAds() }}
        >
          Excluir anúncio
        </Button>
      </Box>
    </VStack>
  )
}