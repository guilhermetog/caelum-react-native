import React, {Component} from 'react'
import style from './style'
import {
    View,
    Text,
    FlatList
} from 'react-native'

export default class Comentario extends Component {
    render() {
     
      const {usuario, texto} = this.props;
      return (
        <Text style={style.comentario}>
            <Text style={style.comentarioAuthor}>{usuario} </Text>
            <Text>{texto}</Text>
        </Text>
      )
    }
  }
