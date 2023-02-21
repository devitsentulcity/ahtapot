import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { Header, SafeAreaView, Icon, Button, TextInput } from '@components';
import styles from './styles';
import * as api from '@api';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userRegister } from '../../api/auth/register';
import RNRestart from 'react-native-restart';

export default function SignUp({ navigation, route }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [noHp, setNoHp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    name: true,
    email: true,
    noHp: true,
    password: true,
  });

  /**
   * call when action signup
   *
   */
  const onSignUp = async () => {
    if (name == '' || email == '' || noHp == '' || password == '') {
      setSuccess({
        ...success,
        name: name != '' ? true : false,
        email: email != '' ? true : false,
        noHp: noHp != '' ? true : false,
        password: password != '' ? true : false,
        confirmPassword: confirmPassword != '' ? true : false,
      });
    } else if (password != confirmPassword ) {
      Alert.alert({ title: 'Error', message: 'Password tidak sama' });
    }else {
      setLoading(true);

      userRegister({
        nama: name,
        email: email,
        nohp: noHp,
        password: password
      })
      .then(result => {
        if (result.data.status === 'success') {
          Alert.alert({
            type: 'success',
            title: t('sign_up'),
            message: 'Pendaftaran akun berhasil, menunggu aktifasi dari GM',
            action: [{ onPress: () => RNRestart.Restart() }],
          });
        } else {
          Alert.alert({ title: 'Error', message: result.data.data });
        }
      })
      .catch(err => {
        Alert.alert({ title: 'Error', message: err });
      });

      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t('sign_up')}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          // navigation.goBack();
          if (navigation.canGoBack())
            navigation.goBack();
          else
            // BackHandler.exitApp();
            navigation.replace('SignIn');
        }}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{ flex: 1 }}>
          <View style={styles.contain}>
            <TextInput
              onChangeText={text => setName(text)}
              placeholder='Nama'
              success={success.name}
              value={name}
              onFocus={() => {
                setSuccess({
                  ...success,
                  name: true,
                });
              }}
            />
            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={text => setEmail(text)}
              placeholder='Email'
              keyboardType="email-address"
              success={success.email}
              value={email}
              onFocus={() => {
                setSuccess({
                  ...success,
                  email: true,
                });
              }}
            />
            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={text => setNoHp(text)}
              placeholder='No HP'
              success={success.noHp}
              keyboardType="phone-pad"
              value={noHp}
              onFocus={() => {
                setSuccess({
                  ...success,
                  noHp: true,
                });
              }}
            />
            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              placeholder={t('input_password')}
              success={success.password}
              value={password}
              onFocus={() => {
                setSuccess({
                  ...success,
                  password: true,
                });
              }}
            />
            <TextInput
              style={{ marginTop: 10 }}
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry={true}
              placeholder='Confirm Password'
              success={success.confirmPassword}
              value={confirmPassword}
              onFocus={() => {
                setSuccess({
                  ...success,
                  confirmPassword: true,
                });
              }}
            />
            <Button
              full
              style={{ marginTop: 20 }}
              loading={loading}
              onPress={() => onSignUp()}>
              {t('sign_up')}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
