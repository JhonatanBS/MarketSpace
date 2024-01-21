import { useNavigation } from "@react-navigation/native";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Controller, useForm } from "react-hook-form";

import { ArrowLeft, Plus } from "phosphor-react-native";

import { Box, Pressable, VStack, Text, ScrollView, Button } from "native-base";
import { InputForm } from "@components/InputForm";
import { useState } from "react";
import { TypeProduct } from "@components/TypeProduct";
import { CheckBoxPayment } from "@components/CheckBoxPayment";
import { SwitchExchange } from "@components/SwitchExchange";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

type FormDataProps = {
  title: string;
  description: string;
  price: string;
}

const signInSchema = yup.object({
  title: yup.string().required("Informe o Título"),
  description: yup.string().required("Informe a descrição"),
  price: yup.string().required("Informe o valor do produto")
});

export function EditAd() {
  const [newProduct, setNewProduct] = useState(false);
  const [usedProduct, setUsedProduct] = useState(false);
  const [accepetedExchange, setAccepetedExchange] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });

  function handleGoBack() {
    navigation.goBack();
  }

  function handleNewNavigationPublishAd() {
    navigation.navigate("publishAd")
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} mt="45px">
      <VStack
        flex={1}
        safeArea
        pb="17px"
        px="24px"
      >
        <Box
          w="full"
          h="26px"
          flexDirection="row"
        >
          <Pressable
            onPress={handleGoBack}
            h="24px"
            w="24px"
          >
            <ArrowLeft
              size={24}
              color="#1A181B"
            />
          </Pressable>

          <Box
            h="full"
            w="full"
          >
            <Text
              fontFamily="heading"
              fontSize="lg"
              color="gray.100"
              ml="90px"
            >
              Editar anúncio
            </Text>
          </Box>
        </Box>

        <Text
          fontFamily="heading"
          fontSize="md"
          color="gray.200"
          mt="24px"
          mb="4px"
        >
          Imagens
        </Text>

        <Text
          fontFamily="body"
          fontSize="sm"
          color="gray.300"
        >
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>

        <Pressable
          h="100px"
          w="100px"
          mt="16px"
          mb="32px"
          rounded={6}
          bg="gray.500"
          justifyContent="center"
          alignItems="center"
          onPress={() => console.log("Inserir foto")}
        >
          <Plus size={24} color="#9F9BA1" />
        </Pressable>

        <Text
          fontFamily="heading"
          fontSize="sm"
          color="gray.200"
          mb="16px"
        >
          Sobre o produto
        </Text>

        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <InputForm
              placeholder="Título do anúncio"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.title?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <InputForm
              placeholder="Descrição do produto"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.description?.message}
              multiline
              maxFontSizeMultiplier={10}
              h="160px"
              textAlignVertical="top"
            />
          )}
        />

        <Box
          w="full"
          h="24px"
          flexDirection="row"
          alignItems="center"
        >
          <TypeProduct
            type={newProduct}
            onPress={() => { setNewProduct(true), setUsedProduct(false) }}
          />
          <Text
            fontFamily="body"
            fontSize="md"
            color="gray.200"
            ml="10px"
            mr="22px"
          >
            Produto novo
          </Text>

          <TypeProduct
            type={usedProduct}
            onPress={() => { setNewProduct(false), setUsedProduct(true) }}
          />
          <Text
            fontFamily="body"
            fontSize="md"
            color="gray.200"
            ml="10px"
            mr="22px"
          >
            Produto usado
          </Text>
        </Box>

        <Text
          fontFamily="heading"
          fontSize="md"
          color="gray.200"
          mt="32px"
          mb="16px"
        >
          Venda
        </Text>

        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <InputForm
              placeholder="Valor do Produto"
              onChangeText={onChange}
              type="text"
              keyboardType="numeric"
              value={value}
              errorMessage={errors.price?.message}
              InputLeftElement={
                <Text
                  fontFamily="body"
                  fontSize="md"
                  color="gray.200"
                  ml="16px"
                >R$</Text>
              }
            />
          )}
        />

        <Text
          fontFamily="heading"
          fontSize="sm"
          color="gray.200"
          mt="16px"
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
          mt="16px"
          mb="12px"
        >
          Meios de pagamento aceitos
        </Text>

        <CheckBoxPayment
          title="Boleto"
        />

        <CheckBoxPayment
          title="Pix"
        />

        <CheckBoxPayment
          title="Dinheiro"
        />

        <CheckBoxPayment
          title="Cartão de Crédito"
        />

        <CheckBoxPayment
          title="Depósito Bancário"
        />
      </VStack>

      <Box
        h="90px"
        w="full"
        bg="gray.700"
        px="24px"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
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
          onPress={handleGoBack}
        >
          Cancelar
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
          onPress={handleNewNavigationPublishAd}
        >
          Avançar
        </Button>
      </Box>
    </ScrollView>
  )
}