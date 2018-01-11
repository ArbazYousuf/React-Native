import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import { Container, Header, Form, Item, Label, Input, Content, Button, Icon, Text } from 'native-base';
import MiddleWare from '../Store/Middleware/middleware.js'
import { firebase } from '@firebase/app';
import { Image,Keyboard } from 'react-native'
import storeAction from '../Store/Action/action'
function mapStateToProps(state) {
    return {
        user: state.Create,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signin: function (state) {
            return dispatch(MiddleWare.Login(state))
        },
        directLogin: function (user) {
            return dispatch(storeAction.login(user))
        },


    }
}

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }

    signin() {
        Keyboard.dismiss()
        this.props.signin(this.state)
    }
    componentDidMount(){  
   firebase.auth().onAuthStateChanged(function(user){
       if(user){
           Actions.home({user})
       }
       else{console.log('no user')}
   })
      
                  
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#FF0042' }}>
                <Content>
                    <Image source={require("../images/main_icon.png")} style={{ marginLeft: 1, marginTop: 70, width: '100%', height: 150 }} />
                    <Form style={{ width: '90%', marginTop: 40, marginLeft: 20, borderWidth: 1, borderColor: 'white', opacity: 0.8, backgroundColor: 'white', padding: 10, borderRadius: 40 }}>
                        <Item floatingLabel>
                            <Icon active name='ios-mail' />
                            <Input placeholder="Email" onChangeText={(val) => { this.setState({ email: val }) }} />
                        </Item>

                        <Item floatingLabel last>
                            <Icon active name='md-lock' />
                            <Input placeholder="Password" onChangeText={(val) => { this.setState({ password: val }) }} secureTextEntry={true} />
                        </Item>
                        <Button block primary rounded style={{ marginTop: 30, backgroundColor: '#FF0042' }} onPress={this.signin.bind(this)} >
                            <Icon name='md-person' />
                            <Text>Sign In</Text>
                        </Button>
                        <Text onPress={() => { Actions.signup() }} style={{ fontSize: 15, marginLeft: 90, marginTop: 20 }} > Create an Account </Text>
                    </Form>
                </Content>
            </Container>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);