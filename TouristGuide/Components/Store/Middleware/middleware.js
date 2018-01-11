import '../../Firebase/firebase'
import * as firebase from 'firebase'
import storeAction from '../Action/action'
import { Actions } from 'react-native-router-flux';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

export default class MiddleWare {
    static Login(state) {
        return (dispatch) => {
            firebase.auth().signInWithEmailAndPassword(state.email, state.password)
                .then((user) => {
                    dispatch(storeAction.login(user))
                    Actions.home()
                })
                .catch((ev) => {
                    alert('Not Login')
                })
        }
    }
    static signup(state) {
        return (dispatch) => {
            firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
                .then((user) => {
                    let uids = firebase.auth().currentUser.uid;

                    firebase.database().ref(`Users/${uids}`).set({
                        email: state.email,
                        name: state.name,
                        password: state.password,
                        key: uids,
                    }).then(() => {
                        firebase.auth().currentUser.updateProfile({ displayName: state.name }).then(() => {
                            dispatch(storeAction.signup(user))

                            Actions.home()
                        })

                    })
                })
                .catch(ev => { console.log(ev) })

        }
    }
    static LocationRegion() {
        return (dispatch) => {
            LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location",
                ok: "YES",
                cancel: "NO",
                enableHighAccuracy: false, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
                showDialog: true, // false => Opens the Location access page directly
                openLocationServices: true, // false => Directly catch method is called if location services are turned off
                preventOutSideTouch: false, //true => To prevent the location services window from closing when it is clicked outside
                preventBackClick: false //true => To prevent the location services popup from closing when it is clicked back button
            }).then(() => {
                //  success => {alreadyEnabled: false, enabled: true, status: "enabled"}
                navigator.geolocation.getCurrentPosition((position) => {
                    let region = {
                        latitude: Number(position.coords.latitude),
                        longitude: Number(position.coords.longitude),
                        latitudeDelta: 0.00922 * 1.5,
                        longitudeDelta: 0.00421 * 1.5
                    }
                    dispatch(storeAction.region(region))
                }, (error) => {
                    console.log(error)
                }, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 });
            }).catch((error) => {
                console.log(error.message); // error.message => "disabled"
            });

        }
    }
}