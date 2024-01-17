import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { Ad } from "@components/Ad";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Box, Button, Checkbox, Divider, HStack, Input, Pressable, ScrollView, Switch, Text, VStack, View } from "native-base";
import { ArrowRight, MagnifyingGlass, Plus, Sliders, Tag, User, X } from "phosphor-react-native";
import { Modal } from "react-native";
import { ButtonNewOrUsed } from "@components/ButtonNewOrUsed";
import { CheckBoxPayment } from "@components/CheckBoxPayment";
import { SwitchExchange } from "@components/SwitchExchange";

export function Home() {
  const [showModal, setShowModal] = useState(false);

  const [ newObject, setNewObject ] = useState(false);
  const [ usedObject, setUsedObject ] = useState(false);
  const [ accepetedExchange, setAccepetedExchange ] = useState(false);
  
  console.log(accepetedExchange)
  
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function newNavigationMyAds() {
    navigation.navigate("myAds");
  }

  return(
    <>
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
            <User size={30} color="#647AC7"/>
          </Pressable>
          
          <View ml="10px">
            <Text color="gray.100" fontFamily="body">
              Boas vindas,
            </Text>
            <Text fontFamily="heading">Maria!</Text> 
          </View>
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
        <View flexDirection="row" alignItems="center">
          <Tag 
            size={22} 
            color="#364D9D"
          />

          <View flexDirection="column" ml="16px">
            <Text
              fontFamily="heading"
              fontSize="lg"
              color="gray.200"
            >
              4
            </Text>

            <Text
              fontFamily="body"
              fontSize="xs"
              color="gray.200"

            >
              anúncios ativos
            </Text>
          </View>
        </View>

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
          <Pressable onPress={() => console.log("Ola mundo")}>
            <MagnifyingGlass size={20} color="#3E3A40"/>
          </Pressable>

          <Divider 
            orientation="vertical" 
            w={0.5} h={5} 
            bg="gray.400"
            mx="12px"
            />
          
          <Pressable onPress={() => setShowModal(true)}>
            <Sliders size={20} color="#3E3A40"/>
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
          <Ad />
          <Ad />
          <Ad />
          <Ad />
          <Ad />
          <Ad />
          <Ad />
          <Ad />
        </Box>
      </ScrollView>

    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      statusBarTranslucent
    >
      <View flex={1} backgroundColor= {"rgba(0, 0, 0, 0.5)"} justifyContent="flex-end">
        <View 
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
              <X size={24} color="#9F9BA1"/>
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
            >
              Aplicar filtros
            </Button>
          </Box>

        </View>    
      </View> 
      </Modal>
    </VStack>

    </>
  )
  }