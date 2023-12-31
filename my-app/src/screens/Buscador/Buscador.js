import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db } from "../../firebase/config"

class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: [],
            busqueda: '',
            resultados: [],
            mensaje: '',
        };
    }

    componentDidMount() {
        db.collection('users').onSnapshot(docs => {
            let users = []
            docs.forEach(doc => {
                users.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuarios: users,
            });
        })
    }

    controlarCambios(text) {
        this.setState({
            busqueda: text
        })
    }

    buscarUsuarios() {
        const busquedaLower = this.state.busqueda.toLowerCase();

        const resultados = this.state.usuarios.filter((usuario) => 
            usuario.data.userName.toLowerCase().includes(busquedaLower)
        );

        if (resultados.length === 0) {
            this.setState({
                resultados: [],
                mensaje: 'No hay resultados que coincidan.',
            });
        } else {
            this.setState({
                resultados: resultados,
                mensaje: '',
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}> 
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Buscar por username'
                    onChangeText={(text) => this.controlarCambios(text)}
                    value={this.state.busqueda}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.buscarUsuarios()}
                >
                    <Text style={styles.buttonText}>Buscar</Text>
                </TouchableOpacity>

                {this.state.mensaje ? (
                    <Text style={styles.message}>{this.state.mensaje}</Text>
                ) : (
                    <FlatList
                        data={this.state.resultados}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.userContainer}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                                'SuPerfil', {mailUser: item.data.owner})}>
                                <Text style={styles.userName}>User Name: {item.data.userName}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer:{
        paddingHorizontal: 40,
        width: '100%',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#dbdbdb',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#0095f6',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        borderColor: '#0089e0',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    message: {
        fontSize: 16,
        marginBottom: 10,
        color: '#e74c3c',
    },
    userContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    userName: {
        fontSize: 16,
    },
});


export default Buscador;
