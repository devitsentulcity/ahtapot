import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { Header, SafeAreaView, Icon, Button, TextInput } from '@components';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { userRegister } from '../../api/auth/register';
import CommonServices from '../../services/common';

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

  const onRegister = async () => {
    setLoading(true);
    if (name == '' || email == '' || noHp == '' || password == '') {
      setSuccess({
        ...success,
        name: name != '' ? true : false,
        email: email != '' ? true : false,
        noHp: noHp != '' ? true : false,
        password: password != '' ? true : false,
        confirmPassword: confirmPassword != '' ? true : false,
      });
    } else if (password != confirmPassword) {
      Alert.alert({ title: 'Error', message: 'Password tidak sama' });
    } else {
      let params = {
        nama: name,
        email: email,
        nohp: noHp,
        password: password
      }
      let response = await CommonServices.callApi('public/register', 'POST', params);
      if(response.status === 'success'){
        Alert.alert({
          type: 'success',
          title: t('sign_up'),
          message: 'Pendaftaran akun berhasil, menunggu aktifasi dari GM',
          action: [{ onPress: () => navigation.goBack() }],
        });
      } else {
        Alert.alert({ title: 'Error', message: response.data });
      }
    }
    setLoading(false);
  }

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
          navigation.goBack();
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
            />``
            <Button
              full
              style={{ marginTop: 20 }}
              loading={loading}
              onPress={() => onRegister()}>
              {t('sign_up')}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
