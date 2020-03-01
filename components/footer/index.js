import React, { Component } from 'react';
import { Footer, FooterTab, Icon, Button, Text, Right, Left, ActionSheet, Root, Container } from "native-base";
import { StyleSheet } from 'react-native';
import { cos } from 'react-native-reanimated';


export default class AppFooter extends Component {
  constructor(props) {
    super(props);
  } 

  checkSelectedAction = (selectedItem) =>{
    if(this.props.state.list.find(x => x == selectedItem)){
      this.props.changeSelectedItem(selectedItem)
    }
  }
  render() {
    let buttons = [...this.props.state.list,"+ Create new list"];
    return (
        <Footer >
          <FooterTab>
            <Left>
            <Root>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: buttons,
                      title: "Vishal Sharma"
                    },
                    buttonIndex => {
                      if (buttons[buttonIndex] === '+ Create new list')
                        this.props.navigation.navigate('AddList',{addList:this.props.addList})
                      else
                        this.checkSelectedAction(buttons[buttonIndex]);
                    }
                  )}
              >
                <Icon name='menu' />
              </Button>
              </Root>
            </Left>

            <Button onPress={() => this.props.setAddTask(!this.props.state.isShowAddTask)} style={this.styles.centerButton} >
              <Icon active name="add" style={{ color: 'darkgrey' }} />
            </Button>
            
            <Right>
              <Button >
                <Icon name='more' />
              </Button>
            </Right>
          </FooterTab>
        </Footer >
    );
  }

  styles = StyleSheet.create({
    centerButton: {
      height: 70,
      width: 70,
      bottom: 20,
      borderWidth: 1,
      borderColor: 'lightgrey',
      borderRadius: 35,
      backgroundColor: '#f5f5f5'
    },
    footer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'green',
      flexDirection: 'row',
      height: 80,
      alignItems: 'center',
    },

    Container: {
      bottom: 0
    }
  });
}