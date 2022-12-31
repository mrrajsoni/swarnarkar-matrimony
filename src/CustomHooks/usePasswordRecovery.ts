import { supabase } from '../supabaseClient';

const handlePasswordRecovery = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
        return error.message;
    } else {
        return data;
    }
};

export default function usePasswordRecovery(email: string) {
    return handlePasswordRecovery(email);
}
