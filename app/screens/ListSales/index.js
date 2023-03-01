import React, { useState, useEffect } from 'react';
import { RefreshControl, View, FlatList, Alert } from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import { Header, SafeAreaView, Icon, Text, ListThumbCircle, Button } from '@components';
import {notificationActions} from '@actions';
import {notificationSelect} from '@selectors';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import CommonServices from '../../services/common';
import { userSelect } from '@selectors';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function ListSales({ navigation, route }) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const notification = useSelector(notificationSelect);
  const [refreshing, setRefresh] = useState(false);
  const item = route.params?.item;
  const [salesData, setSalesData] = useState([]);
  const [uniqueId, setUniqueId] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [viewName, setViewName] = useState('');

  const sAlert = (unique_id, item_nama) => {
    setShowAlert(true);
    setUniqueId(unique_id);
    setViewName('Anda yakin akan aktivasi sales ' + item_nama + ' ?');
  }

  const hAlert = () => {
    setShowAlert(false);
    setUniqueId('');
    setViewName('');
  }

  const initPage = async () => {
    fetchSales();
  };

  const fetchSales = async () => {
    let params = {
      aktif: item.aktif,
      level: item.level,
      mgr_id: '',
      sp_access: ''
    }
    let response = await CommonServices.callApi('api/user?page=&item=0', 'POST', params);
    console.log(response);
    if (response.status === 'success') {
      setSalesData(response.data.data);
    } else {
      setSalesData([]);
    }
  }

  const actActive = async () => {
    hAlert();
    let paramsActive = {
      unique_id: uniqueId,
    }
    let response = await CommonServices.callApi('api/approve', 'POST', paramsActive);
    console.log(response);
    console.log(paramsActive);
    if(response.status === 'success')
    {
      Alert.alert({
        type: 'success',
        title: 'Aktivasi',
        message: 'Aktivasi Akun Berhasil'
      });
    } else {
      Alert.alert({ title: 'Aktifasi', message: response.data });
    }
    fetchSales();
  }

  /**
   * Reload wishlist
   */
  const onRefresh = () => {
    setRefresh(true);
    dispatch(
      notificationActions.onLoadNotification(null, () => {
        setRefresh(false);
      }),
    );
  };

  /**
   * render Content list
   */
  const renderContent = () => {
    if (salesData.length > 0) {
      return (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={salesData}
          renderItem={({ item, index }) => (
            item.aktif === 'F' ?
            <ListThumbCircle
                image={'https://icon2.cleanpng.com/20180319/bkq/kisspng-computer-icons-user-profile-profile-ico-5ab03f37d376a3.6072672315214999598662.jpg'}
              txtLeftTitle={item.nama}
              txtContent={item.email}
              txtRight={item.nohp}
              style={{ marginBottom: 5 }}
              onPress={() => sAlert(item.unique_id, item.nama)}
            />
              : <ListThumbCircle
                image={'https://icon2.cleanpng.com/20180319/bkq/kisspng-computer-icons-user-profile-profile-ico-5ab03f37d376a3.6072672315214999598662.jpg'}
                txtLeftTitle={item.nama}
                txtContent={item.email}
                txtRight={item.nohp}
                style={{ marginBottom: 5 }}
              />
          )}
        />
      );
    }
    if (notification.list?.length == 0) {
      return (
        <View style={styles.loadingContent}>
          <View style={{alignItems: 'center'}}>
            <Icon
              name="frown-open"
              size={18}
              color={colors.text}
              style={{marginBottom: 4}}
            />
            <Text>{t('data_not_found')}</Text>
          </View>
        </View>
      );
    }
  };

  useEffect(() => {
    initPage();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        title={item.judul}
        renderLeft={() => {
          return <Icon name="arrow-left" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        {renderContent()}
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Konfirmasi"
          message={viewName}
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
            actActive();
          }}
        />
      </SafeAreaView>
    </View>
  );

  
}
