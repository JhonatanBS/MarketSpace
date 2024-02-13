import { useCallback, useState } from "react";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Ad, AdProps } from "@components/Ad";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Box, Button, Divider, HStack, Input, Pressable, ScrollView, Text, VStack, View, Image } from "native-base";
import { ArrowRight, MagnifyingGlass, Plus, Sliders, Tag, User, X } from "phosphor-react-native";
import { Modal } from "react-native";
import { ButtonNewOrUsed } from "@components/ButtonNewOrUsed";
import { CheckBoxPayment } from "@components/CheckBoxPayment";
import { SwitchExchange } from "@components/SwitchExchange";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";

type methodsPaymentProps = {
  id: number,
  title: string;
  isCheck: boolean;
  type: string;
}

export function Home() {
  const [showModal, setShowModal] = useState(false);

  const [newObject, setNewObject] = useState(false);
  const [usedObject, setUsedObject] = useState(false);
  const [accepetedExchange, setAccepetedExchange] = useState(false);
  const [methodsPayment, setMethodsPayment] = useState<string[]>([]);
  const [findAd, setFindAd] = useState("");

  const [allMethodsPayment, setAllMethodsPayment] = useState<methodsPaymentProps[]>([
    {
      id: 1,
      title: "Boleto",
      isCheck: false,
      type: "boleto"
    },
    {
      id: 2,
      title: "Pix",
      isCheck: false,
      type: "pix"
    },
    {
      id: 3,
      title: "Dinheiro",
      isCheck: false,
      type: "cash"
    },
    {
      id: 4,
      title: "Cartão de Crédito",
      isCheck: false,
      type: "card"
    },
    {
      id: 5,
      title: "Depósito Bancário",
      isCheck: false,
      type: "deposit"
    },
  ]);

  const [counterProducts, setCounterProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [allMyProducts, setAllMyProducts] = useState<AdProps[]>([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { user } = useAuth();

  function newNavigationCreateAd() {
    navigation.navigate("createAd");
  }

  function newNavigationMyAds() {
    navigation.navigate("myAds");
  }

  async function handleFilterAds() {
    try {
      const { data } = await api.get("/products/", {
        params: {
          is_new: newObject,
          accept_trade: accepetedExchange,
          payment_methods: methodsPayment,
          query: findAd
        },
      });

      setAllMyProducts(data);
    } catch (error) {
      throw error;
    }
  }

  async function handleClearFIlterAd() {
    try {
      setIsLoading(true);

      setNewObject(false);
      setAccepetedExchange(false);
      setFindAd("");
      setMethodsPayment([]);
      allMethodsPayment.map((item) => item.isCheck = false);

      const { data } = await api.get(`/products`);

      setAllMyProducts(data);
      setShowModal(false);

    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function handleIsCheckInMethodsPayment(title: string) {
    const updateMethodPayment = allMethodsPayment.map((data) => {
      data.type === title ?
        (data.isCheck = !data.isCheck, data.isCheck ? setMethodsPayment([...methodsPayment, title]) : handleRemoveMethodsPayment(title))
        :
        data.isCheck
      return data;
    }
    );

    setAllMethodsPayment(updateMethodPayment);
  }

  function handleRemoveMethodsPayment(method: string) {
    const removeMethodPayment = methodsPayment.filter((titleMethod) => titleMethod !== method);
    setMethodsPayment(removeMethodPayment);
  }

  async function handleCounterAllMyProducts() {
    try {
      const { data } = await api.get(`/users/products`);

      setCounterProducts(data.length);
    } catch (error) {
      throw error;
    }
  }

  async function handleGetAllProductsOfUsers() {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/products`);

      setAllMyProducts(data);

    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    handleCounterAllMyProducts();
    handleGetAllProductsOfUsers();
  }, []));

  return (

    <VStack flex={1} px="24px">
      <HStack w="full" h="45px" mt={20} justifyContent="space-between">

        <Box flexDirection="row">
          <Pressable
            h="45px"
            w="45px"
            borderRadius={50}
            borderWidth={4}
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
              <User size={30} color="#647AC7" />
            }
          </Pressable>
          <Box ml="10px">
            <Text color="gray.100" fontFamily="body">
              Boas vindas,
            </Text>
            <Text fontFamily="heading">{user.name}!</Text>
          </Box>
        </Box>

        <Button
          h="42px"
          w="139px"
          bg="gray.100"
          borderRadius="6px"
          justifyContent="center"
          alignItems="center"
          startIcon={
            <Plus
              size={16}
              color="#EDECEE"
            />}
          _pressed={{
            backgroundColor: "gray.300"
          }}
          _text={{
            fontFamily: "heading",
            fontSize: "sm",
          }}
          onPress={newNavigationCreateAd}
        >
          Criar anúncio
        </Button>
      </HStack>

      <Text
        mt="33px"
        mb="12px"
        fontFamily="body"
        fontSize="sm"
        color="gray.300"
      >
        Seus produtos anunciados para venda
      </Text>

      <Box
        w="full"
        h="66px"
        bg={"#DFE1EA"}

        borderRadius={6}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        pl="16px"
        pr="20px"

      >
        <Box flexDirection="row" alignItems="center">
          <Tag
            size={22}
            color="#364D9D"
          />

          <Box flexDirection="column" ml="16px">
            <Text
              fontFamily="heading"
              fontSize="lg"
              color="gray.200"
            >
              {counterProducts}
            </Text>

            <Text
              fontFamily="body"
              fontSize="xs"
              color="gray.200"
            >
              anúncios ativos
            </Text>
          </Box>
        </Box>

        <Button
          onPress={newNavigationMyAds}
          h="38px"
          w="115px"
          bg="transparent"
          borderRadius="6px"
          justifyContent="center"
          alignItems="center"
          endIcon={
            <ArrowRight
              size={16}
              color="#364D9D"
            />}
          _pressed={{
            backgroundColor: "transparent"
          }}
          _text={{
            fontFamily: "heading",
            fontSize: "xs",
            color: "blue.800"
          }}
        >
          Meus anúncios
        </Button>
      </Box>

      <Text
        fontFamily="body"
        fontSize="sm"
        color="gray.300"
        mt="32px"
        mb="12px"
      >
        Compre produtos variados
      </Text>

      <Input
        onChangeText={(text) => setFindAd(text)}
        value={findAd}
        mb="24px"
        w="full"
        h="45px"
        bg="gray.700"
        borderWidth={0}
        borderRadius={6}
        px="16px"
        fontSize="md"
        fontFamily="body"
        color="gray.400"
        _focus={{
          bg: "gray.700",
          borderWidth: 1,
          borderColor: "gray.300"
        }}
        placeholder="Buscar anúncio"
        InputRightElement={
          <Box flexDirection="row" pr="16px">
            <Pressable onPress={() => handleFilterAds()}>
              <MagnifyingGlass size={20} color="#3E3A40" />
            </Pressable>

            <Divider
              orientation="vertical"
              w={0.5} h={5}
              bg="gray.400"
              mx="12px"
            />

            <Pressable onPress={() => setShowModal(true)}>
              <Sliders size={20} color="#3E3A40" />
            </Pressable>
          </Box>}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          w="full"
          h="full"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {allMyProducts.map((product, index) => (
            <Ad
              name={product.name}
              price={product.price}
              is_new={product.is_new}
              product_images={product.product_images}
              user_id={product.user_id}
              id={product.id}
              user={product.user}
              key={index}
            />
          ))
          }
        </Box>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        statusBarTranslucent
      >
        <Box flex={1} backgroundColor={"rgba(0, 0, 0, 0.5)"} justifyContent="flex-end">
          <Box
            bg="gray.700"
            h="600px"
            borderTopRadius={24}
            px="24px"
          >
            <Box
              h="4px"
              w="full"
              alignItems="center"
              mt="12px"
              mb="32px"
            >
              <Divider
                h="4px"
                w="56px"
                orientation="vertical"
              />
            </Box>
            <Box
              flexDirection="row"
              w="full"
              h="26px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text
                fontFamily="heading"
                fontSize="lg"
                color="gray.100"
              >
                Filtrar anúncios
              </Text>

              <Pressable onPress={() => setShowModal(false)}>
                <X size={24} color="#9F9BA1" />
              </Pressable>
            </Box>

            <Text
              fontFamily="heading"
              fontSize="sm"
              color="gray.200"
              mt="24px"
              mb="12px"
            >
              Condição
            </Text>

            <HStack w="153px" h="28px" justifyContent="space-between">
              <ButtonNewOrUsed
                title="Novo"
                selected={newObject}
                onPress={() => setNewObject(!newObject)}
              />

              <ButtonNewOrUsed
                title="Usado"
                selected={usedObject}
                onPress={() => setUsedObject(!usedObject)}
              />
            </HStack>

            <Text
              fontFamily="heading"
              fontSize="sm"
              color="gray.200"
              mt="24px"
              mb="12px"
            >
              Aceita troca?
            </Text>

            <SwitchExchange
              type={accepetedExchange}
              onPress={() => setAccepetedExchange(!accepetedExchange)}
            />

            <Text
              fontFamily="heading"
              fontSize="sm"
              color="gray.200"
              mt="24px"
              mb="12px"
            >
              Meios de pagamento aceitos
            </Text>

            {allMethodsPayment.map((data, index) => (
              <CheckBoxPayment
                title={data.title}
                type={data.isCheck}
                key={index}
                onPress={() => handleIsCheckInMethodsPayment(data.type)}
              />
            ))}

            <Box
              flexDirection="row"
              justifyContent="space-between"
              mt="53px"
            >
              <Button
                h="42px"
                w="170px"
                borderRadius={6}
                bg="gray.500"
                _text={{
                  fontFamily: "heading",
                  fontSize: "sm",
                  color: "gray.200"
                }}
                _pressed={{
                  backgroundColor: "gray.600"
                }}
                onPress={handleClearFIlterAd}
              >
                Resetar filtros
              </Button>

              <Button
                h="42px"
                w="170px"
                borderRadius={6}
                bg="gray.100"
                _text={{
                  fontFamily: "heading",
                  fontSize: "sm",
                  color: "gray.700"
                }}
                _pressed={{
                  backgroundColor: "gray.200"
                }}
                onPress={() => { handleFilterAds(), setShowModal(false) }}
              >
                Aplicar filtros
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </VStack>
  )
}