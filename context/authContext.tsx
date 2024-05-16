import { createContext, useEffect, useState, useContext } from 'react';
import { User, UserRole } from '@/interfaces/user';
import { onAuthStateChanged, createUserWithEmailAndPassword, signOut, User as FirebaseUser, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase-config';
import {doc, getDoc, setDoc} from "firebase/firestore"



export const AuthContext = createContext({
  user: null as User | null,
  isAuthenticated: undefined as  undefined | boolean,
  login: async (email: string, password: string) => {
    return { success: false, data: null } as { success: boolean; data: FirebaseUser | string | null };
  },
  register: async (email: string, password: string, username: string, profileUrl:string) => {
    return { success: false, data: null } as { success: boolean; data: FirebaseUser | string | null};
  },
  logout: async () => {
    return { success: false, data: null } as { success: boolean; data: string | null };
  },
});

type Props = { children: React.ReactNode };



export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Corregir el tipo de estado para user
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined >(undefined); // Inicializar isAuthenticated con false (undefined)



  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setIsAuthenticated(true);
        const mappedUser: User = {
          username: firebaseUser.displayName || "", // Firebase user might not have email
          email: firebaseUser.email || "", // Firebase user might not have email
          password: "", // Password is not available from Firebase user object
          // You can set default or undefined values for other fields if needed
          rol: UserRole.USER, // Assuming a default role,
          profileUrl: firebaseUser.photoURL || "", // Firebase user might not have photoURL
          uid: firebaseUser.uid
        };
        setUser(mappedUser);
        updateUserData(firebaseUser.uid);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    // clear the timeout

    return () => {
      unsubscribe();
    };



  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true, data: null};
    } catch (error: any) {
      return { success: false, data: error.message };
    }

  };

  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // console.log("respopnse from context", response);
      return { success: true, data: response.user };
    } catch (error: any) {

      console.error('User login error:', error);
      if (error.code === 'auth/invalid-email') {
        return {
          success: false,
          data: 'The email address is not valid.'
        };
      } else if (error.code === 'auth/invalid-credential') {
        return {
          success: false,
          data: 'The password is not valid.'
        };
      }
      return { success: false, data: error.message };
    }
}

  

  const register = async (email:string, password: string, username: string, profileUrl:string) => {
    try {
      if (email && password && username) {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
  
        // Check if the response contains a valid user object
        if (response && response.user) {
          console.log('User created successfully!');
  
          // Write user data to Firestore
          await setDoc(doc(db, 'users', response.user.uid), {
            username,
            email,
            rol: UserRole.USER,
            profileUrl: profileUrl || "",
          });
  
          return { success: true, data: response.user };
        } else {
          throw new Error('User creation failed: No user object found in response.');
        }
      } else {
        throw new Error('Email and password are required.');
      }
    } catch (error: any) {
      console.error('User creation error:', error);
      if (error.code === 'auth/email-already-in-use') {
        return {
          success: false,
          data: 'The email address is already in use by another account.'
        };
      } else if (error.code === 'auth/weak-password') {
        return { success: false, data: 'The password is too weak.' };
      } else if (error.code === 'auth/invalid-email') {
        return { success: false, data: 'The email address is not valid.' };
      }
      return { success: false, data: error.message };
    }
  };

  const updateUserData = async (uid: string) => {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      let data = docSnap.data();
      // console.log("data fron snap update", data);
      setUser({
        username: data.username,
        email: data.email,
        rol: data.rol,
        password : "",
        profileUrl: data.profileUrl,
        uid: uid
      });
    }
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const value = useContext(AuthContext);

  if(!value) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return value
}
