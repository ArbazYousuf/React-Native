import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Container, Header,Drawer, Title, Content, Footer, Item, Card, CardItem, FooterTab, Button, Left, Right, Body, Icon, Text, Fab } from 'native-base';
import MiddleWare from '../Store/Middleware/middleware';
import SlideBar from '../SlideBar/slidebar'
function mapStateToProps(state) {
  return {
    doctorId: state.Create._id,
    doctorName : state.Create.Name,
    patient: state.Patient
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: function (id) {
      return dispatch(MiddleWare.getData(id))
    }
  }
}

class Home extends Component {
  constructor() {
    super();
    this.state = {
      active: 'true',
      patient: []

    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ patient: nextProps.patient.patient ,DoctorName: nextProps.doctorName})
    console.log(nextProps)
  
  }
  componentDidMount() {
    if (this.props.doctorId) {
      this.props.getData(this.props.doctorId)
      console.log('done')
    }
    else{
      console.log('kjjk')
      Actions.login()
    }
    // if (this.props.patient){
    //   this.setState({patient:this.state.patient})
    // }
  }
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
  render() {
  
    return (
      <Drawer
      ref={(ref) => { this.drawer = ref; }}
      panOpenMask={20}
      content={<SlideBar />}
      onClose={() => this.closeDrawer.bind(this)} >
      <Container style={{flex:1}}>
        <Header androidStatusBarColor="#FF4C4C" style={{backgroundColor: '#FF4C4C'}}>
          <Left>
            <Button onPress={this.openDrawer.bind(this)} transparent>
              <Icon name='md-menu' />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
          <Button onPress={() => { Actions.search() }} transparent>
              <Icon name='md-search' />
            </Button>
          </Right>
        </Header>
        <Content>
          {this.props.patient !== {} ? this.state.patient.map((val,ind)=>{
          return(
            <Card key={ind} style={{flex:1}}>
            <CardItem>
              <Body style = {{flexDirection:"row"}}>
                <Text style = {{flex:1,fontSize:20}}>
                   Name : {val.PatientName} {'\n'}
                   Diease : {val.Diease}
                </Text>
                <Button style={{backgroundColor: '#FF4C4C'}} onPress={()=>{Actions.details({
                  PatientName : val.PatientName,
                  Diease : val.Diease,
                  Gender : val.Gender,
                  Contact : val.Contact,
                  Date : val.Date,
                  DoctorName : this.state.DoctorName,
                  Search : null
                })}} info><Text> Details </Text></Button>
              </Body>
            </CardItem>
          </Card>
          )
        }):null}
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
        {/* <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#FF4C4C'}}
          position="bottomLeft"
          onPress={() => { Actions.search() }}
        >
          <Icon name="md-search" />
        </Fab> */}
      </Container>
      </Drawer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);