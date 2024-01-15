import { Ad } from "@components/Ad";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Box, Button, Divider, HStack, Input, Pressable, ScrollView, Text, VStack, View } from "native-base";
import { ArrowRight, MagnifyingGlass, Plus, Sliders, Tag, User } from "phosphor-react-native";

export function Home() {
  
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function newNavigationMyAds() {
    navigation.navigate("myAds");
  }

  return(
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
          
          <Pressable onPress={() => console.log("Ola mundo")}>
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
    </VStack>
  )
  }