import {StyleSheet, Dimensions} from 'react-native'


const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    comentario:{
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccccaa',
        fontSize: 15
    },
    comentarioAuthor:{
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default styles