import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';
import Post from '../Post/Post';

class Home extends Component{
    constructor(){
        super()
        this.state={
            post:[]
        }
    }
    componentDidMount(){
        //Traer los datos de Firebase y cargarlos en el estado.
        db.collection('posts')
        .orderBy('createdAt', 'desc')
        .limit(12)
        .onSnapshot(
            listaPosts => {
                let postsAMostrar = [];

                listaPosts.forEach(unPost => {
                    postsAMostrar.push({
                        id:unPost.id,
                        datos: unPost.data()            
                    })
                })

                this.setState({
                    posts:postsAMostrar
                })
            }
        )

    }
    logut(){
        auth.signOut();
    }
    render(){
        console.log(this.state);
        return(
            <View>
                <Text>Home</Text>
                <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
               
               

                <Text>Lista de posteos creados</Text>
                
                <FlatList
                    data={this.state.posts}
                    keyExtractor={ unPost => unPost.id }
                    renderItem={ ({item}) => <Post dataPost = {item} />  }
                />

            </View>
        )
    }
}
export default Home;