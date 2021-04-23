import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  const [name, setName] = useState<string>();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const navigation = useNavigation();

  function handleSubmit() {
    if(!name)
      return Alert.alert('Me diz como chamar você 😥')

    navigation.navigate('Confirmation');
  };

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!name)
  };

  function handleInputFocus() {
    setIsFocused(true)
  };

  function handleInputChange(value: string) {
    setName(value);
    setIsFilled(!!value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  {isFilled ? '😄' : '😀'}
                </Text>

                <Text style={styles.title}>
                  Como podemos {'\n'}
                  chamar você?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) &&{ borderColor: colors.green }
                ]}
                placeholder='Digite seu nome'
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button
                  title='Confirmar'
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  content: {
    flex: 1,
    width: '100%'
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 54
  },

  header: {
    alignItems: 'center'
  },

  emoji: {
    fontSize: 44
  },

  title: {
    marginTop: 20,
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center'
  },

  input: {
    width: '100%',
    marginTop: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    fontSize: 18,
    textAlign: 'center'
  },

  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  }
});