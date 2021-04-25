import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import { Load } from '../components/Load';
import { Header } from '../components/Header';
import { PlantCardSecundary } from '../components/PlantCardSecundary';

import { loadPlants, PlantProps, removePlant } from '../libs/storage';
import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remove a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😥',
        onPress: async () => {
          try {
            await removePlant(plant.id);
            setMyPlants(oldData =>
                oldData.filter(item => plant.id !== item.id )
            );
          } catch (error) {
            Alert.alert('Não foi possível remover! 😥');
          };
        }
      }
    ]);
  };

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlants();
      
      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(`Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`);
      setMyPlants(plantsStoraged);
      setLoading(false);
    };

    loadStorageData();
  }, []);

  if(loading)
    return <Load />

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image
          source={waterdrop}
          style={styles.spotlightImage}
        />

        <Text style={styles.spotLightText}>
          {nextWatered}
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>

        <FlatList
          data={myPlants}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecundary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    paddingHorizontal: 30,
    paddingTop: 50,
  },

  spotlight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 110,
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20
  },

  spotlightImage: {
    height: 60,
    width: 60
  },

  spotLightText: {
    flex: 1,
    paddingHorizontal: 20,
    color: colors.blue
  },

  plants: {
    flex: 1,
    width: '100%'
  },

  plantsTitle: {
    marginVertical: 20,
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24
  }
});