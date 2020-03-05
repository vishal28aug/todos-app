import React, { Component } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class Calendar extends Component {

  // Used "@react-native-community/datetimepicker" for calendar
  
  constructor(props) {
    super(props)
    this.state = {
      mode: 'date',
      show: this.props.state.showCalendar
    }
  }

  render() {
    return (
      <View>
        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={this.state.selectedDate}
            mode={this.state.mode}
            is24Hour={true}
            display="default"
            onChange={this.props.getTaskDate}
          />
        )}
      </View>
    );
  }
}
