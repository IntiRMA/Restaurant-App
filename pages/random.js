import React from "react";
import {Text, View, TouchableOpacity} from "react-native";
import {ButtonGroup} from 'react-native-elements'
import textStyles from "../styles/textStyles";
import buttonStyles from "../styles/buttonStyles";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import options from '../zconfig/endpoints';
import MYAPI from '../zconfig/myApi';
export class RandomScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            rest:{name:""},
            tags:[],
            regions:[],
            priceindex:0,
            cities:[],
            prices: ['cheap', 'low', 'average', 'expensive'],
            possibleTags:[{"name":"boi","id":3}],
            mounting:true
        };

    }
    componentDidMount(){
        var This=this;
        var tags=[];
        MYAPI.getJson(options.getCuisines,{
            city_id:"71", //id of the city for which collections are needed
        }).then((result)=>{
            for (let k in result.cuisines) {
                tags.push({id: result.cuisines[k].cuisine.cuisine_id, name: result.cuisines[k].cuisine.cuisine_name});
            }
        }).catch(err=>console.log(err));
        This.setState({possibleTags:tags});


    }

    updatePrice(index){
        let name = this.state.prices[index];
        this.setState({priceindex:index,price:name});
    }

    updateTags(items){
        this.setState({tags:items});
    }

    updateCityTags(items){
        this.setState({regions:[]});
        this.setState({regions:items});
    }

     getRandom(){
         var lat = -41.28666552;
         var lon = 174.772996908;
         let tags=this.state.tags;
         var tgs="";
         var This=this;
         for(let i=0;i<tags.length-1;i++){
             tgs+=this.getTagId(tags[i])+",";
         }
         if (tags.length>0){
             tgs += this.getTagId(tags[tags.length-1]);
         }
         if(tgs.length>0){
             var restaurants=[];
                 MYAPI.getJson(options.search, {
                     lat: lat,
                     lon: lon,
                     radius:1000,
                     cuisines: tgs,
                     start: 0,
                     count: 20
                 }).then(result => {
                     for (let i = 0; i < result.restaurants.length; i++) {
                         var rest = result.restaurants[i].restaurant;
                         restaurants.push(rest);
                     }
                     if(restaurants.length>0) {
                         let idx = Math.floor((Math.random() * restaurants.length));
                         This.setState({rest: restaurants[idx]});
                         This.props.navigation.navigate("Randoms",{items:restaurants,tags:tgs});
                     }
                 }).catch(err => console.log(err));

         }
     }
     getTagId(tag){
        for(let pt of this.state.possibleTags){
            if(pt.name===tag){
                return pt.id;
            }
        }
        return -1;
     }
    render() {
        const This=this;
        return (
            <View>
                <Text style={textStyles.pageTitle}>Get A Random</Text>

                <Text style={textStyles.blackTextSmall}>Price</Text>
                <ButtonGroup
                    onPress={This.updatePrice.bind(This)}
                    selectedIndex={this.state.priceindex}
                    buttons={this.state.prices}
                    containerStyle={{height: 50}}
                />
                <Text style={textStyles.blackTextSmall}>Tag</Text>
                <SectionedMultiSelect
                    showDropDowns={true}
                    items={this.state.possibleTags}
                    onSelectedItemsChange={This.updateTags.bind(This)}
                    selectedItems={this.state.tags}
                    uniqueKey='name'
                    selectText='Choose the tags'

                />

                <SectionedMultiSelect
                    showDropDowns={true}
                    items={this.state.cities}
                    onSelectedItemsChange={This.updateCityTags.bind(This)}
                    selectedItems={this.state.regions}
                    uniqueKey='name'
                    selectText='Choose the tags'

                />
                <TouchableOpacity style={buttonStyles.logInButton}
                                  onPress={this.getRandom.bind(this)}>
                    <Text style={textStyles.whiteTextSmall}>Get</Text>
                </TouchableOpacity>
            <View>
                <Text style={textStyles.pageTitle}> {this.state.rest.name}</Text>
            </View>
            </View>
        );


    }
}
