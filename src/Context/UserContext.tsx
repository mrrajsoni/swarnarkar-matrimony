import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

export const UserContext = createContext<Record<string, User>>(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        const session = supabase.auth.getSession();
        void session.then((value) => {
            setUser(value.data.session?.user ?? null);
            setLoading(false);
        });

        // Listen for changes on auth state (logged in, signed out, etc.)
        // eslint-disable-next-line @typescript-eslint/require-await
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const exposed = {
        user,
    };
    return <UserContext.Provider value={exposed}> {children}</UserContext.Provider>;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const useUser = () => useContext(UserContext);
export default UserProvider;
