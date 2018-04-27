import React, {Component} from 'react'
import style from './style'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard
} from 'react-native'


export default class Likes extends Component {

  constructor(){
    super()
    this.state = {
      
    }
  }
 
  carregaIcone =(likeada) => {
    return  likeada?
            require('../../../resources/img/s2-checked.png') :
            require('../../../resources/img/s2.png');
  }


  exibeLikes = (likers) =>{
    if (likers.length < 1)
      return
    
    return  <Text style={style.curtidas}>
              {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida' }
            </Text>
  }

  render() {
    const {foto, likeCallback} = this.props
    return (
      <View style={style.container}>
        <TouchableOpacity onPress={likeCallback}>
          <Image  source={this.carregaIcone(foto.likeada)}
                  style={style.botaoLike}/>
        </TouchableOpacity>
        {this.exibeLikes(foto.likers)}
      </View>
    )
  }
}
