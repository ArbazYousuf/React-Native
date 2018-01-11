import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Image, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Form, Item, Label, Input, Content, Button, Text } from 'native-base';
import MiddleWare from '../Store/Middleware/middleware';

function mapStateToProps(state) {
    return {
        Create: state.Create
    }
};

function mapDispatchToProps(dispatch) {
    return {
        signup: function (state) {
            dispatch(MiddleWare.signup(state))
        }
    }
}

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    signup() {
        if (this.state.email) {
            var x = this.state.email
            var atpos = x.indexOf("@");
            var dotpos = x.lastIndexOf(".");
            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
                alert("Not a valid e-mail address");
                return false;
            } else {
                if (this.state.password.length < 6) {
                    alert('Not a valid password')
                } else {
                    this.props.signup(this.state)
                    // Actions.Home()
                }
            }
        }

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (this.props.Create) {
            AsyncStorage.setItem('user', JSON.stringify(nextProps.Create));
            Actions.home()
            console.log('me chal gia')
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#FF4C4C' }}>
                <Content>
                    <Image source={require("../../images/patientnew.png")} style={{ marginLeft: 1, marginTop: 70, width: '100%', height: 150 }} />
                    <Form style={{ width: '90%', marginLeft: 20, borderWidth: 1, borderColor: 'white', opacity: 0.8, backgroundColor: 'white', padding: 10, borderRadius: 5 }}>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input onChangeText={(val) => { this.setState({ name: val }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={(val) => { this.setState({ email: val }) }} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input onChangeText={(val) => { this.setState({ password: val }) }} secureTextEntry={true} />
                        </Item>
                        <Button block primary rounded style={{ marginTop: 30, backgroundColor: '#FF4C4C' }} onPress={this.signup.bind(this)} >
                            <Text>Sign Up</Text>
                        </Button>
                        <Text onPress={() => { Actions.login() }} style={{ fontSize: 15, marginLeft: 70, marginTop: 20 }} > Already Hava a Account </Text>
                    </Form>
                </Content>
            </Container>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);