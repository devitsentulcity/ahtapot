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

export default function ListSales({ navigation, route }) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const notification = useSelector(notificationSelect);
  const [refreshing, setRefresh] = useState(false);
  const item = route.params?.item;
  const [salesData, setSalesData] = useState([]);
  const user = useSelector(userSelect);

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
    let response = await CommonServices.callApi('public/api/user?page=&item=0', 'POST', params);
    if (response.status === 'success') {
      setSalesData(response.data.data);
    } else {
      setSalesData([]);
    }
  }

  const buttonActive = () => {
    return (
      <Button 
        full 
        onPress={console.log('KESINI')}
        color="#841584"
      >Aktikan</Button>
    );
  }

  const confirmActive = () => {
    Alert.alert({
      type: 'error',
      title: 'Anda yakin ?',
      message: buttonActive(),
      action: [{ onPress: () => console.log("KESINI") }],
      
    });
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
            <ListThumbCircle
              image={'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg'}
              txtLeftTitle={item.nama}
              txtContent={item.email}
              txtRight={item.nohp}
              style={{ marginBottom: 5 }}
              onPress={confirmActive}
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
      </SafeAreaView>
    </View>
  );

  
}
