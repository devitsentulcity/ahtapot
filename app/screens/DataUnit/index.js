import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { BaseStyle, useTheme } from '@config';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  TextInput,
} from '@components';
import styles from './styles';
import { userSelect } from '@selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { authActions } from '@actions';
import CommonServices from '../../services/common';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function ProfileEdit({ navigation, route }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(userSelect);
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [loading, setLoading] = useState(false);
  const [dataCluster, setDataCluster] = useState('');
  const item = route.params?.item;
  const [showAlert, setShowAlert] = useState(false);

  const sAlert = () => {
    setShowAlert(true);
  }

  const hAlert = () => {
    setShowAlert(false);
  }

  const initPage = async () => {
    fecthUnit();
  }

  const fecthUnit = async () => {
    let response = await CommonServices.callApi('/api/detailblock/' + item.id, 'GET');
    if (response.status === 'success') {
      setDataCluster(response.data.detailblock);
    } else {
      setListTipe([]);
    }
  }

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  useEffect(() => {
    initPage();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={'Data Unit'}
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
          <ScrollView contentContainerStyle={styles.contain}>
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Cluster'}
              </Text>
            </View>
            <TextInput
              value={dataCluster.cluster}
              editable={false}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Type'}
              </Text>
            </View>
            <TextInput
              value={dataCluster?.blocktype}
              editable={false}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Unit'}
              </Text>
            </View>
            <TextInput
              value={dataCluster?.blockcode}
              editable={false}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'LB/LT'}
              </Text>
            </View>
            <TextInput
              value={dataCluster?.lblt}
              editable={false}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Harga Tunai Keras'}
              </Text>
            </View>
            <TextInput
              value={rupiah(dataCluster?.hjt)}
              editable={false}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Harga Tunai Bertahap 12x'}
              </Text>
            </View>
            <TextInput
              value={rupiah(dataCluster?.hjk)}
              editable={false}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Harga KPR'}
              </Text>
            </View>
            <TextInput
              value={rupiah(dataCluster?.hji)}
              editable={false}
            />
          </ScrollView>
          <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
            <Button loading={loading} full onPress={ () =>{
              sAlert()
            }}>
              {'Units Booking Process'}
            </Button>
          </View>
        </KeyboardAvoidingView>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Confirmation"
          message="Are you sure ?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No"
          confirmText="Yes"
          confirmButtonColor="#232E5C"
          onCancelPressed={() => {
            hAlert();
          }}
          onConfirmPressed={() => {
            navigation.navigate('FormBooking', {
              item: dataCluster,
            });
            hAlert();
          }}
        />
      </SafeAreaView>
    </View>
  );
}
