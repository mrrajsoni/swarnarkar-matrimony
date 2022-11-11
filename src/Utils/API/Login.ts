import { supabase } from '../../supabaseClient';

export interface loginData {
    email: string;
    password: string;
}

export default class Login {
    static async signInWithEmail(logindata: loginData) {
        const { email, password } = logindata;
        try {
            await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async signOut() {
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.log(error);
        }
    }
}
