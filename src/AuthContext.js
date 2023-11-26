const {createContext, useState, useEffect, useContext} = require('react');
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {getUserData} from 'firebase-database/read-operations';
import {updateOnGoogleSignIn} from 'firebase-database/write-operations';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  const googleSignIn = async () => {
    try {
      GoogleSignin.configure({
        webClientId:
          '658402653566-12usns7e8a5vavve7rfljll5ur0mo7n0.apps.googleusercontent.com',
      });
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const {user} = await auth().signInWithCredential(googleCredential);
      console.log('User-----', user);
      await updateOnGoogleSignIn(user);
      console.log('Finished');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Google sign-in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Google sign-in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('Play service not available');
      } else {
        console.log('Error', error);
      }
    }
  };
  const signInWithEmailAndPassword = async (email, password) => {
    try {
      return await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log('Catch', err, err.code);
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password'
      ) {
        throw new Error('Incorrect email or password. Please try again.');
      } else if (err.code === 'auth/network-request-failed') {
        throw new Error('Please check your internet connection');
      } else if (err.code === 'auth/invalid-email') {
        throw new Error('Please provide valid email');
      } else {
        console.log('Threw this eroor');
        throw new Error(
          'An error occurred during sign in. Please try again later.',
        );
      }
    }
  };
  const signUpWithEmailAndPassword = async (email, password) => {
    try {
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      await user.sendEmailVerification();
      console.log('Verfication sent', user);
      return user;
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        throw new Error('Email id is not valid');
      } else if (err.code === 'auth/email-already-in-use') {
        throw new Error('Email id already in use');
      } else if (err.code === 'auth/network-request-failed') {
        throw new Error('Please check your connection');
      } else {
        throw new Error(
          'An error occurred during sign up. Please try again later.',
        );
      }
    }
  };

  const sendEmailVerification = async () => {
    await auth().currentUser.sendEmailVerification();
    console.log('Link sent successfully');
  };
  const recoverPassword = async email => {
    return await auth().sendPasswordResetEmail(email);
  };
  const logout = async () => {
    await auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      setIsloading(false);
    });

    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    logout,
    recoverPassword,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    googleSignIn,
    sendEmailVerification,
  };
  // console.log('Current user', currentUser);
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
