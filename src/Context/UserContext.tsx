import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import FetchUser from '../Utils/API/FetchUser';
import Login, { loginData } from '../Utils/API/Login';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        const userSession = supabase.auth.getSession();
        void userSession.then((value) => {
            setUser(value.data.session?.user ?? null);
        });
        // Listen for changes on auth state (logged in, signed out, etc.)
        // eslint-disable-next-line @typescript-eslint/require-await
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                const currentSession = session;
                setUser(currentSession.user ?? null);
            } else {
                setUser(null);
            }
        });

        const getUserProfile = () => {
            void FetchUser.getUserData(user.id).then((response) => {
                setUser((prevState) => {
                    return {
                        ...prevState,
                        ...response[0],
                    };
                });
            });
        };

        if (user?.id) {
            getUserProfile();
        }

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, [user?.id]);

    const userLogin = (logindata: loginData) => {
        void Login.signInWithEmail(logindata);
    };

    const userLogout = () => {
        void Login.signOut();
        setUser(null);
        // router;
    };
    const exposed = {
        user,
        userLogin,
        userLogout,
    };
    return <UserContext.Provider value={exposed}> {children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
export default UserProvider;
