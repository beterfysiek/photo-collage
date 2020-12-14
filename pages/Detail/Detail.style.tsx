import {StyleSheet} from 'react-native';
import Constants from '../../services/constants/constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Constants.colour.grey_90,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  previmage: {
    height: '100%',
    width: '100%',
  },
  prevImageContainer: {
    opacity: 1,
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  textInnerContainer: {
    padding: 20,
    height: 160,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  headerText: {
    color: Constants.colour.grey_30,
    fontSize: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  headerName: {
    color: Constants.colour.grey_20,
    fontSize: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});
