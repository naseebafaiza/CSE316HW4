import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    LOGIN_ERR : "LOGIN_ERR",
    REGISTER_ERR: "REGISTER_ERR"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        loginErr: false,
        registerErr: false,
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    loginErr: false,
                    registerErr: false,
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    loginErr: false,
                    registerErr: false,
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    loginErr: false,
                    registerErr: false,
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    loginErr: false,
                    registerErr: false,
                })
            }
            case AuthActionType.LOGIN_ERR: {
                return setAuth({
                    user: payload.user,
                    loggedIn: auth.loggedIn,
                    loginErr: true,
                    registerErr: false,
                })
            }
            case AuthActionType.REGISTER_ERR: {
                return setAuth({
                    user: payload.user,
                    loggedIn: auth.loggedIn,
                    loginErr: false,
                    registerErr: true,
                })
            }
            
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(firstName, lastName, email, password, passwordVerify) {
        try{
            const response = await api.registerUser(firstName, lastName, email, password, passwordVerify);      
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            auth.loginUser(email, password);
            history.push("/");
        }
        } catch(error){
            let err = document.getElementById("failedToRegister");
            err.classList.add("is-visible");
            authReducer({
                type: AuthActionType.REGISTER_ERR,
                payload: {
                }
            })
            // password error handling
            if(error.response.status == 400){
                err.innerHTML = "Please enter all required fields."
            }
            else if(error.response.status == 401){
                err.innerHTML = "Please enter a password of at least 8 characters."
            }
            else if(err.response.status == 402){
                err.innerHTML= "Please enter the same password twice."
            }
            else if(err.response.status == 403){
                err.innerHTML = "An account with this email address already exists."
            }
        }
        
    }

    auth.loginUser = async function(email, password) {
        try{
            // hi
            const response = await api.loginUser(email, password);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        }
        } catch(error){
            let err = document.getElementById("failedToLogin");
            err.classList.add("is-visible")
            authReducer({
                type: AuthActionType.LOGIN_ERR,
                payload: {
                }
            })
        }
   
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };