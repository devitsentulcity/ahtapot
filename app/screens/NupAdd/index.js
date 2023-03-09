import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Image,
  RefreshControl,
  FlatList
} from 'react-native';
import { BaseStyle, useTheme } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  TextInput,
  Button,
  ListThumbSquare
} from '@components';
import styles from './styles';
import { userSelect, messengerSelect } from '@selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { authActions } from '@actions';
import MaskInput, { Masks } from 'react-native-mask-input';
import SelectDropdown from 'react-native-select-dropdown'
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButtonRN from 'radio-buttons-react-native';
import CommonServices from '../../services/common';
import AwesomeAlert from 'react-native-awesome-alerts';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function NupAdd({ navigation, route }) {

  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(userSelect);
  const messenger = useSelector(messengerSelect);
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const win = Dimensions.get('window');
  const item = route.params?.item;

  const [loading, setLoading] = useState(false);

  const [tanggal, settanggal] = useState(moment().format("DD/MM/YYYY"));
  const [tabShow, SettabShow] = useState('1');
  const [uriImgKTP, seturiImgKTP] = useState(null);
  const [nameImgKTP, setnameImgKTP] = useState(null);
  const [uriImgNPWP, seturiImgNPWP] = useState(null);
  const [nameImgNPWP, setnameImgNPWP] = useState(null);

  const [date, setDate] = useState('');
  const [namaKonsumen, setNamaKonsumen] = useState('');
  const [noKtp, setNoKtp] = useState('');
  const [alamatKtp, setAlamatKtp] = useState('');
  const [noHp1, setNoHp1] = useState('');
  const [noHp2, setNoHp2] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [cluster, setCluster] = useState('');
  const [openCluster, setOpenCluster] = useState(false);
  const [itemsCluster, setItemsCluster] = useState([]);

  

  const [success, setSuccess] = useState({
    namaKonsumen: true,
    noKtp: true,
    noHp1: true,
  });

  const [showAlert, setShowAlert] = useState(false);

  const sAlert = () => {
    setShowAlert(true);
  }

  const hAlert = () => {
    setShowAlert(false);
  }

  const getHargaJual = async (valueTcp) => {
    let response = await CommonServices.callApi('/api/detailblockharga/' + item?.blockcode + '/' + getCurrentDate() + '/' + valueTcp, 'GET');
    if (response.status === 'success') {
      sethargaJual(response.data.detailharga);
    } else {
      sethargaJual('0');
    }
    setTcp(valueTcp);
  };

  launchImageLibraryKTP = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setnameImgKTP(response.assets[0].fileName);
        seturiImgKTP(response.assets[0].uri);
      }
    });

  }

  launchImageLibraryNPWP = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setnameImgNPWP(response.assets[0].fileName);
        seturiImgNPWP(response.assets[0].uri);
      }
    });

  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={'Form Booking'}
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
          <ScrollView estedScrollEnabled={true} contentContainerStyle={styles.contain}>
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Cluster
              </Text>
            </View>
            <DropDownPicker
              open={openCluster}
              value={cluster}
              items={itemsCluster}
              setOpen={setOpenCluster}
              setValue={setCluster}
              setItems={setItemsCluster}
              listMode="SCROLLVIEW"
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Nama Konsumen
              </Text>
            </View>
            <TextInput
              placeholder={'Nama Konsumen'}
              value={namaKonsumen}
              onChangeText={text => setNamaKonsumen(text)}
              success={success.namaKonsumen}
              onFocus={() => {
                setSuccess({
                  ...success,
                  namaKonsumen: true,
                });
              }}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Tanggal NUP
              </Text>
            </View>
            <MaskInput
              mask={Masks.DATE_DDMMYYYY}
              keyboardType="numeric"
              value={tanggal}
              style={styles.inputBasic}
              maskAutoComplete
              onChangeText={setDate}
              maxLength={undefined}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                No KTP
              </Text>
            </View>
            <TextInput
              placeholder={'No KTP'}
              value={noKtp}
              onChangeText={text => setNoKtp(text)}
              success={success.noKtp}
              onFocus={() => {
                setSuccess({
                  ...success,
                  noKtp: true,
                });
              }}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                Alamat
              </Text>
            </View>
            <TextInput
              placeholder={'Alamat'}
              value={alamatKtp}
              onChangeText={text => setAlamatKtp(text)}
            />
            
            <View style={styles.contentTitle}>
              <Text headline semibold>
                No HP 1
              </Text>
            </View>
            <TextInput
              placeholder={'No HP 1'}
              value={noHp1}
              onChangeText={text => setNoHp1(text)}
              success={success.noHp1}
              onFocus={() => {
                setSuccess({
                  ...success,
                  noHp1: true,
                });
              }}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                No HP 2
              </Text>
            </View>
            <TextInput
              placeholder={'No HP 2'}
              value={noHp2}
              onChangeText={text => setNoHp2(text)}
            />
            

            <View style={styles.contentTitle}>
              <Text headline semibold>
                Foto KTP
              </Text>
            </View>
            {uriImgKTP != null ? (
              <Image
                style={{
                  resizeMode: 'contain',
                  aspectRatio: 1,
                  flex: 1,
                  width: '100%',
                  height: undefined,
                  marginBottom: -50,
                  marginTop: -50,
                }}
                source={{ uri: uriImgKTP }}

              />
            ) : <Image
              style={{
                resizeMode: 'contain',
                aspectRatio: 1,
                flex: 1,
                width: '100%',
                height: undefined,
                marginBottom: -50,
                marginTop: -50,
              }}
              source={require('@assets/images/ktp.png')}
            />}

            <Button loading={loading} full onPress={this.launchImageLibraryKTP}>
              Foto KTP
            </Button>

            <View style={styles.contentTitle}>
              <Text headline semibold>
                Foto NPWP
              </Text>
            </View>
            {uriImgNPWP != null ? (
              <Image
                style={{
                  resizeMode: 'contain',
                  aspectRatio: 1,
                  flex: 1,
                  width: '100%',
                  height: undefined,
                  marginBottom: -50,
                  marginTop: -50,
                }}
                source={{ uri: uriImgNPWP }}

              />
            ) : <Image
              style={{
                resizeMode: 'contain',
                aspectRatio: 1,
                flex: 1,
                width: '100%',
                height: undefined,
                marginBottom: -50,
                marginTop: -50,
              }}
              source={require('@assets/images/npwp.png')}
            />}
            <Button loading={loading} full onPress={this.launchImageLibraryNPWP}>
              Foto NPWP
            </Button>

            <View style={styles.contentTitle}>
              <Text headline semibold>
                Keterangan
              </Text>
            </View>
            <TextInput
              placeholder={'Keterangan'}
              value={keterangan}
              onChangeText={text => setKeterangan(text)}
              numberOfLines={4}
              multiline={true}
            />
          </ScrollView>
        </KeyboardAvoidingView>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Konfirmasi"
          message="Apakah anda yakin ?"
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

          }}
        />

      </SafeAreaView>
    </View>
  );
}
