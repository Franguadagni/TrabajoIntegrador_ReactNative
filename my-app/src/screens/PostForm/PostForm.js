import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class PostForm extends Component{
    constructor(){
      super()
      this.state={
            textoPost: "",
        }
    }
    crearPost(owner, textoPost, createdAt){
        //Crear la colección Users
        db.collection('posts').add({
            owner: auth.currentUser.email, //auth.currentUser.email,
            textoPost: this.state.textoPost, //this.state.textoPost,
            createdAt: Date.now(),//Date.now(), 
            likes:[],
            comentarios:[]
        })
        .then( res => console.log(res))
        .catch( e => console.log(e))
    }
    render() {
        return (
          <View style={styles.formContainer}>
            <Text style={styles.title}>New Post</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ textoPost: text })}
              placeholder='Write a caption...'
              keyboardType='default'
              value={this.state.textoPost}
            />
            <TouchableOpacity style={styles.button} onPress={() => this.crearPost(auth.currentUser.email, this.state.textoPost, Date.now())}>
              <Text style={styles.textButton}>Post</Text>
            </TouchableOpacity>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    formContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingLeft: 10,
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#3498db',
      padding: 15,
      alignItems: 'center',
      borderRadius: 8,
    },
    textButton: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default PostForm;