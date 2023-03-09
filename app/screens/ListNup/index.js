import React, { useState, useEffect } from 'react';
import { RefreshControl, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import { BaseStyle, useTheme, BaseColor } from '@config';
import {useTranslation} from 'react-i18next';
import { Header, SafeAreaView, Icon, Text, ListThumbCircle, Button } from '@components';
import {notificationActions} from '@actions';
import {notificationSelect} from '@selectors';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import CommonServices from '../../services/common';
import { userSelect } from '@selectors';
import AwesomeAlert from 'react-native-awesome-alerts';
import Table, { Section, BioCell, KeyValueCell } from 'react-native-js-tableview';

export default function ListNup({ navigation, route }) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const notification = useSelector(notificationSelect);
  const [refreshing, setRefresh] = useState(false);
  const item = route.params?.item;
  const [trxNup, setTrxNup] = useState([
    {
      transaction_id: '0001',
      nama: 'hardi Subagyo',
      noUrut: '0001',
      namaSales: 'Imran'
    },
    {
      transaction_id: '0002',
      nama: 'Kesti Winarsih',
      noUrut: '0002',
      namaSales: 'Bambang'
    },
    {
      transaction_id: '0003',
      nama: 'Kamaludin',
      noUrut: '0003',
      namaSales: 'Sigit'
    },
    {
      transaction_id: '0004',
      nama: 'Manaf',
      noUrut: '0004',
      namaSales: 'Kuza'
    },
  ]);

  /**
   * render Content list
   */
  const renderContent = () => {
    if (trxNup?.length == 0) {
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
    }else {
      return (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          data={trxNup}
          renderItem={({ item, index }) => (
            <Table style={styles.container} accentColor='#4DB6AC' scrollable={true}>
              <Section header={''} footer={''}>
                <BioCell title={item.nama} subtitle={''} />
                <KeyValueCell title='Kode' value={item.transaction_id} />
                <KeyValueCell title='No Urut' value={item.noUrut} />
                <KeyValueCell title='Sales' value={item.namaSales} />
              </Section>
            </Table>
          )}
        />
      );
    }
  };

  const renderIcon = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}></View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Header
        title={'Data NUP'}
        renderLeft={() => {
          return <Icon name="arrow-left" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        {renderIcon()}
        {renderContent()}

        <TouchableOpacity
          onPress={ () => {
            navigation.navigate('NupAdd');
          }}
          style={[styles.menuIcon, { backgroundColor: colors.primary }]}>
          <Icon name="plus" size={22} color={BaseColor.whiteColor} solid />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );

  
}
