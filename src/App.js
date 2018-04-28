import { Navigation } from 'react-native-navigation';
import Feed from './components/Feed';
import Login from './screens/Login';
import {
  AsyncStorage
}from 'react-native';


export default () => {
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Feed', () => Feed);

  AsyncStorage.getItem('token')
  .then(token =>{
    if(token){
      return {
        screen: 'Feed',
        title: 'Instalura'
      }
    }else{
      return {
        screen: 'Login',
        navigatorStyle: {
          navBarHidden: true
        }
      }
    }
    
  })
  .then(screen => Navigation.startSingleScreenApp({screen}))
  
}