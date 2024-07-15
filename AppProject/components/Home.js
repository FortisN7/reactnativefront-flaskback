import React, {useState} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'

function Home(props) {
    const [name, setName] = useState('Nick Fortis')
    return (
    <View>
        <Text style = {styles.textStyle}>Welcome to {name}'s app!</Text>
        <Button title = "Click" onPress = {() => setName("This is changed")}/>
    </View>
  )
}

const styles = StyleSheet.create({
    textStyle: {
        color:'red',
        backgroundColor:'yellow'
    }
})

export default Home
