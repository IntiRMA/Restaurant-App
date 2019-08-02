import firebase from '../fconfig/fBase';
import {Alert,} from "react-native";
import {NavigationActions, StackActions} from "react-navigation";
import options from '../zconfig/endpoints';
import MYAPI from '../zconfig/myApi';
import loadFromDb from "./loadFromDb";


class HandleAuthentication{
    /* trys to log user in*/
     async login(email, password, props,registering){
        registering=registering||false;
        let failed=false;
        await firebase.auth().signInWithEmailAndPassword(email,password).then((user)=>{
        })
            .catch(function(e){
                    Alert.alert(
                        "Error on LogIn",
                        e.message,

                    );
                failed=true;
                }
            );
        if(failed){
            return;
        }
        if(!registering) {
            this.loadAll(props);
            this.resetStack("Tabs", props);
        }

    }

    async loadAll(props){

        let welli= await this.getNearBy().catch();
        let fav=await loadFromDb.getUserFavorites().catch();
        let items={restaurants:welli,favorites:fav};
        props.loadA(items);
    }

    async getNearBy(){
        var itms=[];
        var lat="-41.28666552";
        var lon="174.772996908";

        await navigator.geolocation.getCurrentPosition((pos)=> {
            var crd = pos.coords;
            lat=crd.latitude;
            lon=crd.longitude;
            console.log("LAT "+lat);
            MYAPI.getJson(options.getGeocode,{
                    lat:lat, //latitude
                    lon:lon, //longitude
                }).then(result=> {
                    for (let i = 0; i < result.nearby_restaurants.length; i++) {
                        itms.push(result.nearby_restaurants[i].restaurant);
                    }
                }).catch(err=>console.log("LOADIN RESTS "+err));
            }
        , (err)=>{
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }, {
            enableHighAccuracy: true,
            timeout: 5000
        });


        return itms;
    }

    /* trys to register user*/
    async register(name,email, password, props){
        let This=this;
        if(name===undefined||name==null||name.length<2){
            Alert.alert(
                "Invalid Username",
                "User Names require at least 2 letters",
            );
            return;
        }
        let failed=false;
        await firebase.auth().createUserWithEmailAndPassword(email,password).then(()=> {
            }
        ).catch((e)=> {
                Alert.alert(
                    "Error on Register",
                    e.message,
                );
                failed=true;
            }
        );
        if(failed){
            return;
        }
        await this.login(email, password, props,true).then(() => {
            firebase.auth().currentUser.updateProfile({displayName:name}).catch();
            let ID = firebase.auth().currentUser.uid;
            firebase.database().ref('users/' + ID).set({
                name: name,
                id: ID,
                email: email
            })
        }).catch();
        this.loadAll(props);
        this.resetStack("Tabs", props);

    }

    async logout(props){
        await firebase.auth().signOut().then(()=>{
                this.resetStack("Login",props);
            });
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
export default new HandleAuthentication();