import { supabase } from '../../supabaseClient';

export interface IloginData {
    email: string;
    password: string;
}

export default class Login {
    static async signInWithEmail(logindata: IloginData) {
        const { email, password } = logindata;
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            return {
                data,
                error,
            };
        } catch (error) {
            return error;
        }
    }

    static async signOut() {
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.log(error);
        }
    }

    static async sendPasswordRecovery(email: string) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        return { data, error };
    }
}
