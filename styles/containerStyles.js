import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    logInBack:{
        flex:1,
        resizeMode: "cover",
        width: null,
        height: null,
        backgroundColor:"rgba(255,255,250,1)"
    },
   logInView:{
       top:Dimensions.get('window').height/5,
       width: Dimensions.get('window').width,
   },
    logInInput:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#000'
    },
    standardView:{
        flex: 1,
        backgroundColor:'#333'
    },
    listContainer:{
        justifyContent:'space-between',
        top:5,
        flex:1
    },
    addImageContainer:{
        position: 'absolute',
        top:Dimensions.get('window').height-(Dimensions.get('window').height/10)-150,
        left:20,
        resizeMode:'cover',
        opacity:0.7,
        width:Dimensions.get('window').height/10,
        height:Dimensions.get('window').height/10
    },
    logOutContainer:{
        position: 'absolute',
        top:Dimensions.get('window').height-(Dimensions.get('window').height/10)-150,
        left:Dimensions.get('window').width-(Dimensions.get('window').width/10)-40,
        resizeMode:'cover',
        opacity:0.7,
        width:Dimensions.get('window').height/10,
        height:Dimensions.get('window').height/10
    },
    refreshImageContainer:{
        position: 'absolute',
        top:Dimensions.get('window').height-(Dimensions.get('window').height/10)-150,
        left:Dimensions.get('window').width-Dimensions.get('window').height/10-20,
        resizeMode:'cover',
        opacity:0.7,
        width:Dimensions.get('window').height/10,
        height:Dimensions.get('window').height/10
    },

    itemContainer: {
        width:Dimensions.get('window').width/2-5,
        height:Dimensions.get('window').height/4.25-5,
        backgroundColor:'#999',
        alignItems:"center",
        justifyContent:"center",
        marginBottom: 5,
        marginLeft: 2,
        marginRight: 2,
        resizeMode:'cover'
    },
    textContainer:{
        width:Dimensions.get('window').width/2-5,
        height:Dimensions.get('window').height/9,
        alignItems:"center",
        justifyContent:"center",
        opacity:0.9,
        backgroundColor:'#111'
    }
});