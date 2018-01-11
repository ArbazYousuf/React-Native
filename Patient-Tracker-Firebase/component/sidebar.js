

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
      user:false
    }
  }
  componentDidMount(){
    var user  = firebase.auth().currentUser
    if(user){
    firebase.database().ref(`doctors/${firebase.auth().currentUser.uid}`).on('value',(snapshot)=>{
      let data = snapshot.val();
      this.setState({
        userdata:data
      })

    })
  }
  }
  componentWillMount(){
    var user = firebase.auth().currentUser
    if(user){
      this.setState({user:true})
    }
    
  }
  render() {
    return(
    this.state.user?  
    
      <Content style={{backgroundColor:'#FFFFFF'}}>
                      <Image source = {require("../images/logo.png")} />

      <Text style = {{fontSize:20}}>Name: {this.state.userdata.name} </Text>
      <Text>{"\n"}</Text>
      
  
      
        <Button block  rounded onPress= {()=>{firebase.auth().signOut().then(Actions.signin() )}} style={styles.btn}  ><Text style = {styles.text}>Sign Out </Text></Button>
        
      </Content>

    
    
    :<Content style={{backgroundColor:'#FFFFFF'}}>
      <Image source = {require("../images/logo.png")} />
      <Text>{"\n"}</Text>
      <Button block  rounded onPress= {()=>{Actions.signin() }} style={styles.btn}  ><Text style = {styles.text}>Sign In </Text></Button>


    </Content>  
    )
   
  }
}
const styles = StyleSheet.create({
    
    text:{
    color:"white"
    },
  btn:{
    backgroundColor:"rgb(15, 146, 138)"
  }
  
    
  });

module.exports = Sidebar;