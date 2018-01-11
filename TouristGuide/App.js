import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import store from './Components/Store/store'
import Login from './Components/Login/login'
import Signup from './Components/Signup/signup'
import home from './Components/Home/home';
import storeAction from './Components/Store/Action/action'
import * as firebase from 'firebase'
import MiddleWare from './Components/Store/Middleware/middleware';
import PlaceList from './Components/PlacesList/placeslist';

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Router >
          <Scene tabBarStyle={styles.tabBarStyle} tabBarPosition={'top'} key="root">
            <Scene
              androidStatusBarColor="#FF4C4C"
              key="login"
              component={Login}
              title="Login"
              initial={true}
              hideNavBar={true}
            />
            <Scene
              androidStatusBarColor="#FF4C4C"
              key="signup"
              component={Signup}
              title="signup"
              hideNavBar={true}
            />
            <Scene
              androidStatusBarColor="#FF4C4C"
              key="home"
              component={home}
              title="home"
              hideNavBar={true}
            />
            <Scene
                 androidStatusBarColor="#FF4C4C"
                 key="placeList"
                 component={PlaceList}
                 title="placeList"
                 hideNavBar={true}
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabBarStyle: {
    backgroundColor: '#FF0042',
  },
});

