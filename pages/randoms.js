import React from 'react';
import {Text, View, FlatList, TouchableOpacity, ImageBackground,} from "react-native";
import containers from '../styles/containerStyles';
import textStyles from "../styles/textStyles";
import Search from 'react-native-search-box';
import {LoadingScreen} from "./loading";
import buttonStyles from "../styles/buttonStyles";
import options from '../zconfig/endpoints';
import MYAPI from '../zconfig/myApi';

export class RandomsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            refresh:false,
            loading:false,
            items: [],
            currentNumber:20,
            tags:[]
        };
        this.renderBox.bind(this);
        this.onSearch.bind(this);
    }
    componentDidMount() {
        this.setState({items:this.props.navigation.state.params.items,tags:this.props.navigation.state.params.tags});
    }
    onSearch(search){
        var newItems=[];
        return new Promise((resolve, reject) => {
            for(let i=0;i<this.state.items.length;i++){
                if(this.state.items[i].name.includes(search)){
                    newItems.push(this.state.items[i]);
                }
            }
            this.setState({items:newItems});
            resolve();
        });

    }

    refresh(){
        this.setState({refresh:true});
        this.setState({items:this.props.navigation.state.params.items});
        this.setState({loading:false});
        this.setState({refresh:false});
    }
    async loadMore(){
        let tags=this.state.tags;
        var tgs="";
        var This=this;
        for(let i=0;i<tags.length-1;i++){
            tgs+=tags[i]+",";
        }
        if (tags.length>0){
            tgs += tags[tags.length-1];
        }
        if(tgs.length>0&&this.state.items.length%20===0){
            await navigator.geolocation.getCurrentPosition((pos)=> {
                    var crd = pos.coords;
                    var lat=crd.latitude;
                    var lon=crd.longitude;
                    MYAPI.getJson(options.search, {
                        lat: lat,
                        lon: lon,
                        radius:1000,
                        cuisines: tgs,
                        start: This.state.currentNumber,
                        count: 20
                    }).then(result => {
                        for (let i = 0; i < result.restaurants.length; i++) {
                            var rest = result.restaurants[i].restaurant;
                            This.state.items.push(rest);
                        }
                        This.setState({items: This.state.items});
                        This.state.currentNumber+=20;
                    }).catch(err => console.log(err));
                }
                , (err)=>{
                    console.warn(`ERROR(${err.code}): ${err.message}`);
                }, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });

        }
    }

    renderBox(item){
        return (
            <ImageBackground source={""} style={containers.itemContainer}>
                <TouchableOpacity  style={buttonStyles.itemButton}
                                   onPress={()=>this.props.navigation.navigate("Show",{item:item})}
                >
                    <Text style={textStyles.blackTextSmall}>Name:</Text>
                    <Text style={textStyles.blackTextSmall}>{item.name}</Text>
                    <Text style={textStyles.blackTextSmall}>City:</Text>
                    <Text style={textStyles.blackTextSmall}>{item.location.city}</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
    render(){
        if(this.state.loading){
            return <LoadingScreen/>;
        }
        return (

            <View style={containers.standardView}>
                <Search
                    ref="search_box"
                    onSearch={search=>this.onSearch(search)}
                />
                <View style={containers.listContainer}>
                    <FlatList
                        refreshing={this.state.refresh}
                        onRefresh={()=>this.refresh()}
                        numColumns={2}
                        extraData={this.state.items}
                        renderItem={({item})=>this.renderBox(item)}
                        data={this.state.items}
                        initialNumToRender={5}/>
                </View>
                <TouchableOpacity style={buttonStyles.logInButton}
                                  onPress={this.loadMore.bind(this)}>
                    <Text style={textStyles.whiteTextSmall}>LoadMore</Text>
                </TouchableOpacity>
            </View>
        );
    }
}