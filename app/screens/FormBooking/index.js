import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Image,
  Header,
  SafeAreaView,
  Icon,
  Text,
  TextInput,
  Button,
} from '@components';
import styles from './styles';
import {userSelect} from '@selectors';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {authActions} from '@actions';
import MaskInput, { Masks } from 'react-native-mask-input';
import SelectDropdown from 'react-native-select-dropdown'
// import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';

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
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  // const [name, setName] = useState(user.name);
  // const [email, setEmail] = useState(user.email);
  // const [website, setWebsite] = useState(user.link);
  // const [information, setInformation] = useState(user.description);
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState({
  //   name: true,
  //   email: true,
  //   website: true,
  //   information: true,
  // });

  const [date, setDate] = useState('');
 
  const tcp = ["Tunai Keras", "KPR", "Tunai Bertahap"]
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

  const [tabShow, SettabShow] = useState('1');
  const [State, SetState] = useState('');
  const [uriImgKTP, seturiImgKTP] = useState(null);
  const [nameImgKTP, setnameImgKTP] = useState(null);

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

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
        console.log(response.assets[0]);
        // this.setState({
        //   filePath: response,
        //   // fileData: response.data,
        //   // fileUri: response.uri
        // });
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
                <Text onPress={() => SettabShow('1')} style={tabShow === '1' ? styles.TabsettextActiveTwo : [styles.TabsettextTwo, { color: colorrdata }]}>Form Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => SettabShow('2')} style={tabShow === '2' ? [styles.TabsettextActiveBoxTwo, { backgroundColor: colorrdata }] : styles.TabsettextBoxTwo}>
                <Text onPress={() => SettabShow('2')} style={tabShow === '2' ? styles.TabsettextActiveTwo : [styles.TabsettextTwo, { color: colorrdata }]}>Form Price Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => SettabShow('3')} style={tabShow === '3' ? [styles.TabsettextActiveBoxTwo, { backgroundColor: colorrdata }] : styles.TabsettextBoxTwo}>
                <Text onPress={() => SettabShow('3')} style={tabShow === '3' ? styles.TabsettextActiveTwo : [styles.TabsettextTwo, { color: colorrdata }]}>Form Add Schedule</Text>
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
                value={date}
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
              <SelectDropdown
                data={tcp}
                defaultButtonText={'Pilih CTP'}
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
                style={styles.images}
                source={{ uri: uriImgKTP }}
              />
              ) : null}
              <Button loading={loading} full onPress={this.launchImageLibrary}>
                Foto KTP
              </Button>
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Foto NPWP
                </Text>
              </View>
              <TextInput
                placeholder={''}
                value={''}
              />
            </ScrollView>
          : null}
          {tabShow == '2' ?
            <ScrollView contentContainerStyle={styles.contain}></ScrollView>
          : null}
          {tabShow == '3' ?
            <ScrollView contentContainerStyle={styles.contain}>
            </ScrollView>
          : null}
          {/* <View style={{paddingVertical: 15, paddingHorizontal: 20}}>
            <Button loading={loading} full onPress={onUpdate}>
              {t('confirm')}
            </Button>
          </View> */}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
