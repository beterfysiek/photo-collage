import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './ExplainOverlay.styles';
import LottieView from 'lottie-react-native';

// in reallife i would use asyncstorage but for now this works :)
let hasShownExplainerOverlay = false;
export default function ExplainerOverlay({
  title,
  subtitle,
  lottieSource,
}: {
  title: string;
  subtitle: string;
  lottieSource: string;
}) {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && !hasShownExplainerOverlay ? (
        <View style={[styles.container]}>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => {
              console.log('show', show);
              setShow(false);
              // a bit hacky i know but in reallife i would use asyncstorage to only show once
              hasShownExplainerOverlay = true;
            }}>
            <LottieView autoPlay source={lottieSource} style={styles.lottie} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}
