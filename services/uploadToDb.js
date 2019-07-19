import firebase from '../fconfig/fBase';
import {Alert} from "react-native";
import {NavigationActions, StackActions} from "react-navigation";

class UploadToDb{

    /* add a restaurant to firebase*/
    async addRestaurant(city, name, address, price, tags){
        let user=firebase.auth().currentUser;
        await firebase.database().ref("cityTags/"+city).set(city).catch();
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

    /* add restaurant to users upload*/
    async addToUsersUploads(city,name,user){
        await firebase.database().ref("users/"+user.uid+"/uploads/"+"/"+name).set({
            name:name,
            city:city
        }).catch();
    }

    /* adds restaurant to user favorites*/
    async addToUserFavorites(restaurant){
        let user=firebase.auth().currentUser;
        await firebase.database().ref("users/"+user.uid+"/favorites/"+"/"+restaurant.name).set(restaurant).catch();
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
export default new UploadToDb();