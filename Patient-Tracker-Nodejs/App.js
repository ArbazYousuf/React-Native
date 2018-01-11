import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './Components/Login/login'
import Signup from './Components/Signup/signup'
import Home from './Components/Home/home'
import Search from './Components/Search/search'
import {Scene, Router} from 'react-native-router-flux'
import {Provider} from 'react-redux'
import store from './Components/Store/store'
import addPatient from './Components/addPatient/addpatient';
import Details from './Components/Details/details';

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
     <Router >
          <Scene tabBarStyle={styles.tabBarStyle} tabBarPosition={'top'} key="root">
          <Scene 
          androidStatusBarColor="#FF4C4C"
          key="login"
          component={Login}
          title="Login"
          initial={true}
          hideNavBar={true}
           />
           <Scene 
           androidStatusBarColor="#FF4C4C"
           key="signup"
           
           component={Signup}
           title="signup"
           hideNavBar={true}
           onRight={() => {
            console.log('is this one called?');
            Actions.home();
          }}
           /> 
           <Scene 
           key="home"
           component={Search}
           title="home"
           hideNavBar={true}
           />
           <Scene 
           key="addPatient"
           component={addPatient}
           hideNavBar={true}
           />
           <Scene 
           key="search"
           component={Search}
           hideNavBar={true}
           />
           <Scene 
           key="details"
           component={Details}
           hideNavBar={true}
           />
          </Scene>
      </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabBarStyle: {
    backgroundColor: '#eeeeee',
},
});
