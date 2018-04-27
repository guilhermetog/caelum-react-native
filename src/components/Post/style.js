import {StyleSheet, Dimensions} from 'react-native'


const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    cabecalho: {
        margin: 10,
        flexDirection: 'row', 
        alignItems: 'center'
    },
    fotoDePerfil: {
        width:40, 
        height: 40, 
        marginRight:10, 
        borderRadius:20
    },
    foto: {
        width: width,
        height: width
    }
});

export default styles