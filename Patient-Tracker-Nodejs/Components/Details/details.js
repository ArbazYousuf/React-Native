import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import { Container, Header, Title,List,ListItem, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
export default class Details extends Component {
     constructor(){
         super();
         this.state={
             search : null
         }
     }
   componentDidMount(){
       console.log(this.props)
       if(this.props.Search){
        this.setState({search: 'search()'})
       } 
   }

    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#FF4C4C" style={{backgroundColor: '#FF4C4C'}}>
                    <Left>
                        <Button transparent onPress={() => {this.state.search?Actions.search():Actions.home() }}>
                            <Icon name='md-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Details</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List>
                        <ListItem itemDivider>
                            <Text style={{fontSize:20,fontWeight:'bold'}}>Patient Name</Text>
                        </ListItem>
                        <ListItem >
                            <Text style={{paddingLeft:20}}>{this.props.PatientName}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text style={{fontSize:20,fontWeight:'bold'}}>Gender</Text>
                        </ListItem>
                        <ListItem >
                            <Text  style={{paddingLeft:20}}>{this.props.Gender}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text style={{fontSize:20,fontWeight:'bold'}}>Diease</Text>
                        </ListItem>
                        <ListItem >
                            <Text  style={{paddingLeft:20}}>{this.props.Diease}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text style={{fontSize:20,fontWeight:'bold'}}>Date</Text>
                        </ListItem>
                        <ListItem >
                            <Text style={{paddingLeft:20}}>{this.props.Date}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text style={{fontSize:20,fontWeight:'bold'}}>Contact Number</Text>
                        </ListItem>
                        <ListItem >
                            <Text  style={{paddingLeft:20}}>{this.props.Contact}</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text style={{fontSize:20,fontWeight:'bold'}}>Appointed by</Text>
                        </ListItem>
                        <ListItem >
                            <Text style={{paddingLeft:20}}>Dr. {this.props.DoctorName}</Text>
                        </ListItem>
                        
                    </List>
                </Content>
            </Container>
        );
    }
}