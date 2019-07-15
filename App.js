import React from 'react';
import RestaurantApp from './main/restaurantApp';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
const initstate={
  favorites:[]
};
console.disableYellowBox = true;
const reducer=(state=initstate,action)=>{

  if(action.items!==undefined) {

    switch (action.type) {
      case 'LOAD_ALL':
        return {regions:action.items.regions,favorites:action.items.favorites,uploads:action.items.uploads,restaurants:action.items.restaurants};
      case 'ADD':
        let favs=state.favorites.slice();
        let regions=state.regions.slice();
        let uploads=action.items.uploads;
        let restaurants=action.items.restaurants;
        if(regions.includes(restaurants[restaurants.length-1].city)){
          regions.push(restaurants[restaurants.length-1].city);
        }
        return {regions:regions,favorites:favs,uploads:uploads,restaurants:restaurants};
      case "ADD_FAV":
        let regs=state.regions.slice();
        let ups=state.uploads.slice();
        let rest=state.restaurants.slice();
        return {regions:regs,favorites:action.items.favorites,uploads:ups,restaurants:rest};
    }
  }
  return state;
};
const store=createStore(reducer);
export default class App extends React.Component {
  render() {
    return(
        <Provider store={store}>
          <RestaurantApp />
        </Provider>);
  }
}