import { AspectRatio, Box, Text, Image } from "native-base";

export function Ad() {
  return(
    <Box h="143px" w="169px" borderRadius={6} mb="24px">
      <Box 
        borderRadius={6} 
        w="full" 
        h="100px"

      >
        
        <Image
          h="full"
          width="full"
          borderRadius={6}
          resizeMode="cover"
          alt="Foto do anúncio"
          source={{ uri: "https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}}
        />

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
            source={{ uri: "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"}}
          />
        </Box>

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
          >
            Usado
          </Text>
        </Box>
        
      </Box>

      <Text
        mt="4px"
        mb="2px"
        fontFamily="body"
        fontSize="sm"
        color="gray.200"
      >
        Tênis vermelho
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
          {" 59,90"}
        </Text>
      </Text>
    </Box>
  )
}