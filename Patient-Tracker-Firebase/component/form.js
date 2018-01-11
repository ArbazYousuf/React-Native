import React, { Component } from 'react';
import { Container, Header, Content, Item, Input, Label,Button,Text, Toast,Picker, } from 'native-base';
import {
    Platform,
    StyleSheet,
    View
  } from 'react-native';
import{Actions}from 'react-native-router-flux';
import * as firebase from 'firebase';

import '../config/fbconfig';


export default class Form extends Component{
    constructor(){
        super()
        this.state={
            name:'',
            no:'',
            disease:'',
            treatment:'',
            selected1: "Male",
            flag:false,
            date:''
            
        }
    }
    componentWillMount(){
      var month = new Date().getMonth()+1
      var day = new Date().getDate();
      var year = new Date().getFullYear()
      firebase.database().ref('total/').on('value',(snapshot)=>{

        let data = snapshot.val()
        var total=data.total+1
        this.setState({date:year+"-"+month+"-"+day, id:total})
      })
      
    }

    submit(){
      if((this.state.name&&this.state.no&this.state.disease&&this.state.treatment)!== ''){
        firebase.database().ref(`patients/${firebase.auth().currentUser.uid}/`).push({
            name:this.state.name,
            no:this.state.no,
            disease:this.state.disease,
            treatment:this.state.treatment,
            gender:this.state.selected1,
            date:this.state.date,
            uid:firebase.auth().currentUser.uid,
          id:this.state.name+this.state.id
        }).then(()=>{
          firebase.database().ref('total/').update({
            total:this.state.id
          })
            alert("Added");
            Actions.main()
        })
      }
      else{
        alert("Fill All Fields")
      }
    }

    render(){
        return(
            <Container>
            <Content>
                <Item floatingLabel last> 
                  <Label>Name</Label>
                  <Input onChangeText = {(val)  => {this.setState({name:val})}  }  />
                </Item>
              
                <Item floatingLabel last>
                  <Label>Contact No</Label>
                  <Input onChangeText = {(val)=>{this.setState({no:val})}} keyboardType="phone-pad"  />
                </Item>
                <Item floatingLabel last>
                  <Label>Disease</Label>
                  <Input onChangeText = {(val)=>{this.setState({disease:val})}}  />
                </Item>
           
                <Item floatingLabel last>
                  <Label>Treatment</Label>
                  <Input onChangeText = {(val)=>{this.setState({treatment:val})}}  />
                </Item>
                
                
                <Picker
                
              iosHeader="Select one"
              selectedValue={this.state.selected1}
              onValueChange={(value)=>{this.setState({selected1:value})}}
            >
            <Item label="Male" value="Male" />
            
              <Item label="Female" value="Female" />
            
              
            </Picker>
            <Text></Text>
           <Button block rounded onPress = {this.submit.bind(this)} style={{backgroundColor:"rgb(15, 146, 138)"}} >
            <Text>Submit</Text>
          </Button> 
            
            </Content>
          </Container>
        )
    }
}