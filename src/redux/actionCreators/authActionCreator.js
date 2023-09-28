import * as types from "../actionsTypes/authActionTypes";
import fire from "../../config/firebase";

const loginUser = (email, password) => {
    return {
        type: types.SIGN_IN,
        payload: {
            email,
            password,
        }
    };
};

const logOutUser = () => {
    return {
        type: types.SIGN_OUT,
    };
};

export const signInUser = (email, password, setSuccess ) => (dispatch) => {
    fire.auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
        dispatch(
            loginUser({
                uid: user.user.uid,
                email: user.user.email,
                displayName: user.user.displayName,
            })
        );
    setSuccess(true)
    });
};

export const signUpUser = (name, email, password, setSuccess) => (dispatch) => {
    fire.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
            fire
                .auth()
                .currentUser.updateProfile({
                    displayName: name,
                })
                .then(() => {
                    const currentUser = fire.auth().currentUser;
                    dispatch(loginUser({
                        uid: currentUser.uid,
                        name: currentUser.displayName,
                        email: currentUser.email,
                    })
                    );
                setSuccess(true)
                });
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use");
            }
            if (error.code === "auth/weak-password") {
                alert("Weak password");
            }
        });
};

export const signOutUser = () => (dispatch) => {
    fire
    .auth()
    .signOut()
    .then(() => {
        dispatch(logOutUser());
    });
   
};


export const checkIsLoggedIn = () => dispatch =>{
    fire.auth().onAuthStateChanged(user => {
        if(user){
            dispatch(loginUser({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
            }))
        } 
    })
}