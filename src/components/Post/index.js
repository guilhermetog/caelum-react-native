import React, {Component} from 'react'
import style from './style'
import Comentario from '../Comentario'
import InputComentario from '../InputComentario'
import Likes from '../Likes'
import {
    View,
    Image,
    Text,
    FlatList,
    Keyboard
} from 'react-native'

export default class Post extends Component {


    render() {

      const {foto, likeCallback, comentarioCallback} = this.props;
      
      return (
        <View>
            <View style={style.cabecalho}>
                <Image source={{uri:foto.urlPerfil}}
                        style={style.fotoDePerfil} />
                <Text>{foto.loginUsuario}</Text>
            </View>
            <Image source={{uri:foto.urlFoto}}
                    style={style.foto} />
            <Likes  likeCallback={() => {likeCallback(foto.id)}} foto={foto}/>
            <Comentario usuario={foto.loginUsuario}  texto={foto.comentario}/>
            <FlatList
              keyExtractor= {item => String(item.id)}
              data={foto.comentarios}
              renderItem= {({item}) =>
                <Comentario usuario={item.login}  texto={item.texto}/>
              }
            />
            <InputComentario idFoto={foto.id} comentarioCallback={comentarioCallback}/>
        </View>
      )
    }
  }
