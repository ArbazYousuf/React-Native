import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';
import {
  Platform,
  StyleSheet,
  View, Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

import '../config/fbconfig';

export default class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      showToast: false,
      user: false
    }
  }

  signin() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      Actions.main()
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      // ...
    });
  }
  componentWillMount() {
    var user = firebase.auth().currentUser;
    
    firebase.auth().onAuthStateChanged( (user)=> {
      if (user) {
      
        Actions.main()
      } else {
        this.setState({
          user: true
        })
      }
    });

  }
  render() {
    return (
      <Container>
        <Content>
          <Image source={require("../images/unnamed.png")} style={{ marginLeft: 30 }} />
{this.state.user?

          <Form>
            <Item floatingLabel>
              <Label>Email:</Label>
              <Input onChangeText={(val) => { this.setState({ email: val }) }} keyboardType="email-address" />
            </Item>

            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={(val) => { this.setState({ password: val }) }} secureTextEntry={true} />
            </Item>
            <Button block danger rounded onPress={this.signin.bind(this)} >
              <Text>Sign In</Text>
            </Button>
            <Text onPress={() => { Actions.signup() }} style={{ fontSize: 20, marginLeft: 100 }} > Create an Account </Text>
          </Form>
    :null}
        </Content>
      </Container>
    )
  }
}


const styles = StyleSheet.create({

  appbar: {
    backgroundColor: "red"
  },




});
