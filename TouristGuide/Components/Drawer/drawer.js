import React, { Component } from 'react';
import { Container, Header, Content, Icon, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { connect } from 'react-redux';
import storeAction from '../Store/Action/action'
import { Actions } from 'react-native-router-flux';
import { Image, View } from 'react-native';
import * as firebase from 'firebase';
function mapDispatchToProps(dispatch) {
    return {
        markerRegion: function (marker) {
            return dispatch(storeAction.marker(marker))
        }
    }
}

function mapStateToProps(state) {
    return {
        currentRegion: state.Region.region,
        CurrentName: state.Create.user,
    }
}

class SideBar extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    async nearBy(place) {
        currentRegion = this.props.currentRegion.latitude + ',' + this.props.currentRegion.longitude

        try {
            let nearby = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentRegion}&radius=2000&type=${place}&key=AIzaSyCyT04gKR0z36TeYAFBds1a_aPPaanyKbI`)
            let nearbyResp = await nearby.json()
            this.props.markerRegion(nearbyResp.results)
            Actions.placeList()
        }
        catch (error) {
        }
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <Content>
                    <View style={{ backgroundColor: '#FF0042' }}>
                        <Image source={require("../images/main_icon.png")} style={{ marginLeft: 1, width: '100%', height: 150 }} />
                    </View>
                    <Text style={{ marginLeft: 90, fontWeight: 'bold', fontSize: 20 }}>Tourist Guide</Text>
                    <List>
                        <ListItem avatar>
                            <Left>
                                <Icon name="md-person" />
                            </Left>
                            <Body>
                                <Text>{this.props.CurrentName.displayName}</Text>
                            </Body>
                        </ListItem>
                        <Text>{"\n"}</Text>
                        <Text style={{fontWeight:'bold',fontSize:15,marginLeft:88}}>SEARCH NEARBY</Text>
                        <ListItem onPress={this.nearBy.bind(this, 'restaurant')} avatar>
                            <Left>
                                <Icon name="ios-restaurant" />
                            </Left>
                            <Body>
                                <Text>Restaurants</Text>
                            </Body>
                        </ListItem>
                        <ListItem onPress={this.nearBy.bind(this, 'cafe')} avatar>
                            <Left>
                                <Icon name="md-cafe" />
                            </Left>
                            <Body>
                                <Text>Cafes</Text>
                            </Body>
                        </ListItem>
                        <ListItem onPress={this.nearBy.bind(this, 'gas_station')} avatar>
                            <Left>
                                <Icon name="ios-car" />
                            </Left>
                            <Body>
                                <Text>Gas Stations</Text>
                            </Body>
                        </ListItem>
                        <ListItem onPress={this.nearBy.bind(this, 'bank')} avatar>
                            <Left>
                                <Icon name="ios-cash" />
                            </Left>
                            <Body>
                                <Text>ATMs</Text>
                            </Body>
                        </ListItem>
                        <ListItem onPress={this.nearBy.bind(this, 'hospital')} avatar>
                            <Left>
                                <Icon name="md-medkit" />
                            </Left>
                            <Body>
                                <Text>Hospitals</Text>
                            </Body>
                        </ListItem>
                        <ListItem onPress={this.nearBy.bind(this, 'grocery_or_supermarket')} avatar>
                            <Left>
                                <Icon name="ios-shirt" />
                            </Left>
                            <Body>
                                <Text>Groceries</Text>
                            </Body>
                        </ListItem>
                        <Text>{"\n"}</Text>
                        <ListItem onPress={() => { firebase.auth().signOut().then(() => { Actions.login() }) }} avatar>
                            <Left>
                                <Icon name="md-log-out" />
                            </Left>
                            <Body>
                                <Text>Logout</Text>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)