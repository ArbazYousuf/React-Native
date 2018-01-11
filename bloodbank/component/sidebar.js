


import React, { Component } from 'react';
import {
  Text,
  Platform,
  StyleSheet,
  View,Image
} from 'react-native';
import * as firebase from 'firebase';

import '../config/fbconfig';

import {Content,Button} from 'native-base';
import {Actions} from 'react-native-router-flux'
export default class Sidebar extends Component {
  constructor(){
    super()
    this.state = {
      userdata:{},
    }
  }
  componentDidMount(){
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).on('value',(snapshot)=>{
      let data = snapshot.val();
      this.setState({
        userdata:data
      })

    })
  }
  render() {
  
    return (
          <Content style={{backgroundColor:'#FFFFFF'}}>
                          <Image source = {require("../images/unnamed.png")} />

          <Text style = {{fontSize:20}}>Name: {this.state.userdata.name} </Text>
          <Text>{"\n"}</Text>
          
          <Button block danger rounded onPress= {()=>{Actions.form() }}  ><Text>Donate Blood </Text></Button>
          <Text>{"\n"}</Text>
          
            <Button block danger rounded onPress= {()=>{firebase.auth().signOut().then(Actions.signin() ,this.setState({userdata:{}}))}}  ><Text>Sign Out </Text></Button>
            
          </Content>
    );
  }
}
const styles = StyleSheet.create({
    
    text:{
    color:"white"
    },
  
  
    
  });

module.exports = Sidebar;