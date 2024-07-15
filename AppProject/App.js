import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home'
import Create from './components/Create'
import Contants from 'expo-constants'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
//Inside of AppProject
//npm install @react-navigation/native
//npx expo install react-native-screens react-native-safe-area-context
//npm install @react-navigation/stack

const Stack = createStackNavigator()

function App() {
  
  const name = "Nick Fortis"
  
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component = {Home}/>
        <Stack.Screen name = "Create" component = {Create}/>
      
      </Stack.Navigator>
      
      <StatusBar style="auto" />
    </View>
  );
}

export default() => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eddfdf',
    marginTop: Contants.statusBarHeight
  },
});
