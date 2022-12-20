import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { IUser } from '../Types/GlobalTypes';
import FetchUser from '../Services/API/FetchUser';
import Login from '../Services/API/Login';

interface IUserContext {
    user: IUser;
    userLogout: () => void;
}
export const UserContext = createContext<IUserContext>(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState<IUser>(null);

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
                                ...response,
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

    useEffect(() => {
        if (user?.id) {
            localStorage.setItem('userId', user?.id);
        }
    }, [user?.id]);

    const userLogout = () => {
        void Login.signOut();
        setUser(null);
        localStorage.removeItem('userId');
    };
    const exposed = {
        user,
        userLogout,
    };
    return <UserContext.Provider value={exposed}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
export default UserProvider;
