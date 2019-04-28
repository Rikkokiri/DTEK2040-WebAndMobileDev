import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const LoadingView = () => {
  return (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator
        animating={true}
        color='#52154E'
        size="large"
        style={styles.activityIndicator} />
    </View>
  )
}

export default LoadingView