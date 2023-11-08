import { Text, View, TextInput, TouchableOpacity, StyleSheet,FlatList} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'

class Comment extends Component{
    constructor(props){
        super(props)
        this.state = {
            newComment: "",
            id: "",
            data: {},
        }
    }
    componentDidMount(){
        db.collection("posts")
        .doc(this.props.route.params.id)
        .onSnapshot(doc=>{
            this.setState({id:doc.id,data:doc.data()})
        })
    }
    addComment(id,comentario){
        db.collection("posts")
        .doc(id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner:auth.currentUser.email,
                createdAt:Date.now(),
                comentario:comentario
            })
        })

    }
    render(){
        return(
            
            <View> 
                {this.state.data.comentarios && this.state.data.comentarios.length > 0 ? (
                <View>
                    <FlatList data={this.state.data.comentarios} 
                    keyExtractor={item => item.createdAt.toString()}
                    renderItem={({item}) => <View>
                      <Text>{item.owner}:</Text>
                      <Text>{item.comment}</Text>
                    </View>}
                    />
                </View>)
                :(<Text>No hay comentarios aún.</Text>)}
                <View>
                    <TextInput onChangeText=
                        {text => this.setState({newComment: text})}
                        keyboardType='default'
                        placeholder='Agrega un comentario'
                        value={this.state.newComment} />  
                        <TouchableOpacity onPress={()=> this.addComment(this.state.id, this.state.newComment)}>
                            <Text>
                                Comentar
                            </Text>

                        </TouchableOpacity>
                </View>
                <Text onPress={ () => this.props.navigation.navigate ("TabNavigation")}>
                    Volver a home
                </Text>
            </View>
        )
    }
}
export default Comment;

