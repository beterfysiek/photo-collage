import {Platform, Dimensions} from 'react-native';

export default class Constants {
  static font = {
    size: {
      xxxxl: 72,
      xxxl: 42,
      xxl: 34,
      xl: 26,
      l: 17,
      m: 14,
      s: 13,
      xs: 11,
      xxs: 10,
    },
    title: {
      main: 'bronson',
      sub: 'open-sans-semibold',
      third: 'open-sans',
    },
    content: {
      default: 'open-sans',
      light: 'open-sans',
      semibold: 'open-sans',
      bold: 'open-sans',
    },
    spacing: {
      m: 0.8,
      s: 0.4,
    },
    lineHeight: {
      l: 32,
      m: 24,
      s: 20,
    },
  };

  static colour = {
    border: '#767676',
    danger: '#f15151',
    success: '#52CD90',
    black: '#0e0f0e',
    white: '#ffffff',
    whiteOpaque: '#ffffff30',
    grey_90: '#1A1A1C',
    grey_80: '#2d2d2d',
    grey_70: '#505050',
    grey_60: '#6b6b6b',
    grey_50: '#a0a0a0',
    grey_40: '#cccccc',
    grey_30: '#dedede',
    grey_20: '#f4f4f4',
    grey_10: '#fbfbfb',

    primary: '#2d2d2d',
    primaryFontColor: '#ffffff',

    secondary: '#D2F61C',
    secondaryFontColor: '#2d2d2d',

    tertiary: '#17D8B2',
    inactive: '#404040',

    darkgold: '#AA6C39',
    gold: 'orange',
    browngold: '#d39d53',
    pink: '#f768ad',
    green: '#04b765',
    blue: '#d39d53',

    // bottomtab
    tabUnfocused: '#ffffff',
    tabLabelUnfocused: '#ffffff',

    background: {
      main: '#0e1111',
      sub: '#141414',
      trans: 'rgba(255,165,0,0.1)',
    },
  };

  static dist = {
    xxxl: 48,
    xxl: 32,
    xl: 24,
    l: 16,
    m: 12,
    s: 8,
    xs: 4,
    xxs: 2,
  };

  static screen = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  };

  static platform = {
    ios: Platform.OS === 'ios',
    android: Platform.OS === 'android',
  };

  static isPortrait = () => {
    return Dimensions.get('screen').height > Dimensions.get('screen').width;
  };
}
