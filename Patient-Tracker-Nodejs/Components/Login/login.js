import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Image, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import { Container, Header, Form, Item, Label, Input, Content, Button, Text } from 'native-base';
import MiddleWare from '../Store/Middleware/middleware.js'
function mapStateToProps(state) {
    return {
        user: state.Create,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signin: function (state) {
            return dispatch(MiddleWare.Login(state))
            console.log(state)
        }
    }
}

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            flag: false
        }
    }
    showData = async () => {
        console.log('async func')
        try {
            let user = await AsyncStorage.getItem('user').then((val) => {
               if(!val){
                //    this.setState({ flag: true })
                   console.log(val, 'check null or not')
               } 
                else{
                     let value = JSON.parse(val)
                let state = {
                    email: value.Email,
                    password: value.Password
                }
                this.setState({flag: true})
                this.props.signin(state) 
                }
                
            })
        }
            catch (error) {
                this.setState({flag:false})
                console.log(error)
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.Email) {
            console.log(nextProps.user)
            this.setState({ flag: false })
            AsyncStorage.setItem('user', JSON.stringify(nextProps.user));
            console.log('props  ', nextProps.user)
            Actions.home()
        }
    }
    signin() {
        console.log('ffff')
        this.props.signin(this.state)
    }
    componentDidMount() {
        // this.setState({ flag: false })
        this.showData()
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#FF4C4C' }}>
                    {this.state.flag ? <Image source={require("../../images/patientnew.png")} style={{ marginLeft: 1, marginTop: 220, width: '100%', height: 150 }} /> :
                <Content>
                    <Image source={require("../../images/patientnew.png")} style={{ marginLeft: 1, marginTop: 70, width: '100%', height: 150 }} />
                        <Form style={{ width: '90%',marginTop:40, marginLeft: 20, borderWidth: 1, borderColor: 'white', opacity: 0.8, backgroundColor: 'white', padding: 10, borderRadius: 5 }}>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input onChangeText={(val) => { this.setState({ email: val }) }} />
                            </Item>

                            <Item floatingLabel last>
                                <Label>Password</Label>
                                <Input onChangeText={(val) => { this.setState({ password: val }) }} secureTextEntry={true} />
                            </Item>
                            <Button block primary rounded style={{ marginTop: 30, backgroundColor: '#FF4C4C' }} onPress={this.signin.bind(this)} >
                                <Text>Sign In</Text>
                            </Button>
                            <Text onPress={() => { Actions.signup() }} style={{ fontSize: 15, marginLeft: 90, marginTop: 20 }} > Create an Account </Text>
                        </Form>
                </Content>
                    }
            </Container>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);