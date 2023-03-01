import React, { useState, useEffect, useRef } from 'react';
import { RefreshControl, View, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import { Header, SafeAreaView, Icon, Text } from '@components';
import {notificationActions} from '@actions';
import {notificationSelect} from '@selectors';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import CommonServices from '../../services/common';
import Table, { Section, BioCell, KeyValueCell } from 'react-native-js-tableview';

export default function ListTrxVa({ navigation, route }) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const notification = useSelector(notificationSelect);
  const [refreshing, setRefresh] = useState(false);
  const item = route.params?.item;
  const [trxVa, setTrxVa] = useState([]);
  
  const initPage = async () => {
    fetchTrxVa();
  };

  const fetchTrxVa = async () => {
    let params = {}
    let response = await CommonServices.callApi('api/va/list', 'GET', params);
    if (response.status === 'success') {
      setTrxVa(response.data.data);
    } else {
      setTrxVa([]);
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

  /**
   * render Content list
   */
  const renderContent = () => {
    if (trxVa.length > 0) {
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
          data={trxVa}
          renderItem={({ item, index }) => (
            <TouchableOpacity>
              <Table style={styles.container} accentColor='#4DB6AC' scrollable={true}>
                <Section header={item.transaction_id} footer={item.timestamp.created}>
                  <BioCell title={item.konsumen.nama} subtitle={item.konsumen.nik} />
                  <KeyValueCell title='No VA' value={item.va_number} />
                </Section>
              </Table>
            </TouchableOpacity>
          )}
        />
      );
    }
    if (trxVa?.length == 0) {
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