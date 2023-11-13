import { Text, View, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import { TouchableOpacity } from 'react-native-web'
import {storage} from '../../firebase/config'
import {FontAwesome} from '@expo/vector-icons'

class Camara extends Component{
    constructor(){
        super()
        this.state={
            permisosHardware: false,
            urlInterna:"",
            mostrarCamara: true
        }
        this.metodosDeCamara = ""

    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then( ()=>{
                this.setState({
                    permisosDeHardware: true,
                })
            })
            .catch( e => console.log(e))
    }
    sacarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(foto => this.setState({
            urlInterna: foto.uri,
            mostrarCamara:false
        }))
        .catch(err => console.log(err))
    }
    guardarFoto(){
        fetch(this.state.urlInterna)
        .then(res => res.blob())
        .then(image =>{
          const ref=storage.ref(`photos/${Date.now()}.jpg`)
          ref.put(image)
               .then(()=>{
                  ref.getDownloadURL()
                       .then(url => {
                           this.props.onImageUpload(url);
                        })
                })
        })
        .catch(e=>console.log(e))
      }
    rechazarImagen(){
        this.setState({
            mostrarCamara: true,
            urlInterna:"",
        })
    }
    render(){
        return(
            <View>
                {
                    this.state.mostrarCamara ?
                    <>
                        <Camera
                        type={Camera.Constants.Type.back}
                        style={StyleSheet.camarabody}
                        ref={metodosCamara => this.metodosDeCamara = metodosCamara}
                        />
                        <TouchableOpacity onPress = {()=> this.sacarFoto()}>
                        <FontAwesome name="camera" color="black" size={14} />                    
                        </TouchableOpacity>
                    </>
                    : this.state.mostrarCamara === false && this.state.urlInterna != "" ?
                    <View>
                        <Image
                        source={{uri: this.state.urlInterna}}
                        />
                        <TouchableOpacity onPress={()=> this.guardarFoto()}>
                            <Text> Aceptar foto </Text>
                        </TouchableOpacity >
                        <TouchableOpacity onPress={()=> this.rechazarImagen()}>
                            <Text> Rechazar foto </Text>

                        </TouchableOpacity>
                    </View>
                    :<Text> Falta dar permisos para mostrar la foto </Text>
                }                
            </View>
        )
    }
}
export default Camara;