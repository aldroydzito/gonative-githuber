import React, { Component } from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import PropTypes from 'prop-types';

import styles from './styles';

import api from '~/services/api';

class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    loading: false,
    error: false,
  };

  checkUserExists = async (username) => {
    const user = await api.get(`/users/${username}`);

    return user;
  };

  saveUser = async (username) => {
    await AsyncStorage.setItem('username', username);
  };

  signIn = async () => {
    const { username } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true, error: false });

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);
      navigation.navigate('LoggedIn');
    } catch (err) {
      this.setState({ loading: false, error: true });
      console.tron.log('Usuário inexistente.');
    }
  };

  render() {
    const { username, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>
          Para continuar precisamos que você informe seu usuário no Github
        </Text>

        {error && <Text style={styles.error}>Usuário inexistente.</Text>}

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuário"
            underlineColorAndroid="transparent"
            onSubmitEditing={this.signIn}
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />

          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.buttonText}>Continuar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Welcome;
