import React, { useState, useEffect, Component } from 'react';
import {
  View,
  ScrollView,
  Animated,
  Linking,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
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

export default function ListTypeCluster({navigation, route}) {
  const win = Dimensions.get('window');
  const {t} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const wishlist = useSelector(wishlistSelect);
  const item = route.params?.item;
  const idCluster = route.params?.id;
  const useGallery = !!route.params?.useGallery;
  const user = useSelector(userSelect);
  const deltaY = new Animated.Value(0);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const [cluster, setCluster] = useState('');
  const [listType, setListType] = useState([]);
  const [codeCluster, setCodeCluster] = useState('');

  useEffect(() => {
    setProduct(item);
  }, [item]);

  useEffect(() => {
    setLoading(false);
  }, [product]);

  const initPage = async () => {
    fecthTipe();
  };

  const fecthTipe = async () => {
    let params = {
      cluster_category: '',
      cluster: item?.KawasanCode,
      tipe: '',
      unit: ''
    }
    let response = await CommonServices.callApi('/pub/unitlookup', 'POST', params);
    //console.log(response.data.list.data);
    if (response.status === 'success') {
      setCluster(response.data.cluster);
      setListType(response.data.list.data);
    } else {
      setCluster('');
      setListType([]);
    }
  }

  const onMessage = (data) => {
    console.log(data.nativeEvent.data);
    // navigation.navigate('ListType', {
    //   item: item,
    //   id: idCluster
    // });
  }

  /**
   * render Banner
   * @returns
   */
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
        <ImageSiteplan
          source={cluster?.image}
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
                {cluster?.name}
              </Text>
            </View>
          </View>
          <View
            style={[styles.contentDescription, {borderColor: colors.border}]}>
            <Text body2 style={{lineHeight: 20}}>
              {cluster?.description}
            </Text>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Button
                  style={{ marginTop: 20, width: '90%'}}
                  loading={loading}
                  onPress={() => console.log('Price List')}>
                  {'Price List'}
                </Button>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Button
                  style={{ marginTop: 20, width: '90%' }}
                  loading={loading}
                  onPress={() => console.log('Download Brochure')}>
                  {'Brochure'}
                </Button>
              </View>
            </View>
            <View
              style={{
                alignItems: "center"
              }}>
              <Text
                body2
                semibold
                style={{
                  paddingTop: 20,
                  paddingBottom: 30
                }}>
                {'Siteplan'}
              </Text>
              <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('WebViewSitePlan', {
                  item: {
                    KawasanCode: item.KawasanCode,
                    KawasanName: item.KawasanName
                  }
                });
              }}>
                <Image
                  source={{ uri: cluster.siteplan }}
                  style={{
                    resizeMode: 'contain',
                    aspectRatio: 1,
                    flex: 1,
                    width: '100%',
                    height: undefined,
                    marginBottom: -50,
                    marginTop: -50,
                  }}
                />
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                alignItems: "center"
              }}>
              <Text body1 grayColor style={{ marginTop: 25 }}>
                Click to preview
              </Text>
            </View>
          </View>
          <Text
            title3
            semibold
            style={{
              paddingHorizontal: 20,
              paddingBottom: 5,
              paddingTop: 15,
            }}>
            {'Type'}
          </Text>
          <View style={{ paddingHorizontal: 20 }}>
            {listType?.map?.(items => {
              return (
                user ? 
                  <ListItem
                    key={items.id}
                    small
                    image={items.image}
                    title={items.id}
                    subtitle={items.name}
                    location={'Stok unit : ' + items.unit_total}
                    style={{ marginBottom: 15 }}
                    onPress={() => {
                      navigation.navigate('WebViewSitePlan', {
                        item: {
                          KawasanCode: item.KawasanCode,
                          KawasanName: item.KawasanName,
                          tg: items.id
                        }
                      });
                      // navigation.navigate('ProductDetail', {
                      //   item: items,
                      //   id: codeCluster,
                      // });
                    }}
                  />
                  : <ListItem
                    key={items.id}
                    small
                    image={items.image}
                    title={items.id}
                    subtitle={items.name}
                    location={'login untuk mengetahui stok'}
                    style={{ marginBottom: 15 }}
                    onPress={() => {
                      navigation.navigate('ProductDetail', {
                        item: items,
                        id: codeCluster,
                      });
                    }}
                  />
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  useEffect(() => {
    initPage();
    setCodeCluster(item?.KawasanCode);
  }, []);

  return (
    <View style={{flex: 1}}>
      {renderBanner()}
      <Header
        title={'Cluster : ' + item?.KawasanName}
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
        {/* <WebView
          originWhitelist={['*']}
          source={{ uri: 'http://10.10.20.188/test/' }}
          onMessage={onMessage}
        /> */}
      </SafeAreaView>
    </View>
  );
}
