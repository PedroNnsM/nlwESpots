import { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'


import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@types/navigation';

import { Duocard, DuoCardProps } from '../../components/Duocard';
import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';
import React from 'react';




export function Game() {

  const [ duos , setDuos] = useState<DuoCardProps[]>([])

  const navigation = useNavigation();
  const route = useRoute()
  const game = route.params as GameParams;

  function handleGoBak(){
    navigation.goBack()
  }

  useEffect(() =>{
    fetch(`http://192.168.0.72:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then( data => 
      setDuos(data)
    )
  })

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBak}>
              <Entypo 
                name='chevron-left'
                color={THEME.COLORS.CAPTION_300}
                size={20}
              />

            </TouchableOpacity>
              <Image
                source={logoImg}
                style={styles.logo}
              />

              <View style={styles.right} />
        </View>

        <Image 
          source={{uri :game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading 
        title={game.title} 
        subtitle="Conecte-se e comece a jogar!"        
        />
        
        <FlatList 
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Duocard data={item} />
          )}
        />

      </SafeAreaView>
    </Background>
  );
}