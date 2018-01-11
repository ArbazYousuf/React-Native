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
            bg:'',
            city:'',
            addr:'',
            selected1: "Male",
            flag:false
            
        }
    }

    componentDidMount(){
        firebase.database().ref('donors/').on('value',(snapshot)=>{
            let data = snapshot.val()
            for(let i in data ){
                if(data[i].uid === firebase.auth().currentUser.uid){
                    this.setState({
                        flag:true
                    })
                 
                }
            }
        })
    }
    submit(){
        firebase.database().ref("donors/").push({
            name:this.state.name,
            no:this.state.no,
            bloodgroup:this.state.bg.toUpperCase(),
            city:this.state.city,
            address:this.state.addr,
            gender:this.state.selected1,
            uid:firebase.auth().currentUser.uid,
            donated :false

        }).then(()=>{
            alert("Thank You For The Donation");
            Actions.main()
        })
    
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
                  <Label>Blood Group</Label>
                  <Input onChangeText = {(val)=>{this.setState({bg:val})}}  />
                </Item>
                <Picker
                
              iosHeader="Select one"
              selectedValue={this.state.selected1}
              onValueChange={(value)=>{this.setState({selected1:value})}}
            >
            <Item label="Male" value="Male" />
            
              <Item label="Female" value="Female" />
            
              
            </Picker>
                <Item floatingLabel last>
                  <Label>City</Label>
                  <Input onChangeText = {(val)=>{this.setState({city:val})}}  />
                </Item>
                <Item floatingLabel last>
                  <Label>Address</Label>
                  <Input onChangeText = {(val)=>{this.setState({addr:val})}}  />
                </Item>
            <Text></Text>
               {this.state.flag ?     <Button block danger rounded onPress = {()=>{alert("you Cant Donate Blood Before 3 Months"),Actions.pop()}} >
            <Text>Submit</Text>
          </Button> :     <Button block danger rounded onPress = {this.submit.bind(this)} >
            <Text>Submit</Text>
          </Button> }
            
            </Content>
          </Container>
        )
    }
}