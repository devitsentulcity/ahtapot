import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  Loader,
  Progressive,
  PlaceholderMedia,
} from 'rn-placeholder';
import {Image, Text, Icon, Card, SafeAreaView, ListItem} from '@components';
import {BaseStyle, BaseColor, useTheme} from '@config';
import * as Utils from '@utils';
import styles from './styles';
import Swiper from 'react-native-swiper';
import {useSelector} from 'react-redux';
import {homeSelect} from '@selectors';
import {useTranslation} from 'react-i18next';
import {FilterModel} from '@models';
import {banner, cluster, fasilitas} from '../../api/home/home';
import CommonServices from '../../services/common';

const deltaY = new Animated.Value(0);

export default function Home({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const home = useSelector(homeSelect);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const heightImageBanner = Utils.scaleWithPixel(180);
  const marginTopBanner = heightImageBanner - heightHeader + 10;
  const [bannerList, setBannerList] = useState([]);
  const [clusterList, setClusterList] = useState([]);
  const [fasilitasList, setFasilitasList] = useState([]);

  const initPage = async () => {
    fetchBanner();
    fetchCluster();
    fetchFasilitas();
  };

  const fetchBanner = async () => {
    banner()
      .then(result => {
        if (result.status === 200) {
          result = result.data;
        }
        if (result.status === 'success') {
          setBannerList(result.data);
        } else {
          setBannerList([]);
        }
        return true;
      })
      .catch(err => {
        return false;
      });
  };

  const fetchCluster = async () => {
    let params = {
      cluster: '',
      tipe: ''
    }
    let response = await CommonServices.callApi('/pub/unitlookup', 'POST', params);
    console.log(response.data.list.data);
    if (response.status === 'success') {
      setClusterList(response.data.list.data);
    } else {
      setClusterList([]);
    }
  };

  const fetchFasilitas = async () => {
    fasilitas()
      .then(result => {
        if (result.status == 200) result = result.data;
        if (result.status === 'success') {
          setFasilitasList(result.data);
        } else {
          setFasilitasList([]);
        }
        return true;
      })
      .catch(err => {
        return false;
      });
  };

  /**
   *
   * onOpen ChooseBusiness
   */
  const onChooseBusiness = () => {
    navigation.navigate('ChooseBusiness');
  };

  /**
   * render banner
   */
  const renderBanner = () => {
    if (bannerList?.length > 0) {
      return (
        <Swiper
          dotStyle={{
            backgroundColor: colors.text,
          }}
          activeDotColor={colors.primary}
          paginationStyle={styles.contentPage}
          removeClippedSubviews={false}
          autoplay={true}
          autoplayTimeout={2}>
          {bannerList.map(item => {
            return (
              <Image
                key={`slider${item.id}`}
                source={item.gambar_kecil}
                style={{width: '100%', height: '100%'}}
              />
            );
          })}
        </Swiper>
      );
    }

    return (
      <Placeholder Animation={Loader}>
        <PlaceholderLine style={{height: '98%'}} />
      </Placeholder>
    );
  };
  /**
   * render Category list
   *
   * @returns
   */
  const renderCategory = () => {
    const categories = home.categories.slice(0, 8);
    if (categories?.length > 0) {
      return (
        <View
          style={[styles.serviceContent, {marginTop: marginTopBanner + 50}]}>
          <TouchableOpacity
            key={'categoryResidential'}
            style={[styles.serviceItem, {width: Utils.getWidthDevice() * 0.24}]}
            onPress={() => {
              const filter = new FilterModel();
              navigation.navigate('List', {filter});
            }}>
            <View
              style={[styles.serviceCircleIcon, {backgroundColor: '#e33222'}]}>
              <Icon
                name={Utils.iconConvert('fas fa-home')}
                size={20}
                color={BaseColor.whiteColor}
                solid
              />
            </View>
            <Text footnote numberOfLines={1}>
              {t('Residential')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            key={'categoryApartemen'}
            style={[styles.serviceItem, {width: Utils.getWidthDevice() * 0.24}]}
            onPress={() => {
              const filter = new FilterModel();
              navigation.navigate('List', {filter});
            }}>
            <View
              style={[styles.serviceCircleIcon, {backgroundColor: '#ee9836'}]}>
              <Icon
                name={Utils.iconConvert('fas fa-building')}
                size={20}
                color={BaseColor.whiteColor}
                solid
              />
            </View>
            <Text footnote numberOfLines={1}>
              {t('Apartemen')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            key={'categoryRuko'}
            style={[styles.serviceItem, {width: Utils.getWidthDevice() * 0.24}]}
            onPress={() => {
              const filter = new FilterModel();
              navigation.navigate('List', {filter});
            }}>
            <View
              style={[styles.serviceCircleIcon, {backgroundColor: '#1231ee'}]}>
              <Icon
                name={Utils.iconConvert('fas fa-shopping-basket')}
                size={20}
                color={BaseColor.whiteColor}
                solid
              />
            </View>
            <Text footnote numberOfLines={1}>
              {t('Ruko')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            key={'categoryKavling'}
            style={[styles.serviceItem, {width: Utils.getWidthDevice() * 0.24}]}
            onPress={() => {
              const filter = new FilterModel();
              navigation.navigate('List', {filter});
            }}>
            <View
              style={[styles.serviceCircleIcon, {backgroundColor: '#7bc33b'}]}>
              <Icon
                name={Utils.iconConvert('fas fa-layer-group')}
                size={20}
                color={BaseColor.whiteColor}
                solid
              />
            </View>
            <Text footnote numberOfLines={1}>
              {t('Kavling')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            key={'categoryNUP'}
            style={[styles.serviceItem, {width: Utils.getWidthDevice() * 0.24}]}
            onPress={() => {
              const filter = new FilterModel();
              // navigation.navigate('List', { filter });
            }}>
            <View
              style={[styles.serviceCircleIcon, {backgroundColor: '#4c1f7e'}]}>
              <Icon
                name={Utils.iconConvert('fas fa-list-ol')}
                size={20}
                color={BaseColor.whiteColor}
                solid
              />
            </View>
            <Text footnote numberOfLines={1}>
              {t('NUP')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            key={'categoryReserved'}
            style={[styles.serviceItem, {width: Utils.getWidthDevice() * 0.24}]}
            onPress={() => {
              const filter = new FilterModel();
              // navigation.navigate('List', { filter });
            }}>
            <View
              style={[styles.serviceCircleIcon, {backgroundColor: '#bfb339'}]}>
              <Icon
                name={Utils.iconConvert('fas fa-bookmark')}
                size={20}
                color={BaseColor.whiteColor}
                solid
              />
            </View>
            <Text footnote numberOfLines={1}>
              {t('Reserved')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            key={'categoryBooking'}
            style={[styles.serviceItem, {width: Utils.getWidthDevice() * 0.24}]}
            onPress={() => {
              const filter = new FilterModel();
              // navigation.navigate('List', { filter });
            }}>
            <View
              style={[styles.serviceCircleIcon, {backgroundColor: '#4546b5'}]}>
              <Icon
                name={Utils.iconConvert('fas fa-check-circle')}
                size={20}
                color={BaseColor.whiteColor}
                solid
              />
            </View>
            <Text footnote numberOfLines={1}>
              {t('Booking')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            key={'categoryListBooking'}
            style={[styles.serviceItem, {width: Utils.getWidthDevice() * 0.24}]}
            onPress={() => {
              const filter = new FilterModel();
              // navigation.navigate('List', { filter });
            }}>
            <View
              style={[styles.serviceCircleIcon, {backgroundColor: '#b152af'}]}>
              <Icon
                name={Utils.iconConvert('fas fa-clipboard-list')}
                size={20}
                color={BaseColor.whiteColor}
                solid
              />
            </View>
            <Text footnote numberOfLines={1}>
              {t('ListBooking')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.serviceContent}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
          return (
            <View
              style={{
                width: (Utils.getWidthDevice() - 40) * 0.25,
                marginBottom: 8,
              }}
              key={`category${item}`}>
              <Placeholder Animation={Progressive}>
                <View style={{alignItems: 'center'}}>
                  <PlaceholderMedia style={styles.serviceCircleIcon} />
                  <PlaceholderLine
                    style={{width: '50%', height: 8, marginTop: 2}}
                  />
                </View>
              </Placeholder>
            </View>
          );
        })}
      </View>
    );
  };

  /**
   * render Popular list
   * @returns
   */
  const renderClusterTeratas = () => {
    if (clusterList.length > 0) {
      return (
        <FlatList
          contentContainerStyle={{paddingLeft: 5, paddingRight: 15}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={clusterList}
          keyExtractor={(item, index) => `locations ${index}`}
          renderItem={({item, index}) => {
            return (
              <Card
                style={[styles.popularItem, {marginLeft: 15}]}
                image={item.image}
                onPress={() => {
                  navigation.navigate('List', { item: item, });
                }}>
                <Text headline blackColor semibold>
                  {item.name}
                </Text>
              </Card>
            );
          }}
        />
      );
    }

    return (
      <FlatList
        contentContainerStyle={{paddingLeft: 5, paddingRight: 15}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item, index) => `Popular ${index}`}
        renderItem={({item, index}) => {
          return (
            <View style={[styles.popularItem, {marginLeft: 15}]}>
              <Placeholder Animation={Progressive}>
                <PlaceholderMedia
                  style={{width: '100%', height: '100%', borderRadius: 8}}
                />
              </Placeholder>
            </View>
          );
        }}
      />
    );
  };

  /**
   * render List recent
   * @returns
   */
  const renderFasilitas = () => {
    if (fasilitasList?.length > 0) {
      return fasilitasList.map((item, index) => {
        return (
          <ListItem
            small
            key={`recent${item.id}`}
            image={item.gambar_kecil}
            title={item.nama_fasilitas}
            // subtitle={item.category?.title}
            // rate={item.rate}
            style={{marginBottom: 15}}
            onPress={() => {
              navigation.navigate('ProductDetail', {
                item: item,
                useGallery: false,
              });
            }}
          />
        );
      });
    }

    return [1, 2, 3].map((item, index) => {
      return (
        <ListItem
          small
          loading={true}
          key={`recent${item}`}
          style={{marginBottom: 15}}
        />
      );
    });
  };

  useEffect(() => {
    initPage();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          styles.imageBackground,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(110),
                Utils.scaleWithPixel(110),
              ],
              outputRange: [heightImageBanner, heightHeader, 0],
            }),
          },
        ]}>
        {renderBanner()}
      </Animated.View>
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'top', 'left']}>
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
          {renderCategory()}
          <View style={styles.contentPopular}>
            <Text title3 semibold>
              {t('popular_location')}
            </Text>
          </View>
          {renderClusterTeratas()}
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            <Text title3 semibold>
              {t('recent_location')}
            </Text>
            {renderFasilitas()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
