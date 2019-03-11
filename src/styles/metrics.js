import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  baseMargin: 12,
  basePadding: 24,
  baseRadius: 3,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};
