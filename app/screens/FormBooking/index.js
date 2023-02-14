import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
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
import {userSelect} from '@selectors';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {authActions} from '@actions';
import DatePicker from 'react-native-date-picker';
import { SH, SW, SF, heightPercent, widthPercent, fontPercent } from '../../utils/dimensions';
import { Strings } from '../../utils/Strings';
import { Colors } from '../../utils/Colors';
import { Fonts } from '../../utils/Fonts';

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

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [website, setWebsite] = useState(user.link);
  const [information, setInformation] = useState(user.description);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({
    name: true,
    email: true,
    website: true,
    information: true,
  });

  const [date, setDate] = useState(new Date());

  /**
   * on Update Profile
   *
   */
  const onUpdate = () => {
    if (name == '' || email == '' || website == '' || information == '') {
      setSuccess({
        ...success,
        name: name != '' ? true : false,
        email: email != '' ? true : false,
        website: website != '' ? true : false,
        information: information != '' ? true : false,
      });
      return;
    }
    const params = {
      name,
      email,
      url: website,
      description: information,
    };
    setLoading(true);
    dispatch(
      authActions.onEditProfile(params, response => {
        Alert.alert({
          type: 'success',
          title: t('edit_profile'),
          message: t('update_success'),
          action: [{onPress: () => navigation.goBack()}],
        });
        setLoading(false);
      }),
    );
  };

  const [tabShow, SettabShow] = useState('1');

  const Style = StyleSheet.create({
    TabBoxTwo: {
      flexDirection: 'row',
      width: '100%',
    },
    TabsettextActiveBoxTwo: {
      padding: SH(10),
      paddingHorizontal: SH(0),
      textAlign: 'center',
      width: widthPercent(33.33),
    },
    TabsettextBoxTwo: {
      padding: SH(10),
      paddingHorizontal: SH(0),
      textAlign: 'center',
      width: widthPercent(33.33),
    },
    TabsettextActiveTwo: {
      color: Colors.PrimaryColor,
      // textTransform: 'uppercase',
      fontSize: SF(10),
      textAlign: 'center',
      paddingVertical: SH(5),
      paddingHorizontal: SH(10),
      borderWidth: 1,
    },
    TabsettextTwo: {
      color: '#000',
      // textTransform: 'uppercase',
      // fontFamily: Fonts.Poppins_Medium,
      fontSize: SF(10),
      textAlign: 'center',
      paddingVertical: SH(5),
      paddingHorizontal: SH(10),
      borderWidth: 1,
    },
    MinHeightStyle: {
      height: '100%'
    },
  });

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
            <View style={Style.TabBoxTwo}>
              <TouchableOpacity onPress={() => SettabShow('1')} style={tabShow === '1' ? [Style.TabsettextActiveBoxTwo, { backgroundColor: colorrdata }] : Style.TabsettextBoxTwo}>
                <Text onPress={() => SettabShow('1')} style={tabShow === '1' ? Style.TabsettextActiveTwo : [Style.TabsettextTwo, { color: colorrdata }]}>Form Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => SettabShow('2')} style={tabShow === '2' ? [Style.TabsettextActiveBoxTwo, { backgroundColor: colorrdata }] : Style.TabsettextBoxTwo}>
                <Text onPress={() => SettabShow('2')} style={tabShow === '2' ? Style.TabsettextActiveTwo : [Style.TabsettextTwo, { color: colorrdata }]}>Form Price Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => SettabShow('3')} style={tabShow === '3' ? [Style.TabsettextActiveBoxTwo, { backgroundColor: colorrdata }] : Style.TabsettextBoxTwo}>
                <Text onPress={() => SettabShow('3')} style={tabShow === '3' ? Style.TabsettextActiveTwo : [Style.TabsettextTwo, { color: colorrdata }]}>Form Add Schedule</Text>
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
                onChangeText={text => setName(text)}
                placeholder={t('input_name')}
                value={name}
                editable={false}
                success={success.name}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    username: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Tipe
                </Text>
              </View>
              <TextInput
                onChangeText={text => setEmail(text)}
                placeholder={t('input_email')}
                value={email}
                editable={false}
                success={success.email}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    email: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  LB/LT
                </Text>
              </View>
              <TextInput
                onChangeText={text => setWebsite(text)}
                placeholder={t('input_email')}
                value={website}
                editable={false}
                success={success.website}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    website: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Tanggal
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={t('input_information')}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Nama Konsumen
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={'Nama Konsumen'}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Pilih TCP
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={'Pilih TCP'}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Harga Jual
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={'Harga Jual'}
                value={''}
                editable={false}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  No KTP
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={'No KTP'}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  NPWP
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={'NPWP'}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Alamat KTP
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={'Alamat KTP'}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Nama Kantor/Instansi
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={'Nama Kantor/Instansi'}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Alamat Kantor/Instansi
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={'Alamat Kantor/Instansi'}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  No HP 1
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={'No HP 1'}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  No HP 2
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={'No HP 2'}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  No Kantor/FAX
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={'No Kantor/FAX'}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Email
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={'Email'}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Status Perkawinan
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={'Status Perkawinan'}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Pekerjaan
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={''}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Foto KTP
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={''}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  Foto NPWP
                </Text>
              </View>
              <TextInput
                onChangeText={text => setInformation(text)}
                placeholder={''}
                value={''}
                success={success.information}
                onFocus={() => {
                  setSuccess({
                    ...success,
                    information: true,
                  });
                }}
              />
            </ScrollView>
          : null}
          {tabShow == '2' ?
            <ScrollView contentContainerStyle={styles.contain}>
            </ScrollView>
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
