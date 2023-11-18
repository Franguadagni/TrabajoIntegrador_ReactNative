import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList,Image, ScrollView } from 'react-native';
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
            <ScrollView style={styles.container}>
                <View style={styles.profileInfo}>
                <Text style={styles.username}>{this.state.suInfo.userName}</Text>
                <Text style={styles.bio}> Biografía:{this.state.suInfo.bio}</Text>
                <Text style={styles.posts} >Cantidad de posts: {this.state.susPosts.length}</Text>
                <Image style={styles.profileImage} source={{ uri: this.state.suInfo.profileImage }}/>
                </View> 

                <Text style={styles.sectionTitle}>Posteos:</Text>
                <FlatList
                    data={this.state.susPosts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Post dataPost={item} navigation={this.props.navigation} />}
                />
                <Text onPress={() => this.props.navigation.navigate("TabNavigation")}>
                Volver a home
                </Text>
            
            </ScrollView>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
    },
},
    profileInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bio: {
        fontSize: 16,
        marginBottom: 5,
    },
    posts: {
        fontSize: 16,
        marginBottom: 15,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
export default SuPerfil;

