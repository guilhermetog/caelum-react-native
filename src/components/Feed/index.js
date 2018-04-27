import React, { Component } from 'react';
import Post from '../Post'
import {
  FlatList,
  AsyncStorage
} from 'react-native';

export default class Feed extends Component {
    constructor(){
      super()
      this.state = {
        fotos: []
      }
    }
  
    componentDidMount(){
      const uri = 'http://instalura-api.herokuapp.com/api/fotos';

      AsyncStorage.getItem('token')
      .then(token => {
        return {
          headers: new Headers({
            "X-AUTH-TOKEN": token
          })
        };
      })
      .then(requestInfo => fetch(uri, requestInfo))
      .then(response => response.json())
      .then(response => {
        this.setState({fotos: response})
      })
    }
  
    getFoto = (idfoto) => {
      return this.state.fotos.find(foto=> foto.id === idfoto)
    }
  
    updateFoto = (fotoAtualizada) => {
      const fotos = this.state.fotos.map((foto)=> foto.id === fotoAtualizada.id ? fotoAtualizada : foto)
      this.setState({fotos})
    }
  
    like = (idfoto) => {
      const foto = this.getFoto(idfoto)
  
      AsyncStorage.getItem('usuario')
      .then(usuario => {
        let novaLista = []
        if(!foto.likeada){
          novaLista = [
            ...foto.likers,
            {login: usuario}
          ]
        }
        else{
          novaLista = foto.likers
              .filter(liker => liker.login !== usuario)
        }
         
        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        }
    
        this.updateFoto(fotoAtualizada)
        return AsyncStorage.getItem('token')
      })
      .then(token => {
        const uri = `http://instalura-api.herokuapp.com/api/fotos/${idfoto}/like`;
        const requestInfo = {
          method: 'post',
          headers: new Headers({
            "X-AUTH-TOKEN": token,
            "Content-type": "application/json"
          })
        }
        return fetch(uri, requestInfo)
      })
     
    }
  
  
    adicionaComentario = (idfoto, valorComentario) => {
      
      if(valorComentario === '')
        return false
  
      const foto = this.getFoto(idfoto)
  
      AsyncStorage.getItem('token')
      .then(token => {
        const uri = `http://instalura-api.herokuapp.com/api/fotos/${idfoto}/comment`;
        const requestInfo = {
          method: 'post',
          body: JSON.stringify({
            texto: valorComentario
          }),
          headers: new Headers({
            "X-AUTH-TOKEN": token,
            "Content-type": "application/json"
          })
        }

        return fetch(uri, requestInfo)
      })
      .then(response => response.json())
      .then(comentario => [...foto.comentarios,comentario])
      .then(novaLista => {
        
        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista
        }

        this.updateFoto(fotoAtualizada)

      })     
    }
  
  
    render() {
      return (
        <FlatList
          keyboardShouldPersistTaps={'handled'}
          keyExtractor= {item => String(item.id)}
          data={this.state.fotos}
          renderItem= {({item}) =>
            <Post foto={item}
                  likeCallback ={this.like}
                  comentarioCallback={this.adicionaComentario}/>}
        />
      )
    }
  }
  
  