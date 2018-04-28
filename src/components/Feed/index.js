import React, { Component } from 'react';
import Notificacao from '../../api/Notificacao'
import Post from '../Post'
import {
  FlatList,
  AsyncStorage
} from 'react-native';
import InstaluraFetchService from '../../services/InstaluraFetchService';

export default class Feed extends Component {
    constructor(){
      super()
      this.state = {
        fotos: []
      }
    }
  
    componentDidMount(){
      InstaluraFetchService.get('/fotos')
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
      const listaOriginal = this.state.fotos
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
      })
      InstaluraFetchService.post(`/fotos/${idfoto}/like`)
      .catch(e => {
        this.setState({fotos: listaOriginal})
        Notificacao.exibe('Ops','Não foi possível concluir a operação')
      })
    }
  
  
    adicionaComentario = (idfoto, valorComentario) => {
      
      if(valorComentario === '')
        return false
  
      const foto = this.getFoto(idfoto)
  
      InstaluraFetchService.post(`/fotos/${idfoto}/comment`, {texto: valorComentario})
      .then(comentario => [...foto.comentarios,comentario])
      .then(novaLista => {
        
        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista
        }

        this.updateFoto(fotoAtualizada)
      })     
      .catch(e => {
        Notificacao.exibe('Ops','Algo deu errado')
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
  
  