import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
// import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body,Form,Picker,Item, Text,Button,Left, Right,Input, Icon,Title,Drawer  } from 'native-base';
import {
    Platform,
    StyleSheet,
    View
  } from 'react-native';
import {Actions}  from 'react-native-router-flux'
import * as firebase from 'firebase';
import DatePicker from 'react-native-datepicker'
import Sidebar from './sidebar'

import '../config/fbconfig';

export default class Main extends Component {
  constructor(){
    super()
    this.state={
      data:[],
      user:{},
      val:'',
      array:[],
      date:''
    }
  }
 
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
 componentDidMount(){
   firebase.database().ref(`patients/${firebase.auth().currentUser.uid}`).on('value',(snapshot)=>{
     let data = snapshot.val()
     var arr= []
     for(let i in data){
      arr.push(data[i])
     }
     this.setState({
       data:arr,
       array:arr
     })

   })
   
 }
 componentWillMount(){
  var month = new Date().getMonth()+1
  var day = new Date().getDate();
  var year = new Date().getFullYear()
  this.setState({date:year+"-"+month+"-"+day})
}
 searchdate(date){

   var finalarr = []
    this.state.array.map((val,index)=>{
      if(val.date === date){
        finalarr.push(val)
      }
      this.setState({data:finalarr})
    })
 }


  render() {
    return (
     
      <Container>
        
          <Drawer
       ref={(ref) => { this.drawer = ref; }}
      content={<Sidebar/>}
       onClose={() => this.closeDrawer()} >

  
                <Header style = {styles.appbar} >

         <Left>
       <Button transparent
              onPress={()=>this.openDrawer()}
       >
         <Icon name='menu' />
       </Button>
       </Left>
       <Body>
      
       </Body>
       <Right>
        <Button transparent onPress = {()=>{Actions.form()}} >
            <Text style = {{fontSize:30}} >+</Text>
            </Button>
       </Right>
      
        </Header>
        <Header searchBar rounded style = {styles.appbar} >
        
          <Item>
          <DatePicker
          style={{width: 30}}
          mode="date"
          format="YYYY-MM-DD"
          maxDate={this.state.date}
        hideText = {true}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={this.searchdate.bind(this)}
        />
            <Icon name="ios-search" />
            <Input placeholder="Search By Name" onChangeText={(val)=>{ var finalarr = this.state.array.filter((element,index)=>{
    return element.name.search(val) !== -1

   })
   this.setState({data:finalarr})} }/>
            <Button style = {styles.appbar} onPress = {()=>{this.setState({data:this.state.array})}}  >
            <Text>Show All</Text>
          </Button>
          </Item>
         
        </Header>
        <Content>
    
        <Form>
         
            </Form>
          {
            this.state.data.map((val,index)=>{
              
            return(
            <Card key = {index} >
            <CardItem>
              <Body>
                <Text>
                  {val.name} 
                </Text>
               
              </Body>
        <Button onPress = {()=>{Actions.patient({
          name:val.name,
          no:val.no,
          disease:val.disease,
          treatment:val.treatment,
          ind:index,
          date:val.date,
          uid:val.uid,
          id:val.id

          
          })}} style = {styles.appbar} >
        <Text>  View Details</Text>
          </Button>
            </CardItem>
          </Card>
            )

          }) }
        </Content>
          </Drawer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({

  appbar:{
    backgroundColor:"rgb(15, 146, 138)"
  },

});


module.exports = Main;