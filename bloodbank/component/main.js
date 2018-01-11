
import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
// import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body,Form,Picker,Item, Text,Button,Left, Right, Icon,Title,Drawer  } from 'native-base';
import {
    Platform,
    StyleSheet,
    View
  } from 'react-native';
import {Actions}  from 'react-native-router-flux'
import * as firebase from 'firebase';
import Sidebar from './sidebar'

import '../config/fbconfig';

export default class Main extends Component {
  constructor(){
    super()
    this.state={
      data:[],
      selected1: "all"
    }
  }
  onValueChange(value) {
    firebase.database().ref("donors").on("value",(snapshot)=>{
      let newarr = []
      let data = snapshot.val()
      for(let i in data){
        if(value === "A+"){
          if(data[i].bloodgroup === "A+" || data[i].bloodgroup === "AB+"  ){
            newarr.push(data[i])
            this.setState({data:newarr})
          }
        }
        else if(value === "B+"){
          if(data[i].bloodgroup === "B+" || data[i].bloodgroup === "AB+"){
            newarr.push(data[i])
            this.setState({data:newarr})
          }
        }
        else if (value === "AB+"){
          if(data[i].bloodgroup === "AB+"){
            newarr.push(data[i])
            this.setState({data:newarr})
            
            
          }
        }
        else if(value === "O+"){
          if(data[i].bloodgroup === "A+" || data[i].bloodgroup === "AB+" || data[i].bloodgroup === "B+" || data[i].bloodgroup === "O+" ){
            newarr.push(data[i])
            this.setState({data:newarr})
          } 

        }
        else if(value === "A-"){
          if(data[i].bloodgroup === "AB+" || data[i].bloodgroup === "AB-"||data[i].bloodgroup === "A+"||data[i].bloodgroup === "A-"){
            newarr.push(data[i])
            this.setState({data:newarr})
            
          }
        }
        else if(value === "B-"){
          if(data[i].bloodgroup === "AB+" || data[i].bloodgroup === "AB-"||data[i].bloodgroup === "B+"||data[i].bloodgroup === "B-"){
            newarr.push(data[i])
            this.setState({data:newarr})
            
          }
        }
        else if(value === "AB-"){
          if(data[i].bloodgroup=== "AB-" || data[i].bloodgroup === "AB+"){
            newarr.push(data[i])
            this.setState({data:newarr})
            
          }
        }
      
        else if (value === "O-" || value === "all"){
          this.setState({data:Object.values(data)})
        }
      }
    })
    this.setState({
      selected1: value
    });
  
  }
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
 componentDidMount(){
   firebase.database().ref('donors/').on('value',(snapshot)=>{
     let data = snapshot.val()
     var arr= []
     for(let i in data){
      arr.push(data[i])
     }
     this.setState({
       data:arr
     })

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
         <Title>Blood Bank</Title>
       </Body>
       <Right>
   
       </Right>
      
        </Header>
        <Content>
        <Form>
            <Picker
              iosHeader="Select one"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >
            <Item label="All" value="all" />
            
              <Item label="A+" value="A+" />
              <Item label="AB+" value="AB+" />
              <Item label="B+" value="B+" />
              <Item label="O+" value="O+" />
              <Item label="A-" value="A-" />
              <Item label="AB-" value="AB-" />
              <Item label="B-" value="B-" />
              <Item label="O-" value="O-" />
              
            </Picker>
            </Form>
          {this.state.data.map((val,index)=>{
            return(
            <Card key = {index} >
            <CardItem>
              <Body>
                <Text>
                  {val.bloodgroup} 
                </Text>
               
              </Body>
        <Button onPress = {()=>{Actions.user({
          name:val.name,
          no:val.no,
          bg:val.bloodgroup,
          addr:val.address,
          city:val.city,
          ind:index,
          donated:val.donated,
          uid:val.uid

          
          })}} >
        <Text>  View Details</Text>
          </Button>
            </CardItem>
          </Card>
            )

          })}
        </Content>
          </Drawer>
      </Container>
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
  appbar:{
    backgroundColor:"red"
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
});


module.exports = Main;