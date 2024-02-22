import { useState, useCallback } from "react";

import { Box, Pressable, ScrollView, Text, View } from "native-base";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Ad, AdProps } from "@components/Ad";
import { Loading } from "@components/Loading";

import { api } from "@services/api";

import { CaretDown, CaretUp, Plus } from "phosphor-react-native";

export function MyAds() {
  const [isLoading, setIsLoading] = useState(false);
  const [chooseFilter, setChooseFilter] = useState("Todos");
  const [buttonFilter, setButtonFilter] = useState(false);

  const [allMyProducts, setAllMyProducts] = useState<AdProps[]>([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNewNavigationCreateAd() {
    navigation.navigate("createAd");
  }

  function handleNewNavigationDetailsMyAds(id: string) {
    navigation.navigate("detailsMyAds", { id });
  }

  async function filterAdActive(data: AdProps[]): Promise<AdProps[]> {
    const adsActive = data.filter((item) => item.is_active === true);

    return adsActive;
  }

  async function filterAdDeactivate(data: AdProps[]): Promise<AdProps[]> {
    const adsDeactivate = data.filter((item) => item.is_active === false);

    return adsDeactivate;
  }

  async function handleShowAdActive() {
    try {
      setIsLoading(true);
      setChooseFilter("Ativos");
      setButtonFilter(false);

      const { data } = await api.get(`/users/products`); 

      if(!data) {
        return;
      }

      setAllMyProducts(data);
  
      const adsActive = await filterAdActive(data);

      setAllMyProducts(adsActive);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleShowAdDeactivate() {
    try {
      setIsLoading(true);
      setChooseFilter("Inativos");
      setButtonFilter(false);

      const { data } = await api.get(`/users/products`);

      if(!data) {
        return;
      }

      setAllMyProducts(data);
      
      const adsDeactivate = await filterAdDeactivate(data);
      
      setAllMyProducts(adsDeactivate); 

    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetAllMyProducts() {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/users/products`);

      if(!data) {
        return;
      }

      setAllMyProducts(data);
     
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    if(chooseFilter === "Ativos") {
     handleShowAdActive();
    } else if(chooseFilter === "Inativos") {
     handleShowAdDeactivate();
    } else if(chooseFilter === "Todos"){
      handleGetAllMyProducts();
    }
  }, [chooseFilter]));

  return (
    <Box
      flex={1}
      px="24px"
      pt="64px"
    >
      <Box
        w="full"
        h="26px"
        mb="32px"
      >
        <Text
          fontFamily="heading"
          fontSize="lg"
          textAlign="center"
        >
          Meus anúncios
        </Text>

        <Pressable
          position="absolute"
          right={0}
          top={0.55}
          onPress={handleNewNavigationCreateAd}
        >
          <Plus
            size={24}
            color="#1A181B"
          />
        </Pressable>
      </Box>

      <View
        w="full"
        h="34px"
        mb="24px"
        flexDirection="row"
        justifyContent="space-between"

      >
        <Text
          fontFamily="body"
          fontSize="sm"
        >
          {`${allMyProducts.length} `} anúncios
        </Text>

        <Pressable
          h="34px"
          w="111px"
          borderWidth={1}
          rounded={6}
          borderColor="gray.500"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          pl="12px"
          pr="9px"
          onPress={() => setButtonFilter(!buttonFilter)}
        >
          <Text
            fontFamily="body"
            fontSize="sm"
            color="gray.100"
          >
            {chooseFilter}
          </Text>

          {buttonFilter ?
            <CaretUp size={16} color="#5F5B62" />
            :
            <CaretDown size={16} color="#5F5B62" />
          }

          {buttonFilter ?
            <Box
              h="102px"
              w="111px"
              bg="gray.700"
              position="absolute"
              top={36}
              zIndex={1}
              rounded={6}
              p="12px"
            >

              <Pressable
                onPress={() => { setChooseFilter("Todos"), setButtonFilter(!buttonFilter) }}
              >
                <Text
                  fontFamily="heading"
                  fontSize="sm"
                  color="gray.200"
                >
                  Todos
                </Text>
              </Pressable>

              <Pressable
                my="10px"
                onPress={handleShowAdActive}
              >
                <Text
                  fontFamily="body"
                  fontSize="sm"
                  color="gray.200"
                >
                  Ativos
                </Text>
              </Pressable>

              <Pressable
                onPress={handleShowAdDeactivate}
              >
                <Text
                  fontFamily="body"
                  fontSize="sm"
                  color="gray.200"
                >
                  Inativos
                </Text>
              </Pressable>

            </Box>
            :
            <></>
          }
        </Pressable>
      </View>


      {isLoading ?
        <Loading />
        :
        <ScrollView showsVerticalScrollIndicator={false} zIndex={-1}>
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
                is_active={product.is_active}
                key={index}
                id={product.id}
                onPress={() => handleNewNavigationDetailsMyAds(product.id)}
              />
            ))
            }
          </Box>
        </ScrollView>}

    </Box>
  )
}