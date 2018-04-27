import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    Keyboard,
    Dimensions,
    Button,
    AsyncStorage
} from 'react-native'

export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            usuario: '',
            senha: '',
            erro: ''
        }
    }

    login = () => {
        const uri = 'http://instalura-api.herokuapp.com/api/public/login';
        const requestInfo = {
          method: 'POST',
          body: JSON.stringify({
            login: this.state.usuario,
            senha: this.state.senha
          }),
          headers: new Headers({
            'Content-type': 'application/json'
          })
        };
    
        fetch(uri, requestInfo)
          .then(response => {
            if (response.ok)
              return response.text();
    
            throw 'Não foi possível efetuar login';
          })
          .then(token => {
            AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('usuario', this.state.usuario);
            this.props.navigator.resetTo({
                screen: 'Feed',
                title: 'Instalura'
            })
          })
          .catch(erro => this.setState({mensagem: erro}));
      }

    render(){
        return(
            <View style={style.container}>
                <Text style={style.logo}>Instalura</Text>
                <View style={style.form}>
                    <TextInput style={style.input}
                                placeholder="Usuario..."
                                onChangeText={texto => this.setState({usuario: texto})}/>
                    
                    <TextInput style={style.input}
                                placeholder="Senha..."
                                secureTextEntry={true}
                                onChangeText={texto => this.setState({senha: texto})}/>
                    <Button title='Enviar' onPress={this.login}></Button>
                </View>
                <Text style={style.erro}>{this.state.erro}</Text>
            </View>
        )
    }
}

const style = {
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        width: Dimensions.get('screen').width * 0.8,
    },
    input: {
        height: 40
    },
    erro: {
        color: '#A22',
        marginTop: 10,
        fontSize: 20
    },
    logo: {
        fontSize: 40,
        marginBottom: 10,
        fontFamily: 'serif'
    }
}