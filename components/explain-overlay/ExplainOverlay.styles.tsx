import {StyleSheet} from 'react-native';
import Constants from '../../services/constants/constants';

export default StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Constants.colour.grey_20,
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: Constants.dist.s,
    marginTop: Constants.dist.xl,
  },
  subtitle: {
    color: Constants.colour.grey_40,
    fontWeight: 'bold',
    fontSize: 13,
  },
  lottie: {height: 100, width: 100},
});
