import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/Feather';

import api from '~/services/api';

import Header from '~/components/Header';

import RepositoryItem from './RepositoryItem'
import styles from './styles'

const TabIcon = ({ tintColor }) => <Icon name="list" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

class Repositories extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  state = {
    data: [],
    loading: true,
    refreshing: false
  };

  async componentDidMount() {
    this.loadRepositories()
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true })
    const username = await AsyncStorage.getItem('username');
    const { data } = await api.get(`/users/${username}/repos`);

    this.setState({ data, loading: false, refreshing: false });
  }

  renderListItem = ({ item }) => <RepositoryItem repository={item}/>

  renderList = () => {
    const { data, refreshing } = this.state
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    )
  }

  render() {
    const { loading } = this.state
    return (
      <View style={styles.container}>
        <Header title="Repositórios" />
        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}

export default Repositories;
