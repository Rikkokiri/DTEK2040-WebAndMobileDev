import React from 'react';
import { Text, View, Button, ScrollView, AsyncStorage } from 'react-native';
import LoadingView from '../components/LoadingView';
import { styles } from '../components/styles';

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
    title: 'Notes',
    headerStyle: {
      backgroundColor: '#52154E'
    },
    headerTintColor: '#fff'
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
      <Text key={id} style={styles.note}>{content}</Text>
    )
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
          <Text style={styles.error}>
            Failed to load the notes.
          </Text>
        </View>
      )
    }

    return (
      <ScrollView>
        <View>
          <Button
            title="Create New Note"
            color="#111344"
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