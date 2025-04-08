import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import Home from './screen/home';
import AppNavigation from './navigation/router';

export default function App() {
  return (
      <>

        <StatusBar style="auto" />
        <AppNavigation />
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
