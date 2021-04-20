import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  View
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil
        </Text>

        <Image
          style={styles.image}
          source={wateringImg}
          resizeMode='contain'
        />

        <Text style={styles.subTitle}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
        >
          <Feather
            style={styles.buttonIcon}
            name='chevron-right'
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },

  title: {
    marginTop: 38,
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
  },

  image: {
    height: Dimensions.get('window').width * 0.7
  },

  subTitle: {
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 18,
    textAlign: 'center'
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    height: 56,
    width: 56,
    marginBottom: 10,
    borderRadius: 16,
  },

  buttonIcon: {
    color: colors.white,
    fontSize: 24
  }
});