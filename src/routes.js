import { createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import Welcome from '~/pages/Welcome';
import Repositories from '~/pages/Repositories';
import Organizations from '~/pages/Organizations';

import { colors } from '~/styles'

const Routes = (userLogged = false) => createAppContainer(
  createSwitchNavigator(
    {
      Welcome,
      LoggedIn: createBottomTabNavigator({
        Repositories,
        Organizations,
      }, { tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeTintColor: colors.white,
        inactiveTintColor: colors['white-transparent'],
        style: {
          backgroundColor: colors.secondary
        }
      } }),
    },
    { initialRouteName: userLogged ? 'LoggedIn' : 'Welcome' },
  ),
);

export default Routes;
