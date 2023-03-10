import React, { useState, useEffect, Component } from 'react';
import {
  View,
  Dimensions,
} from 'react-native';
import {BaseColor, useTheme, BaseStyle} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
} from '@components';
import {useTranslation} from 'react-i18next';
import * as Utils from '@utils';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {userSelect, wishlistSelect, designSelect} from '@selectors';
import { WebView } from 'react-native-webview';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function WebViewSitePlan({navigation, route}) {
  const win = Dimensions.get('window');
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const wishlist = useSelector(wishlistSelect);
  const item = route.params?.item;
  const useGallery = !!route.params?.useGallery;
  const [kodeKawasan, setKodeKawasan] = useState('');  
  const [kodetg, setKodeTg] = useState('');

  const [showConfirm, setShowConfirm] = useState('');
  const [messageConfirm, setMessageConfirm] = useState('');
  const [unitBooking, setUnitBooking] = useState('');

  const hAlert = () => {
    setShowConfirm(false);
  }

  const onMessage = (data) => {
    setShowConfirm(true);
    setMessageConfirm('Booking unit ' + data.nativeEvent.data + ' ?');
    setUnitBooking(data.nativeEvent.data);
  }

  const hConfirm = (kodeUnit) => {
    navigation.navigate('DataUnit', {
      item: {
        id: kodeUnit
      },
    });
  }

  useEffect(() => {
    setKodeKawasan(item.KawasanCode?.toLowerCase());
    setKodeTg(item.tg?.toLowerCase());
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        title={'Siteplan : ' + item?.KawasanName}
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
        renderRight={() => {
          if (useGallery) {
            return (
              <Icon name="images" size={20} color={BaseColor.whiteColor} />
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        <View
          style={[styles.contentDescription, { borderColor: colors.border }]}>
          <Text body2 style={{ lineHeight: 20, textAlign: 'center' }}>
            Zoom untuk melihat siteplan lebih detail
          </Text>
          <Text body2 style={{ lineHeight: 20, textAlign: 'center' }}>
            Klik unit yang akan dibooking
          </Text>
          <Text body2 style={{ lineHeight: 20, textAlign: 'center' }}>
            Warna hijau untuk Available dan merah untuk Booked
          </Text>
        </View>
        <WebView
          originWhitelist={['*']}
          source={{ uri: 'http://10.10.20.36/msales_v1/svgz_sc.php?p=' + kodeKawasan + '&tg=' + kodetg }}
          onMessage={onMessage}
        />

        <AwesomeAlert
          show={showConfirm}
          showProgress={false}
          title={'Konfirmasi'}
          message={messageConfirm}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Tidak"
          confirmText="Iya"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            hAlert();
          }}
          onConfirmPressed={() => {
            hConfirm(unitBooking);
            hAlert();
          }}
        />
      </SafeAreaView>
    </View>
  );
}
