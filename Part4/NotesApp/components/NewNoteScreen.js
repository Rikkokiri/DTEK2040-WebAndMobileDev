import React from 'react';
import { Alert, Text, View, Button, ScrollView, TextInput, AsyncStorage } from 'react-native';
import LoadingView from '../components/LoadingView';
import { styles, inputs } from '../components/styles';

const NOTES_STORAGE_KEY = 'ASYNC_STORAGE_NOTES'

class NewNoteScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      error: false,
      notes: [],
      newNote: ''
    }
  }

  static navigationOptions = {
    title: 'Create New Note',
    headerStyle: {
      backgroundColor: '#52154E'
    },
    headerTintColor: '#fff'
  }

  componentWillMount() {
    this.loadNotes()
  }

  loadNotes = async () => {
    try {
      const notes = await AsyncStorage.getItem(NOTES_STORAGE_KEY)
      console.log("Loaded data", JSON.parse(notes))

      this.setState({ loading: false })
      if (notes !== null) {
        this.setState({ notes: JSON.parse(notes) })
      }
    } catch (error) {
      this.setState({ error: true })
      this.showAlert('Error', error);
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
    if (this.state.newNote === '') {
      this.showAlert('Empty Note', "An empty note cannot be added.");
    }
    // Check for duplicates
    else if (this.state.notes.map(note => note.content).indexOf(this.state.newNote) !== -1) {
      this.showAlert('Duplicate Note', "Identical note already exists and cannot be added");

      this.setState({
        newNote: ''
      })
    }
    else {

      const noteObject = {
        id: this.state.notes.length + 1, // This is a terrible way of generating id-values, but oh well
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
        this.setState({ error: true })
        this.showAlert('Error', error);
        console.error('Newnote: Failed to save a note');
      }
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.loading) {
      return (
        <LoadingView />
      )
    }

    if (this.state.error) {
      return (
        <View>
          <Text>
            We are sorry to inform you that an error has occurred.
          </Text>
        </View>
      )
    }

    return (
      <View>
        <View>
          <Button
            title="Back to note list"
            color="#111344"
            onPress={() => navigate('Notes', { name: 'Notes' })} />
        </View>
        <View style={inputs.inputsContainer}>
          <TextInput
            style={inputs.textField}
            onChangeText={(newNote) => this.setState({ newNote })}
            multiline={true}
            value={this.state.newNote}
            placeholder="Write the note here"
          />
          <Button
            title="ADD NOTE"
            color="#3423A6"
            onPress={this.addNote} />
        </View>
      </View>
    )
  }

}

export default NewNoteScreen;