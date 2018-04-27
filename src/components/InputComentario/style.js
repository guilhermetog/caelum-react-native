import {StyleSheet, Dimensions} from 'react-native'


const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    inputBox:{
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 10,
        padding: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#555',
        borderBottomWidth: 2,
    },
    input:{
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        fontSize: 20,
        flex: 1
    },
    botaoEnviar:{
        width: 25,
        height:25,
        alignSelf: "flex-end"
    }
});

export default styles