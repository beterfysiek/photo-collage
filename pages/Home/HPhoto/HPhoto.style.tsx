import {StyleSheet} from 'react-native';
import Constants from '../../../services/constants/constants';

export default StyleSheet.create({
  container: {
    paddingTop: Constants.dist.l,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  img: {
    borderRadius: Constants.dist.s,
  },
  imgContainer: {
    borderRadius: Constants.dist.s,
    shadowColor: Constants.colour.grey_70,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
});
