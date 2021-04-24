import React, { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useRoute } from '@react-navigation/core';
import { SvgFromUri } from 'react-native-svg';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import { Button } from '../components/Button';

import { PlantProps, savePlant } from '../libs/storage';
import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  plant: PlantProps
};

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const route = useRoute();
  const { plant } = route.params as Params;

  function handleChangeTime(event: Event, datetime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    };

    if (datetime && isBefore(datetime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no fururo! ⏰');
    };

    if (datetime) {
      setSelectedDateTime(datetime);
      setShowDatePicker(false);
    };
  };

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState)
  };

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });
    } catch (error) {
      Alert.alert('Não foi possivel salvar 😥');
    };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri
          uri={plant.photo}
          height={150}
          width={150}
        />

        <Text style={styles.plantName}>
          {plant.name}
        </Text>
        <Text style={styles.plantAbout}>
          {plant.about}
        </Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image
            source={waterdrop}
            style={styles.tipImage}
          />

          <Text style={styles.tipText}>
            {plant.water_tips}
          </Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDateTime}
            mode='time'
            display='spinner'
            onChange={handleChangeTime}
          />
        )}

        {Platform.OS === 'android' && (
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={handleOpenDateTimePickerForAndroid}
          >
            <Text style={styles.dateTimePickerText}>
              {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
            </Text>
          </TouchableOpacity>
        )}

        <Button
          title='Cadastrar planta'
          onPress={handleSave}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },

  plantInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor: colors.shape
  },

  plantName: {
    marginTop: 15,
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24
  },

  plantAbout: {
    marginTop: 10,
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'center'
  },

  controller: {
    backgroundColor: colors.white,
    padding: 20
  },

  tipContainer: {
    position: 'relative',
    bottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20
  },

  tipImage: {
    width: 56,
    height: 56
  },

  tipText: {
    flex: 1,
    marginLeft: 20,
    color: colors.blue,
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'justify'
  },

  alertLabel: {
    marginBottom: 5,
    color: colors.heading,
    fontFamily: fonts.complement,
    fontSize: 12,
    textAlign: 'center'
  },

  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 30
  },

  dateTimePickerText: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 24
  }
});