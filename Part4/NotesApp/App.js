import React from 'react';
import { Alert, Text, View, Button, Styles, StyleSheet, ActivityIndicator, ScrollView, TextInput, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const NOTES_STORAGE_KEY = 'ASYNC_STORAGE_NOTES'

class NotesList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      error: false,
      notes: [
      ],
      newNote: ''
    };
  }

  static navigationOptions = {
    title: 'Notes'
  }

  componentDidMount() {
    this.props.navigation.addListener("didFocus", () => {
      this.loadNotes();
    })

    this.props.navigation.addListener("didBlur", () => {
      this.setState({ loading: true })
    })
  }

  loadNotes = async () => {
    try {
      const notes = await AsyncStorage.getItem(NOTES_STORAGE_KEY)
      this.setState({ loading: false })

      if (notes !== null) {
        console.log("Wow, we have data!")
        this.setState({ notes: JSON.parse(notes) })
      }

    } catch (error) {
      console.error('Noteslist: Failed to load notes.')
      this.setState({ loading: false, error: true })
    }
  }

  listnotes = ({ id, content }) => {
    return (
      <Text key={id}>{content}</Text>
    )
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (this.state.error) {
      return (
        <View>
          <Text>
            Failed to load notes!
          </Text>
        </View>
      )
    }

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

class NewNoteScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: [],
      newNote: ''
    }
  }

  static navigationOptions = {
    title: 'Create New Note'
  }

  componentWillMount() {
    this.loadNotes()
  }

  loadNotes = async () => {
    try {
      const notes = await AsyncStorage.getItem(NOTES_STORAGE_KEY)
      console.log("Loaded data", JSON.parse(notes))

      if (notes !== null) {
        this.setState({ notes: JSON.parse(notes) })
      }
    } catch (error) {
      alert(error)
      console.error('Noteslist: Failed to load notes.')
    }
  }

  saveNotes = async () => {
    try {
      await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(this.state.notes))

    } catch (e) {
      alert(error)
      console.error('Newnote: Failed to save a note');
    }
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

  addNote = async () => {
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

      try {
        await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes))
        this.setState({
          notes: notes,
          newNote: ''
        })

      } catch (error) {
        alert(error)
        console.error('Newnote: Failed to save a note');
      }
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
