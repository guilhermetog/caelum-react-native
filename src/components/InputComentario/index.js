import React, {Component} from 'react'
import style from './style'
import {
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard
} from 'react-native'


export default class InputComentario extends Component {

  constructor(){
    super()
    this.state = {
      valorComentario: ''
    }
  }
  
  comentarioHandler = () => {
   
    Keyboard.dismiss()
    const {idFoto, comentarioCallback} = this.props
    
    comentarioCallback(idFoto, this.state.valorComentario)
    
    this.setState({valorComentario: ''})
    this.InputComentario.clear()
  }
  
  render() {
    return (
      <View style={style.inputBox} keyboard>
        <TextInput  style={style.input}
                    placeholder="Adicione um comentário..." 
                    underlineColorAndroid="transparent"
                    ref={input => this.InputComentario = input}
                    onChangeText={texto => this.setState({valorComentario: texto})}
                    onSubmitEditing={this.comentarioHandler}/>
        <TouchableOpacity onPress={this.comentarioHandler}>
          <Image  source={require('../../../resources/img/send.png')}
                  style={style.botaoEnviar}/>
        </TouchableOpacity>
      </View>
)
  }
  }
