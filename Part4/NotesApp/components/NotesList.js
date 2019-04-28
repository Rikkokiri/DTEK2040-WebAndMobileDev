import React from 'react';
import { Alert, Text, View, Button, Styles, StyleSheet, ActivityIndicator, ScrollView, TextInput, AsyncStorage } from 'react-native';

const NOTES_STORAGE_KEY = 'ASYNC_STORAGE_NOTES'

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

export default NotesList;