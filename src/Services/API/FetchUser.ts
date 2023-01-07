import { supabase } from '../../supabaseClient';
import { selectValue } from '../../Types/GlobalTypes';
import CommonUtils from '../../Utils/Common Utils/CommonUtils';

export default class FetchUser {
    static async getUserData(user_id: string) {
        try {
            const { data, error } = await supabase
                .from('user_registration')
                .select('registration_completed, gender')
                .eq('user_id', user_id)
                .single();

            return { data, error };
        } catch (error) {
            console.log(error);
        }
    }

    static async getFullUserData(user_id: string) {
        try {
            const { data, error } = await supabase
                .from('user_registration')
                .select('*')
                .eq('user_id', user_id)
                .single();

            return { data, error };
        } catch (error) {
            console.log(error);
        }
    }

    static async getArchivePageProfileData(user_id: string, gender: selectValue) {
        try {
            // const { from, to } = CommonUtils.getPagination(page, 10);
            const { data, error, count } = await supabase
                .from('user_registration')
                .select(
                    `first_name, last_name, dob, self_gotra, occupation, annual_income, height, user_id, user_images, employed_in, manglik, martial_status`,
                )
                .not('user_id', 'eq', user_id)
                .not('gender->>label', 'eq', gender.label);
            return {
                error,
                data,
                count,
            };
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
