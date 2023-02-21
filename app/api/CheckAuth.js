import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Images } from '@config';
import * as Utils from '@utils';

export const CheckAuth = async data => {
    const [idUser, setIdUser] = useState('');
    const [uidUser, setUidUser] = useState('');
    const [namaUser, setNamaUser] = useState('');
    const [emailUser, setEmailUser] = useState('');

    const handleGetAuth = async () => {
        const dataId = await AsyncStorage.getItem('AccessId');
        setIdUser(dataId);
        const dataUid = await AsyncStorage.getItem('AccessUid');
        setUidUser(uidUser);
        const dataNama = await AsyncStorage.getItem('AccessNama');
        setNamaUser(dataNama);
        const dataEmail = await AsyncStorage.getItem('AccessEmail');
        setEmailUser(dataEmail);
    }

    useEffect(() => {
        handleGetAuth();
    }, []);
}