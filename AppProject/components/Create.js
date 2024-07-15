import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {TextInput, Button} from 'react-native-paper'
function Create(props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const insertData = () => {
    fetch('http://192.168.56.1:3000/add', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({username:username, password:password})
    })
    .then(resp => resp.json())
    .then(data => {
        props.navigation.navigate('Home')
    })
    .catch(error => console.log(error))
  }

  return (
    <View>
        <TextInput style = {styles.inputStyle}
        label = "Username"
        value = {username}
        mode="outlined"
        onChangeText = {text => setUsername(text)}

        />

        <TextInput style = {styles.inputStyle}
        label = "Password"
        value = {password}
        mode="outlined"
        onChangeText = {text => setPassword(text)}
        
        />

        <Button
        style = {{margin:10}}
        icon = "pencil"
        mode="contained"
        onPress = {() => insertData()}
        >Create User</Button>
    </View>
  )
}

const styles = StyleSheet.create({
    inputStyle: {
        padding:10,
        marginTop:30
    }
})

export default Create