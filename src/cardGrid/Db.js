import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


export const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false
    }
};

// Your web app's Firebase configuration
export var firebaseConfig = {
    apiKey: "AIzaSyBbFoCIzzzPvarmimggrb49RAYPiRu7O-g",
    authDomain: "new-shopping-cart-e0a57.firebaseapp.com",
    databaseURL: "https://new-shopping-cart-e0a57.firebaseio.com",
    projectId: "new-shopping-cart-e0a57",
    storageBucket: "new-shopping-cart-e0a57.appspot.com",
    messagingSenderId: "781738375483",
    appId: "1:781738375483:web:ec9609949f199534db1f1e",
    measurementId: "G-716GREMKMV"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();