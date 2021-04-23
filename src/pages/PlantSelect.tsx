import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { EnviromentButton } from '../components/EnviromentButton';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

import api from '../services/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentsProps {
  key: string;
  title: string
};

interface PlantsProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
};

export function PlantSelect() {
  const [enviroments, setEnviroments] = useState<EnviromentsProps[]>([]);
  const [plants, setPlants] = useState<PlantsProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  async function fetchPlants() {
    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if (!data)
      return setLoading(true);

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  };


  function handleEnviromentSelected(enviroment: string) {
    setEnviromentSelected(enviroment);

    if (enviroment === 'all') {
      return setFilteredPlants(plants);
    };

    const filtered = plants.filter(plant =>
      plant.environments.includes(enviroment)
    );

    setFilteredPlants(filtered);
  };

  function handleFetchMore(distance: number) {
    if (distance < 1)
      return;

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1)
    fetchPlants()
  };

  useEffect(() => {
    async function fetchEnviroments() {
      const { data } = await api.get('/plants_environments?_sort=title&_order=asc');

      setEnviroments([
        { key: 'all', title: 'Todos' },
        ...data
      ]);
    };

    fetchEnviroments();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading)
    return <Load />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual ambiente
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList
          data={enviroments}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => (
            <PlantCardPrimary data={item} />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore
              ? <ActivityIndicator color={colors.green_dark} />
              : <></>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },

  header: {
    paddingHorizontal: 30
  },

  title: {
    marginTop: 15,
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 17,
    lineHeight: 20
  },

  subtitle: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20
  },

  enviromentList: {
    justifyContent: 'center',
    height: 40,
    marginLeft: 32,
    marginVertical: 32,
    paddingBottom: 5
  },

  plants: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32
  }
});