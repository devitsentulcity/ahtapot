import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

export default function ImageSiteplan(props) {
  const {style, resizeMode, source, ...rest} = props;
  let resize = FastImage.resizeMode.cover;
  switch (resizeMode) {
    case 'contain':
      resize = FastImage.resizeMode.contain;
      break;
    case 'stretch':
      resize = FastImage.resizeMode.stretch;
      break;
    case 'center':
      resize = FastImage.resizeMode.center;
      break;
    default:
      break;
  }
  return (
    <FastImage
      style={StyleSheet.flatten([style && style])}
      source={typeof source === 'number' ? source : {uri: source?.toString()}}
      {...rest}
      resizeMode={resize}
    />
  );
}

ImageSiteplan.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ImageSiteplan.defaultProps = {
  style: {},
  resizeMode: 'cover',
};
