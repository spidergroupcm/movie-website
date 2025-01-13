import React, { createContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Current user
    const [loading, setLoading] = useState(false); // During operations
    const [initializing, setInitializing] = useState(true); // Initial auth load

    const createUser = (email, password, name, photoUrl) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const currentUser = userCredential.user;
                if (name || photoUrl) {
                    return updateProfile(currentUser, {
                        displayName: name,
                        photoURL: photoUrl,
                    }).then(() => {
                        setUser({ ...currentUser, displayName: name, photoURL: photoUrl });
                    });
                }
            })
            .finally(() => setLoading(false));
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const { displayName = "User", photoURL = "" } = userCredential.user;
                setUser({ ...userCredential.user, displayName, photoURL });
            })
            .finally(() => setLoading(false));
    };

    const logoutUser = () => {
        setUser(null); // Update UI immediately
        setLoading(true);
        return signOut(auth).finally(() => setLoading(false));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setInitializing(false);
        });
        return () => unsubscribe();
    }, []);

    const userinfo = {
        user,
        loading,
        createUser,
        signInUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={userinfo}>
            {!initializing && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

