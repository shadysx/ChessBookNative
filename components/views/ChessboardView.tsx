import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import Board from '../Board'

const ChessboardView = () => {
  return (
    <View style={styles.container}>
      <Text>ChessboardView</Text>
      <Board/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default ChessboardView