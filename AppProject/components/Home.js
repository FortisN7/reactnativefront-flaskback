import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Button, FlatList} from 'react-native'
import {Card, FAB} from 'react-native-paper'
//npm install react-native-paper

function Home(props) {

    const [data, setData] = useState ([])

    useEffect(() => {
        fetch('http://192.168.56.1:3000/get', {
            method:'GET'
        })
        .then(resp => resp.json())
        .then(user => {
            setData(user)
        })
    }, []);

    const renderData = (item) => {
        return (
            <Card style = {styles.cardStyle}>
                <Text style = {styles.textStyle}>{item.username}</Text>
                <Text>{item.password}</Text>
            </Card>
        )
    }

    return (
    <View style = {{flex:1}}>
        <FlatList
        data = {data}
        renderItem = {({item}) => {
            return renderData(item)
        }}
        keyExtractor = {item => `${item.id}`}
        />

        <FAB
        style = {styles.fab}
        small={false}
        icon="plus"
        theme = {{colors:{accent:"green"}}}
        onPress = {() => props.navigation.navigate('Create')}

        />
    </View>
  )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize:20,
        color:'red',
        backgroundColor:'yellow'
    },
    cardStyle: {
        margin:10,
        padding:10
    },
    fab: {
        position:'absolute',
        margin:16,
        right:0,
        bottom:0
    }
})

export default Home
