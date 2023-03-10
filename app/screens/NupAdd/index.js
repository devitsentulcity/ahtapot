import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Image,
  RefreshControl,
  FlatList,
  Modal
} from 'react-native';
import { BaseStyle, useTheme, BaseColor } from '@config';
import {
  Header,
  SafeAreaView,
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
import CommonServices from '../../services/common';
import AwesomeAlert from 'react-native-awesome-alerts';
import PhoneInput from "react-native-phone-number-input";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function NupAdd({ navigation, route }) {

  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(userSelect);
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
  const phoneNoHp1 = useRef(null);
  const [noHp2, setNoHp2] = useState('');
  const phoneNoHp2 = useRef(null);
  const [keterangan, setKeterangan] = useState('');
  const [cluster, setCluster] = useState('');
  const [openCluster, setOpenCluster] = useState(false);
  const [itemsCluster, setItemsCluster] = useState([]);

  const [success, setSuccess] = useState({
    namaKonsumen: true,
    noKtp: true,
    noHp1: true,
  });

  const initPage = async () => {
    getCluster();
  };

  const [showAlert, setShowAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState('');

  const sAlert = (type) => {
    setShowAlert(true);
    setTypeAlert(type);
  }

  const hAlert = () => {
    setShowAlert(false);
  }

  const saveNup = () => {
    console.log("SAVE");
    hAlert();
  }

  const [showChooseKtp, setShowChooseKtp] = useState(false);
  const sChooseKtp = () => { setShowChooseKtp(true); }
  const hChooseKtp = () => { setShowChooseKtp(false); }
  const buttonImageKtp = () => {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{ flex: 1, alignItems: 'center', width: '100%'}}>
            <Icon.Button
              name="camera"
              size={25}
              backgroundColor="#E5634D"
              onPress={() => console.log("")}
            >Kamera</Icon.Button>
          </View>
          <Text>&nbsp;&nbsp;</Text>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Icon.Button
              name="image"
              size={25}
              backgroundColor="#E5634D"
              onPress={this.launchImageLibraryKTP}
            >Galeri</Icon.Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const [showChooseNpwp, setShowChooseNpwp] = useState(false);
  const sChooseNpwp = () => { setShowChooseNpwp(true); }
  const hChooseNpwp = () => { setShowChooseNpwp(false); }
  const buttonImageNpwp = () => {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
            <Icon.Button
              name="camera"
              size={25}
              backgroundColor="#E5634D"
              onPress={() => console.log("")}
            >Kamera</Icon.Button>
          </View>
          <Text>&nbsp;&nbsp;</Text>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Icon.Button
              name="image"
              size={25}
              backgroundColor="#E5634D"
              onPress={this.launchImageLibraryNPWP}
            >Galeri</Icon.Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const getCluster = async () => {
    let y = [];
    let response = await CommonServices.callApi('/pub/unitlookup','POST');
    response.data.list.data.forEach(function(items) {
      y.push({label: items.name,value: items.id});
    })
    setItemsCluster(y);
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
        hChooseKtp();
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
        hChooseNpwp();
      }
    });

  }

  useEffect(() => {
    initPage();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={'Input Data NUP'}
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
            <PhoneInput
              ref={phoneNoHp1}
              defaultValue={noHp1}
              defaultCode="ID"
              layout="first"
              withShadow
              containerStyle={{ margin: 10, width: '100%', height: 50, backgroundColor: "#f5f5f5" }}
              textInputStyle={{ height: 50 }}
              placeholder="Nomor Handphone"
              onChangeFormattedText={text => {
                setNoHp1(text);
              }}
              success={success.noHp1}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                No HP 2
              </Text>
            </View>
            <PhoneInput
              ref={phoneNoHp2}
              defaultValue={noHp2}
              defaultCode="ID"
              layout="first"
              withShadow
              containerStyle={{ margin: 10, width: '100%', height: 50, backgroundColor: "#f5f5f5" }}
              textInputStyle={{ height: 50 }}
              placeholder="Nomor Handphone"
              onChangeFormattedText={text => {
                setNoHp2(text);
              }}
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

            {/* <Button loading={loading} full onPress={this.launchImageLibraryKTP}>
              Foto KTP
            </Button> */}
            <Button loading={loading} full onPress={() => { sChooseKtp() }}>
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
            {/* <Button loading={loading} full onPress={this.launchImageLibraryNPWP}>
              Foto NPWP
            </Button> */}
            <Button loading={loading} full onPress={() => { sChooseNpwp() }}>
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
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Button
                  style={{ marginTop: 20, width: '90%' }}
                  onPress={() => sAlert('Batal')}>
                  Batal
                </Button>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Button
                  style={{ marginTop: 20, width: '90%' }}
                  loading={loading}
                  onPress={() => sAlert()}>
                  Simpan
                </Button>
              </View>
            </View>
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
            hAlert()
          }}
          onConfirmPressed={() => {
            (typeAlert == 'Batal') ? navigation.navigate('ListNup') : saveNup();
          }}
        />

        <AwesomeAlert
          show={showChooseKtp}
          showProgress={false}
          title="Pilih Upload"
          message={buttonImageKtp()}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="Tutup"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            hChooseKtp()
          }}
        />

        <AwesomeAlert
          show={showChooseNpwp}
          showProgress={false}
          title="Pilih Upload"
          message={buttonImageNpwp()}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="Tutup"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            hChooseNpwp()
          }}
        />

      </SafeAreaView>
    </View>
  );
}
