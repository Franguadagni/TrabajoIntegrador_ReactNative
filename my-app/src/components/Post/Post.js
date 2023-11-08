import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import firebase from "firebase"
import { FontAwesome } from '@expo/vector-icons'

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.lenght
        }
    }
    componentDidMount() {
        //Chequear apenas carga si el post está o no likeado
        if (this.props.dataPost.datos.likes.includes(auth.currentUser.email)) {
            this.setState({
                like: true
            })
        }

    }
    likear() {
        //Agrega un email en la propiedad like del post.
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(res => this.setState({
                like: true,
                cantidadDeLikes: this.props.dataPost.datos.likes.length
            })

            )
            .catch(e => console.log(e))
    }
    unlike() {
        //Quita un email en la propiedad like del post.
        db.collection('posts').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(res => this.setState({
                like: false,
                cantidadDeLikes: this.props.dataPost.datos.likes.length
            })

            )
            .catch(e => console.log(e))
    }
    render() {
        console.log(this.props)

        return (
            <View style={styles.postContainer}>
                <View style={styles.userInfo}>
                    <Text style={styles.username}>Posteo de: {this.props.dataPost.datos.owner}</Text>
                </View>
                <Text style={styles.postText}>{this.props.dataPost.datos.textoPost}</Text>
                <View style={styles.interactionBar}>
                    {
                        this.state.like ?
                        <TouchableOpacity style={styles.likeButton} onPress={() => this.unlike()}>
                            <FontAwesome name='heart' color='red' size={20} />
                        </TouchableOpacity>

                        :
                        <TouchableOpacity style={styles.likeButton} onPress={() => this.likear()}>
                            <FontAwesome name='heart-o' color='black' size={20} />
                        </TouchableOpacity>

                    }

    
                    <Text style={styles.likeCount}>{this.state.cantidadDeLikes} Likes</Text>
                </View>

                <View> 
                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    'Comment', {id:this.props.dataPost.id})}>
                    <Text> Agregar comentario</Text>
                </TouchableOpacity>
                </View>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    postContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    userInfo: {
        marginBottom: 10,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    postText: {
        fontSize: 18,
        marginBottom: 10,
    },
    interactionBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeButton: {
        marginRight: 5,
    },
    likeCount: {
        fontSize: 14,
        color: '#555',
    },
});

export default Post;