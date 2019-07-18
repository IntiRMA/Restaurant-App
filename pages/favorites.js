import React from 'react';
import {Text, View, FlatList,TouchableOpacity,ImageBackground} from "react-native";
import containers from '../styles/containerStyles';
import buttonStyles from '../styles/buttonStyles';
import tetxStyles from '../styles/textStyles';
import loadFromDb from "../services/loadFromDb";
import {LoadingScreen} from "./loading";
import {connect} from "react-redux";

class FavoritesScreen extends React.Component{
    constructor(){
        super();
        this.state= {
            refresh:false,
            loading:false,
            items: []
        }
    }

    renderBox(item){
        var city="";
        try {
            city = item.location.city;
        }catch (e) {
            city="";
        }
        return (
            <ImageBackground source={""} style={containers.itemContainer}>
                <TouchableOpacity  style={buttonStyles.itemButton}
                                   onPress={()=>this.props.navigation.navigate("Show",{item:item})}
                >
                    <Text style={tetxStyles.blackTextSmall}>Name:</Text>
                    <Text style={tetxStyles.blackTextSmall}>{item.name}</Text>
                    <Text style={tetxStyles.blackTextSmall}>City:</Text>
                    <Text style={tetxStyles.blackTextSmall}>{city}</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
    async refresh(){
        this.setState({refresh:true});
        this.setState({loading:false});
        this.setState({refresh:false});
    }

    render(){
        if(this.state.loading){
            return <LoadingScreen/>;
        }

        return (
            <View style={containers.standardView}>
                <View style={containers.listContainer}>
                    <FlatList
                        refreshing={this.state.refresh}
                        onRefresh={()=>this.refresh()}
                        extraData={this.props.items}
                        numColumns={2}
                        renderItem={({item})=>this.renderBox(item)}
                        data={this.props.items}
                        initialNumToRender={5}/>
                </View>
            </View>
        );
    }
}
function mapStateToProps(state) {

    return {items:state.favorites};
}

function MapDispatchToProps(dispatch) {
    return {
        loadA: (items) =>dispatch({type:'LOAD_ALL',items:items})
    }
}
export default connect(mapStateToProps,MapDispatchToProps)(FavoritesScreen)