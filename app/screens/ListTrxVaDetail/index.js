import React, { useState, useEffect, useRef } from 'react';
import { RefreshControl, View, FlatList, Alert, TouchableOpacity, StyleSheet, LogBox } from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import { Header, SafeAreaView, Icon, Text } from '@components';
import {notificationActions} from '@actions';
import {notificationSelect} from '@selectors';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import CommonServices from '../../services/common';
import Table, { Section, BioCell, KeyValueCell } from 'react-native-js-tableview';
LogBox.ignoreAllLogs();
export default function ListTrxVaDetail({ navigation, route }) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const notification = useSelector(notificationSelect);
  const [refreshing, setRefresh] = useState(false);
  const item = route.params?.item;
  const [trxVaDetail, setTrxVaDetail] = useState({});
  const [trxVaDetailList, setTrxVaDetailList] = useState([]);
  
  const initPage = async () => {
    fetchTrxVaDetail();
  };

  const fetchTrxVaDetail = async () => {
    let params = {}
    let response = await CommonServices.callApi('api/va/detail/' + item.transactionId, 'GET', params);
    console.log(response.data.detail);
    if (response.status === 'success') {
      setTrxVaDetail(response.data.detail);
      setTrxVaDetailList(response.data.list.data);
    } else {
      setTrxVaDetail('');
      setTrxVaDetailList([]);
    }
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

  const onDetailVa = (transaction_id) => {
    navigation.navigate('ListTrxVaDetail', {
      item: {
        transactionId: transaction_id,
      }
    });
  }

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  } 

  /**
   * render Content list
   */

  const renderDetailContent = () => {
    const myData = [];
    for (let i = 0; i < trxVaDetailList?.length; i++) {
      myData.push(
        <Section key={i} header={''} footer={''}>
          <KeyValueCell title='Amount' value={rupiah(trxVaDetailList[i]?.amount?.split('.')[0])} />
          <KeyValueCell title='Time' value={trxVaDetailList[i]?.timestamp} />
        </Section>
      );
    }
    return myData;
  }
  
  const renderContent = () => {
    return (
      <Table style={styles.container} accentColor='#4DB6AC' scrollable={true}>
        <Section header={trxVaDetail?.transaction_id} footer={''}>
          <BioCell title={trxVaDetail?.konsumen?.nama} subtitle={trxVaDetail?.konsumen?.nik} />
          <KeyValueCell title='Phone' value={trxVaDetail?.konsumen?.phone} />
          <KeyValueCell title='Email' value={trxVaDetail?.konsumen?.email} />
          <KeyValueCell title='No VA' value={trxVaDetail?.va_number} />
          <KeyValueCell title='Jumlah Total ' value={rupiah(trxVaDetail?.total_amount?.split('.')[0])} />
        </Section>
        {renderDetailContent()}
      </Table>
    );
  };

  useEffect(() => {
    initPage();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        title={'Detail'}
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