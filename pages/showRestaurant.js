import React from 'react';
import {View, Text,ImageBackground,TouchableOpacity} from 'react-native';
import textStyles from '../styles/textStyles';
import StarRating from 'react-native-star-rating';
import uploadToDb from'../services/uploadToDb';
import {LoadingScreen} from "./loading";
import {connect} from "react-redux";
import loadFromDb from "../services/loadFromDb"
class ShowRestaurantScreen extends React.Component{
    constructor(){
        super();
        this.state={
            rating:0,
            name:"",
            city:"",
            tags:[],
            address:"",
            price:["$","$$","$$$","$$$$"],
            loading:true,
            uploaderId:0
        }
    }
    componentDidMount() {

        let favs=loadFromDb.getUserFavorites().catch();
        let item = this.props.navigation.state.params.item;
        console.log(JSON.stringify(item,null,2));
        let contains=false;
            for (let i=0;i<favs.length;i++) {
                let fav=favs[i];
                if (fav.name === item.name) {
                    contains = true;
                    break;
                }
            }

        this.setState({
            favorites:favs,
                favorite: true,
                item:item,
                loading: false,
            path:contains ? require('../resources/starFilled.png'):require('../resources/starEmpty.png'),
            }
        );
        this.setState({loading:false});
    }

    addFav(){
        uploadToDb.addToUserFavorites(this.state.item).catch();
        this.setState({path:require('../resources/starFilled.png')});
        let favs=[];
        var contains=false;
        for(let i=0;i<this.state.favorites.length;i++){
            if(this.state.favorites[i].name===this.state.item.name ){
                contains=true;
            }
        }
        if(contains) {
            for(let i=0;i<this.state.favorites.length;i++){
                if(this.state.favorites[i].name===this.state.item.name ){
                    continue;
                }
                favs.push(this.state.favorites[i]);
            }
        }else {
            for(let i=0;i<this.state.favorites.length;i++){
                favs.push(this.state.favorites[i]);
            }
            favs.push(this.state.item);
        }
        this.props.add({favorites:favs});
    }
    render(){
        const This=this;
        if(this.state.loading){
            return <LoadingScreen/>
        }
        return(
          <View style={{alignItems:'center'}}>
              <Text style={textStyles.blackTextSmall}>name:</Text>
              <Text style={textStyles.pageTitle}>{this.state.item.name}</Text>

              <Text style={textStyles.blackTextSmall}>city:</Text>
              <Text style={textStyles.pageTitle}>{this.state.item.location.city}</Text>

              <Text style={textStyles.blackTextSmall}>rating:</Text>
              <Text style={textStyles.pageTitle}>{this.state.item.user_rating.aggregate_rating}</Text>

              <Text style={textStyles.blackTextSmall}>price:</Text>
              <Text style={textStyles.pageTitle}>{this.state.price[Number(this.state.item.price_range)-1]}</Text>

              <Text style={textStyles.blackTextSmall}>address:</Text>
              <Text style={textStyles.pageTitle}>{this.state.item.location.address}</Text>

              <Text style={textStyles.blackTextSmall}>cuisines:</Text>
              <Text style={textStyles.pageTitle}>{this.state.item.cuisines}</Text>

              <ImageBackground source={This.state.path} style={{width: 50,height:50}}>
                <TouchableOpacity style={{width: 50,height:50}}
                onPress={this.addFav.bind(this)}
                />
              </ImageBackground>
              <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.state.rating}
              />

          </View>
        );
    }


}

function mapStateToProps(state) {

    return state;
}

function MapDispatchToProps(dispatch) {
    return {
        add: (items) =>dispatch({type:'ADD_FAV',items:items})
    }
}
export default connect(mapStateToProps,MapDispatchToProps)(ShowRestaurantScreen)