import { Button, Center, Heading, Pressable, Text, VStack, theme } from "native-base";

import LogoSVG from "@assets/logo.svg";
import { InputForm } from "@components/InputForm";

import { Eye, EyeSlash } from "phosphor-react-native";
import { useState } from "react";

export function SignIn() {
  const [show, setShow] = useState(false);

  return(
    <VStack flex={1} >
      <Center 
        flex={1} 
        borderRadius="24px" 
        px="48px" 
        bg="gray.600"
        pt={85}
      >
        <LogoSVG width={95} height={64}/>

        <Heading color="gray.100" fontSize="36px">
          marketspace
        </Heading>

        <Text 
          fontSize="sm"
          color="gray.300"
          mb="76px"
        >
        Seu espaço de compra e venda
        </Text >

        <Text color="gray.200" fontSize="sm" mb="16px">
        Acesse sua conta
        </Text>

        <InputForm 
          placeholder="E-mail"
          mb="16px"
        />

        <InputForm 
          placeholder="Senha"
          type={ show ? "text" : "password"}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)} mr={3}>
              { show ? 
              <Eye 
              size={20} 
              color="#5F5B62" 
              />
              :
              <EyeSlash 
              size={20} 
              color="#5F5B62"
              />
              }
            </Pressable>
          }
        />

        <Button
          bg={"blue.400"}
          borderRadius="6px"
          w="full"
          h="42px"
          mt="32px"
          _pressed={{
            backgroundColor: "blue.800"
          }}
          _text={{
            color: "gray.700",
            fontFamily: "heading",
            fontSize: "sm"
          }}
        >
          Entrar
        </Button>
      </Center>

      <Center h="212px" bg="gray.700" px="48px">
        <Text color="gray.200" mb="16px">
          Ainda não tem acesso?
        </Text>

        <Button 
          w="full" 
          h="42px" 
          bg="gray.500"
          borderRadius="6px"
          _text={{
            color: "gray.200",
            fontFamily: "heading",
            fontSize: "sm"
          }}
          _pressed={{
            backgroundColor: "gray.600",

          }}
        >
          Criar uma conta
        </Button>
      </Center>
    </VStack>
  )
}