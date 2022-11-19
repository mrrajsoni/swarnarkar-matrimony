import { supabase } from '../../supabaseClient';

export default class FetchUser {
    static async getUserData(user_id: string) {
        try {
            const { data, error, status } = await supabase
                .from('user_registration')
                .select('*')
                .eq('user_id', user_id);
            if (status === 200) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
