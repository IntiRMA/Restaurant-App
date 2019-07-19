import firebase from '../fconfig/fBase';
import {Alert} from "react-native";
import {NavigationActions, StackActions} from "react-navigation";

class LoadFromDb{
    /* loads all restaurants uploaded by an user*/
    async loadUploaded(){
        let rest=[];
        let user=firebase.auth().currentUser;
        let hasnot=false;
        firebase.database().ref("users/" + user.uid).once('value').then(snapshot=>{
            if(!snapshot.hasChild("uploads")){
                hasnot=true;
            }
        });
        if(hasnot){
            return [];
        }

        await firebase.database().ref("users/"+user.uid+"/"+"uploads").once("value").then(snapShot=>{
            snapShot.forEach(child=>{
                    rest.push({
                        name:child.val().name,
                        city:child.val().city
                    })
                }
            )
        });
        return rest;
    }
    /* loads all restaurants for a region*/
    async loadRegion(city){
        let rest=[];
        let hasnot=false;
        firebase.database().ref("cities").once('value').then(snapshot=>{
            if(!snapshot.hasChild("city")){
                hasnot=true;
            }
        });
        if(hasnot){
            return [];
        }
        await firebase.database().ref("cities/"+city).once("value").then(snapShot=>{
            snapShot.forEach(child=>{
                    rest.push({
                        name:child.val().name,
                        city:child.val().city,
                        tags:child.val().tags,
                        price:child.val().price,
                        address:child.val().address,
                        uploadedBy:child.val().uploadedBy,
                        uploaderId:child.val(). uploaderId,
                        rating:child.val().rating
                    })
                }
            )
        });
        return rest;
    }
    /* loads all restaurants for a region*/
    async loadWithTags(city,tags,prices) {
        let rest = [];
        let cities=await this.loadRegion(city);
        for(let i=0;i<cities.length;i++){
            let cont=false;
            for(let j=0;j<cities[i].tags.length;j++){
                if(!tags.includes(cities[i].tags[j])){
                    cont=true;
                    break;
                }
            }
            if(cont){
                continue;
            }
            if(!prices.includes(cities[i].price)){
                continue;
            }
            rest.push(cities[i]);
        }
        return rest;
    }

    /*gets user favorites*/
    async getUserFavorites() {
        let user = firebase.auth().currentUser;
        let favs = [];
        let hasnot=false;
        firebase.database().ref("users/" + user.uid).once('value').then(snapshot=>{
            if(!snapshot.hasChild("favorites")){
                hasnot=true;
            }
        });
        if(hasnot){
            return [];
        }
        await firebase.database().ref("users/" + user.uid + "/favorites").once('value').then(snapshot => {
            snapshot.forEach(child => {
                favs.push(child.val())
            })
        });
        return favs;
    }

    async loadCityTags(){
        let ret=[];
        await firebase.database().ref("cityTags").once('value').then(snapshot=>{
            snapshot.forEach(child=>{
                ret.push({
                    name:child.val().toString()
                });
            });
        });
        return ret;
    }
    /*pushes page and resets stack*/
    resetStack(page,props){
        const reset =StackActions.reset({
            index:0,
            actions:[NavigationActions.navigate({routeName:page.toString()})]
        });
        props.navigation.dispatch(reset);
    }


}
export default new LoadFromDb();