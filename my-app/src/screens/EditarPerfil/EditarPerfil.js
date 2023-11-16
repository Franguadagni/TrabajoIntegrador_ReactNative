import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { db, auth } from '../../firebase/config';

class EditarPerfil extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            userName: '',
            bio: '',
            profileImage: '',
            idUser: this.props.route.params.idUser
        }
    }
    guardarCambios() {
        console.log();
       let id = this.state.idUser
        db.collection('users')
            .doc(id)
            .update({
                userName: this.state.userName,
                bio: this.state.bio,
                profileImage: this.state.profileImage,
            })
            .then(() => {
                console.log('Perfil actualizado exitosamente');
            })
            .catch((error) => {
                console.error('Error al actualizar el perfil', error);
            });
    }
    render() {
        console.log(this.state);
        return (
            <View >
                <Text>Edita tu perfil</Text>
                <TextInput
                    //   style={styles.input}
                    keyboardType='default'
                    placeholder="Nuevo nombre de usuario"
                    onChangeText={(text) => this.setState({ userName: text })}
                    value={this.state.userName}
                />
                <TextInput
                    // style={styles.input}
                    keyboardType='default'
                    placeholder="Nueva mini bio"
                    onChangeText={(text) => this.setState({ bio: text })}
                    value={this.state.bio}
                />
                <TextInput
                    // style={styles.input}
                    keyboardType='default'
                    placeholder="URL de la nueva foto de perfil"
                    onChangeText={(text) => this.setState({ profileImage: text })}
                    value={this.state.profileImage}
                />
                <TouchableOpacity  onPress={() => this.guardarCambios()}>
                    <Text> Guardar Cambios</Text>
                </TouchableOpacity>
                
            </View>
        )
    }

}

export default EditarPerfil;