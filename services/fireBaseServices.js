import firebase from '../fconfig/fBase';
import {Alert} from "react-native";
import {NavigationActions, StackActions} from "react-navigation";

class FireBaseServices{

    /* add a restaurant to firebase*/
    async addRestaurant(city, name, address, price, tags){
        let user=firebase.auth().currentUser;

        await firebase.database().ref("cities/"+city+"/"+name).set({
            city:city,
            name:name,
            address:address,
            price:price,
            rating:0,
            voted:[],
            uploadedBy:user.displayName,
            uploaderId:user.uid
        }).catch((e)=>{
            Alert.alert(
                "Error on Register",
                e.message
            );
            });

        await firebase.database().ref("restaurants/"+"/"+name).set({
            city:city,
            name:name,
            address:address,
            price:price,
            rating:0,
            voted:[],
            uploadedBy:user.displayName,
            uploaderId:user.uid
        }).catch((e)=>{
                Alert.alert(
                    "Error on Register",
                    e.message
                );
            }
        );
        for(let i=0;i<tags.length;i++) {
            await firebase.database().ref("cities/"+city + "/" + name + "/" +"tags"+"/"+tags[i].toString())
                .set(tags[i].toString())
                .catch();
            await firebase.database().ref("restaurants/" + name + "/" +"tags"+"/"+tags[i].toString())
                .set(tags[i].toString())
                .catch();
        }
        await this.addToUsersUploads(city,name,user);
    }

    /* loads all restaurants uploaded by an user*/
    async loadUploaded(){
        let rest=[];
        let user=firebase.auth().currentUser;
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
        await firebase.database().ref("cities/"+city+"/tags").once("value").then(snapShot=>{
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
    /* add restaurant to users upload*/
    async addToUsersUploads(city,name,user){
        await firebase.database().ref("users/"+user.uid+"/uploads/"+"/"+name).set({
            name:name,
            city:city
        }).catch();
    }

    /* adds restaurant to user favorites*/
   async addToUserFavorites(city,name){
        let user=firebase.auth().currentUser;
       await firebase.database().ref("users/"+user.uid+"/favorites/"+"/"+name).set({
           name:name,
           city:city
       }).catch();
    }
    /*gets user favorites*/
    async getUserFavorites() {
        let user = firebase.auth().currentUser;
        let favs = [];
        await firebase.database().ref("users/" + user.uid + "/favorites").once('value').then(snapshot => {
            snapshot.forEach(child => {
                favs.push({
                    name: child.val().name
                })
            })
        });
        let ret=[];
        await firebase.database().ref("restaurants/").once('value').then(snapshot => {
            snapshot.forEach(child => {
                for(let i=0;i<favs.length;i++) {
                    if(favs[i].name==child.val().name) {
                        ret.push({
                            name:child.val().name,
                            city:child.val().city,
                            tags:child.val().tags,
                            price:child.val().price,
                            address:child.val().address,
                            uploadedBy:child.val().uploadedBy,
                            uploaderId:child.val(). uploaderId,
                            rating:child.val().rating
                        });
                    }
                }
            });
        });
        return ret;
    }
    async updateRating(city,name,uploader,newRating){
        await firebase.database().ref('cities/'+city+"/"+name+"/rating").set(newRating);
        await firebase.database().ref('restaurants/'+"/"+name+"/rating").set(newRating);
        await firebase.database().ref("users/"+uploader+"/"+city+"/"+name+"/rating").set(newRating);
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
export default new FireBaseServices();