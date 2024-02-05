import { useNavigation, useRoute } from "@react-navigation/native";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

import { Controller, useForm } from "react-hook-form";

import { ArrowLeft, Plus, XCircle } from "phosphor-react-native";

import { Box, Pressable, VStack, Text, ScrollView, Button, Image, useToast } from "native-base";
import { InputForm } from "@components/InputForm";
import { useState } from "react";
import { TypeProduct } from "@components/TypeProduct";
import { CheckBoxPayment } from "@components/CheckBoxPayment";
import { SwitchExchange } from "@components/SwitchExchange";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { ProductDTO } from "@dtos/ProductDTO";

type FormDataProps = {
  title: string;
  description: string;
  price: string;
}

type methodsPaymentProps = {
  title: string;
  isCheck: boolean;
  type: string;
}

const signInSchema = yup.object({
  title: yup.string().required("Informe o Título"),
  description: yup.string().required("Informe a descrição"),
  price: yup.string().required("Informe o valor do produto")
});

export function CreateAd() {
  const [addImageProduct, setAddImageProduct] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState<boolean>(false);
  const [accepetedExchange, setAccepetedExchange] = useState(false);
  const [methodsPayment, setMethodsPayment] = useState<string[]>([]);

  const [allMethodsPayment, setAllMethodsPayment] = useState<methodsPaymentProps[]>([
    {
      title: "Boleto",
      isCheck: false,
      type: "boleto"
    },
    {
      title: "Pix",
      isCheck: false,
      type: "pix"
    },
    {
      title: "Dinheiro",
      isCheck: false,
      type: "cash"
    },
    {
      title: "Cartão de Crédito",
      isCheck: false,
      type: "card"
    },
    {
      title: "Depósito Bancário",
      isCheck: false,
      type: "deposit"
    },
  ]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { params } = useRoute();

  /*const { 
    accept_trade, 
    price, 
    name, 
    payment_methods, 
    is_new, 
    imageProduct, 
    description 
  } = params as ProductDTO;

  if(accept_trade && price && name && payment_methods && is_new && imageProduct && description ) {
    setAddImageProduct(imageProduct);
    setNewProduct(is_new);
    setAccepetedExchange(accept_trade);
    setMethodsPayment(payment_methods[0]);
  }*/

  const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });

  function handleGoBack() {
    navigation.goBack();
  }

  function handleNewNavigationPublishAd({ title, description, price}: FormDataProps) {
    try {

      if(addImageProduct.length === 0 || methodsPayment .length === 0) {
        return toast.show({
          title: "As imagens e os meios de pagamento são obrigatórios!",
          placement: "top",
          bgColor: "red.400"
        });
      }

      navigation.navigate("publishAd", {
        imageProduct: addImageProduct,
        name: title,
        description,
        price: parseFloat(price.replace(",", ".")),
        is_new: newProduct,
        accept_trade: accepetedExchange,
        payment_methods: [methodsPayment]
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

  async function handleUserPhotoSelectSignUp() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri, { size: true });

        /*if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha um de até 5MB",
            placement: "top",
            bgColor: "red.500"
          })
        }*/
        setAddImageProduct([...addImageProduct, photoSelected.assets[0].uri])
      }
    } catch (error) {
      throw error;
    }
  }

  function handlePhotoDeleteAd(uriImage: string) {
    const imageFilter = addImageProduct.filter((image) => image !== uriImage);

    setAddImageProduct(imageFilter);
  }

  function handleIsCheckInMethodsPayment(title: string, type: string) {
    const updateMethodPayment = allMethodsPayment.map((data) => {
      data.title === title ? 
        (data.isCheck = !data.isCheck, data.isCheck ? setMethodsPayment([...methodsPayment, type]) : handleRemoveMethodsPayment(type))
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
              Criar anúncio
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
          mb="16px"
        >
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>


        <Box
          w="full"
          h="100px"
          flexDirection="row"
        >
          {
            addImageProduct.map((item, index) => (
              <Box
                h="100px"
                w="100px"
                mr="8px"
                rounded={6}
                key={index}
                position="relative"
                alignItems="flex-end"
              >
                <Image
                  alt="Foto do produto do anunciante"
                  source={{ uri: item }}
                  h="full"
                  w="full"
                  rounded={6}
                  position="absolute"
                  key={index}
                />

                <Pressable
                  mr="4px"
                  mt="4px"
                  rounded="full"
                  key={index}
                  onPress={() => handlePhotoDeleteAd(item)}
                >
                  <XCircle size={16} weight="fill" color="#3E3A40" />
                </Pressable>
              </Box>
            ))
          }

          {addImageProduct.length < 3 &&
            <Pressable
              h="100px"
              w="100px"
              rounded={6}
              bg="gray.500"
              justifyContent="center"
              alignItems="center"
              onPress={handleUserPhotoSelectSignUp}
            >
              <Plus size={24} color="#9F9BA1" />
            </Pressable>

          }
        </Box>

        <Text
          fontFamily="heading"
          fontSize="sm"
          color="gray.200"
          mt="32px"
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
            onPress={() => { setNewProduct(true) }}
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
            type={!newProduct}
            onPress={() => { setNewProduct(false) }}
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

        {allMethodsPayment.map((data,index) => (
          <CheckBoxPayment
            title={data.title}
            type={data.isCheck}
            key={index}
            onPress={ () =>  handleIsCheckInMethodsPayment(data.title, data.type)}
          />
        ))}
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
          onPress={handleSubmit(handleNewNavigationPublishAd)}
        >
          Avançar
        </Button>
      </Box>
    </ScrollView>
  )
}