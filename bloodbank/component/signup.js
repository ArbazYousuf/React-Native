import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label,Button,Text } from 'native-base';
import {
    Platform,
    StyleSheet,
    View,
    Image
  } from 'react-native';
  import * as firebase from 'firebase';
  
  import '../config/fbconfig'
  import {Actions} from 'react-native-router-flux'


export default class Signup extends Component{
  constructor(){
    super()
    this.state = {
      email:'',
      password:'',
      name:''
    }
  }

signup(){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
      firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).set({
        name:this.state.name,
        email:this.state.email,
        password:this.state.password
      })
       
    }).then(()=>{
      Actions.main()
    }).catch((error)=> {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}
    render(){
        return(
            <Container>
            <Content>
            <Image source = {require("../images/unnamed.png")} style = {{marginLeft:30}} />

              <Form>
                <Item floatingLabel>
                  <Label>Email</Label>
                  <Input onChangeText = {(val)  => {this.setState({email:val})}  } keyboardType="email-address"  />
                </Item>
                <Item floatingLabel last>
                  <Label>Name</Label>
                  <Input onChangeText = {(val) => {this.setState({name:val}) ,console.log(this.state.name) }} />
                </Item>
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input onChangeText = {(val)=>{this.setState({password:val}) ,console.log(val) }  } secureTextEntry = {true}  />
                </Item>
                <Button block danger rounded onPress = {this.signup.bind(this)} >
            <Text>Sign Up</Text>
          </Button>
              </Form>
            </Content>
          </Container>
        )
    }
}


const styles = StyleSheet.create({
    
    appbar:{
      backgroundColor:"red"
    },
  
    
  });
  