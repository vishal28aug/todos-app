import React, { Component } from 'react'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, Input, Item, Content } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from 'react-native'


export default class AddList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      listName: ''
    }
  }

  render() {
    return (
      <Container>
        <Header style={this.styles.header}>
          <Left>
            <Button transparent >
              <Icon style={{ color: 'black' }} name='close' onPress={() => this.props.navigation.navigate('Home')} />
            </Button>
          </Left>
          <Body style={{ left: '50%' }}>
            <Title style={{ color: 'black', fontSize: 17, fontFamily: 'Roboto-Thin' }}>Create new list</Title>
          </Body>
          <Right>
          <TouchableOpacity disabled={true}>
            <Button transparent 
            onPress={() => this.props.navigation.navigate('Home', { listName: this.state.listName })} >
              <Text style={{ color: 'black' }}>Done </Text>
            </Button>
            </TouchableOpacity>
          </Right>
        </Header>

        <Content padder>
          <Item underline>
            <Input value={this.state.listName}
              onChangeText={(value) => this.setState({ listName: value })}
              placeholder="Enter task title"
              autoFocus={true} />
          </Item>
        </Content>
      </Container>
    )
  }

  styles = StyleSheet.create({
    header: {
      backgroundColor: 'white',
    }
  })
}
