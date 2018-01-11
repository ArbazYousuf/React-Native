/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Signin from './component/signin'
import Signup from './component/signup'
import Main from './component/main'
import Form from './component/form'
import Userdata from './component/userdata'



import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import{Router,Scene} from 'react-native-router-flux';
import * as firebase from 'firebase';
import './config/fbconfig';

import { Container, Header, Title,Drawer , Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
 
  render() {
  
    return (
      <Container style={{alignContent:"center"}}  >

      
   <Router navigationBarStyle={styles.appbar}  > 
    
        <Scene key = "root" >
      
      <Scene key = "signin" component = {Signin} title = "Sign In"  titleStyle = {{color:"white"}} hideNavBar = {true}  />
      <Scene key = "signup" component = {Signup} title="Sign Up" titleStyle = {{color:"white"}} hideNavBar = {true}    />
      <Scene key = "main" component = {Main} hideNavBar = {true}    />
      <Scene key = "form" component = {Form}     />
      <Scene key = "user" component = {Userdata}   />
      
      
      
      
      
      </Scene>
        </Router>      
    
 
   
       
      </Container>
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
  appbar:{
    backgroundColor:"red",
    
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
