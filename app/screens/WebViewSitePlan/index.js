import React, { useState, useEffect, Component } from 'react';
import {
  View,
  ScrollView,
  Animated,
  Linking,
  Dimensions,
  Image,
} from 'react-native';
import {BaseColor, useTheme, BaseStyle} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  ImageSiteplan,
  Button,
  ListItem,
} from '@components';
import {useTranslation} from 'react-i18next';
import * as Utils from '@utils';
import {useDispatch, useSelector} from 'react-redux';
import {
  Placeholder,
  PlaceholderLine,
  Progressive,
  PlaceholderMedia,
} from 'rn-placeholder';
import {userSelect, wishlistSelect, designSelect} from '@selectors';
import styles from './styles';
import CommonServices from '../../services/common';
import { WebView } from 'react-native-webview';

export default function WebViewSitePlan({navigation, route}) {
  const win = Dimensions.get('window');
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const wishlist = useSelector(wishlistSelect);
  const item = route.params?.item;
  const useGallery = !!route.params?.useGallery;
  const [kodeKawasan, setKodeKawasan] = useState('');  

  const onMessage = (data) => {
    console.log(data.nativeEvent.data);
    // navigation.navigate('ListType', {
    //   item: item,
    //   id: idCluster
    // });
  }

  useEffect(() => {
    setKodeKawasan(item.KawasanCode.toLowerCase());
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        title={'Siteplan : ' + item?.KawasanName}
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
        renderRight={() => {
          if (useGallery) {
            return (
              <Icon name="images" size={20} color={BaseColor.whiteColor} />
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'left']}>
        <WebView
          originWhitelist={['*']}
          source={{ uri: 'http://10.10.20.36/msales_v1/svgz_sc.php?p=' + kodeKawasan }}
          onMessage={onMessage}
        />
      </SafeAreaView>
    </View>
  );
}
