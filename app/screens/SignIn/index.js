import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, TextInput} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {authActions} from '@actions';
import {designSelect} from '@selectors';
import CommonServices from '../../services/common';

export default function SignIn({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const design = useSelector(designSelect);

  const [loading, setLoading] = useState(false);
  // const [id, setId] = useState('paul');
  // const [password, setPassword] = useState('123456');
  const [success, setSuccess] = useState({id: true, password: true});
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  /**
   * call when action onLogin
   */
  const onLogin = async () => {
    if (username == '' || password == '') {
      setSuccess({
        ...success,
        username: false,
        password: false,
      });
      return;
    }
    setLoading(true);
    // let paramLogin = {
    //   email: username,
    //   password: password,
    // }
    // let responseLogin = await CommonServices.callApi('msales/public/login','POST',paramLogin);
    // setLoading(false);
    // //console.log(responseLogin);
    // if (responseLogin.status === 'success') {image.png
    // } else {
    //   Alert.alert({ title: responseLogin.status, message: responseLogin.message });
    // }
  };

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('sign_in')}
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
          style={{flex: 1}}>
          <View style={styles.contain}>
            <TextInput
              onChangeText={text => setUsername(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  username: true,
                });
              }}
              placeholder={t('input_id')}
              success={success.username}
            />
            <TextInput
              style={{marginTop: 10}}
              onChangeText={text => setPassword(text)}
              onFocus={() => {
                setSuccess({
                  ...success,
                  password: true,
                });
              }}
              placeholder={t('input_password')}
              secureTextEntry={true}
              success={success.password}
            />
            <Button
              style={{marginTop: 20}}
              full
              loading={loading}
              onPress={onLogin}>
              {t('sign_in')}
            </Button>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPassword')}>
              <Text body1 grayColor style={{marginTop: 25}}>
                {t('forgot_your_password')}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
