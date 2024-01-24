import { Box, Button, Center, Heading, Image, Pressable, ScrollView, Text, VStack, useToast } from "native-base";

import LogoSVG from "@assets/logo.svg";

import { api } from "@services/api";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

import { useForm , Controller } from "react-hook-form";

import { InputForm } from "@components/InputForm";
import { Eye, EyeSlash, PencilSimpleLine, User } from "phosphor-react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { AppError } from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
  name: string;
  email: string;
  tel: string;
  password: string;
  confirmed_password: string;
}

const signOutSchema = yup.object({
  name: yup.string().required("Informe seu nome"),
  email: yup.string().required("Informe seu e-mail").email("E-mail inválido"),
  tel: yup.string().required("Informe seu telefone"),
  password: yup.string().required("Informe sua senha").min(6, "Insira pelo menos 6 digitos"),
  confirmed_password: yup.string().required("Confirme sua senha").oneOf([yup.ref("password")], "A confirmação da senha não confere."),
});

export function SignUp() {
  const [show, setShow] = useState(true);
  const [userPhoto, setUserPhoto] = useState("");

  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  const { signIn } = useAuth();

  const { control, handleSubmit, formState: { errors }} = useForm<FormDataProps>({
    resolver: yupResolver(signOutSchema)
  });

  function handleNewNavigationSignIn() {
    navigation.navigate("signIn");
  }

  async function handleSignUp({ name, email, tel, password  }: FormDataProps) {
    try {
      const fileExtension = userPhoto.split(".").pop();

      const photoFile = {
        name: `default.${fileExtension}`,
        uri: userPhoto,
        type: `image/${fileExtension}`
      } as any;

      const userPhotoUploadForm = new FormData();
      userPhotoUploadForm.append("avatar", photoFile);
      userPhotoUploadForm.append("name", name);
      userPhotoUploadForm.append("email", email);
      userPhotoUploadForm.append("tel", tel);
      userPhotoUploadForm.append("password", password);
      
      await api.post("/users", userPhotoUploadForm, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      toast.show({
        title: "Cadastro realizado com sucesso",
        placement: "top",
        bgColor: "green.400"
      });

      await signIn(email, password);

    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Não foi possível cadastrar. Tente novamente mais tarde"
    
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

      if(photoSelected.canceled) {
        return;
      }

      if(photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri, { size: true});

        /*if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha um de até 5MB",
            placement: "top",
            bgColor: "red.500"
          })
        }*/
        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      throw error;
    }
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
            onPress={handleUserPhotoSelectSignUp}
          >
            { userPhoto ? 
            <Image
              size="full"
              source={{uri: userPhoto}}
              alt="Foto de perfil do usuário"
              rounded="full"
            />
            :
            <>
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
            </>
            }
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
            name="tel"
            render={({ field: { onChange, value}}) => (
              <InputForm 
                placeholder="Telefone"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.tel?.message}
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
            onPress={handleSubmit(handleSignUp)}
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