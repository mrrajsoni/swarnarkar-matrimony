import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { IUser } from '../Types/GlobalTypes';
import FetchUser from '../Utils/API/FetchUser';
import Login, { IloginData } from '../Utils/API/Login';

interface IUserContext {
    user: IUser;
    userLogin: (values: IloginData) => void;
    userLogout: () => void;
}
export const UserContext = createContext<IUserContext>(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState<IUser>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen for changes on auth state (logged in, signed out, etc.)
        // eslint-disable-next-line @typescript-eslint/require-await
        const { data: listener } = supabase.auth.onAuthStateChange(async () => {
            getUserProfile();
        });

        const getUserProfile = () => {
            const userSession = supabase.auth.getSession();
            void userSession.then((value) => {
                const userData = value.data.session?.user;
                if (userData) {
                    void FetchUser.getUserData(userData?.id).then((response) => {
                        setUser(() => {
                            return {
                                ...userData,
                                ...response[0],
                            };
                        });
                    });
                } else {
                    setUser(null);
                }
            });
        };

        getUserProfile();
        return () => {
            listener?.subscription.unsubscribe();
        };
    }, [user?.id]);
    console.log(user?.id);

    const userLogin = (logindata: IloginData) => {
        void Login.signInWithEmail(logindata);
    };

    const userLogout = () => {
        void Login.signOut();
        setUser(null);
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
