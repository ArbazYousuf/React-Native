import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
// import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem,Spinner , Body,Form,Picker,Item, Text,Button,Left, Right,Input, Icon,Title,Drawer  } from 'native-base';
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
export default class Patientpage extends Component{
    constructor(){
        super()
        this.state={
            data:[],
            val:"",
            arr:[],
            search:true

        }
    }
  

    closeDrawer = () => {
        this.drawer._root.close()
      };
      openDrawer = () => {
        this.drawer._root.open()
      };
      search(){
        this.setState({search:false})
        firebase.database().ref('patients/').on('value',(snapshot)=>{
          var arr = []
          let data = snapshot.val()
          for(let i in data){
            for(let key in data[i]){
              if(data[i][key].id == this.state.val){
               arr.push(data[i][key] ) 
              
              }
           }
          
          }
          this.setState({data:arr,search:true})
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
          
           </Right>
          
            </Header>
            <Header searchBar rounded style = {styles.appbar} >
            
              <Item>
            
                <Icon name="ios-search" />
                <Input placeholder="Search By Your Patient ID " onChangeText={(val)=>{this.setState({val:val})} }/>
              <Button style = {styles.appbar} onPress = {this.search.bind(this)}  >
                <Text>Search </Text>
              </Button> 
                
              </Item>
             
            </Header>
            <Content>
        
            <Form>
             
                </Form>
              {
                this.state.search?
                this.state.data.map((val,index)=>{
                  console.log("hellllllllll")
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
              uid:val.uid
    
              
              })}} style = {styles.appbar} >
            <Text>  View Details</Text>
              </Button>
                </CardItem>
              </Card>
                )
    
              }) : <Spinner color='rgb(15, 146, 138)' /> }
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
    
