import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
    logInButton:{
        backgroundColor: '#383838',
        paddingVertical: 15,
        marginBottom:10
    },
    registerContainer:{
        backgroundColor: '#FF2400',
        paddingVertical: 15,
        marginBottom:10
    },
    addButtonContainer:{
        top:0,
        left:0,
        resizeMode:'cover',
        alignItems:'center',
        justifyContent:'center',
        width:Dimensions.get('window').height/10,
        height:Dimensions.get('window').height/10,
    },
    itemButton:{
        width:Dimensions.get('window').width/2-5,
        height:Dimensions.get('window').height/4.25-5,
        alignItems:"center",
        justifyContent:"center"
    },
    favoriteButton:{
        width: 20,
        height: 20,
        bottom:5
    }
});