const {createContext, useState, useEffect, useContext} = require('react');
import auth from '@react-native-firebase/auth';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  const signInWithEmailAndPassword = async (email, password) => {
    return await auth().signInWithEmailAndPassword(email, password);
  };
  const signUpWithEmailAndPassword = async (email, password) => {
    return await auth().createUserWithEmailAndPassword(email, password);
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
  };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
