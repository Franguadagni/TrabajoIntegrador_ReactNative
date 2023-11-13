import react, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Camara from '../../components/Camara/Camara';

class PostForm extends Component{
    constructor(){
      super()
      this.state={
            textoPost: "",
            mostrarCamara: true,
            url: ""
        }
    }

    crearPost(owner, textoPost, createdAt){
        //Crear la colección Users
        db.collection('posts').add({
            owner: auth.currentUser.email, //auth.currentUser.email,
            textoPost: this.state.textoPost, //this.state.textoPost,
            createdAt: Date.now(),//Date.now(), 
            likes:[],
            comentarios:[],
            foto: this.state.url
        })
        .then( ()=> (this.setState({
          textoPost: "",
          mostrarCamara: true,
          url: "",
        })))
        .catch( e => console.log(e))
    }
    onImageUpload(url){
      this.setState({
        mostrarCamara: false,
        url: url
      })
    }

    render() {
        return (
          <View style={styles.formContainer}>
            {
              this.state.mostrarCamara ?
              <Camara style= {styles.camaraBody} onImageUpload = {(url)=> this.onImageUpload(url)} />
              :
              <View>
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
            }
            
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
    camaraBody:{
      height: 120
    }
  });

export default PostForm;