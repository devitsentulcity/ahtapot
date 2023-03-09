import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BaseColor, useTheme, useFont } from '@config';
import { useTranslation } from 'react-i18next';
import { Icon } from '@components';
import { userSelect, designSelect } from '@selectors';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Bottom Screen */
import Home from '@screens/Home';
import HomeRealEstate from '@screens/HomeRealEstate';
import HomeEvent from '@screens/HomeEvent';
import HomeFood from '@screens/HomeFood';
import Wishlist from '@screens/Wishlist';
import WishlistRealEstate from '@screens/WishlistRealEstate';
import WishlistEvent from '@screens/WishlistEvent';
import WishlistFood from '@screens/WishlistFood';
import Profile from '@screens/Profile';
import Messenger from '@screens/Messenger';

/* Stack Screen */
import ThemeSetting from '@screens/ThemeSetting';
import Setting from '@screens/Setting';
import Category from '@screens/Category';
import List from '@screens/List';
import ListRealEstate from '@screens/ListRealEstate';
import ListEvent from '@screens/ListEvent';
import ListFood from '@screens/ListFood';
import ListType from '@screens/ListType';
import Review from '@screens/Review';
import Feedback from '@screens/Feedback';
import Walkthrough from '@screens/Walkthrough';
import ChangePassword from '@screens/ChangePassword';
import ProfileEdit from '@screens/ProfileEdit';
import ChangeLanguage from '@screens/ChangeLanguage';
import ProductDetail from '@screens/ProductDetail';
import ProductDetailRealEsate from '@screens/ProductDetailRealEsate';
import ProductDetailEvent from '@screens/ProductDetailEvent';
import ProductDetailFood from '@screens/ProductDetailFood';
import ListItemUnit from '@screens/ListItemUnit';
import ContactUs from '@screens/ContactUs';
import Messages from '@screens/Messages';
import AboutUs from '@screens/AboutUs';
import FormBooking from '@screens/FormBooking';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import ListSales from '../screens/ListSales';
import ListNup from '../screens/ListNup';
import FasilitasDetail from '../screens/FasilitasDetail';
import ListAllCluster from '../screens/ListAllCluster';
import ListTrxVa from '../screens/ListTrxVa';
import ListTrxVaDetail from '../screens/ListTrxVaDetail';
import ListTypeCluster from '../screens/ListTypeCLuster';
import DataUnit from '../screens/DataUnit';
import NupAdd from '../screens/NupAdd';
import WebViewSitePlan from '../screens/WebViewSitePlan';

const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function Main() {

  const design = useSelector(designSelect);
  /**
   * Main follow return  Product detail design you are selected
   * @param {*} value  ['basic', 'real_estate','event', 'food']
   * @returns
   */
  const exportProductDetail = value => {
    switch (value) {
      case 'real_estate':
        return ProductDetailRealEsate;
      case 'event':
        return ProductDetailEvent;
      case 'food':
        return ProductDetailFood;
      default:
        return ProductDetail;
    }
  };

  /**
   * Main follow return  Product detail design you are selected
   * @param {*} value  ['basic', 'real_estate','event', 'food']
   * @returns
   */
  const exportList = value => {
    switch (value) {
      case 'real_estate':
        return ListRealEstate;
      case 'event':
        return ListEvent;
      case 'food':
        return ListFood;
      default:
        return List;
    }
  };

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="BottomTabNavigator">
      <MainStack.Screen name="BottomTabNavigator" component={BottomTabNavigator}/>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="ThemeSetting" component={ThemeSetting} />
      <MainStack.Screen name="Setting" component={Setting} />
      <MainStack.Screen name="Category" component={Category} />
      <MainStack.Screen name="List" component={exportList(design)} />
      <MainStack.Screen name="ListType" component={ListType} />
      <MainStack.Screen name="ListItemUnit" component={ListItemUnit} />
      <MainStack.Screen name="Walkthrough" component={Walkthrough} />
      <MainStack.Screen name="Review" component={Review} />
      <MainStack.Screen name="Feedback" component={Feedback} />
      <MainStack.Screen name="ChangePassword" component={ChangePassword} />
      <MainStack.Screen name="ProfileEdit" component={ProfileEdit} />
      <MainStack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <MainStack.Screen name="ProductDetail" component={exportProductDetail(design)}/>
      <MainStack.Screen name="ContactUs" component={ContactUs} />
      <MainStack.Screen name="AboutUs" component={AboutUs} />
      <MainStack.Screen name="FormBooking" component={FormBooking} />
      <MainStack.Screen name="Messages" component={Messages} />
      <MainStack.Screen name="SignIn" component={SignIn} />
      <MainStack.Screen name="SignUp" component={SignUp} />
      <MainStack.Screen name="ListSales" component={ListSales} />
      <MainStack.Screen name="ListNup" component={ListNup} />
      <MainStack.Screen name="ListAllCluster" component={ListAllCluster} />
      <MainStack.Screen name="FasilitasDetail" component={FasilitasDetail} />
      <MainStack.Screen name="ListTrxVa" component={ListTrxVa} />
      <MainStack.Screen name="ListTrxVaDetail" component={ListTrxVaDetail} />
      <MainStack.Screen name="ListTypeCluster" component={ListTypeCluster} />
      <MainStack.Screen name="DataUnit" component={DataUnit} />
      <MainStack.Screen name="NupAdd" component={NupAdd} />
      <MainStack.Screen name="WebViewSitePlan" component={WebViewSitePlan} />
    </MainStack.Navigator>
  );
}

function BottomTabNavigator() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const font = useFont();
  const user = useSelector(userSelect);
  
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveTintColor: BaseColor.grayColor,
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: font,
          paddingBottom: 2,
        },
      }}>
      
      <BottomTab.Screen
        name="Home"
        component={Home}
        // component={exportHome(design)}
        options={{
          title: t('Beranda'),
          tabBarIcon: ({ color }) => {
            return <Icon color={color} name="home" size={20} solid />;
          },
        }}
      />
      <BottomTab.Screen
        name="Category"
        component={Category}
        options={{
          title: t('category'),
          tabBarIcon: ({ color }) => {
            return <Icon color={color} name="clipboard-list" size={20} solid />;
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={user ? Walkthrough : SignIn}
        options={{
          title: t('account'),
          tabBarIcon: ({ color }) => {
            return <Icon solid color={color} name="user-circle" size={20} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
