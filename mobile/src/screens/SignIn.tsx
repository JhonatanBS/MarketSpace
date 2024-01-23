import { useState } from "react";
import { Button, Center, Heading, Pressable, ScrollView, Text, VStack, theme, useToast } from "native-base";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import LogoSVG from "@assets/logo.svg";
import { InputForm } from "@components/InputForm";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm , Controller } from "react-hook-form";

import { Eye, EyeSlash } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";

type FormDataProps = {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  password: yup.string().required("Informe a senha").min(6, "Insira pelo menos 6 digitos"),
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const { signIn, isLoadingUserStorageData } = useAuth();

  const { control, handleSubmit, formState: { errors }} = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema)
  });

  function handleNewNavigationSignOut() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente mais tarde"
    
      setIsLoading(false);
      
      toast.show({
        title,
        placement: "top",
        bgColor: "red.400"
      });
    }
  }

  return(
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} >
        <Center 
          flex={1} 
          borderRadius="24px" 
          px="48px" 
          bg="gray.600"
          pt={120}
          pb={10}
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
          
          <Button
            onPress={handleSubmit(handleSignIn)}
            bg={"blue.400"}
            borderRadius="6px"
            w="full"
            h="42px"
            mt="16px"
            _pressed={{
              backgroundColor: "blue.800"
            }}
            _text={{
              color: "gray.700",
              fontFamily: "heading",
              fontSize: "sm"
            }}
            isLoading={isLoading}
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
            onPress={handleNewNavigationSignOut}
          >
            Criar uma conta
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  )
}