import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
};

export const PlantCardSecundary = ({ data, handleRemove, ...rest }: PlantProps) => {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.removeButton}
              onPress={handleRemove}
            >
              <Feather name='trash' size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton
        style={styles.container}
        {...rest}
      >
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Text style={styles.title}>
          {data.name}
        </Text>

        <View style={styles.details}>
          <Text style={styles.timeLabel}>
            Regar às
          </Text>
          <Text style={styles.time}>
            {data.hour}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    backgroundColor: colors.shape
  },

  title: {
    flex: 1,
    marginLeft: 10,
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 17
  },

  details: {
    alignItems: 'flex-end'
  },

  timeLabel: {
    color: colors.body_light,
    fontFamily: fonts.text,
    fontSize: 16,
  },

  time: {
    marginTop: 5,
    color: colors.body_dark,
    fontFamily: fonts.text,
    fontSize: 16
  },

  removeButton: {
    position: 'relative',
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 85,
    width: 100,
    marginTop: 15,
    paddingLeft: 15,
    borderRadius: 20,
    backgroundColor: colors.red
  }
});