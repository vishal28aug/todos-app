import React, { Component } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Card, CardItem, Text, Body, Item, Input, DatePicker } from 'native-base';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import Calendar from './../calendar'

export default class AddTask extends Component {

  constructor(props) {
    super(props)
    this.state = {
      taskName: '',
      showAddDesc: false,
      taskDesc: '',
      taskDate: null,
      showCalendar: false
    }
  }

  handleOnPressSaveTask = () => {
    this.props.addTask(this.state);
    this.props.setAddTask(false);
    this.setState({ taskName: '', taskDesc: '' });
  }

  getTaskDate = (date) => {
    console.log(new Date(date.nativeEvent.timestamp))
    //date= date.toString().split(' ').slice(0, 4).join(' ');
    this.setState({ taskDate: new Date(date.nativeEvent.timestamp), showCalendar: false });

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

              {
                this.state.showAddDesc &&
                <Item>
                  <Input value={this.state.taskDesc}
                    onChangeText={(value) => this.setState({ taskDesc: value })}
                    placeholder="Add details"
                  />
                </Item>
              }

              {
                this.state.taskDate && <Item>
                  <Card style={this.styles.date}>
                    <CardItem style={{ flexDirection: 'row', flex: 1, alignContent: 'center', alignItems: 'center' }}>
                      <FontAwesome style={[this.styles.icons, { left: -25 }]} name='calendar-check-o' />
                      <Text style={{ left: -15 }}>{this.state.taskDate.toString().split(' ').slice(0, 4).join(' ')}</Text>
                      <FontAwesome style={{ fontSize: 20, fontWeight: 100 }} onPress={() => this.setState({ taskDate: null })} name='close' />
                    </CardItem>
                  </Card>
                </Item>
              }

            </Body>
          </CardItem>

          <CardItem footer>
            <FontAwesome
              style={this.state.showAddDesc ? this.styles.descriptionIcon : this.styles.icons}
              name='align-left'
              onPress={() => this.setState({ showAddDesc: true })} />

            <FontAwesome
              style={this.styles.icons}
              name='calendar-check-o'
              onPress={() => this.setState({ showCalendar: true })} />

            <Text
              style={this.styles.saveButton}
              onPress={() => this.handleOnPressSaveTask()}>Save</Text>
          </CardItem>

        </Card>
        {
          this.state.showCalendar ? <Calendar state={this.state} getTaskDate={this.getTaskDate} /> : null
        }
      </View>
    )
  }

  styles = StyleSheet.create({
    saveButton: {
      color: '#007bff',
      position: 'absolute',
      right: 20,
      fontSize: 20,
      textAlign: 'left',
      fontWeight: 'bold'
    },
    icons: {
      fontSize: 20,
      marginLeft: 20,
      color: '#007bff'
    },
    descriptionIcon: {
      color: 'grey',
      fontSize: 20,
      marginLeft: 20
    },
    date: {
      height: 40,
      width: 210
    }

  });
}
