import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import firebase from "firebase"
import { FontAwesome } from '@expo/vector-icons'

class Post extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length,
            cantidadComentarios: this.props.dataPost.datos.comentarios.length,
            mostrarMensaje: false
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

    deletePost = () => {
        const postOwner = this.props.dataPost.datos.owner;
        const currentUserEmail = auth.currentUser.email;
        if (postOwner === currentUserEmail) {
            db.collection('posts')
                .doc(this.props.dataPost.id)
                .delete()
                .then(() => {
                    console.log('Post eliminado correctamente');
                })
                .catch(error => {
                    console.error('Error al eliminar el post:', error);
                });
            } else {
                this.setState({mostrarMensaje: true})
                // Puedes mostrar un mensaje o tomar otra acción para informar al usuario
            }
        };

    render() {
        console.log(this.props)


        return (
            <View style={styles.postContainer}>
                <View style={styles.userInfo}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(
                        'SuPerfil', this.props.dataPost.datos.owner )}>
                        <Text style={styles.username}>Posteo de: {this.props.dataPost.datos.owner}</Text>
                    </TouchableOpacity>
                    <Image style={styles.camera} source={{uri:this.props.dataPost.datos.foto}}/>
                </View>
                <Text style={styles.postText}>{this.props.dataPost.datos.textoPost}</Text>
                <View style={styles.iconBar}>
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
                    <Text style = {styles.commentCount} >{this.state.cantidadComentarios} Comentarios</Text>
                    <TouchableOpacity style={styles.commentButton} onPress={() => this.props.navigation.navigate(
                        'Comment', { id: this.props.dataPost.id })}>
                        <FontAwesome  name='comment' color='#3498db' size={20} />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style = {styles.trashCount} onPress={this.deletePost}>
                        <FontAwesome name="trash" size={20} color="red" />
                    </TouchableOpacity>
                    {this.state.mostrarMensaje?
                    (<Text> No tienes permiso para eliminar este post. </Text> ):
                    null}
                    
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
    commentButton: {
        marginLeft: 8,
    },
    camera: {
        width: '100%',
        aspectRatio: 1,  // Mantener una relación de aspecto cuadrada
        resizeMode: 'cover',  
        marginBottom: 10,
        marginTop: 5
    },
    iconBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    commentCount: {
        fontSize: 14,
        color: '#555',
        marginLeft: 10
    },
    trashCount: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
});

export default Post;