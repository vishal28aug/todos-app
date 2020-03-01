import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';

export default class Dates extends Component {

  constructor(props) {
    super(props)
    this.state = {
      calendar :[{date:1, day: 'Mon'},
      {date:2, day: 'Mon'},
      {date:3, day: 'Tue'},
      {date:4, day: 'Wed'},
      {date:5, day: 'Thur'},
      {date:6, day: 'Fri'},
      {date:7, day: 'Sat'},
      {date:8, day: 'Sun'},
      {date:9, day: 'Mon'},
      {date:10, day: 'Tue'},
      {date:11, day: 'Wed'},
      {date:12, day: 'Thue'},
      {date:13, day: 'Fri'},]
    }
  }

  render() {
  return (   <Container style={{flexDirection:'row', flexWrap:'wrap',flex:1,backgroundColor:'blue'}}>{
    this.state.calendar.map((date, index) =>    
      <Card key={index} style={{height:50,width:50}}>
            <Text style={{color:'red'}} >
               {date.date}{'\n'}
               {date.day}
             </Text>
        </Card>
        )
    
  }</Container>
  );
}
}
