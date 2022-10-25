import { supabase } from '../../supabaseClient';

export interface userData {
    email: string;
    password: string;
    mobile: string;
}

export default class Registration {
    static async initialSignUp(userData: userData, email: string) {
        try {
            await supabase.auth.signUp({
                email: email,
                password: userData.password,
                options: {
                    data: userData,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
}
