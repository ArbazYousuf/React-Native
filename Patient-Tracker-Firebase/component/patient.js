import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body,Button } from 'native-base';
import * as firebase from 'firebase';
import{Actions}from 'react-native-router-flux';

import '../config/fbconfig';
export default class Patient extends Component {
  

 
  render() {

    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>Patient Details</Text>
            </CardItem>
            <CardItem>
              <Body>

                <Text>
                Name: {this.props.navigation.state.params.name}
                </Text>
                <Text>
                Number: {this.props.navigation.state.params.no}
                
                </Text>
                <Text>
                Disease: {this.props.navigation.state.params.disease}
                  
                </Text>
                
                <Text>
                Treatment: {this.props.navigation.state.params.treatment}
                
                </Text>
                <Text>
                 Patient ID: {this.props.navigation.state.params.id}
                
                </Text>
              </Body>
            </CardItem>
         
         </Card>
        </Content>
      </Container>
    );
  }
}