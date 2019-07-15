import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator,createAppContainer} from 'react-navigation';
import FavoritesScreen from "../pages/favorites";
import RestaurantScreen from "../pages/restaurants";
import LoginScreen from '../pages/login';
import RegisterScreen from "../pages/register";
import {LoadingScreen} from "../pages/loading";
import {RandomScreen} from "../pages/random";
import ShowRestaurantScreen from "../pages/showRestaurant";


const tabs=createMaterialTopTabNavigator({
        Favorites:FavoritesScreen,
        Near_ME:RestaurantScreen,
        Random:RandomScreen
    }, {
        tabBarOptions: {
            style: {
                backgroundColor: "#000",
            }
        }
    },
    {
        intialRouteName: 'Near_ME'
    });

const RootStack = createStackNavigator({
        Login:LoginScreen,
        Register:RegisterScreen,
        Loading:LoadingScreen,
        Favorites:FavoritesScreen,
        Near_ME:RestaurantScreen,
        Random:RandomScreen,
        Show:ShowRestaurantScreen,
        Tabs:tabs
    },
    {
        intialRouteName: 'Loading',
    });

const App = createAppContainer(RootStack);

export default App;