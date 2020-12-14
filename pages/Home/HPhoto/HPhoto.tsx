import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Easing,
  Animated,
} from 'react-native';
import Constants from '../../../services/constants/constants';
import styles from './HPhoto.style';
import FastImage from 'react-native-fast-image';

export default function Photo({
  item,
  column,
  setShowDetails,
}: {
  item: any;
  column: number;
  setShowDetails: Function;
}) {
  const [fadeIn] = useState(new Animated.Value(0.01));
  const [fadeOut] = useState(new Animated.Value(1));
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const padding: number = Constants.dist.s * 3;
  const width: number = Constants.screen.width / 2 - padding;
  // ratio width to height to calculate height with width
  const ratio: number = item.height / item.width;
  const height: number = ratio * width;
  // left column (the library renders two flatlist beside eachother under the hood)
  const isLefty: boolean = column === 0;
  const paddingStart: number = isLefty
    ? Constants.dist.s
    : Constants.dist.s / 2;
  const paddingEnd: number = isLefty ? Constants.dist.s / 2 : Constants.dist.s;

  useEffect(() => {
    // Fadein image on loadEnd
    if (isLoading === false) {
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 2000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }).start();
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 2000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading, fadeIn, fadeOut]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        /**
         * Need to calculate index because the left and right column are actualy two lists
         * tried to work with even and uneven indexes but indexes are not incrementing from left to right either
         * only option is to find index by id
         */
        setShowDetails(item);
      }}
      style={[
        styles.container,
        {
          paddingStart: paddingStart,
          paddingEnd: paddingEnd,
        },
      ]}>
      <Animated.View
        style={[
          styles.loader,
          {
            opacity: fadeOut,
          },
        ]}>
        <ActivityIndicator size={'large'} color={Constants.colour.grey_40} />
      </Animated.View>
      <Animated.View style={[styles.imgContainer, {opacity: fadeIn}]}>
        {/* using fast image cause it renders images much faster then Images of react native */}
        <FastImage
          style={[styles.img, {width: width, height: height}]}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => {
            setIsLoading(false);
          }}
          fallback
          source={{
            uri: item.urls.small,
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
