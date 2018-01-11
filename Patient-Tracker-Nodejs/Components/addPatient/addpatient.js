import React, { Component } from 'react';
import { Image } from 'react-native'
import {connect} from 'react-redux'
import {Actions} from 'react-native-router-flux'
import { Container, Header, Title, Form, Picker, Content, Footer, Item, Input, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import MiddleWare from '../Store/Middleware/middleware';

function mapDispatchToProps(dispatch){
  return{
    addPatient : function (state) {
     return dispatch(MiddleWare.addPatient(state))
    },
    getData: function (id) {
      return dispatch(MiddleWare.getData(id))
    }
  }
}

  


function mapStateToProps(state){
  return{
    doctorId : state.Create
  }
}

class addPatient extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      contact: '',
      diease: '',
      gender: 'Male',
      date:'',
      doctorId:''
    }
  }
  
 componentDidMount(){
    var ajjDate = new Date();
    month = ajjDate.getMonth()+1;
    year = ajjDate.getFullYear();
    date = ajjDate.getDate();
     let abeDate = year+ "-"+ month + '-' + date
    console.log(abeDate)
    this.setState({date : abeDate, doctorId:this.props.doctorId._id})
 }

  addPatient(){
    if(this.state.name == '' && this.state.contact =='' && this.state.date==''&& this.state.diease==''&&this.state.gender==''){
      alert('Fillup all Form')
    }
    else{
      this.props.addPatient(this.state)
      this.props.getData(this.props.doctorId._id)
      Actions.home()
    }
  }
  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#FF4C4C" style={{backgroundColor: '#FF4C4C'}}>
          <Left>
          <Button transparent onPress={() => { Actions.home() }}>
          <Icon name='md-arrow-back' />
      </Button>
          </Left>
          <Body>
            <Title>Add Patient</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ width: '80%', marginLeft: 40 }}>
          <Image source={require('../../images/Add-Male-User-icon.png')} style={{ width: '80%', marginLeft: 20, marginTop: 20 }} />
          <Item >
            <Icon active name='md-contact' />
            <Input placeholder='Patient Name' onChangeText={(val) => { this.setState({ name: val }) }} />
          </Item>
          <Item >
            <Icon active name='logo-whatsapp' />
            <Input placeholder='Contact' onChangeText={(val) => { this.setState({ contact: val }) }} />
          </Item>
          <Item >
            <Icon active name='md-pulse' />
            <Input placeholder='Diease' onChangeText={(val) => { this.setState({ diease: val }) }} />
          </Item>
          <Form  >
            <Picker
              mode="dropdown"
              headerBackButtonText="Baaack!"
              selectedValue={this.state.gender}
              onValueChange={(val) => { this.setState({ gender: val }) }}
            >
              <Item label="Male" value="Male" />
              <Item label="Female" value="Female" />
            </Picker>
          </Form>
          <Button rounded style={{ marginLeft: '15%', width: '70%', marginTop: 8 ,backgroundColor: '#FF4C4C',marginBottom:5}}>
            <Icon name='ios-add' />
            <Text style={{ fontSize: 18,marginRight:22,marginBottom:2 }} onPress={this.addPatient.bind(this)}>Add Patient</Text>
          </Button>
        </Content>

      </Container>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(addPatient)