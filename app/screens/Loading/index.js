import React, {useEffect} from 'react';
import {ActivityIndicator, View, Alert} from 'react-native';
import {Images, useTheme, BaseSetting} from '@config';
import {configActions} from '@actions';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Text} from '@components';
import {designSelect, userSelect} from '@selectors';

import styles from './styles';

export default function Loading({navigation}) {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const design = useSelector(designSelect);
  const user = useSelector(userSelect);

  /**
   *
   * Override Alert
   */
  Alert.alert = ({title, message, action, option, type}) => {
    navigation.navigate('Alert', {
      type: type ?? 'warning',
      title: title ?? '',
      message: message ?? '',
      action,
      option: option ?? {cancelable: true},
    });
  };

  useEffect(() => {
    dispatch(
      configActions.onSetup(
        design ?? BaseSetting.defaultDesign,
        user,
        response => {
          navigation.replace('Main');
        },
      ),
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
        <Text title1 style={{marginTop: 8}}>
          {BaseSetting.displayName}
        </Text>
        <Text headline primaryColor style={{marginTop: 8}}>
          PT Sentul City Tbk
        </Text>
      </View>
      <ActivityIndicator
        size="large"
        color={colors.text}
        style={styles.loading}
      />
    </View>
  );
}
