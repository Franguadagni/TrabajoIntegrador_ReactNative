import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList,Image } from 'react-native';
import Post from '../../components/Post/Post';

class SuPerfil extends Component{
    constructor(props){
        super(props)
        this.state={
            susPosts: [],
            suInfo: {},
            mailUser: this.props.route.params.mailUser
        }

    }

    componentDidMount(){
        console.log(this.props.route.params)
        let perfil = this.state.mailUser
        db.collection('posts')
        .where ('owner', '==', perfil)
        .onSnapshot(docs => {
            let posts = []
            docs.forEach(doc => posts.push({
                id: doc.id,
                datos: doc.data()
            }))
            this.setState({
                susPosts: posts
            })
        })
        db.collection('users')
            .where ('owner', '==', this.state.mailUser)
            .onSnapshot (doc => {
                doc.forEach(doc =>
                    this.setState ({
                        id: doc.id,
                        suInfo: doc.data()
                }))
            })

    }

    render(){
        console.log(this.state.suInfo)
        console.log(this.state.susPosts)

        return(
            <View> 
                <Text>{this.state.suInfo.userName}</Text>
                <Text>{this.state.suInfo.bio}</Text>
                <Text>cantidad de posts: {this.state.susPosts.length}</Text>
                <Image source={{ uri: this.state.suInfo.profileImage }}/>

                <FlatList
                    data={this.state.susPosts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Post dataPost={item} navigation={this.props.navigation} />}
                />
                <Text onPress={() => this.props.navigation.navigate("TabNavigation")}>
                Volver a home
                </Text>
            </View> 

        )
    }
}
export default SuPerfil;

