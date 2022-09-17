import React from 'react';
import { Touchable, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { DouInfo } from '../DouInfo';

import { styles } from './styles';

export interface DuoCardProps {
  id: string;
  hourStart: string;
  hourEnd: string;
  name: string;
  useVoiceChannel: boolean
  weekDays: string [];
  yearsPlaying: number
}

interface Props {
  data: DuoCardProps
}

export function Duocard({ data }: Props ) {
  return (
    <View style={styles.container}>

      <DouInfo 
        label='Nome'
        value={data.name}
      />

      <DouInfo 
        label='Tempo de jogo'
        value={`${data.yearsPlaying} anos`}
      />


      <DouInfo 
        label='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
        
      />
        
        <DouInfo 
        label='Chamada de audio'
        value={data.useVoiceChannel ? "Sim" : "Nao"}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity 
      style={styles.button}
      >
        

      </TouchableOpacity>

    </View>
  );
}