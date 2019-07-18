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
      case "ADD_FAV":
        var favs=state.favorites;
        for(let rest of action.items.favorites){
          favs.push(rest);
        }
        return {favorites:favs};
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