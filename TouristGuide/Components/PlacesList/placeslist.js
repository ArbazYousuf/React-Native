import React, { Component } from 'react'
// import { View, Text, Image } from 'react-native'
// import { CoordinatorLayout, BottomSheetBehavior, FloatingActionButton } from 'react-native-bottom-sheet-behavior'
import { connect } from 'react-redux';
import { Container, Header, Title, Content,Drawer, View, Button, Left, Right, List, ListItem, Thumbnail, Body, Icon, Text } from 'native-base';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux'
import storeAction from '../Store/Action/action'
import Polyline from '@mapbox/polyline'
import SideBar from '../Drawer/drawer'
function mapStateToProps(state) {
    return {
        markerRegion: state.SearchRegion.marker,
        CurrentLocation: state.Region.region,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Direction: function (location) {
            return dispatch(storeAction.direction(location))
        }
    }
}

class PlaceList extends Component {
    constructor() {
        super();
        this.state = {
            markerRegion: null,
            CurrentLocation: null,
        }
    }
    componentWillReceiveProps(nextProps){
        if (this.props.markerRegion) {
            this.setState({ markerRegion: this.props.markerRegion })
        }
    }
    componentDidMount() {        
        if (this.props.markerRegion) {
            this.setState({ markerRegion: this.props.markerRegion })
        }
        if (this.props.CurrentLocation) {
            this.setState({ CurrentLocation: this.props.CurrentLocation })
        }
    }
    async Direction(place) {
        var current = this.state.CurrentLocation.latitude + "," + this.state.CurrentLocation.longitude;
        var destination = place.lat + "," + place.lng;
        try {
            //'AIzaSyAobz6gsA1xnjTZqmDEPkdjpqRNtf9fkGs'
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${current}&destination=${destination}&key=AIzaSyAobz6gsA1xnjTZqmDEPkdjpqRNtf9fkGs`)
            let respcheck = await resp.json();
            let way = Polyline.decode(respcheck.routes[0].overview_polyline.points);
            let waypoint = way.map((val, index) => {
                return {
                    latitude: val[0],
                    longitude: val[1]
                }
            })
            this.props.Direction(waypoint)
            Actions.home()
            return waypoint
        } catch (error) {
            return (error) => { console.log(error, 'error error error') }
        }
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer() {
        this.drawer._root.open()
    };
    render() {
        return (
            <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<SideBar />}
            onClose={() => this.closeDrawer()} >
            <Container>
                <Header androidStatusBarColor='#ff0042' style={{backgroundColor:"#FF0042"}}>
                    <Left>
                        <Button onPress={()=>{this.openDrawer()}} transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right><Button style={{backgroundColor:'#FF0042'}} onPress={() => { Actions.home() }}><Text>Show Map</Text></Button></Right>
                </Header>
                <Content style={{backgroundColor:'white'}}>
                    <View>
                        <List>
                            {this.state.markerRegion?Object.keys(this.state.markerRegion).length !== 1 ? this.state.markerRegion.map((val, ind) => {
                                return (
                                    <ListItem key={ind} style={{ flex: 1 }}>
                                        <Thumbnail square size={80} source={{ uri: val.icon }} />
                                        <Body style={{ flexDirection: "row", width: '100%' }}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{fontWeight:'bold'}}>{val.name}</Text>
                                                {/* {val.opening_hours?val.opening_hours.open_now ? <Text>Open Now</Text> : <Text>Closed Now</Text>:null} */}
                                                <Text style={{fontSize :12}}>{val.vicinity}</Text>
                                                <Text note>{val.rating}</Text></View>
                                            <Button style={{backgroundColor:'#FF0042'}} onPress={this.Direction.bind(this, val.geometry.location)} primary><Text>Direction</Text></Button>
                                        </Body>
                                    </ListItem>

                                )
                            }) :this.state.markerRegion.map((val, ind) => {
                                return (
                                    <ListItem key={ind} style={{ flex: 1 }}>
                                        <Thumbnail square size={80} source={{ uri: val.icon }} />
                                        <Body style={{ flexDirection: "row", width: '100%' }}>
                                            <View style={{ flex: 1 }}>
                                            <Text style={{fontWeight:'bold'}}>{val.name}</Text>
                                            {val.opening_hours?val.opening_hours.open_now ? <Text style={{fontSize:10}}>Open Now</Text> : <Text style={{fontSize:10}}>Closed Now</Text>:null}
                                            <Text style={{fontSize :12}}>{val.vicinity}</Text>
                                                <Text note>{val.rating}</Text></View>
                                            <Button style={{backgroundColor:'#FF0042'}} onPress={this.Direction.bind(this, val.geometry.location)} primary><Text>Direction</Text></Button>
                                        </Body>
                                    </ListItem>)
                            }):null}
                        </List>
                    </View>
                </Content>
            </Container>
            </Drawer>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);