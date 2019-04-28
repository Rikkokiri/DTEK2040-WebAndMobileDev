import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  notesContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 10
  },
  note: {
    fontSize: 16,
    width: '100%',
    color: "#52154E",
    padding: 3,
    borderBottomColor: "#52154E",
    borderBottomWidth: 1
  },
  error: {
    color: 'red',
  }
})

const inputs = StyleSheet.create({
  inputsContainer: {
    margin: 20
  },
  textField: {
    padding: 5,
    marginTop: 10,
    marginBottom: 20,
    borderBottomColor: "#52154E",
    borderBottomWidth: 2
  }

})

export { styles, inputs }