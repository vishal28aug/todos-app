import React, { Component } from 'react';
import { Footer, FooterTab, Icon, Button, Text, Right, Left, Thumbnail, Body, CardItem, ListItem, ActionSheet, Root, Container } from "native-base";
import { StyleSheet, View } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";



export default class AppFooter extends Component {
  constructor(props) {
    super(props);
  }

  checkSelectedAction = (selectedItem) => {
    if (this.props.state.list.find(x => x == selectedItem)) {
      this.props.changeSelectedItem(selectedItem)
      this.RBSheet.close()
    }
  }
  openAddList = () =>{
    this.RBSheet.close()
    this.props.navigation.navigate('AddList', { addList: this.props.addList })
  }
  render() {
    return (
      <View >
        <Footer>
          <FooterTab  style={{
          justifyContent: 'center',
          backgroundColor:'#007bff',      
          
        }}>
            <Left>
                <Button transparent 
                  onPress={() => this.RBSheet.open()}
                >
                  <Icon style={{ color: 'white' }} name='menu' />
                </Button>
            </Left>

            <Button 
            style={this.styles.circleCutOut}
            onPress={() => this.props.setAddTask(!this.props.state.isShowAddTask)}>
            <Icon active name="add" style={{ color: 'white', fontSize:40 }} />
            </Button>

            <Right>
              <Button transparent>
                <Icon style={{ color: 'white' }} name='more' />
              </Button>
            </Right>
          </FooterTab>
        </Footer >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Button title="OPEN BOTTOM SHEET" onPress={() => this.RBSheet.open()} />
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={320}
            duration={250}
            closeOnDragDown={true}
            animationType='fade'
            minClosingHeight={100}
            customStyles={{
              container: {
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                left:0

              }
            }}
          >
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: './../assets/img/avatar-ac.png' }} />
                <Body>
                  <Text>Vishal Sharma</Text>
                  <Text note>VishalSharma25sept@gmail.com</Text>
                </Body>
              </Left>
            </CardItem>

            {this.props.state.list.map((list, index) =>
              <ListItem 
              style={this.props.state.selectedList == list ? this.styles.selectedList:null}
              key={index}
              onPress={() => this.checkSelectedAction(list)}>
                <Text style={this.styles.list}>{list}</Text>
              </ListItem>
            )}

            <ListItem>
              <Text onPress={() => this.openAddList()}>
                + Create a new list</Text>
            </ListItem>

            <ListItem style={this.styles.actionSheetFooter}>
              <Text>Privacy . Terms of Service . License</Text>
            </ListItem>
          </RBSheet>
        </View>
      </View>
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

    selectedList:{
      backgroundColor:'#d2e2fa',
      borderBottomRightRadius:20,
      borderTopRightRadius:20,
      right:15,
      color:'green',
      
    },
    list:{
      left:30
    },
    actionSheetFooter:{
      justifyContent: "center",
      alignItems: "center"
    },
    circleCutOut:{
      backgroundColor: '#007bff',
      height: 80,
      width: 80,
      alignSelf: 'center',
      borderRadius: 40,
      borderColor: 'white',
      borderWidth: 10,
      position: 'absolute',
      top: -40,
      zIndex: 1,
      alignItems:"center",
      justifyContent:"center",
    }
  });
}