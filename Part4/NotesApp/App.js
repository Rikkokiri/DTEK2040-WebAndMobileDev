import React from 'react';
import { Alert, Text, View, Button, Styles, StyleSheet, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class NewNoteScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: [
        {
          id: 1,
          content: "Note 1"
        },
        {
          id: 2,
          content: "Note 2"
        },
      ],
      newNote: ''
    }
  }

  static navigationOptions = {
    title: 'Create New Note'
  }

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  addNote = () => {
    console.log(this.state.newNote)

    // TODO: Check for an empty submission
    if (this.state.newNote === '') {
      this.showAlert('Empty Note', "An empty note cannot be added.");
    }
    // Check for duplicates
    else if (this.state.notes.map(note => note.content).indexOf(this.state.newNote) !== -1) {

      // Show an alert
      console.log("This note already exists");

      this.showAlert('Duplicate Note', "Identical note already exists and cannot be added");

      this.setState({
        newNote: ''
      })
    }
    else {

      const noteObject = {
        id: this.state.notes.length + 1,
        content: this.state.newNote
      }

      const notes = this.state.notes.concat(noteObject)

      this.setState({
        notes: notes,
        newNote: ''
      })
    }
  }

  render() {
    return (
      <View>
        <TextInput
          onChangeText={(newNote) => this.setState({ newNote })}
          multiline={true}
          value={this.state.newNote}
          placeholder="Write the note here"
        />
        <Button onPress={this.addNote} title="ADD NOTE" />
      </View>
    )
  }

}

class NotesList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: [
        {
          id: 1,
          content: "Note 1"
        },
        {
          id: 2,
          content: "Note 2"
        },
      ],
      newNote: ''
    };
  }

  static navigationOptions = {
    title: 'Notes'
  }

  listnotes = ({ id, content }) => {
    return (
      <Text key={id}>{content}</Text>
    )
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <View>
          <Button title="Create New Note"
            onPress={() => navigate('NewNote', { name: 'NewNote' })} />
        </View>
        <View style={styles.notesContainer}>
          {this.state.notes.map(this.listnotes)}
        </View>
      </ScrollView>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Notes: NotesList,
    NewNote: NewNoteScreen
  },
  {
    initialRouteName: "Notes"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  notesContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20
    //alignItems: 'center'
    //justifyContent: 'center',
  },
  notesTitle: {
    color: 'blue'
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
