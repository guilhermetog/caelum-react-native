import {StyleSheet, Dimensions} from 'react-native'


const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 10
    },
    botaoLike: {
        width: 30,
        height: 30
    },
    curtidas:{
        fontSize: 20,
        marginLeft: 10
    }
});

export default styles