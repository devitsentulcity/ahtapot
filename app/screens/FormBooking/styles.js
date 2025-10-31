import React from 'react';
import { StyleSheet, Dimensions, } from 'react-native';
import {BaseColor} from '@config';
import { SH, SW, SF, heightPercent, widthPercent, fontPercent } from '../../utils/dimensions';
import { Strings } from '../../utils/Strings';
import { Colors } from '../../utils/Colors';
import { Fonts } from '../../utils/Fonts';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  contentTitle: {
    alignItems: 'flex-start',
    width: '100%',
    height: 32,
    justifyContent: 'center',
    marginTop: 15
  },
  contain: {
    alignItems: 'center',
    padding: 20,
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    color: BaseColor.grayColor,
  },
  thumb: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  Minviewsigninscreen: {
    height: '100%',
  },
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
    color: '#a7302c',
    fontSize: SF(16),
    textAlign: 'center',
    paddingVertical: SH(5),
    paddingHorizontal: SH(10),
    borderWidth: 1,
    borderRadius: 5,
  },
  TabsettextTwo: {
    color: '#000',
    fontSize: SF(16),
    textAlign: 'center',
    paddingVertical: SH(5),
    paddingHorizontal: SH(10),
    borderWidth: 1,
    borderRadius: 5,
  },
  MinHeightStyle: {
    height: '100%'
  },
  inputBasic: {
    marginVertical: 8,
    fontSize: 18,
    borderWidth: 3,
    borderColor: '#cdcdcd',
    paddingHorizontal: 12,
    height: 50,
    width: '100%',
    color: 'black',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  saveAreaViewContainer: { flex: 1, backgroundColor: '#FFF' },
  viewContainer: { flex: 1, width, backgroundColor: '#FFF' },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },

  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  dropdown1BtnTxtStyle: { color: '#f5f5f5', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#f5f5f5', textAlign: 'left' },

  dropdown2BtnStyle: {
    width: '100%',
    height: 45,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#000',
    textAlign: 'center',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#f5f5f5',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: { backgroundColor: '#f5f5f5', borderBottomColor: '#C5C5C5' },
  dropdown2RowTxtStyle: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  dropdown3BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#f5f5f5',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: { width: 45, height: 45, resizeMode: 'cover' },
  dropdown3BtnTxt: {
    color: '#f5f5f5',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: { backgroundColor: 'slategray' },
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#f5f5f5',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: { width: 45, height: 45, resizeMode: 'cover' },
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },

  dropdown4BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  dropdown4BtnTxtStyle: { color: '#f5f5f5', textAlign: 'left' },
  dropdown4DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown4RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown4RowTxtStyle: { color: '#f5f5f5', textAlign: 'left' },
  images: {
    aspectRatio: 1,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
    marginBottom: 20
  },
});
