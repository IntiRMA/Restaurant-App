import firebase from "firebase";

let config = {
    apiKey: "AIzaSyDYmsK-JrwTKd50BCQGGbCG5S9PVGRyKtI",
    authDomain: "restaurant-app-d9939.firebaseapp.com",
    databaseURL: "https://restaurant-app-d9939.firebaseio.com",
    projectId: "restaurant-app-d9939",
    storageBucket: "restaurant-app-d9939.appspot.com",
    messagingSenderId: "544431725460"
};
firebase.initializeApp(config);

export default firebase;