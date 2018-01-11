import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';
import storeAction from '../Store/Action/action';
import placeList from '../PlacesList/placeslist'
import {Actions} from 'react-native-router-flux'

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchRegion: function (region) {
            dispatch(storeAction.searchRegion(region))
        }
    }
}

class SearchMap extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <GooglePlacesAutocomplete
                placeholder='Enter Location'
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    let region = {details}
                    this.props.searchRegion(Object.values(region))
                    Actions.placeList()
                }}
                styles={{
                    textInputContainer: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth: 0
                    },
                    textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb'
                    },
                }}
                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyANkUfLBovPhWMJohvoCTbFbo3Rd7uPLSo',
                    language: 'en', // language of the results
                    types: 'establishment' // default: 'geocode'
                }}
            //currentLocation={false}
            />
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchMap);