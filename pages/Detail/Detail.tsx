import React, {useState, useEffect} from 'react';
import {View, Text, Animated, Easing, SafeAreaView} from 'react-native';
import styles from './Detail.style';
import ExplainerOverlay from '../../components/explain-overlay/ExplainOverlay';
import FastImage from 'react-native-fast-image';

export default function Detail({
  close,
  item,
  setDisableSwipe,
}: {
  close: Function;
  // make item any cause i am not aware of the consisency of the object that the api returns
  item: any;
  setDisableSwipe: Function;
}) {
  const [fadeInOuter] = useState(new Animated.Value(0.01));
  const [activeImg] = useState(new Animated.Value(0.01));
  const [prevImage, setPrevImage] = useState<string>('');

  useEffect(() => {
    // fade in outer view on init
    Animated.timing(fadeInOuter, {
      toValue: 1,
      duration: 2500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fadeInActive = () => {
    // disable swipe and start fade animation of the two images
    setDisableSwipe(true);
    Animated.timing(activeImg, {
      toValue: 1,
      duration: 2500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: true,
    }).start(() => {
      // set new previous once old previous is completly hidden
      setPrevImage(item.urls.regular);
      // enable swipe
      setDisableSwipe(false);
    });
  };

  return (
    <View style={styles.container}>
      <ExplainerOverlay
        title="SWIPE TO SEE OTHER IMAGES"
        subtitle="TAP TO CONTINUE AND SWIPE UP TO CLOSE"
        lottieSource={require('../../assets/lottie/swipe.json')}
      />
      <Animated.View style={[styles.innerContainer, {opacity: fadeInOuter}]}>
        <View style={styles.prevImageContainer}>
          {prevImage ? (
            <FastImage
              style={styles.previmage}
              onLoadStart={() => {
                // TODO: not swipe while loading
              }}
              onLoadEnd={() => {
                // TODO: make sure image is loaded before swipe
              }}
              onError={() => {
                // close modal on err
                close();
              }}
              fallback
              source={{
                uri: prevImage,
              }}
            />
          ) : null}
        </View>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              opacity: activeImg,
            },
          ]}>
          <FastImage
            style={styles.image}
            onLoadStart={() => {
              // hide active new image if exists
              activeImg.setValue(0.01);
            }}
            onLoadEnd={() => {
              // start animation when image is loaded
              fadeInActive();
            }}
            onError={() => {
              close();
            }}
            fallback
            source={{
              uri: item.urls.regular,
            }}>
            <SafeAreaView style={styles.textContainer}>
              <View style={styles.textInnerContainer}>
                {item.user && item.user.first_name ? (
                  <>
                    <Text style={styles.headerText}>AUTHEUR</Text>
                    <Text style={styles.headerName}>
                      {item.user.first_name}
                    </Text>
                  </>
                ) : null}
              </View>
            </SafeAreaView>
          </FastImage>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
