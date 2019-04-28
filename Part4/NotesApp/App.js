import React from 'react';
import { Text, View, Button, Styles, StyleSheet, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class NotesList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: [],
      newNote: ''
    };
  }

  render() {
    return (
      <View>
        <ScrollView>
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
          <Text>"Note LOL"</Text>
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
          <Text>"Note YEET"</Text>
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

          <View>
            <TextInput
              onChangeText={(newNote) => this.setState({ newNote })}
              multiline={true}
              value={this.state.newNote}
              placeholder="Write the note here"
            />
            <Button onPress={() => {
              console.log(this.state.newNote)

              const notes = this.state.notes.concat(this.state.newNote)

              this.setState({
                notes: notes,
                newNote: ''
              })
            }} title="ADD NOTE" />
          </View>
        </ScrollView>

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
