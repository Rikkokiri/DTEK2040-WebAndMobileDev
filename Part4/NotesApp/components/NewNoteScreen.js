import React from 'react';
import { Alert, Text, View, Button, Styles, StyleSheet, ActivityIndicator, ScrollView, TextInput, AsyncStorage } from 'react-native';

const NOTES_STORAGE_KEY = 'ASYNC_STORAGE_NOTES'

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

export default NewNoteScreen;