import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { Box, Text, Image, Pressable, IPressableProps } from "native-base";

export type AdProps = IPressableProps & {
  name: string;
  price: number;
  product_images: ProductImageProps[];
  is_new: boolean;
  user_id?: string;
}

type ProductImageProps = {
  id: string;
  path?: string;
}

export function Ad({ name, price, product_images, is_new, user_id, ...rest }: AdProps) {

  const { user } = useAuth();

  return (
    <Pressable
      h="143px"
      w="169px"
      borderRadius={6}
      mb="24px"
      {...rest}
    >
      <Box
        borderRadius={6}
        w="full"
        h="100px"

      >
        <Image
          h="full"
          width="full"
          borderRadius={6}
          resizeMode="contain"
          alt="Foto do anúncio"
          source={{ uri: `${api.defaults.baseURL}/images/${product_images[0].path}` }}
        />

        {user.id === user_id ?
          <></>
          :
          <Box
            h="24px"
            w="24px"
            bg="red"
            borderRadius={50}
            borderWidth={1}
            borderColor="gray.700"
            position="absolute"
            left={1.5}
            top={1.5}
          >
            <Image
              h="full"
              width="full"
              alt="Foto do perfil"
              borderRadius={50}
              source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
            />
          </Box>
        }

        {is_new ?
          <Box
            position="absolute"
            right={2}
            top={2}
            w="50px"
            h="17px"
            bg="blue.800"
            justifyContent="center"
            alignItems="center"
            borderRadius={50}
          >
            <Text
              fontFamily="heading"
              color="gray.700"
              fontSize="10px"
              textTransform="uppercase"
            >
              Novo
            </Text>
          </Box>

          :
          <Box
            position="absolute"
            right={2}
            top={2}
            w="50px"
            h="17px"
            bg="gray.200"
            justifyContent="center"
            alignItems="center"
            borderRadius={50}
          >
            <Text
              fontFamily="heading"
              color="gray.700"
              fontSize="10px"
              textTransform="uppercase"
            >
              Usado
            </Text>
          </Box>
        }

      </Box>

      <Text
        mt="4px"
        mb="2px"
        fontFamily="body"
        fontSize="sm"
        color="gray.200"
      >
        {name}
      </Text>

      <Text
        fontFamily="heading"
        fontSize="xs"
        color="gray.100"
      >
        R$
        <Text
          fontFamily="heading"
          fontSize="sm"
          color="gray.100"
        >
          {` ${price}`}
        </Text>
      </Text>
    </Pressable>
  )
}