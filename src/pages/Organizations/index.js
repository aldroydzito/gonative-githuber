import React, { Component } from 'react';
import { View, AsyncStorage, FlatList, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';

import Header from '~/components/Header';

import styles from './styles';
import OrganizationItem from './OrganizationItem';

import api from '~/services/api'

const TabIcon = ({ tintColor }) => <Icon name="home" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

class Organizations extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  async componentDidMount() {
    this.loadOrganization();
  }

  loadOrganization = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem('username');
    const { data } = await api.get(`/users/${username}/orgs`);

    this.setState({ data, loading: false, refreshing: false });
  };

  renderListItem = ({ item }) => <OrganizationItem organization={item} />;

  renderList = () => {
    const { data, refreshing } = this.state;
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadOrganization}
        refreshing={refreshing}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Organizações" />
        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}

Organizations.navigationOptions = {
  tabBarIcon: TabIcon,
};

export default Organizations;
