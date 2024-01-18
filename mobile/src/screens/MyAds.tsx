import { Ad } from "@components/Ad";
import { Box, Pressable, ScrollView, Text, View } from "native-base";
import { CaretDown, CaretUp, Plus } from "phosphor-react-native";
import { useState } from "react";

export function MyAds() {
  const [ chooseFilter, setChooseFilter ] = useState("Todos");
  const [ buttonFilter, setButtonFilter] = useState(false);
  
  return(
    <Box 
      flex={1} 
      px="24px"
      pt="64px"
    >
      <Box 
        w="full"
        h="26px"
        mb="32px"
      >
        <Text
          fontFamily="heading"
          fontSize="lg"
          textAlign="center"
        >
          Meus anúncios
        </Text>

        <Pressable
          position="absolute"
          right={0}
          top={0.55}
          onPress={() => {}}
        >
          <Plus 
            size={24} 
            color="#1A181B"
          />
        </Pressable>
      </Box>

      <View 
        w="full"
        h="34px"
        mb="24px"
        flexDirection="row"
        justifyContent="space-between"

      >
        <Text
          fontFamily="body"
          fontSize="sm"
        >
          { 9 } anúncios
        </Text>
        
        <Pressable
          h="34px"
          w="111px"
          borderWidth={1}
          rounded={6}
          borderColor="gray.500"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          pl="12px"
          pr="9px"
          onPress={() => setButtonFilter(!buttonFilter)}
        >
          <Text
            fontFamily="body"
            fontSize="sm"
            color="gray.100"
          >
            {chooseFilter}
          </Text>

          { buttonFilter ? 
            <CaretUp size={16} color="#5F5B62"/>
            :
            <CaretDown size={16} color="#5F5B62"/>
          }
          
          { buttonFilter ?
            <Box
              h="102px"
              w="111px"
              bg="gray.700"
              position="absolute"
              top={36}
              zIndex={1}
              rounded={6}
              p="12px"
            >

              <Pressable
                onPress={() => {setChooseFilter("Todos"), setButtonFilter(!buttonFilter)}}
              >
                <Text
                  fontFamily="heading"
                  fontSize="sm"
                  color="gray.200"
                >
                  Todos
                </Text>
              </Pressable>

              <Pressable 
                my="10px"
                onPress={() => {setChooseFilter("Ativos"), setButtonFilter(!buttonFilter)}}
              >
                <Text
                  fontFamily="body"
                  fontSize="sm"
                  color="gray.200"
                >
                  Ativos
                </Text>
              </Pressable>

              <Pressable 
                onPress={() => {setChooseFilter("Inativos"), setButtonFilter(!buttonFilter)}}
              >
                <Text
                  fontFamily="body"
                  fontSize="sm"
                  color="gray.200"
                >
                  Inativos
                </Text>
              </Pressable>

            </Box>
          : 
            <></>
        } 
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} zIndex={-1}>
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
        </Box>
      </ScrollView>

    </Box>
  )
}