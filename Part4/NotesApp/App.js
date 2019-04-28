import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

// Components
import NotesList from './components/NotesList';
import NewNoteScreen from './components/NewNoteScreen';

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