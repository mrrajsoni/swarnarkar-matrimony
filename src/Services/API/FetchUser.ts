import { supabase } from '../../supabaseClient';
import { selectValue } from '../../Types/GlobalTypes';

export default class FetchUser {
    static async getUserData(user_id: string) {
        try {
            const { data, error, status } = await supabase
                .from('user_registration')
                .select('registration_completed')
                .eq('user_id', user_id)
                .single();
            if (status === 200) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return data;
            }
            if (error) {
                return error;
            }
        } catch (error) {
            console.log(error);
        }
    }

    static async getArchivePageProfileData(user_id: string, gender: selectValue) {
        try {
            const { data, error, status } = await supabase
                .from('user_registration')
                .select(
                    `first_name, last_name, dob, self_gotra, occupation, annual_income, height, user_id, user_images`,
                )
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

    static async getUserImages(user_id: string) {
        try {
            const { data, error } = await supabase.storage
                .from('profile-images')
                .list(`${user_id}/`, {
                    limit: 5,
                });

            if (!error) return data;
        } catch (error) {
            console.log(error);
        }
    }
    static async deleteUserImage(user_id: string, imageName: string) {
        try {
            const { data, error } = await supabase.storage
                .from('profile-images')
                .remove([`${user_id}/${imageName}`]);

            if (!error) return data;
        } catch (error) {
            console.log(error);
        }
    }
}
