import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
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
import { BaseColor, BaseStyle, Images, useTheme, useFont } from '@config';
import * as Utils from '@utils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { userSelect } from '@selectors';
import { authActions } from '@actions';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Walkthrough({ navigation }) {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userSelect);
  const [showAlert, setShowAlert] = useState(false);

  const sAlert = () => {
    setShowAlert(true);
  }

  const hAlert = () => {
    setShowAlert(false);
  }
  
  const onNotification = () => {
    navigation.navigate('Notification');
  };

  const onLogout = () => {
    setLoading(true);
    dispatch(authActions.onLogout());
  };

  /**
   * render button list sales
  */
  const renderListSales = () => {
    if(user.level === '9') {
      return (
        <View>
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
              navigation.navigate('ListSales',{
                item: {
                  judul: 'Data Sales Non Aktif',
                  aktif: 'F',
                  level: '0'
                }
              });
            }}>
            <Text body1>Data Sales Non Aktif</Text>
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
              {
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={() => {
              navigation.navigate('ListSales',{
                item: {
                  judul: 'Data Sales Aktif',
                  aktif: 'T',
                  level: '0'
                }
              });
            }}>
            <Text body1>Data Sales Aktif</Text>
            <Icon
              name="angle-right"
              size={20}
              color={colors.primary}
              style={{ marginLeft: 5 }}
              enableRTL={true}
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
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
              navigation.navigate('ListSales', {
                item: {
                  judul: 'Data Sales Non Aktif',
                  aktif: 'F',
                  level: '0'
                }
              });
            }}>
            <Text body1>Data NUP</Text>
            <Icon
              name="angle-right"
              size={18}
              color={colors.primary}
              style={{ marginLeft: 5 }}
              enableRTL={true}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }

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
        <ScrollView>
          <View style={styles.contain}>
            <ProfileDetail
              image={'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg'}
              textFirst={user.nama}
              textSecond={user.email}
            />
            <ProfilePerformance style={{ marginTop: 20 }} />
            {renderListSales()}
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <Button full loading={loading} onPress={() => sAlert()}>
            {t('sign_out')}
          </Button>
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Konfirmasi"
          message="Anda yakin akan keluar ?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Batal"
          confirmText="Yakin"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            hAlert();
          }}
          onConfirmPressed={() => {
            onLogout();
          }}
        />
      </SafeAreaView>
    </View>
  );
}
