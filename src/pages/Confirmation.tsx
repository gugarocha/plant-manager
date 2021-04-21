import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Button } from '../components/Button';
import colors from '../styles/colors';

import fonts from '../styles/fonts';

export function Confirmation() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          😄
        </Text>

        <Text style={styles.title}>
          Prontinho
        </Text>

        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <Button
            title='Começar'
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 30
  },

  emoji: {
    fontSize: 78
  },

  title: {
    marginTop: 15,
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 22,
    lineHeight: 28,
    textAlign: 'center'
  },

  subtitle: {
    paddingVertical: 10,
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: 'center'
  },

  footer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 50
  }
});
