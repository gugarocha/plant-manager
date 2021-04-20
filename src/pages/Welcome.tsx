import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors';

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'}
        suas plantas {'\n'}
        de forma fácil
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
        <Text style={styles.buttonText}>
          {'>'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  title: {
    marginTop: 38,
    color: colors.heading,
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  image: {
    height: Dimensions.get('window').width * 0.7
  },

  subTitle: {
    paddingHorizontal: 20,
    color: colors.heading,
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

  buttonText: {
    color: colors.white,
    fontSize: 24
  }
});