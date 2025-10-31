import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Image,
  PermissionsAndroid
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Text,
  TextInput,
  Button,
} from '@components';
import styles from './styles';
import { userSelect, messengerSelect } from '@selectors';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import MaskInput, { Masks } from 'react-native-mask-input';
import moment from 'moment';
import * as ImagePicker from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButtonRN from 'radio-buttons-react-native';
import CommonServices from '../../services/common';
import AwesomeAlert from 'react-native-awesome-alerts';
import PhoneInput from "react-native-phone-number-input";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FormBooking({ navigation, route }) {
  
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const {colors} = useTheme();
  const {t} = useTranslation();
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
  const [uriImgDokumenLain, seturiImgDokumenLain] = useState(null);
  const [nameImgDokumenLain, setnameImgDokumenLain] = useState(null);

  const [itemsTcp, setItemsTcp] = useState([
    { label: 'Tunai Keras', value: 'T' },
    { label: 'KPR', value: 'K' },
    { label: 'Tunai Bertahap', value: 'I' }
  ]);

  const [itemsStatus, setItemsStatus] = useState([
    { label: 'Kawin', value: 'Kawin' },
    { label: 'Belum Kawin', value: 'Belum Kawin' },
    { label: 'Cerai', value: 'Cerai' },
  ]);

  const [openPekerjaan, setOpenPekerjaan] = useState(false);
  const [itemsPekerjaan, setItemsPekerjaan] = useState([
    { label: 'Karyawan Swasta', value: 'Karyawan Swasta' },
    { label: 'PNS', value: 'PNS' },
    { label: 'POLRI', value: 'POLRI' }, 
    { label: 'TNI', value: 'TNI' }, 
    { label: 'GURU', value: 'GURU' },
    { label: 'WIRASWASTA', value: 'WIRASWASTA' },
    { label: 'DOSEN', value: 'DOSEN' },
    { label: 'KARWAYAN BUMN', value: 'KARWAYAN BUMN' },
    { label: 'IBU RUMAH TANGGA', value: 'IBU RUMAH TANGGA' },
    { label: 'DOKTER', value: 'DOKTER' },
    { label: 'PELAUT', value: 'PELAUT' },
    { label: 'PILOT', value: 'PILOT' },
  ]);

  const [date, setDate] = useState('');
  const [namaKonsumen, setNamaKonsumen] = useState('');
  const [tcp, setTcp] = useState(null);
  const [hargaJual, sethargaJual] = useState('');
  const [noKtp, setNoKtp] = useState('');
  const [npwp, setNpwp] = useState('');
  const [alamatKtp, setAlamatKtp] = useState('');
  const [namaKantor, setNamaKantor] = useState('');
  const [alamatKantor, setAlamatKantor] = useState('');
  const [noHp1, setNoHp1] = useState('');
  const phoneNoHp1 = useRef(null);
  const [noHp2, setNoHp2] = useState('');
  const phoneNoHp2 = useRef(null);
  const [noKantor, setNoKantor] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [pekerjaan, setPekerjaan] = useState(null);
  const [keterangan, setKeterangan] = useState('');

  const [success, setSuccess] = useState({
    namaKonsumen: true,
    noKtp: true,
    noHp1: true,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [notice, setNotice] = useState('');
  const [toTab, setToTab] = useState('');

  const sAlert = (item_to) => {
    setShowAlert(true);
    setNotice('Apakah anda sudah yakin ?');
    setToTab(item_to);
  }

  const hAlert = () => {
    setShowAlert(false);
    setNotice('');
    setToTab('');
  }

  const [showConfirm, setShowConfirm] = useState(false);
  const [titleConfirm, setTitleNotice] = useState('');
  const [messageConfirm, setMessageNotice] = useState('');
  const [nextState, setNextState] = useState('');

  const hConfirm = (nS) => {
    setShowConfirm(false);
    setTitleNotice('');
    setMessageNotice('');
    if (nS === '0'){
      navigation.navigate('ListTypeCluster', { item: {
        KawasanCode: item.cluster_id,
        KawasanName: item.cluster_name
      }, });
    }
  }

  const valid = () => {
    if (namaKonsumen == '' || noKtp == '' || noHp1 == '')
    {
      setSuccess({
        ...success,
        namaKonsumen: namaKonsumen != '' ? true : false,
        noKtp: noKtp != '' ? true : false,
        noHp1: noHp1 != '' ? true : false,
      });
    }else{
      SettabShow('2');
    }
  }

  const actBooking = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append('namakonsumen', namaKonsumen);
    formData.append('nohp1', noHp1);
    formData.append('nohp2', noHp2);
    formData.append('email', email);
    formData.append('statuskawin', status);
    formData.append('pekerjaan', pekerjaan);
    formData.append('filektp', {
      uri: uriImgKTP,
      name: nameImgKTP,
      type: 'image/jpeg'
    });
    formData.append('filenpwp', {
      uri: uriImgNPWP,
      name: nameImgNPWP,
      type: 'image/jpeg'
    });
    formData.append('keterangan', keterangan);
    formData.append('alamatdomisili', '');
    formData.append('namakantor', namaKantor);
    formData.append('alamatkantor', alamatKantor);
    formData.append('notelpkantor', '');
    formData.append('npwp', npwp);
    formData.append('noktp', noKtp);
    formData.append('alamatktp', '');
    formData.append('tcp', tcp);
    formData.append('hargajual', hargaJual.hargajual);
    formData.append('harganetto', hargaJual.harganetto);
    formData.append('hargappn', hargaJual.hargappn);
    formData.append('hargajualppn', hargaJual.hargajualppn);
    formData.append('bphtb', hargaJual.bphtb);
    formData.append('tjvalue', 0);
    formData.append('umvalue', 0);
    formData.append('kprvalue', 0);
    formData.append('idperiodeharga', 0);
    formData.append('periodharganame', '-');
    formData.append('iddetailperiodharga', 0);

    let resBooking = await CommonServices.callApi('api/bookingsppdigital/' + item?.blockcode, 'POST', formData, 'form-data');
    console.log(resBooking);
    setShowConfirm(true);
    if (resBooking.status === 'success')
    {
      setTitleNotice('Berhasil');
      setMessageNotice('Booking Unit Berhasil');
      setNextState('0')
    }else {
      setTitleNotice('Gagal');
      setMessageNotice('Booking Unit Gagal');
      setNextState('1')
    }
    setLoading(false);
  }

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return year + '-' + month + '-' + date;
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

  const detailTcp = (dataTcp) => {
    if(dataTcp === 'T'){ return 'Tunai Keras'}
    else if (dataTcp === 'K'){ return 'KPR'}
    else { return 'Tunai Bertahap' }
  }
  
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
        // alert(response.customButton);
      } else {
        setnameImgKTP(response.assets[0].fileName);
        seturiImgKTP(response.assets[0].uri);
        hChooseKtp();
      }
    });

  }

  launchImageLibraryKTPCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchCamera(options, (response) => {
          if (response.didCancel) {
            // console.log('User cancelled image picker');
          } else if (response.error) {
            // console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            // console.log('User tapped custom button: ', response.customButton);
            // alert(response.customButton);
          } else {
            setnameImgKTP(response.assets[0].fileName);
            seturiImgKTP(response.assets[0].uri);
            hChooseKtp();
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.log(err);
    }
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

  launchImageLibraryNPWPCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchCamera(options, (response) => {
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
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.log(err);
    }

  }

  const [showChooseKtp, setShowChooseKtp] = useState(false);
  const sChooseKtp = () => { setShowChooseKtp(true); }
  const hChooseKtp = () => { setShowChooseKtp(false); }
  const buttonImageKtp = () => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
          <Icon.Button
            name="camera"
            size={25}
            backgroundColor="#232E5C"
            onPress={this.launchImageLibraryKTPCamera}
          >Kamera</Icon.Button>
        </View>
        <Text>&nbsp;&nbsp;</Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Icon.Button
            name="image"
            size={25}
            backgroundColor="#232E5C"
            onPress={this.launchImageLibraryKTP}
          >Galeri</Icon.Button>
        </View>
      </View>
    );
  }

  const [showChooseNpwp, setShowChooseNpwp] = useState(false);
  const sChooseNpwp = () => { setShowChooseNpwp(true); }
  const hChooseNpwp = () => { setShowChooseNpwp(false); }
  const buttonImageNpwp = () => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
          <Icon.Button
            name="camera"
            size={25}
            backgroundColor="#232E5C"
            onPress={this.launchImageLibraryNPWPCamera}
          >Kamera</Icon.Button>
        </View>
        <Text>&nbsp;&nbsp;</Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Icon.Button
            name="image"
            size={25}
            backgroundColor="#232E5C"
            onPress={this.launchImageLibraryNPWP}
          >Galeri</Icon.Button>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
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
          style={{flex: 1}}>
          <ScrollView horizontal>
            <View style={styles.TabBoxTwo}>
              <TouchableOpacity style={tabShow === '1' ? [styles.TabsettextActiveBoxTwo, { backgroundColor: colorrdata }] : styles.TabsettextBoxTwo}>
                <Text style={tabShow === '1' ? styles.TabsettextActiveTwo : [styles.TabsettextTwo, { color: colorrdata }]}>Data Konsumen</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tabShow === '2' ? [styles.TabsettextActiveBoxTwo, { backgroundColor: colorrdata }] : styles.TabsettextBoxTwo}>
                <Text style={tabShow === '2' ? styles.TabsettextActiveTwo : [styles.TabsettextTwo, { color: colorrdata }]}>Rincian Harga</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tabShow === '3' ? [styles.TabsettextActiveBoxTwo, { backgroundColor: colorrdata }] : styles.TabsettextBoxTwo}>
                <Text style={tabShow === '3' ? styles.TabsettextActiveTwo : [styles.TabsettextTwo, { color: colorrdata }]}>Konfirmasi</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          {tabShow == '1' ?
            <ScrollView estedScrollEnabled={true} contentContainerStyle={styles.contain}>
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Cluster
                </Text>
              </View>
              <TextInput
                value={item?.cluster}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Tipe
                </Text>
              </View>
              <TextInput
                value={item?.blocktype}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Unit
                </Text>
              </View>
              <TextInput
                value={item?.blockcode}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  LB/LT
                </Text>
              </View>
              <TextInput
                value={item?.lblt}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Tanggal
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
                  Pilih TCP
                </Text>
              </View>
              <RadioButtonRN
                style={{ flexWrap: 'wrap', flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                data={itemsTcp}
                animationTypes={['pulse']}
                initial={1}
                circleSize={10}
                box={false}
                selectedBtn={(e) => 
                  getHargaJual(e.value)
                }
                boxStyle={{ flex: 1, alignItems: "center" }}
              />
              
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Harga Jual
                </Text>
              </View>
              <TextInput
                placeholder={'Harga Jual'}
                editable={false}
                value={rupiah(hargaJual.hargajual)}
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
                  NPWP
                </Text>
              </View>
              <TextInput
                placeholder={'NPWP'}
                value={npwp}
                onChangeText={text => setNpwp(text)}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Alamat KTP
                </Text>
              </View>
              <TextInput
                placeholder={'Alamat KTP'}
                value={alamatKtp}
                onChangeText={text => setAlamatKtp(text)}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Nama Kantor/Instansi
                </Text>
              </View>
              <TextInput
                placeholder={'Nama Kantor/Instansi'}
                value={namaKantor}
                onChangeText={text => setNamaKantor(text)}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Alamat Kantor/Instansi
                </Text>
              </View>
              <TextInput
                placeholder={'Alamat Kantor/Instansi'}
                value={alamatKantor}
                onChangeText={text => setAlamatKantor(text)}
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
                  No Kantor/FAX
                </Text>
              </View>
              <TextInput
                placeholder={'No Kantor/FAX'}
                value={noKantor}
                onChangeText={text => setNoKantor(text)}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Email
                </Text>
              </View>
              <TextInput
                placeholder={'Email'}
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Status Perkawinan
                </Text>
              </View>
              <RadioButtonRN
                style={{ flexWrap: 'wrap', flexDirection: "row", alignItems: "center", justifyContent: "center" }}
                data={itemsStatus}
                animationTypes={['pulse']}
                initial={1}
                circleSize={10}
                box={false}
                selectedBtn={(e) => setStatus(e.value)}
                boxStyle={{ flex: 1, alignItems: "center" }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Pekerjaan
                </Text>
              </View>
              <DropDownPicker
                open={openPekerjaan}
                value={pekerjaan}
                items={itemsPekerjaan}
                setOpen={setOpenPekerjaan}
                setValue={setPekerjaan}
                setItems={setItemsPekerjaan}
                listMode="SCROLLVIEW"
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
                      // aspectRatio: 1,
                      flex: 1,
                      width: '100%',
                      height: 200,
                      marginBottom: 10,
                      // marginTop: -50,
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
              /> }

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
                    // aspectRatio: 1,
                    flex: 1,
                    width: '100%',
                    height: 200,
                    marginBottom: 10,
                    // marginTop: -50,
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
              /> }
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

              <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
                <Button onPress={() => sAlert('22')}>
                  Next
                </Button>
              </View>

            </ScrollView>
          : null}
          {tabShow == '2' ?
            <ScrollView estedScrollEnabled={true} contentContainerStyle={styles.contain}>
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Cluster
                </Text>
              </View>
              <TextInput
                value={item?.cluster}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Tipe
                </Text>
              </View>
              <TextInput
                value={item?.blocktype}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Unit
                </Text>
              </View>
              <TextInput
                value={item?.blockcode}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  LB/LT
                </Text>
              </View>
              <TextInput
                value={item?.lblt}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  TCP
                </Text>
              </View>
              <TextInput
                value={detailTcp(tcp)}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Harga Jual
                </Text>
              </View>
              <TextInput
                value={rupiah(hargaJual.hargajual) }
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Harga Jual Netto
                </Text>
              </View>
              <TextInput
                value={rupiah(hargaJual.harganetto)}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Harga PPN
                </Text>
              </View>
              <TextInput
                value={rupiah(hargaJual.hargappn)}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Harga Jual + PPN
                </Text>
              </View>
              <TextInput
                value={rupiah(hargaJual.hargajualppn)}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  BPHTB
                </Text>
              </View>
              <TextInput
                value={rupiah(hargaJual.bphtb)}
                editable={false}
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
                    onPress={() => SettabShow('1')}>
                    Prev
                  </Button>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Button
                    style={{ marginTop: 20, width: '90%' }}
                    onPress={() => sAlert('3')}>
                    Next
                  </Button>
                </View>
              </View>
              
            </ScrollView>
          : null}
          {tabShow == '3' ?
            <ScrollView contentContainerStyle={styles.contain}>
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Cluster
                </Text>
              </View>
              <TextInput
                value={item?.cluster}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Tipe
                </Text>
              </View>
              <TextInput
                value={item?.blocktype}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Unit
                </Text>
              </View>
              <TextInput
                value={item?.blockcode}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  LT/LB
                </Text>
              </View>
              <TextInput
                value={item?.lblt}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  TCP
                </Text>
              </View>
              <TextInput
                value={detailTcp(tcp)}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Harga Jual + PPN
                </Text>
              </View>
              <TextInput
                value={rupiah(hargaJual.hargajualppn)}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Nama
                </Text>
              </View>
              <TextInput
                value={namaKonsumen}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  NIK
                </Text>
              </View>
              <TextInput
                value={noKtp}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  NPWP
                </Text>
              </View>
              <TextInput
                value={npwp}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Alamat KTP
                </Text>
              </View>
              <TextInput
                value={alamatKtp}
                editable={false}
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
                    onPress={() => SettabShow('2')}>
                    Prev
                  </Button>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Button
                    style={{ marginTop: 20, width: '90%' }}
                    loading={loading}
                    onPress={() => sAlert("4")}>
                    Sumbit
                  </Button>
                </View>
              </View>
            </ScrollView>
          : null}
        </KeyboardAvoidingView>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Konfirmasi"
          message={notice}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Batal"
          confirmText="Yakin"
          confirmButtonColor="#232E5C"
          onCancelPressed={() => {
            hAlert();
          }}
          onConfirmPressed={() => {
            if (toTab === '22'){
              valid();
            } else if(toTab === '4') {
              actBooking();
            }else {
              SettabShow(toTab);
            }
            hAlert();
          }}
        />

        <AwesomeAlert
          show={showConfirm}
          showProgress={false}
          title={titleConfirm}
          message={messageConfirm}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText={'OK'}
          confirmButtonColor="#232E5C"
          onConfirmPressed={() => {
            hConfirm(nextState)
          }}
        />

        <AwesomeAlert
          show={showChooseKtp}
          showProgress={false}
          title="Pilih Upload"
          message={ buttonImageKtp() }
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelText="Tutup"
          confirmButtonColor="#232E5C"
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
          confirmButtonColor="#232E5C"
          onCancelPressed={() => {
            hChooseNpwp()
          }}
        />
        
      </SafeAreaView>
    </View>
  );
}
