import React, {useState, useEffect} from 'react';
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
import {BaseStyle, useTheme} from '@config';
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
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {authActions} from '@actions';
import MaskInput, { Masks } from 'react-native-mask-input';
import SelectDropdown from 'react-native-select-dropdown'
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function ProfileEdit({ navigation, route }) {
  
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(userSelect);
  const messenger = useSelector(messengerSelect);
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const win = Dimensions.get('window');
  const item = route.params?.item;
  const cluster = route.params?.cluster;
  const tipe = route.params?.tipe;

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(''); 
  const [tanggal, settanggal] = useState(moment().format("DD/MM/YYYY"));
  const [namaKonsumen, setnamaKonsumen] = useState('');
  const [tabShow, SettabShow] = useState('1');
  const [State, SetState] = useState('');
  const [uriImgKTP, seturiImgKTP] = useState(null);
  const [nameImgKTP, setnameImgKTP] = useState(null);
  const [uriImgNPWP, seturiImgNPWP] = useState(null);
  const [nameImgNPWP, setnameImgNPWP] = useState(null);
  const [uriImgDokumenLain, seturiImgDokumenLain] = useState(null);
  const [nameImgDokumenLain, setnameImgDokumenLain] = useState(null);

  const[openTcp, setOpenTCP] = useState(false);
  const [tcp, setTcp] = useState(null);
  const [itemsTcp, setItemsTcp] = useState([
    { label: 'Tunai Keras', value: '1' },
    { label: 'KPR', value: '2' },
    { label: 'Tunai Bertahap', value: '3' }
  ]);

  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState(null);
  const [itemsStatus, setItemsStatus] = useState([
    { label: 'Kawin', value: '1' },
    { label: 'Belum Kawin', value: '2' },
    { label: 'Cerai', value: '3' },
  ]);

  const [openPekerjaan, setOpenPekerjaan] = useState(false);
  const [pekerjaan, setPekerjaan] = useState(null);
  const [itemsPekerjaan, setItemsPekerjaan] = useState([
    { label: 'Karyawan Swasta', value: '1' },
    { label: 'PNS', value: '2' },
    { label: 'POLRI', value: '3' }, 
    { label: 'TNI', value: '4' }, 
    { label: 'GURU', value: '5' },
    { label: 'WIRASWASTA', value: '6' },
    { label: 'DOSEN', value: '7' },
    { label: 'KARWAYAN BUMN', value: '8' },
    { label: 'IBU RUMAH TANGGA', value: '9' },
    { label: 'DOKTER', value: '10' },
    { label: 'PELAUT', value: '11' },
    { label: 'PILOT', value: '12' },
  ]);
  
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

  launchImageLibraryDokumenLain = () => {
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
        setnameImgDokumenLain(response.assets[0].fileName);
        seturiImgDokumenLain(response.assets[0].uri);
      }
    });

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
              <TouchableOpacity onPress={() => SettabShow('1')} style={tabShow === '1' ? [styles.TabsettextActiveBoxTwo, { backgroundColor: colorrdata }] : styles.TabsettextBoxTwo}>
                <Text onPress={() => SettabShow('1')} style={tabShow === '1' ? styles.TabsettextActiveTwo : [styles.TabsettextTwo, { color: colorrdata }]}>Data Konsumen</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => SettabShow('2')} style={tabShow === '2' ? [styles.TabsettextActiveBoxTwo, { backgroundColor: colorrdata }] : styles.TabsettextBoxTwo}>
                <Text onPress={() => SettabShow('2')} style={tabShow === '2' ? styles.TabsettextActiveTwo : [styles.TabsettextTwo, { color: colorrdata }]}>Rincian Harga</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => SettabShow('3')} style={tabShow === '3' ? [styles.TabsettextActiveBoxTwo, { backgroundColor: colorrdata }] : styles.TabsettextBoxTwo}>
                <Text onPress={() => SettabShow('3')} style={tabShow === '3' ? styles.TabsettextActiveTwo : [styles.TabsettextTwo, { color: colorrdata }]}>Konfirmasi</Text>
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
                value={cluster.name}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Tipe
                </Text>
              </View>
              <TextInput
                value={tipe.id}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Unit
                </Text>
              </View>
              <TextInput
                value={item.id}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  LB/LT
                </Text>
              </View>
              <TextInput
                value={item.size.building + '/' + item.size.land}
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
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Pilih TCP
                </Text>
              </View>
              <DropDownPicker
                open={openTcp}
                value={tcp}
                items={itemsTcp}
                setOpen={setOpenTCP}
                setValue={setTcp}
                setItems={setItemsTcp}
                listMode="SCROLLVIEW"
                onChangeValue={(text) => {
                  console.log(text)
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Harga Jual
                </Text>
              </View>
              <TextInput
                placeholder={'Harga Jual'}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  No KTP
                </Text>
              </View>
              <TextInput
                placeholder={'No KTP'}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  NPWP
                </Text>
              </View>
              <TextInput
                placeholder={'NPWP'}
                value={''}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Alamat KTP
                </Text>
              </View>
              <TextInput
                placeholder={'Alamat KTP'}
                value={''}
              />
              
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Nama Kantor/Instansi
                </Text>
              </View>
              <TextInput
                placeholder={'Nama Kantor/Instansi'}
                value={''}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Alamat Kantor/Instansi
                </Text>
              </View>
              <TextInput
                placeholder={'Alamat Kantor/Instansi'}
                value={''}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  No HP 1
                </Text>
              </View>
              <TextInput
                placeholder={'No HP 1'}
                value={''}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  No HP 2
                </Text>
              </View>
              <TextInput
                placeholder={'No HP 2'}
                value={''}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  No Kantor/FAX
                </Text>
              </View>
              <TextInput
                placeholder={'No Kantor/FAX'}
                value={''}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Email
                </Text>
              </View>
              <TextInput
                placeholder={'Email'}
                value={''}
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
                  Status Perkawinan
                </Text>
              </View>
              <DropDownPicker
                open={openStatus}
                value={status}
                items={itemsStatus}
                setOpen={setOpenStatus}
                setValue={setStatus}
                setItems={setItemsStatus}
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
                      aspectRatio: 1,
                      flex: 1,
                      width: '100%',
                      height: undefined,
                      marginBottom: -50,
                      marginTop: -50,
                  }}
                  source={{ uri: uriImgKTP }}

                />
              ) : null}
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
              ) : null}
              <Button loading={loading} full onPress={this.launchImageLibraryNPWP}>
                Foto NPWP
              </Button>
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Foto Dokumen Lainnya
                </Text>
              </View>
              {uriImgDokumenLain != null ? (
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
                  source={{ uri: uriImgDokumenLain }}

                />
              ) : null}
              <Button loading={loading} full onPress={this.launchImageLibraryDokumenLain}>
                Foto Dokumen Lainnya
              </Button>
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Keterangan
                </Text>
              </View>
              <TextInput
                placeholder={'Keterangan'}
                editable={false}
              />
            </ScrollView>
          : null}
          {tabShow == '2' ?
            <ScrollView contentContainerStyle={{
              paddingTop: 0
            }}>
              <ListThumbSquare
                txtLeftTitle={'Rp. 30.000.000'}
                txtContent={'Booking Fee'}
                txtRight={'09 Januari 2022'}
              />
              <ListThumbSquare
                txtLeftTitle={'Rp. 111.726.384'}
                txtContent={'Down Payment 1 : 10% '}
                txtRight={'23 November 2022'}
              />
              <ListThumbSquare
                txtLeftTitle={'Rp. 40.647.394'}
                txtContent={'Cicilan Ke-1 '}
                txtRight={'23 Desember 2022'}
              />
              <ListThumbSquare
                txtLeftTitle={'Rp. 40.647.394'}
                txtContent={'Cicilan Ke-2 '}
                txtRight={'23 Januari 2023'}
              />
              <ListThumbSquare
                txtLeftTitle={'Rp. 40.647.394'}
                txtContent={'Cicilan Ke-1 '}
                txtRight={'23 Februari 2023'}
              />
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
                placeholder={''}
                value={''}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Tipe
                </Text>
              </View>
              <TextInput
                placeholder={''}
                value={''}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Unit
                </Text>
              </View>
              <TextInput
                placeholder={''}
                value={''}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  LT/LB
                </Text>
              </View>
              <TextInput
                placeholder={''}
                value={''}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  TCP
                </Text>
              </View>
              <TextInput
                placeholder={''}
                value={''}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Harga Jual + PPN
                </Text>
              </View>
              <TextInput
                placeholder={''}
                value={''}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  VA
                </Text>
              </View>
              <TextInput
                placeholder={''}
                value={''}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Nama
                </Text>
              </View>
              <TextInput
                placeholder={''}
                value={''}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  NIK
                </Text>
              </View>
              <TextInput
                placeholder={''}
                value={''}
                editable={false}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Alamat KTP
                </Text>
              </View>
              <TextInput
                placeholder={''}
                value={''}
                editable={false}
              />
              <View style={{paddingVertical: 15, paddingHorizontal: 20}}>
                <Button loading={loading}>
                  Submit
                </Button>
              </View>
            </ScrollView>
          : null}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
