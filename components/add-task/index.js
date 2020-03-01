import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Card, CardItem, Text, Body, Item, Input, DatePicker } from 'native-base';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

export default class AddTask extends Component {

  constructor(props) {
    super(props)
    this.state = {
      taskName: '',
      showAddDesc: false,
      taskDesc: '',
      taskDate: new Date(),
      mode:'date'
    }
  }

  handleOnPressSaveTask = () => {
    this.props.addTask(this.state);
    this.props.setAddTask(false);
    this.setState({ taskName: '', taskDesc: '' });
  }



  render() {
    return (
      <View>
      <Card >
        <CardItem >
          <Body>
            <Item>
              <Input value={this.state.taskName}
                onChangeText={(value) => this.setState({ taskName: value })}
                placeholder="New task"
                autoFocus={true} />
            </Item>
            {this.state.showAddDesc ?
              <Item>
                <Input value={this.state.taskDesc}
                  onChangeText={(value) => this.setState({ taskDesc: value })}
                  placeholder="Add details"
                />
              </Item> : null}
              {/* <Item>
                <Text>{this.state.taskDate}</Text>
                </Item> */}
          </Body>
        </CardItem>

        <CardItem footer>

          <FontAwesome
            style={this.state.showAddDesc ? this.styles.descriptionIcon : this.styles.icons}
            name='align-left'
            onPress={() => !this.state.showAddDesc ? this.setState({ showAddDesc: true }) : null} />

          <FontAwesome 
          style={this.styles.icons} 
          name='calendar-check-o' 
          onPress={() => !this.state.showChooseDate ? this.setState({ showChooseDate: true }) : null} />

          <Text
            style={this.styles.saveButton}
            onPress={() => this.handleOnPressSaveTask()}>Save</Text>
        </CardItem>
      </Card>
      {this.state.showChooseDate ? this.openDatePicker(): null}
      </View>
    )
  }

  onChange = (event, selectedDate) =>{
    const currentDate = selectedDate || this.state.date;
    this.state.setState({taskDate:currentDate});

  }
  openDatePicker = () => {
    return (
      <DateTimePicker
      testID="dateTimePicker"
      timeZoneOffsetInMinutes={0}
      value={this.state.taskDate}

      is24Hour={true}
      display="default"
      onChange={()=>this.onChange}/>
    )
  }

 

  styles = StyleSheet.create({
    saveButton: {
      color: 'blue',
      position: 'absolute',
      right: 20,
      fontSize: 20,
      textAlign: 'left',
      fontWeight: 'bold'
    },
    icons: {
      fontSize: 20,
      marginLeft: 20,
      color: 'blue'
    },
    descriptionIcon: {
      color: 'grey',
      fontSize: 20,
      marginLeft: 20
    }

  });
}
