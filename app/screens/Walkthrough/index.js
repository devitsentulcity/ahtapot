import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {
  Header,
  SafeAreaView, 
  Text, 
  Button, 
  Image, 
  ProfileDetail,
  ProfilePerformance,
  Icon
} from '@components';
import styles from './styles';
import Swiper from 'react-native-swiper';
import {BaseColor, BaseStyle, Images, useTheme} from '@config';
import * as Utils from '@utils';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Walkthrough({navigation}) {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);

  const onNotification = () => {
    navigation.navigate('Notification');
  };

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={'Profile'}
        renderRight={() => {
          return <Icon name="bell" size={16} color={colors.text} />;
        }}
        onPressRight={() => onNotification()}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        {/* <ScrollView>
          <View style={styles.contain}>
            <ProfileDetail
              textFirst={'user.name'}
              point={'3'}
              textSecond={'user.description'}
              textThird={'user.email'}
            />
            <ProfilePerformance data={'user.value'} style={{ marginTop: 20 }} />
            <TouchableOpacity
              style={[
                styles.profileItem,
                {
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                  marginTop: 15,
                },
              ]}
              onPress={() => {
                navigation.navigate('ProfileEdit');
              }}>
              <Text body1>{t('edit_profile')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{ marginLeft: 5 }}
                enableRTL={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                { borderBottomColor: colors.border, borderBottomWidth: 1 },
              ]}
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}>
              <Text body1>{t('change_password')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{ marginLeft: 5 }}
                enableRTL={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                { borderBottomColor: colors.border, borderBottomWidth: 1 },
              ]}
              onPress={() => navigation.navigate('ContactUs')}>
              <Text body1>{t('contact_us')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{ marginLeft: 5 }}
                enableRTL={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                { borderBottomColor: colors.border, borderBottomWidth: 1 },
              ]}
              onPress={() => {
                navigation.navigate('AboutUs');
              }}>
              <Text body1>{t('about_us')}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="angle-right"
                  size={18}
                  color={colors.primary}
                  style={{ marginLeft: 5 }}
                  enableRTL={true}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileItem}
              onPress={() => {
                navigation.navigate('Setting');
              }}>
              <Text body1>{t('setting')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{ marginLeft: 5 }}
                enableRTL={true}
              />
            </TouchableOpacity>
          </View>
        </ScrollView> */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <Button full loading={loading} onPress={handleLogout}>
            {t('sign_out')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
