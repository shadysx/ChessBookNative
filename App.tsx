import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Board, { Background } from './components/Board';
import Row from './components/Row';
import ChessboardView from './components/views/ChessboardView';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ChessboardView/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
