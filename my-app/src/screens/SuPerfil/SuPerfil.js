import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from 'react-native';
import Post from '../../components/Post/Post';

class SuPerfil extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state={
            suMail: this.props.route.params,
            susPosts: [],
            suInfo: {}
        }

    }

    componentDidMount(){
        db.collection('posts')
        .where ('owner', '==', this.state.suMail)
        .onSnapshot(docs => {
            let posts = []
            docs.forEach(doc => posts.push({
                id: doc.id,
                datos: doc.data()
            }))
            this.setState({
                susPosts: posts
            }, 
            () => console.log(this.state.susPosts))
        })
        db.collection('users')
            .where ('owner', '==', this.state.suMail)
            .onSnapshot (doc => {
                doc.forEach(doc =>
                    this.setState ({
                        id: doc.id,
                        suInfo: doc.data()
                }))
            })

    }

    render(){
        return(
            <View> 
                <Text>{this.state.suInfo.userName}</Text>
                <Text>{this.props.route.params}</Text>
                <Text>{this.state.suInfo.bio}</Text>
                <Text>{this.state.susPosts.length}</Text>
                {/* <Image
                source = {{uri: this.state.suInfo.profileImage}} /> 
                 */}
                <FlatList
                data= {this.state.susPosts}
                keyExtractor={item => item.id} 
                renderItem = {({item}) => <Post dataPost={item.datos} navigation={this.props.navigation} />}
                />

            </View> 

        )
    }
}
export default SuPerfil;

