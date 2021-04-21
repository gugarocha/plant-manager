import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Button() {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>
        Confirmar
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
  },

  text: {
    fontFamily: fonts.heading,
    color: colors.white,
    fontSize: 16
  }
});