/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import{Router,Scene} from 'react-native-router-flux';
import * as firebase from 'firebase';
import './config/fbconfig'
import Signin from './component/signin'
import Signup from './component/signup'
import Main from './component/main'
import Form from './component/form'
import Patient from './component/patient'
import Home from './component/home'

import Patientpage from './component/patientpage'





const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (


            <Router navigationBarStyle={styles.appbar}  > 
    
        <Scene key = "root" >
        <Scene key = "home" component = {Home} title = "Sign In"  titleStyle = {{color:"white"}} hideNavBar = {true}  />
        <Scene key = "patientpage" component = {Patientpage}   titleStyle = {{color:"white"}} hideNavBar = {true}  />
      
      <Scene key = "signin" component = {Signin} title = "Sign In"  titleStyle = {{color:"white"}} hideNavBar = {true}  />
     <Scene key = "signup" component = {Signup} title="Sign Up" titleStyle = {{color:"white"}} hideNavBar = {true}    />
    <Scene key = "main" component = {Main} hideNavBar = {true}    />
        <Scene key = "form" component = {Form}     />
      <Scene key = "patient" component = {Patient}   />
      
      
      
      
      
      </Scene>
        </Router> 
    )
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgb(15, 146, 138)',
  // },
  appbar:{
    backgroundColor:"rgb(15, 146, 138)"
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
});
