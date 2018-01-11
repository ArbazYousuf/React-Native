import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { View } from 'react-native'
import { Container, Header, Drawer, Title, Content, Input, Footer, Item, Card, CardItem, FooterTab, Button, Left, Right, Body, Icon, Text, Fab } from 'native-base';
import MiddleWare from '../Store/Middleware/middleware';
import DatePicker from 'react-native-datepicker';
import SlideBar from '../SlideBar/slidebar'

function mapStateToProps(state) {
  return {
    patient: state.Patient.patient,
    doctorName: state.Create.Name,
    doctorId: state.Create._id,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: function (id) {
      return dispatch(MiddleWare.getData(id))
    }
  }
}

class Search extends Component {
  constructor() {
    super();
    this.state = {
      active: 'true',
      patient: null,
      date: '',
      DoctorName: '',
      flag: true,
    }
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ patient: nextProps.patient, DoctorName: nextProps.doctorName })
    console.log(nextProps)
  }

  componentDidMount() {
    if (this.props.doctorId) {
      this.props.getData(this.props.doctorId)
      console.log('done')
    }else{
      console.log('login nhe hy')
      Actions.login()
    }
    this.setState({ patient: this.props.patient, DoctorName: this.props.doctorName })
  }

  dateSearch(date) {
    this.setState({ date: date,Search:'' })
    let patient = [];
    let data = this.props.patient;
    for (let i in data) {
      console.log(this.state.date)
      if (data[i].Date == date) {
        patient.push(data[i])
        this.setState({ patient })
      }
      else {
        this.setState({ patient: null })
      }
    }
  }

  searchCheck(val) {
    this.setState({ Search: val,date:'' })
    let patient = [];
    let data = this.props.patient;
    this.setState({patient:null})
    for (let i in data) {
      if (data[i].PatientName.toLowerCase() == val.toLowerCase()) {
        patient.push(data[i])
        this.setState({ patient })
        console.log(this.state.patient)
      }
      else {
        //  patient = [];
        // this.setState({ patient: null })
      }
    }
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        panOpenMask={20}
        panCloseMask={20}
        content={<SlideBar />}
        onClose={() => this.closeDrawer.bind(this)} >
        <Container style={{ flex: 1 }}>
          {this.state.flag ?
            <Header androidStatusBarColor="#FF4C4C" style={{ backgroundColor: '#FF4C4C' }}>
              <Left>
                <Button onPress={this.openDrawer.bind(this)} transparent>
                  <Icon name='md-menu' />
                </Button>
              </Left>
              <Body>
                <Title>Home</Title>
              </Body>
              <Right>
                <Button onPress={() => { this.setState({ flag: false }) }} transparent>
                  <Icon name='md-search' />
                </Button>
              </Right>
            </Header> :
            <Header androidStatusBarColor="#FF4C4C" style={{ backgroundColor: '#FF4C4C' }} searchBar rounded>
              {/* <Left style={{marginleft:44}}>
            <Button transparent onPress={() => { Actions.home() }}>
              <Icon name='md-arrow-back' />
            </Button>
          </Left> */}
              <Item style={{  }}>
                <Icon name="ios-search" />
                <Input onChangeText={this.searchCheck.bind(this)} placeholder="Search" />
                <Button onPress={() => { this.setState({ flag: true , patient: this.props.patient}) }} transparent>
                  <Icon name='md-close' />
                </Button>
              </Item>
              {/* <Right>
          <Button onPress={() => { this.setState({flag:true})}} transparent>
              <Icon name='md-close' />
            </Button>
          </Right> */}
            </Header>
          }

          <Content>
          {this.state.flag ? null :
          <DatePicker
          style={{ width: '80%', marginLeft: 20, marginTop: 5 }}
          date={this.state.date}
          mode="date"
          placeholder="Search By Date"
          format="YYYY-MM-DD"
          // minDate="2016-05-01"
          // maxDate="2016-06-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 5,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={this.dateSearch.bind(this)}
        />
          }
            
            {this.state.patient ? this.state.patient.map((val, ind) => {
              return (
                <Card key={ind} style={{ flex: 1 }}>
                  <CardItem>
                    <Body style={{ flexDirection: "row" }}>
                      <Text style={{ flex: 1, fontSize: 20 }}>
                        Name : {val.PatientName} {'\n'}
                        Diease : {val.Diease}
                      </Text>
                      <Button style={{ backgroundColor: '#FF4C4C' }} onPress={() => {
                        Actions.details({
                          PatientName: val.PatientName,
                          Diease: val.Diease,
                          Gender: val.Gender,
                          Contact: val.Contact,
                          DoctorName: this.state.DoctorName,
                          Date : val.Date,
                          Search: 'search',
                        })
                      }} info><Text> Details </Text></Button>
                    </Body>
                  </CardItem>
                </Card>
              )
            }) : <Card>
                <CardItem>
                  <Body>
                    <Text style={{ fontSize: 20 }}>
                      No Patient Entry
              </Text>
                    <Button style={{backgroundColor:"#FF4C4C"}} onPress={() => { this.setState({ patient: this.props.patient, date: '' }) }} block warning>
                      <Text>Show All</Text>
                    </Button>
                  </Body>
                </CardItem>
              </Card>
            }
          </Content>
          <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#FF4C4C'}}
          position="bottomRight"
          onPress={() => { Actions.addPatient() }}
        >
          <Icon name="md-person-add" />
        </Fab>
        </Container>
      </Drawer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);