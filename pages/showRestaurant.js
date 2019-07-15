import React from 'react';
import {View, Text,ImageBackground,TouchableOpacity} from 'react-native';
import textStyles from '../styles/textStyles';
import StarRating from 'react-native-star-rating';
import uploadToDb from'../services/uploadToDb';
import {LoadingScreen} from "./loading";
import {connect} from "react-redux";
class ShowRestaurantScreen extends React.Component{
    constructor(){
        super();
        this.state={
            rating:0,
            name:"",
            city:"",
            tags:[],
            address:"",
            price:"",
            loading:true,
            uploaderId:0
        }
    }
    componentDidMount() {
        let favs=[];
        let item = this.props.navigation.state.params.item;
        let contains=false;
            for (let i=0;i<favs.length;i++) {
                let fav=favs[i];
                if (fav.name === item.name) {
                    contains = true;
                    break;
                }
            }

        this.setState({
                favorite: true,
                rating: item.user_rating.aggregate_rating,
                name: item.name,
                city: item.location.city,
                tags: item.cuisines,
                address: item.location.address,
                price: item.price_range,
                loading: false,
            path:contains ? require('../resources/starFilled.png'):require('../resources/starEmpty.png'),
            }
        );
        this.setState({loading:false});
    }

    addFav(){
        uploadToDb.addToUserFavorites(this.state.city,this.state.name).catch();
        this.setState({path:require('../resources/starFilled.png')});
        let favs=[];
        for(let i=0;i<this.props.favorites.length;i++){
            favs.push(this.props.favorites[i]);
        }
        favs.push({name:this.state.name,city:this.state.city});
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
              <Text style={textStyles.pageTitle}>{this.state.name}</Text>

              <Text style={textStyles.blackTextSmall}>city:</Text>
              <Text style={textStyles.pageTitle}>{this.state.city}</Text>

              <Text style={textStyles.blackTextSmall}>rating:</Text>
              <Text style={textStyles.pageTitle}>{this.state.rating}</Text>

              <Text style={textStyles.blackTextSmall}>price:</Text>
              <Text style={textStyles.pageTitle}>{this.state.price}</Text>

              <Text style={textStyles.blackTextSmall}>address:</Text>
              <Text style={textStyles.pageTitle}>{this.state.address}</Text>

              <Text style={textStyles.blackTextSmall}>tags:</Text>
              <Text style={textStyles.pageTitle}>{this.state.tags.toString()}</Text>

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