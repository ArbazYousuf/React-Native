import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Image, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { Container, Header, Form, Item, Label, Input, Content, Button, Icon, Text } from 'native-base';
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
            name: 'Arbaz Yousuf',
            email: 'Arbaz@gmail.com',
            password: 'Hello1234'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.Create.name) {
            Actions.home()
        }
    }

    signup() {
        this.props.signup(this.state)
        Keyboard.dismiss()
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#FF0042' }}>
                <Content>
                    <Image source={require("../images/main_icon.png")} style={{ marginLeft: 1, marginTop: 40, width: '100%', height: 150 }} />
                    <Form style={{ width: '90%', marginLeft: 20, marginTop: 20, borderWidth: 1, borderColor: 'white', opacity: 0.8, backgroundColor: 'white', padding: 10, borderRadius: 40 }}>
                        <Item floatingLabel>
                            <Icon active name='ios-person' />
                            <Input placeholder="Name" onChangeText={(val) => { this.setState({ name: val }) }} />
                        </Item>
                        <Item floatingLabel>
                            <Icon active name='ios-mail' />
                            <Input placeholder="Email" onChangeText={(val) => { this.setState({ email: val }) }} />
                        </Item>
                        <Item floatingLabel last>
                            <Icon active name='md-lock' />
                            <Input placeholder="Password" onChangeText={(val) => { this.setState({ password: val }) }} secureTextEntry={true} />
                        </Item>
                        <Button block primary rounded style={{ marginTop: 30, backgroundColor: '#FF0042' }} onPress={this.signup.bind(this)} >
                            <Icon name='md-people' />
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