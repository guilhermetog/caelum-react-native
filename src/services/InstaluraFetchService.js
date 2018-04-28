import {AsyncStorage} from 'react-native'
export default class InstaluraFetchService {
   
    static get(recurso){
      const uri = 'http://instalura-api.herokuapp.com/api'+recurso;

      return AsyncStorage.getItem('token')
      .then(token => {
        return {
          headers: new Headers({
            "X-AUTH-TOKEN": token
          })
        };
      })
      .then(requestInfo => fetch(uri, requestInfo))
      .then(response => response.json())
    }

    static post(recurso, dados){
        const uri = 'http://instalura-api.herokuapp.com/api'+recurso;
        return AsyncStorage.getItem('token')
        .then(token => {
          return {
            method: 'post',
            body: JSON.stringify(dados),
            headers: new Headers({
              "X-AUTH-TOKEN": token,
              "Content-type": "application/json"
            })
          };
        })
        .then(requestInfo => fetch(uri, requestInfo))
        .then(response => {
            if(response.ok)
                return response.json()
            
            throw new Error('Não foi possivel completar a operação.')
        })
      }
}