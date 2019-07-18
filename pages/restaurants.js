import React from 'react';
import {Text, View, FlatList, TouchableOpacity, ImageBackground,} from "react-native";
import containers from '../styles/containerStyles';
import tetxStyles from '../styles/textStyles';
import Search from 'react-native-search-box';
import {LoadingScreen} from "./loading";
import buttonStyles from "../styles/buttonStyles";
import {connect} from "react-redux";
import options from '../zconfig/endpoints';
import MYAPI from '../zconfig/myApi';

class RestaurantScreen extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            refresh:false,
            loading:false,
            items: [],
            notSearch:true
        };
        this.renderBox.bind(this);
        this.onSearch.bind(this);
    }
    componentDidMount() {
        this.setState({items:this.props.items});
    }
    onSearch(search){
        return new Promise((resolve, reject) => {
            var This=this;
            var lat = -41.28666552;
            var lon = 174.772996908;
            var items=[];
            console.log("SEARCHING "+search);
            MYAPI.getJson(options.search,{
                lat:lat,
                lon:lon,
                q:search
            }).then(result=> {
                for (let k in result.restaurants) {
                    items.push(result.restaurants[k].restaurant);

                }
                This.setState({items: items,notSearch:false});

            }).catch(err=>console.log(err));

            resolve();
        });
    }

     refresh(){
        this.setState({refresh:true});
        this.setState({items:this.props.items});
        this.setState({loading:false});
        this.setState({refresh:false});
    }

    renderBox(item){

        return (
            <ImageBackground source={""} style={containers.itemContainer}>
                <TouchableOpacity  style={buttonStyles.itemButton}
                                   onPress={()=>this.props.navigation.navigate("Show",{item:item})}
                >
                    <Text style={tetxStyles.blackTextSmall}>Name:</Text>
                    <Text style={tetxStyles.blackTextSmall}>{item.name}</Text>
                    <Text style={tetxStyles.blackTextSmall}>City:</Text>
                    <Text style={tetxStyles.blackTextSmall}>{item.city}</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
    render(){
        if(this.state.loading){
            return <LoadingScreen/>;
        }
        if(this.state.notSearch){
            return (

                <View style={containers.standardView}>
                    <Search
                        ref="search_box"
                        onSearch={search => this.onSearch(search)}
                        /**
                        * There many props that can customizable
                        * Please scroll down to Props section
                        */
                    />
                    <View style={containers.listContainer}>
                        <FlatList
                            refreshing={this.state.refresh}
                            onRefresh={() => this.refresh()}
                            numColumns={2}
                            extraData={this.props.items}
                            renderItem={({item}) => this.renderBox(item)}
                            data={this.props.items}
                            initialNumToRender={5}/>
                    </View>
                </View>
            );
        }else {
            return (

                <View style={containers.standardView}>
                    <Search
                        ref="search_box"
                        onSearch={search => this.onSearch(search)}
                        /**
                        * There many props that can customizable
                        * Please scroll down to Props section
                        */
                    />
                    <View style={containers.listContainer}>
                        <FlatList
                            refreshing={this.state.refresh}
                            onRefresh={() => this.refresh()}
                            numColumns={2}
                            extraData={this.state.items}
                            renderItem={({item}) => this.renderBox(item)}
                            data={this.state.items}
                            initialNumToRender={5}/>
                    </View>
                </View>
            );
        }
    }
}

function mapStateToProps(state) {

    return {items:state.restaurants};
}

function MapDispatchToProps(dispatch) {
    return {
        loadA: (items) =>dispatch({type:'LOAD_ALL',items:items})
    }
}
export default connect(mapStateToProps,MapDispatchToProps)(RestaurantScreen)