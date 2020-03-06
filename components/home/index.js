import React, { Component } from 'react'
import { BackHandler, Keyboard, TouchableWithoutFeedback, View, StyleSheet, YellowBox } from 'react-native'
import { Content, ListItem, Text, Radio, Card, CardItem, Accordion, CheckBox } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AppFooter from './../footer'
import AddTask from './../add-task'


YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

dataArray = [
  { title: "Completed", content: "" },
];

export default class Home extends Component {
  backHandler;
  keyboardDidHideListener;

  constructor(props) {
    super(props)
    this.state = {
      listName: this.props.route?.params.listName,
      isShowAddTask: false,
      selectedList: 'Buy',
      list: ['Buy', 'Sell'],
      tasks: [{
        taskName: 'bike',
        taskDetail: 'null',
        taskDate: null,
        taskList: 'Buy',
        status: 'pending'
      },
      {
        taskName: 'icecream',
        taskDetail: 'lovesdf sd fs dfsd fd fssd fsdg sdf sadf sd gsdf sdg sdg sdf sdg sdg sdh sfh sd sd',
        taskDate: new Date(),
        taskList: 'Buy',
        status: 'completed'
      }]
    }
  }

  changeTaskStatus = (task, status) => {
    let taskIndex = this.state.tasks.findIndex(x => x.taskName === task.taskName);
    let tasks = this.state.tasks;
    tasks[taskIndex].status = status
    this.setState({ tasks })
  }

  addTask = (task) => {
    let newTask = { taskName: task.taskName, taskDetail: task.taskDesc, taskDate: task.taskDate, taskList: this.state.selectedList, status: 'pending' };
    let tasks = this.state.tasks.concat(newTask);
    this.setState({ tasks })
  }

  setAddTask = (isShowAddTask) => {
    this.setState({ isShowAddTask })
  }

  completedTask = [];  // To store the complete list 

  //Storing completed task list
  getCompletedTask = (item) => {
    if (!this.completedTask.find(x => x.taskName === item.taskName) && item.taskList == this.state.selectedList)
      this.completedTask.push(item);
  }

  //Removing the completed task from list and moving back into pending;
  removeCompletedTask = (task, index) => {
    this.changeTaskStatus(task, 'pending');
    this.completedTask.splice(index, 1)
  }

  //Accordion task list
  renderContent = () => {
    return (this.completedTask.map((task, index) =>
      <View key={index} style={this.styles.accordion}>
        <CheckBox checked={true} onPress={() => this.removeCompletedTask(task, index)} />
        <Text style={{ left: 30, textDecorationLine: 'line-through' }}>{task.taskName}</Text>
      </View>
    ))
  }

  //Render completed accordion
  showCompletedTask = () => {
    return (this.completedTask.length > 0 ?
      <Accordion dataArray={dataArray} renderContent={this.renderContent} /> : null
    )
  }

  changeSelectedItem = (selectedList) => {
    this.completedTask = [];
    this.setState({ selectedList })
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.setAddTask(false);
      return true;
    });
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide', () => {
        //this.setAddTask(false)
      });
  }

  componentWillUnmount() {
    this.backHandler.remove();
    this.keyboardDidHideListener.remove();
  }
  openTask = () =>{
    console.log('task opened')
  }

  render() {
    if (this.props.route?.params?.listName != '') {
      let list = this.state.list.concat(this.props.route?.params?.listName);
      if (list) this.setState({ selectedList: this.props.route?.params?.listName, list });
      this.props.navigation.setParams({ listName: '' });
    }
    return (
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          backgroundColor: 'white'
        }}>
        <Text style={this.styles.selectedListName}>{this.state.selectedList}</Text>
        <Content>
          {
            this.state.tasks.filter(x => x.taskList === this.state.selectedList).map((task, index) =>
              task.status == "pending" ?
                <ListItem style={this.styles.task} key={index} onPress = {() =>this.openTask()}>
                  <Radio selected={false} onPress={() => this.changeTaskStatus(task, 'completed')} />
                  <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <View><Text style={this.styles.taskName}>{task.taskName}</Text></View>
                    <View>{task.taskDetail && <Text style={this.styles.taslDetail}>{task.taskDetail}</Text>}</View>
                    <View>
                      {
                        task.taskDate && <Card style={this.styles.date}>
                          <CardItem style={{ flexDirection: 'row', flex: 1, alignContent: 'center', alignItems: 'center' }}>
                            <FontAwesome style={{ color: '#007bff', fontSize: 17 }} name='calendar-check-o' />
                            <Text style={{ right: -5, color: '#A0A0A0' }}>{task.taskDate.toString().split(' ').slice(0, 3).join(' ')}</Text>
                          </CardItem>
                        </Card>
                      }
                    </View>
                  </View>

                </ListItem> : this.getCompletedTask(task)
            )}

          {this.showCompletedTask()}

        </Content>
        {
          this.state.isShowAddTask ?
            <TouchableWithoutFeedback onPress={() => this.setAddTask(false)}>
              <AddTask state={this.state} addTask={this.addTask} setAddTask={this.setAddTask} />
            </TouchableWithoutFeedback>
            : <AppFooter
              navigation={this.props.navigation}
              state={this.state}
              setAddTask={this.setAddTask}
              changeSelectedItem={this.changeSelectedItem} />
        }

      </View>
    )
  }

  styles = StyleSheet.create({
    selectedListName: {
      fontSize: 40,
      fontWeight: 'bold',
      paddingBottom: 20,
      marginLeft: 20,
    },
    task: {
      fontSize: 20,
      paddingBottom: 20,
    },
    taskName: {
      marginLeft: 20, flexWrap: 'wrap'

    },
    taslDetail: {
      marginLeft: 20,
      fontSize: 12, flexWrap: 'wrap'
    },
    accordion: {
      borderBottomColor: '#d6d6c2',
      borderBottomWidth: 0.18,
      flexDirection: 'row',
      padding: 10,
    },
    date: {
      height: 40,
      width: 130,
      marginLeft: 10,
    }

  })
}
