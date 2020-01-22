import React from "react";
import { Button, Message, Title } from "rbx";
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false
    }
};

const Welcome = ({ user }) => (
    <Message color="info">
        <Message.Header>
            Welcome, {user.displayName}
            <Button primary onClick={() => firebase.auth().signOut()}>
                Log out
            </Button>
        </Message.Header>
    </Message>
);

const SignIn = () => (
    <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
    />
);


const Banner = ({ user, title }) => (
    <React.Fragment>
        { user ? <Welcome user={ user } /> : <SignIn /> }
    </React.Fragment>
);

export default Banner;