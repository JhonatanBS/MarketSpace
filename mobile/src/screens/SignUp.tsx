import { Box, Button, Center, Heading, Pressable, ScrollView, Text, VStack } from "native-base";

import LogoSVG from "@assets/logo.svg";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm , Controller } from "react-hook-form";

import { InputForm } from "@components/InputForm";
import { Eye, EyeSlash, PencilSimpleLine, User } from "phosphor-react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

type FormDataProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmed_password: string;
}

const signOutSchema = yup.object({
  name: yup.string().required("Informe seu nome"),
  email: yup.string().required("Informe seu e-mail").email("E-mail inválido"),
  phone: yup.string().required("Informe seu telefone"),
  password: yup.string().required("Informe sua senha").min(6, "Insira pelo menos 6 digitos"),
  confirmed_password: yup.string().required("Confirme sua senha").oneOf([yup.ref("password")], "A confirmação da senha não confere."),
});

export function SignUp() {
  const [show, setShow] = useState(true);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors }} = useForm<FormDataProps>({
    resolver: yupResolver(signOutSchema)
  });

  function handleNewNavigationSignIn() {
    navigation.navigate("signIn");
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg={"gray.600"}>
        <Center flex={1} px="48px">
          <LogoSVG 
            height={40} 
            width={60}
          />

          <Heading 
            color="gray.100" 
            fontFamily="heading" 
            fontSize="lg"
            mt="18px"
          >
            Boas vindas!
          </Heading>

          <Text 
            color="gray.200" 
            fontFamily="body" 
            fontSize="sm"
            mt="8px"
            textAlign="center"
          >
            Crie sua conta e use o espaço para comprar itens variados 
            e vender seus produtos
          </Text>

          <Pressable
            h="88px"
            w="88px"
            borderRadius={50}
            borderWidth={3}
            borderColor="blue.400"
            bg="gray.500"
            justifyContent="center"
            alignItems="center"
            mt="32px"
            mb="16px"
          >
            <User size={50} color="#9F9BA1"/>

            <Box 
              bg="blue.400"
              h="40px"
              w="40px"
              borderRadius={50}
              justifyContent="center"
              alignItems="center"
              position="absolute"
              right={-8}
              bottom={-8}
            >
              <PencilSimpleLine color="#EDECEE" size={16}/>
            </Box>
          </Pressable>

          <Controller 
            control={control}
            name="name"
            render={({ field: { onChange, value}}) => (
              <InputForm 
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
          />
            )}
          />

          <Controller 
            control={control}
            name="email"
            render={({ field: { onChange, value}}) => (
              <InputForm 
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
          />
            )}
          />
          
          <Controller 
            control={control}
            name="phone"
            render={({ field: { onChange, value}}) => (
              <InputForm 
                placeholder="Telefone"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.phone?.message}
          />
            )}
          />

          <Controller 
            control={control}
            name="password"
            render={({ field: { onChange, value}}) => (
              <InputForm 
                placeholder="Senha"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
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
            )}
          />

          <Controller 
            control={control}
            name="confirmed_password"
            render={({ field: { onChange, value}}) => (
              <InputForm 
                placeholder="Corfimar senha"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.confirmed_password?.message}
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
            )}
          />

          <Button
            onPress={handleSubmit(() => {})}
            bg={"gray.100"}
            borderRadius="6px"
            w="full"
            h="42px"
            mt="8px"
            _pressed={{
              backgroundColor: "gray.300"
            }}
            _text={{
              color: "gray.700",
              fontFamily: "heading",
              fontSize: "sm"
            }}
          >
            Criar
          </Button>

          <Text color="gray.200" mb="16px" mt="48px">
            Já tem uma conta?
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
              backgroundColor: "gray.400",

            }}
            onPress={handleNewNavigationSignIn}
          >
            Ir para o login
          </Button>

        </Center>
      </VStack>
    </ScrollView>
  )
}