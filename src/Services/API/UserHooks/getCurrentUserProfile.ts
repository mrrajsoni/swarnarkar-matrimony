import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../supabaseClient';

export async function getCurrentUserProfile(userId: string) {
    try {
        const { data, error, status } = await supabase
            .from('user_registration')
            .select('*')
            .eq('user_id', userId)
            .single();
        if (status === 200 && !error) {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const useGetUserProfile = (userId: string, options = {}) => {
    return useQuery([`user-profile-${userId}`], () => getCurrentUserProfile(userId), {
        ...options,
    });
};
