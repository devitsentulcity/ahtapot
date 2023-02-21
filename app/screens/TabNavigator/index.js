import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BaseColor, useTheme, useFont } from '@config';
import { useTranslation } from 'react-i18next';
import { Icon } from '@components';
import { userSelect, designSelect } from '@selectors';
import { useSelector } from 'react-redux';

/* Bottom Screen */
import Home from '@screens/Home';
import HomeRealEstate from '@screens/HomeRealEstate';
import HomeEvent from '@screens/HomeEvent';
import HomeFood from '@screens/HomeFood';
import Wishlist from '@screens/Wishlist';
import WishlistRealEstate from '@screens/WishlistRealEstate';
import WishlistEvent from '@screens/WishlistEvent';
import WishlistFood from '@screens/WishlistFood';
import Messenger from '@screens/Messenger';

/* Stack Screen */
import Category from '@screens/Category';
import Walkthrough from '@screens/Walkthrough';

const MainStack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const font = useFont();
    const user = useSelector(userSelect);
    const design = useSelector(designSelect);

    /**
     * Main follow return  Home Screen design you are selected
     * @param {*} value  ['basic', 'real_estate','event', 'food']
     * @returns
     */
    const exportHome = value => {
        switch (value) {
            case 'real_estate':
                return HomeRealEstate;
            case 'event':
                return HomeEvent;
            case 'food':
                return HomeFood;
            default:
                return Home;
        }
    };

    /**
     * Main follow return  WishList Screen design you are selected
     * @param {*} value  ['basic', 'real_estate','event', 'food']
     * @returns
     */
    const exportWishlist = value => {
        if (!user) {
            return Walkthrough;
        }
        switch (value) {
            case 'real_estate':
                return WishlistRealEstate;
            case 'event':
                return WishlistEvent;
            case 'food':
                return WishlistFood;
            default:
                return Wishlist;
        }
    };

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
                component={exportHome(design)}
                options={{
                    title: t('Beranda'),
                    tabBarIcon: ({ color }) => {
                        return <Icon color={color} name="home" size={20} solid />;
                    },
                }}
            />

            <BottomTab.Screen
                name="Wishlist"
                component={exportWishlist(design)}
                options={{
                    title: t('wishlist'),
                    tabBarIcon: ({ color }) => {
                        return <Icon color={color} name="bookmark" size={20} solid />;
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
                name="Messenger"
                component={user ? Messenger : Walkthrough}
                options={{
                    title: t('messenger'),
                    tabBarIcon: ({ color }) => {
                        return <Icon color={color} name="envelope" size={20} solid />;
                    },
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={SignIn}
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
