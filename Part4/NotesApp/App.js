import React from 'react';
import { Text, View, Button, Styles, StyleSheet, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class NotesList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View>
        <View>
          <Text>"Note 1"</Text>
          <Text>"Note 2"</Text>
          <Text>"Note 3"</Text>
          <Text>"Note 4"</Text>
          <Text>"Note 5"</Text>
          <Text>"Note 6"</Text>
          <Text>"Note 7"</Text>
          <Text>"Note 8"</Text>
          <Text>"Note 9"</Text>
          <Text>"Note 10"</Text>
          <Text>"Note 11"</Text>
          <Text>"Note 12"</Text>
          <Text>"Note 13"</Text>
          <Text>"Note 14"</Text>
          <Text>"Note 15"</Text>
          <Text>"Note 16"</Text>
          <Text>"Note 17"</Text>
          <Text>"Note 18"</Text>
          <Text>"Note 19"</Text>
          <Text>"Note 20"</Text>
          <Text>"Note 21"</Text>
          <Text>"Note 22"</Text>
          <Text>"Note 23"</Text>
          <Text>"Note 24"</Text>
          <Text>"Note 25"</Text>
          <Text>"Note 26"</Text>
        </View>
        <View>
          <TextInput placeholder="Write the note here" />
          <Button onPress={() => alert("Button pressed")} title="ADD NOTE" />
        </View>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Notes: NotesList
  },
  {
    initialRouteName: "Notes"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <NotesList />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30
    //alignItems: 'center'
    //justifyContent: 'center',
  },
  notes: {
    color: 'red'
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0

  }
});
