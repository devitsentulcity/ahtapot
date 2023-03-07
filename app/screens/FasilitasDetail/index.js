import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Animated,
} from 'react-native';
import {BaseColor, useTheme, BaseStyle} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Image,
  Button,
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

export default function FasilitasDetail({navigation, route}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const item = route.params?.item;
  const useGallery = !!route.params?.useGallery;
  const deltaY = new Animated.Value(0);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const [fasilitas, setFasilitas] = useState('');

  useEffect(() => {
    setLoading(false);
  }, [product]);
  
  const initPage = async () => {
    fecthFasilitas();
  };

  const fecthFasilitas = async () => {
    let response = await CommonServices.callApi('/pub/fasilitas/' + item.id, 'GET');
    console.log(response);
    if (response.status === 'success') {
      setFasilitas(response.data[0]);
    } else {
      setFasilitas([]);
    }
  }

  const renderBanner = () => {
    if (loading) {
      return (
        <Placeholder Animation={Progressive}>
          <Animated.View
            style={[
              styles.imgBanner,
              {
                height: deltaY.interpolate({
                  inputRange: [
                    0,
                    Utils.scaleWithPixel(140),
                    Utils.scaleWithPixel(140),
                  ],
                  outputRange: [heightImageBanner, heightHeader, heightHeader],
                }),
              },
            ]}>
            <PlaceholderMedia style={{width: '100%', height: '100%'}} />
          </Animated.View>
        </Placeholder>
      );
    }

    return (
      <Animated.View
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(140),
                Utils.scaleWithPixel(140),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}>
        <Image
          source={fasilitas.gambar_besar}
          style={{width: '100%', height: '100%'}}
        />
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 15,
            left: 20,
            flexDirection: 'row',
            opacity: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(140),
                Utils.scaleWithPixel(140),
              ],
              outputRange: [1, 0, 0],
            }),
          }}>
        </Animated.View>
      </Animated.View>
    );
  };

  /**
   * render Content View
   * @returns
   */
  const renderContent = () => {
    if (loading) {
      return (
        <ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {y: deltaY},
                },
              },
            ],
            {useNativeDriver: false},
          )}
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          scrollEventThrottle={8}>
          <View style={{height: 255 - heightHeader}} />
          <Placeholder Animation={Progressive}>
            <View
              style={{
                paddingHorizontal: 20,
                marginBottom: 20,
              }}>
              <PlaceholderLine style={{width: '50%', marginTop: 10}} />
              <PlaceholderLine style={{width: '70%'}} />
              <PlaceholderLine style={{width: '40%'}} />
              <View style={styles.line}>
                <PlaceholderMedia style={styles.contentIcon} />
                <View style={{marginLeft: 10, flex: 1, paddingTop: 10}}>
                  <PlaceholderLine style={{width: '40%'}} />
                </View>
              </View>
              <View style={styles.line}>
                <PlaceholderMedia style={styles.contentIcon} />
                <View style={{marginLeft: 10, flex: 1, paddingTop: 10}}>
                  <PlaceholderLine style={{width: '40%'}} />
                </View>
              </View>
              <View style={styles.line}>
                <PlaceholderMedia style={styles.contentIcon} />
                <View style={{marginLeft: 10, flex: 1, paddingTop: 10}}>
                  <PlaceholderLine style={{width: '40%'}} />
                </View>
              </View>
              <View style={styles.line}>
                <PlaceholderMedia style={styles.contentIcon} />
                <View style={{marginLeft: 10, flex: 1, paddingTop: 10}}>
                  <PlaceholderLine style={{width: '40%'}} />
                </View>
              </View>
              <View style={styles.line}>
                <PlaceholderMedia style={styles.contentIcon} />
                <View style={{marginLeft: 10, flex: 1, paddingTop: 10}}>
                  <PlaceholderLine style={{width: '40%'}} />
                </View>
              </View>
              <PlaceholderLine
                style={{width: '100%', height: 250, marginTop: 20}}
              />
            </View>
          </Placeholder>
        </ScrollView>
      );
    }
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {y: deltaY},
                },
              },
            ],
            {useNativeDriver: false},
          )}
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          scrollEventThrottle={8}>
          <View style={{height: 255 - heightHeader}} />
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
            <View style={styles.lineSpace}>
              <Text title1 semibold>
                {fasilitas.nama_fasilitas}
              </Text>
            </View>
          </View>
          <View
            style={[styles.contentDescription, {borderColor: colors.border}]}>
            <Text body2 style={{lineHeight: 20}}>
              {fasilitas.deskripsi}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  useEffect(() => {
    initPage();
  }, []);

  return (
    <View style={{flex: 1}}>
      {renderBanner()}
      <Header
        title={'Fasilitas : ' + item.nama_fasilitas}
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
        {renderContent()}
      </SafeAreaView>
    </View>
  );
}
