import axios from "axios";
import storeAction from '../Action/action'
// var path = 'http://192.168.1.160:8000';
var path = "https://thawing-tor-10887.herokuapp.com"
export default class MiddleWare {
    static Login(state) {
        return (dispatch) => {
            console.log(state, path)
            axios.post(`${path}/login`, {
                state: state
            })
                .then((res) => {
                    if (res.data.User.Email) {
                        if (res.data.User.Password === state.password) {
                            dispatch(storeAction.login(res.data.User))
                        } else { alert('wrong password') }
                    }
                    else { alert('First Signup') }
                })
                .catch((error) => console.log("fetch error:", error.request._response))
        }
    }

    static signup(state) {
        return (dispatch) => {
            axios.post(`${path}/signup`, {
                state: state
            })

                .then((res) => {
                    console.log(res)
                        if (res.data.User) {
                            alert('email already Registered')
                        }
                        else {
                            dispatch(storeAction.signup(res.data.user))
                            console.log('action dispatch hogia')
                        }
                })
                .catch((error) => console.log("fetch error:", error.request._response))
        }
    }

    static addPatient(state) {
        return (dispatch) => {
            axios.post(`${path}/patient`, {
                state: state
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    static getData(_id) {
        return (dispatch) => {
            axios.get(`${path}/patient/${_id}`)

                .then((res) => {
                    console.log(res.data.Patient)
                    dispatch(storeAction.patient(res.data.Patient))
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
}