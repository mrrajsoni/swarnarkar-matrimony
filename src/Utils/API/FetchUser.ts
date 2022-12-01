import { supabase } from '../../supabaseClient';
import { selectValue } from '../../Types/GlobalTypes';

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

    static async getArchivePageProfileData(user_id: string, gender: selectValue) {
        try {
            const { data, error, status } = await supabase
                .from('user_registration')
                .select(`first_name, last_name, dob, self_gotra, occupation, annual_income, height`)
                .not('user_id', 'eq', user_id)
                .not('gender->>label', 'eq', gender.label);
            if (status === 200) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }
}
