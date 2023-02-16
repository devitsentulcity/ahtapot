import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
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
import { messengerActions } from '@actions';
import { Cell, Section, TableView } from 'react-native-tableview-simple';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function ProfileEdit({navigation}) {
  
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

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(''); 
  const tcp = ['Tunai Keras','KPR','Tunai Bertahap'];
  const statusPerkawinan = ["Kawin", "Belum Kawin", "Cerai"]
  const pekerjaan = ["Kawyawan Stasta","PNS","POLRI","TNI","GURU","WIRASWASTA","DOSEN","KARWAYAN BUMN","IBU RUMAH TANGGA","DOKTER","PELAUT","PILOT"]

  /**
   * on Update Profile
   *
   */
  // const onUpdate = () => {
    
  //   if (name == '' || email == '' || website == '' || information == '') {
  //     setSuccess({
  //       ...success,
  //       name: name != '' ? true : false,
  //       email: email != '' ? true : false,
  //       website: website != '' ? true : false,
  //       information: information != '' ? true : false,
  //     });
  //     return;
  //   }
  //   const params = {
  //     name,
  //     email,
  //     url: website,
  //     description: information,
  //   };
  //   setLoading(true);
  //   dispatch(
  //     authActions.onEditProfile(params, response => {
  //       Alert.alert({
  //         type: 'success',
  //         title: t('edit_profile'),
  //         message: t('update_success'),
  //         action: [{onPress: () => navigation.goBack()}],
  //       });
  //       setLoading(false);
  //     }),
  //   );
  // };

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
  
  const header = ['heading 1', 'heading 2', 'heading 3']
  const dataTable = [
    ['gfg1', 'gfg2', 'gfg3'],
    ['gfg4', 'gfg5', 'gfg6'],
    ['gfg7', 'gfg8', 'gfg9']

  ]

  launchImageLibraryKTP = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
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
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
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
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
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
                  LB/LT
                </Text>
              </View>
              <TextInput
                placeholder={t('input_email')}
                value={''}
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
                // editable={false}
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
              <SelectDropdown
                data={tcp}
                defaultButtonText={'Pilih CTP'}
                onSelect={(selectedItem, key) => {
                  console.log(selectedItem, key)
                }}
                // buttonTextAfterSelection={(selectedItem, index) => {
                //   return selectedItem
                // }}
                // rowTextForSelection={(item, index) => {
                //   return item
                // }}
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
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
                  Status Perkawinan
                </Text>
              </View>
              <SelectDropdown
                data={statusPerkawinan}
                defaultButtonText={'Pilih Status Perkawinan'}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  return item
                }}
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#FFF'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Pekerjaan
                </Text>
              </View>
              <SelectDropdown
                data={pekerjaan}
                defaultButtonText={'Pilih Pekerjaan'}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  return item
                }}
                buttonStyle={styles.dropdown2BtnStyle}
                buttonTextStyle={styles.dropdown2BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#FFF'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown2DropdownStyle}
                rowStyle={styles.dropdown2RowStyle}
                rowTextStyle={styles.dropdown2RowTxtStyle}
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
