import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  container: {
    height: 54 + getStatusBarHeight(),
    paddingTop: getStatusBarHeight(),
    borderBottomWidth: 1,
    borderBottomColor: colors['grey-light'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.basePadding,
    backgroundColor: colors['grey-lightest'],
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors['grey-darkest'],
  },
  icon: {
    color: colors['grey-darkest'],
  },
});

export default styles;
