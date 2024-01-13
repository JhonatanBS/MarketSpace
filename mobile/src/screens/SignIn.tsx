import { Box, Center, Heading, IconButton, Pressable, Text, VStack } from "native-base";

import LogoSVG from "@assets/logo.svg";
import { InputForm } from "@components/InputForm";

import { Eye, EyeSlash } from "phosphor-react-native";
import { useState } from "react";

export function SignIn() {
  const [show, setShow] = useState(false);

  return(
    <VStack flex={1} pl="48px" pr="48px" bg="gray.600">
      <Center flex={1}>
        <LogoSVG />

        <Heading color="gray.100" fontSize="35px">
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

        <Box w="100%" flexDirection="row" justifyContent="center" alignItems="center">
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

        </Box>
      </Center>
    </VStack>
  )
}