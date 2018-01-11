import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, BackHandler, Dimensions, Image } from 'react-native'
import { Container, Drawer, Header, Title, Fab, Content, List, ListItem, Item, Spinner, Thumbnail, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { connect } from 'react-redux';
import Polyline from '@mapbox/polyline'
import MiddleWare from '../Store/Middleware/middleware';
import SearchMap from '../SearchMap/seacrhMap';
import SideBar from '../Drawer/drawer';
import PlaceList from '../PlacesList/placeslist'
import { Actions } from 'react-native-router-flux';
import storeAction from '../Store/Action/action'
import { firebase } from '@firebase/app';

function mapStateToProps(state) {
    return {
        region: state.Region,
        markerRegion: state.SearchRegion.marker,
        direction: state.SearchRegion.location,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Region: function () {
            return dispatch(MiddleWare.LocationRegion())
        },
        User: function (user) {
            return dispatch(storeAction.login(user))
        },
    }
}
const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('window').height / 1.130,
        width: Dimensions.get('window').width,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

//AIzaSyA2QKdnDsLs6MjHyFHh-e6ru-NtQ87MswI



class Home extends Component {
    constructor() {
        super();
        this.state = {
            mapRegion: null,
            markerRegion: null,
            CurrentLocation: null,
            showDirection: null,
            waypoint: null,
            showList: null,
            data: null,
            active: true
        }
    }
    componentWillMount() {
        if(this.props.user){
            this.props.User(this.props.user)

        }
    //    this.props.User(firebase.auth().currentUser)
        this.props.Region()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ markerRegion: null, waypoint: null, showDirection: null, showList: null })
        this.setState({ mapRegion: nextProps.region.region, CurrentLocation: nextProps.region.region, data: true })
        if (nextProps.markerRegion) {
            let mapRegion = {
                longitude: nextProps.markerRegion[0].geometry.location.lng,
                latitude: nextProps.markerRegion[0].geometry.location.lat,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
            this.closeDrawer()
            this.setState({ markerRegion: nextProps.markerRegion, mapRegion })
        }
        if (nextProps.direction) {
            this.setState({ waypoint: nextProps.direction, direction: true })
        }

    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            mapRegion: region,
            // If there are no new values set the current ones
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
    }
    componentDidMount() {
        console.log('did')


        // }
        BackHandler.addEventListener('hardwareBackPress', () => { //(optional) you can use it if you need it
            LocationServicesDialogBox.forceCloseDialog();
        });
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer() {
        this.drawer._root.open()
    };


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
            this.setState({
                waypoint,
                region: this.state.CurrentLocation,
                direction:true
            })
            return waypoint
        } catch (error) {
            return (error) => { console.log(error, 'error error error') }
        }
    }
    render() {
        return (

            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar />}
                panOpenMask={20}
                onClose={() => this.closeDrawer()} >
                <Container>

                    {this.state.search ?
                        <Item style={{ paddingTop: 10, paddingBottom: 10, marginLeft: 15, marginRight: 10 }}>
                            <Icon name="ios-search" />
                            <SearchMap />
                            <Button onPress={() => { this.setState({ search: false }) }} transparent>
                                <Icon style={{ color: 'black' }} name='md-close' />
                            </Button>
                        </Item>
                        :
                        <Header androidStatusBarColor={'#ff0042'} style={{ backgroundColor: '#FF0042' }}>
                            <Left>
                                <Button onPress={this.openDrawer.bind(this)} transparent>
                                    <Icon name='menu' />
                                </Button>
                            </Left>
                            <Body>
                                <Title>Home</Title>
                            </Body>

                            <Right><Button onPress={() => { this.setState({ search: true }) }} transparent>
                                <Icon name="ios-search" transparent />
                            </Button></Right>
                        </Header>}
                    <Content>

                        {this.state.data ? <View style={styles.container}>
                            <MapView
                                style={styles.map}
                                provider="google"
                                showsMyLocationButton={true}
                                region={this.state.mapRegion}
                                showsMyLocationButton={true}
                                showsUserLocation={true} >

                                {this.state.direction ?
                                    <MapView.Polyline
                                        coordinates={this.state.waypoint}
                                        strokeWidth={7}
                                        strokeColor='#1E88E5' />
                                    : null}

                                {this.state.markerRegion ? this.state.markerRegion.map((val, ind) => {
                                    return (
                                        <MapView.Marker
                                        onPress={(e) => {e.stopPropagation(); this.Direction.bind(this,val.geometry.location)}}
                                            coordinate={{
                                                latitude: val.geometry.location.lat,
                                                longitude: val.geometry.location.lng,
                                            }}
                                            key={ind}>
                                            <MapView.Callout onPress={()=>{this.Direction(val.geometry.location)}}>
                                                <View>
                                                <Text style={{fontSize: 18}}>{val.name}</Text>
                                                <Text style={{fontSize: 12, color: 'blue'}}>Click For Direction....</Text>
                                                </View>
                                            </MapView.Callout>
                                        </MapView.Marker>
                                    )
                                }) : null}
                            </MapView>
                            <Fab
                                active={this.state.active}
                                direction="right"
                                containerStyle={{}}
                                onPress={() => { this.state.CurrentLocation }}
                                style={{ backgroundColor: '#FF0042' }}
                                position="bottomRight"
                                onPress={() => this.setState({ active: !this.state.active })}>
                                <Icon name="md-locate" />
                            </Fab>
                        </View>
                            : <Spinner color='green' />}




                    </Content>
                </Container>

            </Drawer>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);