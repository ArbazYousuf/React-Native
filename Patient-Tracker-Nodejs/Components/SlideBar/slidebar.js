import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native'
import { connect } from 'react-redux';
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux';
import storeAction from '../Store/Action/action';
function mapStateToProps(state) {
    return {
        Create: state.Create,
    }
}

function mapDispatachToProps(dispatch){
    return{
        logout: function(){
            return dispatch(storeAction.logout())
        }
    }
}

class SlideBar extends Component {
    constructor() {
        super()
        this.state = {
            Create: null
        }
    }

    logout(){
        AsyncStorage.removeItem('user',(err)=>{ console.log(err)});
        Actions.login();
        this.props.logout()

    }

    componentDidMount() {
        this.setState({ Create: this.props.Create })
        console.log(this.props.Create)
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', height: '100%' }}>
                <Image source={require('../../images/Add-Male-User-icon.png')} style={{ width: '80%', marginLeft: 20, marginTop: 20 }} />
                {this.state.Create ? <Text style={{fontSize:20,marginLeft:75}}> {this.state.Create.Name} </Text> : null}
                <Button style={{ backgroundColor: '#FF4C4C', width: 200, borderRadius: 5, marginLeft: 35 }} onPress={this.logout.bind(this)} block success>
                    <Text>Logout</Text>
                </Button>
            </View>
        )
    }
}

export default connect(mapStateToProps,mapDispatachToProps)(SlideBar);