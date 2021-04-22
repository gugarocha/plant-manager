import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import userImg from '../assets/userImg.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          Olá,
        </Text>
        <Text style={styles.userName}>
          Gustavo
        </Text>
      </View>

      <Image
        style={styles.image}
        source={userImg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20
  },

  greeting: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 32
  },

  userName: {
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 40
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 40
  }
});